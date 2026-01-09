<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

echo json_encode([
    'raw_input' => $input,
    'parsed_data' => $data,
    'username' => $data['username'] ?? 'NOT SET',
    'password' => $data['password'] ?? 'NOT SET',
    'expected_username' => 'admin',
    'expected_password' => 'admin',
    'username_match' => ($data['username'] ?? '') === 'admin',
    'password_match' => ($data['password'] ?? '') === 'admin',
]);


