-- Optional NONa+ fictional seed.
-- Create a test user through Supabase Auth first (Dashboard > Authentication > Users).
-- Then replace TEST_USER_UUID below with that UUID and run this file.
-- Never commit a real user's password or any service-role credential.

-- update public.accounts set available_balance=2500000.50, current_balance=2500000.50, pending_balance=255 where user_id='TEST_USER_UUID';

-- Example fictional transaction:
-- insert into public.transactions(account_id,user_id,kind,description,category,amount,status,reference)
-- select id, user_id, 'deposit', 'Transfer Received', 'Income', 2500000.50, 'completed', 'NONA-SEED-000001'
-- from public.accounts where user_id='TEST_USER_UUID';
