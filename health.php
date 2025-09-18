<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    require_once 'php-backend/supabase-config.php';
    
    // Test database connection
    $stmt = $pdo->query("SELECT 1");
    
    echo json_encode([
        'status' => 'online',
        'database' => 'connected',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'offline',
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>