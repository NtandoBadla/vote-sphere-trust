<?php
require_once 'auth.php';

function getElections() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM elections ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getElection($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM elections WHERE id = ?");
    $stmt->execute([$id]);
    $election = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($election) {
        $stmt = $pdo->prepare('SELECT * FROM candidates WHERE "electionId" = ?');
        $stmt->execute([$id]);
        $election['candidates'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    return $election;
}

function getElectionResults($id) {
    global $pdo;
    $stmt = $pdo->prepare('
        SELECT c.*, COUNT(v.id) as "voteCount"
        FROM candidates c
        LEFT JOIN votes v ON c.id = v."candidateId"
        WHERE c."electionId" = ?
        GROUP BY c.id
        ORDER BY "voteCount" DESC
    ');
    $stmt->execute([$id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>