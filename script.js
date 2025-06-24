// JS Cricket App Logic let matchData = { teamA: "", teamB: "", striker: {}, nonStriker: {}, bowler: {}, totalRuns: 0, wickets: 0, overs: 0, currentBalls: 0, maxOvers: 0, history: [], matches: [], };

function startSetup() { showScreen("setup-screen"); }

function startMatch() { matchData.teamA = document.getElementById("teamA").value; matchData.teamB = document.getElementById("teamB").value; matchData.striker = { name: document.getElementById("striker").value, runs: 0, balls: 0 }; matchData.nonStriker = { name: document.getElementById("nonStriker").value, runs: 0, balls: 0 }; matchData.bowler = { name: document.getElementById("bowler").value, runs: 0, wickets: 0, balls: 0 }; matchData.maxOvers = parseInt(document.getElementById("overs").value);

updateScoringUI(); showScreen("scoring-screen"); }

function showScreen(id) { document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden")); document.getElementById(id).classList.remove("hidden"); }

function updateScoringUI() { document.getElementById("matchTeams").textContent = ${matchData.teamA} vs ${matchData.teamB}; document.getElementById("matchOvers").textContent = Overs: ${matchData.overs}.${matchData.currentBalls}; document.getElementById("strikerName").textContent = matchData.striker.name; document.getElementById("strikerRuns").textContent = matchData.striker.runs; document.getElementById("strikerBalls").textContent = matchData.striker.balls; document.getElementById("nonStrikerName").textContent = matchData.nonStriker.name; document.getElementById("nonStrikerRuns").textContent = matchData.nonStriker.runs; document.getElementById("nonStrikerBalls").textContent = matchData.nonStriker.balls; document.getElementById("bowlerName").textContent = matchData.bowler.name; document.getElementById("bowlerStats").textContent = Runs: ${matchData.bowler.runs}, Wickets: ${matchData.bowler.wickets}; document.getElementById("totalRuns").textContent = matchData.totalRuns; document.getElementById("totalWickets").textContent = matchData.wickets; document.getElementById("currentOver").textContent = ${matchData.overs}.${matchData.currentBalls}; document.getElementById("runRate").textContent = getRunRate(); }

function scoreRun(run) { matchData.totalRuns += run; matchData.striker.runs += run; matchData.striker.balls++; matchData.bowler.runs += run; matchData.bowler.balls++; matchData.currentBalls++;

if (matchData.currentBalls >= 6) { matchData.overs++; matchData.currentBalls = 0; rotateStrike(); changeBowler(); } updateScoringUI(); }

function rotateStrike() { let temp = matchData.striker; matchData.striker = matchData.nonStriker; matchData.nonStriker = temp; }

function changeBowler() { const newName = prompt("Enter new bowler name:"); if (newName) { matchData.bowler = { name: newName, runs: 0, wickets: 0, balls: 0 }; } }

function wicketFall() { matchData.wickets++; matchData.bowler.wickets++; matchData.striker.balls++; matchData.bowler.balls++; matchData.currentBalls++;

if (matchData.currentBalls >= 6) { matchData.overs++; matchData.currentBalls = 0; rotateStrike(); changeBowler(); }

const newBatsman = prompt("Enter new batsman name:"); if (newBatsman) { matchData.striker = { name: newBatsman, runs: 0, balls: 0 }; } updateScoringUI(); }

function getRunRate() { const balls = matchData.overs * 6 + matchData.currentBalls; return balls ? (matchData.totalRuns / (balls / 6)).toFixed(2) : "0.00"; }

function endMatch() { const potm = getPlayerOfMatch(); const summary = Final Score: ${matchData.totalRuns}/${matchData.wickets}\nPlayer of the Match: ${potm.name};

matchData.matches.push({ teams: ${matchData.teamA} vs ${matchData.teamB}, score: ${matchData.totalRuns}/${matchData.wickets}, potm: potm.name, });

document.getElementById("match-summary").innerHTML = <h2>Match Summary</h2><p>${summary}</p>; showScreen("match-summary"); }

function getPlayerOfMatch() { const strikerPoints = matchData.striker.runs * 2; const nonStrikerPoints = matchData.nonStriker.runs * 2; const bowlerPoints = matchData.bowler.wickets * 20 - matchData.bowler.runs;

if (strikerPoints >= nonStrikerPoints && strikerPoints >= bowlerPoints) return matchData.striker; if (nonStrikerPoints >= strikerPoints && nonStrikerPoints >= bowlerPoints) return matchData.nonStriker; return matchData.bowler; }

function viewMatchHistory() { const history = matchData.matches.map( (m, i) => <p><strong>Match ${i + 1}</strong>: ${m.teams}<br>Score: ${m.score}<br>Player of Match: ${m.potm}</p> ).join("<hr>"); document.getElementById("match-history").innerHTML = <h2>Match History</h2>${history}; showScreen("match-history"); }

  
