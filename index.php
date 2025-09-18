<?php
require_once 'php-backend/auth.php';
require_once 'php-backend/elections.php';
require_once 'php-backend/votes.php';

// Handle login
if ($_POST['action'] ?? '' === 'login') {
    $user = login($_POST['email'], $_POST['password']);
    if ($user) {
        header('Location: index.php');
        exit;
    } else {
        $error = 'Invalid credentials';
    }
}

// Handle logout
if ($_GET['action'] ?? '' === 'logout') {
    logout();
    header('Location: index.php');
    exit;
}

// Handle vote
if ($_POST['action'] ?? '' === 'vote' && isLoggedIn()) {
    castVote(getCurrentUser()['id'], $_POST['electionId'], $_POST['candidateId']);
    header('Location: index.php?election=' . $_POST['electionId']);
    exit;
}

$currentUser = getCurrentUser();
$elections = getElections();
$selectedElection = null;
$electionResults = null;

if (isset($_GET['election'])) {
    $selectedElection = getElection($_GET['election']);
    if ($selectedElection && $currentUser) {
        $userVote = hasUserVoted($currentUser['id'], $selectedElection['id']);
        $selectedElection['userVote'] = $userVote;
    }
}

if (isset($_GET['results'])) {
    $electionResults = getElectionResults($_GET['results']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote Sphere</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .card { border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px; }
        .btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .btn:hover { background: #0056b3; }
        .error { color: red; margin: 10px 0; }
        .success { color: green; margin: 10px 0; }
        .nav { margin-bottom: 20px; }
        .nav a { margin-right: 15px; text-decoration: none; color: #007bff; }
    </style>
</head>
<body>
    <h1>Vote Sphere</h1>
    
    <div class="nav">
        <a href="index.php">Home</a>
        <?php if ($currentUser): ?>
            <span>Welcome, <?= htmlspecialchars($currentUser['firstName']) ?>!</span>
            <a href="?action=logout">Logout</a>
        <?php endif; ?>
    </div>

    <?php if (!$currentUser): ?>
        <!-- Login Form -->
        <div class="card">
            <h2>Login</h2>
            <?php if (isset($error)): ?>
                <div class="error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            <form method="POST">
                <input type="hidden" name="action" value="login">
                <p>
                    <label>Email:</label><br>
                    <input type="email" name="email" required style="width: 300px; padding: 8px;">
                </p>
                <p>
                    <label>Password:</label><br>
                    <input type="password" name="password" required style="width: 300px; padding: 8px;">
                </p>
                <button type="submit" class="btn">Login</button>
            </form>
            <p><small>Use admin@votesphere.com / admin123 or user@example.com / user123</small></p>
        </div>
    <?php else: ?>
        
        <?php if ($selectedElection): ?>
            <!-- Election Details -->
            <div class="card">
                <h2><?= htmlspecialchars($selectedElection['title']) ?></h2>
                <p><?= htmlspecialchars($selectedElection['description']) ?></p>
                
                <?php if ($selectedElection['userVote']): ?>
                    <div class="success">You have already voted in this election.</div>
                <?php endif; ?>
                
                <h3>Candidates:</h3>
                <?php foreach ($selectedElection['candidates'] as $candidate): ?>
                    <div class="card">
                        <h4><?= htmlspecialchars($candidate['name']) ?></h4>
                        <p><?= htmlspecialchars($candidate['description']) ?></p>
                        
                        <?php if (!$selectedElection['userVote']): ?>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="action" value="vote">
                                <input type="hidden" name="electionId" value="<?= $selectedElection['id'] ?>">
                                <input type="hidden" name="candidateId" value="<?= $candidate['id'] ?>">
                                <button type="submit" class="btn">Vote for <?= htmlspecialchars($candidate['name']) ?></button>
                            </form>
                        <?php elseif ($selectedElection['userVote'] == $candidate['id']): ?>
                            <div class="success">✓ You voted for this candidate</div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
                
                <p><a href="?results=<?= $selectedElection['id'] ?>">View Results</a></p>
            </div>
            
        <?php elseif ($electionResults): ?>
            <!-- Election Results -->
            <div class="card">
                <h2>Election Results</h2>
                <?php foreach ($electionResults as $result): ?>
                    <div class="card">
                        <h4><?= htmlspecialchars($result['name']) ?></h4>
                        <p>Votes: <?= $result['voteCount'] ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
            
        <?php else: ?>
            <!-- Elections List -->
            <h2>Available Elections</h2>
            <?php foreach ($elections as $election): ?>
                <div class="card">
                    <h3><?= htmlspecialchars($election['title']) ?></h3>
                    <p><?= htmlspecialchars($election['description']) ?></p>
                    <a href="?election=<?= $election['id'] ?>" class="btn">View Election</a>
                    <a href="?results=<?= $election['id'] ?>">View Results</a>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
        
    <?php endif; ?>
</body>
</html>