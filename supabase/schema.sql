-- M.&T Credit Union / NONa+ fictional test platform.
-- Run in Supabase SQL editor. Never add a service-role key to the frontend.

create extension if not exists pgcrypto;

create type public.app_role as enum ('user','admin');
create type public.account_status as enum ('active','suspended');
create type public.tx_kind as enum ('transfer','deposit','withdrawal','payment');
create type public.tx_status as enum ('completed','pending','failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null,
  phone text,
  role public.app_role not null default 'user',
  status public.account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default 'M.&T Everyday Checking',
  account_type text not null default 'checking',
  masked_number text not null default '**** 4821',
  available_balance numeric(18,2) not null default 0 check (available_balance >= 0),
  current_balance numeric(18,2) not null default 0 check (current_balance >= 0),
  pending_balance numeric(18,2) not null default 0 check (pending_balance >= 0),
  status public.account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind public.tx_kind not null,
  description text not null,
  category text not null default 'Other',
  amount numeric(18,2) not null check (amount <> 0),
  status public.tx_status not null default 'completed',
  reference text not null unique,
  counterparty text,
  recipient_account text,
  created_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  masked_number text not null default '**** **** **** 4821',
  cardholder text not null default 'ALEX MORGAN',
  expires_month smallint not null default 12,
  expires_year smallint not null default 29,
  frozen boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  reference text,
  result text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index accounts_user_id_idx on public.accounts(user_id);
create index transactions_user_id_created_idx on public.transactions(user_id, created_at desc);
create index audit_logs_user_created_idx on public.audit_logs(user_id, created_at desc);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.status = 'active'); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
declare new_account uuid;
begin
  insert into public.profiles(id, first_name, last_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'first_name',''), coalesce(new.raw_user_meta_data->>'last_name',''), new.email);
  insert into public.accounts(user_id, name, account_type, masked_number, available_balance, current_balance, pending_balance)
  values (new.id, 'M.&T Everyday Checking', 'checking', '**** 4821', 0, 0, 0) returning id into new_account;
  insert into public.cards(user_id, cardholder) values (new.id, upper(trim(coalesce(new.raw_user_meta_data->>'first_name','Alex')||' '||coalesce(new.raw_user_meta_data->>'last_name','Morgan'))));
  insert into public.notifications(user_id,title,body) values (new.id,'NONa+ Account created','Your fictional account is ready for test activity.');
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.perform_nona_transaction(
  p_kind public.tx_kind,
  p_amount numeric,
  p_description text,
  p_counterparty text default null,
  p_recipient_account text default null
)
returns jsonb language plpgsql security definer set search_path = public
as $$
declare a public.accounts%rowtype; ref text; tx_id uuid; signed numeric;
begin
  if auth.uid() is null then raise exception 'UNAUTHORIZED'; end if;
  if p_amount is null or p_amount <= 0 then raise exception 'INVALID_AMOUNT'; end if;
  select * into a from public.accounts where user_id=auth.uid() and status='active' for update;
  if not found then raise exception 'ACCOUNT_NOT_FOUND'; end if;
  signed := case when p_kind='withdrawal' then -p_amount else p_amount end;
  if p_kind in ('withdrawal','transfer') and a.available_balance < p_amount then raise exception 'INSUFFICIENT_BALANCE'; end if;
  ref := 'NONA-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10));
  update public.accounts
    set available_balance=available_balance+signed,
        current_balance=current_balance+signed,
        updated_at=now()
  where id=a.id;
  insert into public.transactions(account_id,user_id,kind,description,category,amount,status,reference,counterparty,recipient_account)
  values(a.id,auth.uid(),p_kind,p_description,case when p_kind='deposit' then 'Income' when p_kind='withdrawal' then 'Cash' else 'Transfer' end,signed,'completed',ref,p_counterparty,p_recipient_account)
  returning id into tx_id;
  insert into public.audit_logs(user_id,action,reference,result,metadata)
  values(auth.uid(),'NONa+ '||p_kind::text,ref,'success',jsonb_build_object('transaction_id',tx_id,'fictional',true));
  insert into public.notifications(user_id,title,body)
  values(auth.uid(),'NONa+ transaction completed',p_description||' · '||ref);
  return jsonb_build_object('id',tx_id,'reference',ref);
end $$;

revoke all on function public.perform_nona_transaction(public.tx_kind,numeric,text,text,text) from public, anon;
grant execute on function public.perform_nona_transaction(public.tx_kind,numeric,text,text,text) to authenticated;

alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.transactions enable row level security;
alter table public.cards enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles own read" on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin());
create policy "profiles own update" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid() and role=(select role from public.profiles where id=auth.uid()));
create policy "admin profiles read" on public.profiles for select to authenticated using (public.is_admin());

create policy "accounts own read" on public.accounts for select to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "accounts admin update" on public.accounts for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "transactions own read" on public.transactions for select to authenticated using (user_id=auth.uid() or public.is_admin());

create policy "cards own read" on public.cards for select to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "cards own update" on public.cards for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());

create policy "notifications own read" on public.notifications for select to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "notifications own update" on public.notifications for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());

create policy "audit own read" on public.audit_logs for select to authenticated using (user_id=auth.uid() or public.is_admin());
