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
  : 'hello@authorspilot.com';
$name = trim((string) ($data['name'] ?? 'Website visitor'));
$email = trim((string) ($data['email'] ?? $data['_replyto'] ?? ''));
$subject = trim((string) ($data['_subject'] ?? $data['subject'] ?? 'New website inquiry'));
$message = trim((string) ($data['message'] ?? ''));

function clean_header($value) {
  return trim(str_replace(["\r", "\n"], '', (string) $value));
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
  : 'hello@authorspilot.com';

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
