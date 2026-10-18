-- Rename author profile WhatsApp social field to TikTok (sales_link whatsapp type unchanged)
alter table public.profiles
  add column if not exists social_tiktok text;

update public.profiles
set social_tiktok = social_whatsapp
where social_tiktok is null
  and social_whatsapp is not null;
