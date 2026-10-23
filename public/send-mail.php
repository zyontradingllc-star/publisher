<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

$intent = trim((string) ($data['intent'] ?? ''));
// One-click Create Free Account → straight to no-reply@authorspilot.com
$to = ($intent === 'create-free-account')
  ? 'no-reply@authorspilot.com'
  : 'info@authorspilot.com';
$name = trim((string) ($data['name'] ?? 'Website visitor'));
$email = trim((string) ($data['email'] ?? $data['_replyto'] ?? ''));
$subject = trim((string) ($data['_subject'] ?? $data['subject'] ?? 'New website inquiry'));
$message = trim((string) ($data['message'] ?? ''));
$captchaToken = trim((string) ($data['captchaToken'] ?? $data['cf-turnstile-response'] ?? ''));

function clean_header($value) {
  return trim(str_replace(["\r", "\n"], '', (string) $value));
}

function turnstile_secret() {
  $secret = getenv('TURNSTILE_SECRET_KEY') ?: '';
  $secretsFile = __DIR__ . '/send-mail.secrets.php';
  if (is_readable($secretsFile)) {
    $secrets = include $secretsFile;
    if (is_array($secrets) && !empty($secrets['turnstile_secret'])) {
      $secret = (string) $secrets['turnstile_secret'];
    }
  }
  return trim($secret);
}

function verify_turnstile($token) {
  $secret = turnstile_secret();
  // Secret not deployed yet — allow mail so Hostinger keeps working during setup.
  if ($secret === '') {
    return true;
  }
  if ($token === '') {
    return false;
  }

  $payload = http_build_query([
    'secret' => $secret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
  ]);

  $ctx = stream_context_create([
    'http' => [
      'method' => 'POST',
      'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
      'content' => $payload,
      'timeout' => 8,
    ],
  ]);

  $raw = @file_get_contents(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    false,
    $ctx,
  );
  if ($raw === false) {
    return false;
  }
  $result = json_decode($raw, true);
  return is_array($result) && !empty($result['success']);
}

// Contact / quote forms require Turnstile when the secret is configured.
// One-click create-free-account intentionally skips captcha.
if ($intent !== 'create-free-account' && !verify_turnstile($captchaToken)) {
  http_response_code(403);
  echo json_encode([
    'success' => false,
    'message' => 'Security check failed. Please complete the captcha and try again.',
  ]);
  exit;
}

if ($message === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Message is required']);
  exit;
}

$subject = clean_header($subject);
$name = clean_header($name);
$email = clean_header($email);

$lines = [];
foreach ($data as $key => $value) {
  if (strpos((string) $key, '_') === 0) {
    continue;
  }
  if ($key === 'message' || $key === 'captchaToken') {
    continue;
  }
  $lines[] = $key . ': ' . (is_scalar($value) ? (string) $value : json_encode($value));
}
$lines[] = '';
$lines[] = $message;
$body = implode("\n", $lines);

$fromAddress = ($intent === 'create-free-account')
  ? 'no-reply@authorspilot.com'
  : 'info@authorspilot.com';

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: Authors Pilot <' . $fromAddress . '>',
  'X-Mailer: AuthorsPilot',
];

if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $headers[] = 'Reply-To: ' . $email;
}

$ok = @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $fromAddress);

if (!$ok) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Could not send email']);
  exit;
}

echo json_encode(['success' => true]);
