<?php
// Load environment variables (create .env file with your Supabase credentials)
if (file_exists('.env')) {
    $lines = file('.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

// Supabase connection details
$host = $_ENV['SUPABASE_HOST'] ?? 'db.hjgeulcorrbctynswzqi.supabase.co';
$dbname = 'postgres';
$username = 'postgres';
$password = $_ENV['SUPABASE_PASSWORD'] ?? 'Bokamoso@2002';
$port = '5432';
$anon_key = $_ENV['SUPABASE_ANON_KEY'] ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1bGNvcnJiY3R5bnN3enFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzY0MjksImV4cCI6MjA3MzcxMjQyOX0.5h6eXXO3RzE_VzayAQq4esEFDfxjCjUF0ur2WFrAg8g';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>