<?php
/**
 * Copy to send-mail.secrets.php on Hostinger (same folder as send-mail.php).
 * Do NOT commit send-mail.secrets.php — it holds the Turnstile secret.
 *
 * Cloudflare Dashboard → Turnstile → your widget → Secret Key
 * https://dash.cloudflare.com/?to=/:account/turnstile
 */
return [
  'turnstile_secret' => 'YOUR_TURNSTILE_SECRET_KEY',
];
