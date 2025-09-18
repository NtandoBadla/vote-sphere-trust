<?php
// Supabase connection details
$host = 'db.hjgeulcorrbctynswzqi.supabase.co';
$dbname = 'postgres';
$username = 'postgres';
$password = 'Bokamoso@2002'; // Get this from Supabase Dashboard
$port = '5432';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>