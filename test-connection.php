<?php
require_once 'php-backend/supabase-config.php';

echo "<h2>Database Connection Test</h2>";

try {
    // Test basic connection
    echo "<p>✅ PDO connection established successfully!</p>";
    echo "<p>Host: " . $host . "</p>";
    echo "<p>Database: " . $dbname . "</p>";
    
    // Test if tables exist
    $stmt = $pdo->query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Tables found:</h3>";
    if (empty($tables)) {
        echo "<p>❌ No tables found. Please run the SQL from database.sql in Supabase.</p>";
    } else {
        foreach ($tables as $table) {
            echo "<p>✅ " . $table . "</p>";
        }
    }
    
    // Test users table
    if (in_array('users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        $count = $stmt->fetchColumn();
        echo "<p>Users in database: " . $count . "</p>";
    }
    
} catch (PDOException $e) {
    echo "<p>❌ Connection failed: " . $e->getMessage() . "</p>";
    echo "<p>Please check your .env file and Supabase credentials.</p>";
}
?>