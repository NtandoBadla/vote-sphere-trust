<?php
require_once 'auth.php';

function castVote($userId, $electionId, $candidateId) {
    global $pdo;
    $stmt = $pdo->prepare('
        INSERT INTO votes (user_id, election_id, candidate_id) 
        VALUES (?, ?, ?) 
        ON CONFLICT (user_id, election_id) 
        DO UPDATE SET candidate_id = ?
    ');
    return $stmt->execute([$userId, $electionId, $candidateId, $candidateId]);
}

function getUserVotes($userId) {
    global $pdo;
    $stmt = $pdo->prepare('
        SELECT v.*, e.title as "electionTitle", c.name as "candidateName"
        FROM votes v
        JOIN elections e ON v.election_id = e.id
        JOIN candidates c ON v.candidate_id = c.id
        WHERE v.user_id = ?
    ');
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function hasUserVoted($userId, $electionId) {
    global $pdo;
    $stmt = $pdo->prepare('SELECT candidate_id FROM votes WHERE user_id = ? AND election_id = ?');
    $stmt->execute([$userId, $electionId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? $result['candidate_id'] : false;
}
?>