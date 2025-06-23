
let score = 0;
let wickets = 0;
let balls = 0;
let oversLimit = 0;
let deliveriesPerOver = 6;
let history = [];
let striker = '';
let nonStriker = '';
let bowler = '';

function startMatch() {
  const teamA = document.getElementById('teamA').value;
  const teamB = document.getElementById('teamB').value;
  oversLimit = parseInt(document.getElementById('oversLimit').value);
  striker = document.getElementById('striker').value;
  nonStriker = document.getElementById('nonStriker').value;
  bowler = document.getElementById('bowler').value;

  if (!teamA || !teamB || !oversLimit || !striker || !nonStriker || !bowler) {
    alert("Please fill all fields to start the match.");
    return;
  }

  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('scoring-screen').style.display = 'block';
  document.getElementById('strikerName').textContent = striker;
  document.getElementById('nonStrikerName').textContent = nonStriker;
  document.getElementById('bowlerName').textContent = bowler;
  document.getElementById('maxOvers').textContent = oversLimit.toFixed(1);
  document.getElementById('matchInfo').textContent = `${teamA} vs ${teamB}`;
}

function addRun(run, type = 'normal') {
  if (wickets >= 10 || overs() >= oversLimit) return;

  if (type === 'wide' || type === 'noball') {
    score += 1;
    history.push({ run: 1, type: type });
  } else {
    score += run;
    balls++;
    history.push({ run: run, type: 'normal' });
    rotateStrike(run);
  }

  updateScore();
}

function wicket() {
  if (wickets >= 10 || overs() >= oversLimit) return;

  wickets++;
  balls++;
  history.push({ run: 0, type: 'wicket' });

  updateScore();
}

function rotateStrike(run) {
  if (run % 2 !== 0) {
    [striker, nonStriker] = [nonStriker, striker];
    document.getElementById('strikerName').textContent = striker;
    document.getElementById('nonStrikerName').textContent = nonStriker;
  }
}

function overs() {
  return Math.floor(balls / 6) + (balls % 6) / 10;
}

function runRate() {
  return balls === 0 ? 0 : (score / (balls / 6)).toFixed(2);
}

function updateScore() {
  document.getElementById('score').textContent = score;
  document.getElementById('wickets').textContent = wickets;
  document.getElementById('overs').textContent = overs().toFixed(1);
  document.getElementById('runRate').textContent = runRate();

  if (overs() >= oversLimit || wickets >= 10) {
    endInnings();
  }
}

function endInnings() {
  alert("Innings ended.");
  document.getElementById('matchResult').innerHTML =
    `<strong>Final Score:</strong> ${score}/${wickets} in ${overs().toFixed(1)} overs<br>Run Rate: ${runRate()}`;
}

function undo() {
  const last = history.pop();
  if (!last) return;

  if (last.type === 'normal') {
    score -= last.run;
    balls--;
  } else if (last.type === 'wicket') {
    wickets--;
    balls--;
  } else {
    score -= 1;
  }

  updateScore();
                        }
