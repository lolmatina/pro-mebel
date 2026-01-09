<?php
// Quick test to check login credentials
$_ENV['ADMIN_USERNAME'] = 'admin';
$_ENV['ADMIN_PASSWORD'] = 'admin';

$adminUsername = $_ENV['ADMIN_USERNAME'] ?? 'admin';
$adminPassword = $_ENV['ADMIN_PASSWORD'] ?? 'admin';

echo "Admin Username: " . $adminUsername . "\n";
echo "Admin Password: " . $adminPassword . "\n";

// Test JSON parsing
$json = '{"username":"admin","password":"admin"}';
$data = json_decode($json, true);
echo "Parsed Username: " . ($data['username'] ?? 'NOT FOUND') . "\n";
echo "Parsed Password: " . ($data['password'] ?? 'NOT FOUND') . "\n";

// Test comparison
if ($data['username'] === $adminUsername && $data['password'] === $adminPassword) {
    echo "✓ Credentials match!\n";
} else {
    echo "✗ Credentials don't match\n";
}


