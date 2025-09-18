<?php
require_once 'auth.php';

function castVote($userId, $electionId, $candidateId) {
    global $pdo;
    $stmt = $pdo->prepare('
        INSERT INTO votes ("userId", "electionId", "candidateId") 
        VALUES (?, ?, ?) 
        ON CONFLICT ("userId", "electionId") 
        DO UPDATE SET "candidateId" = ?
    ');
    return $stmt->execute([$userId, $electionId, $candidateId, $candidateId]);
}

function getUserVotes($userId) {
    global $pdo;
    $stmt = $pdo->prepare('
        SELECT v.*, e.title as "electionTitle", c.name as "candidateName"
        FROM votes v
        JOIN elections e ON v."electionId" = e.id
        JOIN candidates c ON v."candidateId" = c.id
        WHERE v."userId" = ?
    ');
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function hasUserVoted($userId, $electionId) {
    global $pdo;
    $stmt = $pdo->prepare('SELECT "candidateId" FROM votes WHERE "userId" = ? AND "electionId" = ?');
    $stmt->execute([$userId, $electionId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? $result['candidateId'] : false;
}
?>