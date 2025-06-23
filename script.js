// Splash screen delay window.onload = () => { setTimeout(() => { document.getElementById('splash-screen').classList.add('hidden'); document.getElementById('home-screen').classList.remove('hidden'); }, 3000); };

// State variables let score = 0; let wickets = 0; let balls = 0; let oversLimit = 0; let striker = ""; let nonStriker = ""; let bowler = ""; let teamA = ""; let teamB = ""; let tossWinner = ""; let tossDecision = ""; let isFirstInnings = true; let firstInningsScore = 0; let history = []; let matchHistory = [];

// Navigation function showTeamSetup() { document.getElementById('home-screen').classList.add('hidden'); document.getElementById('setup-screen').classList.remove('hidden'); }

function showMatchHistory() { let historyHTML = matchHistory.map((match, index) => <div style="margin-bottom: 10px; padding: 10px; background: #f0f0f0; border-radius: 10px;"> <strong>Match ${index + 1}</strong><br> ${match.summary}<br> <small>Player of the Match: ${match.potm}</small> </div>).join('');

if (!historyHTML) historyHTML = "No match history yet.";

const popup = document.createElement('div'); popup.style.position = 'fixed'; popup.style.top = '50%'; popup.style.left = '50%'; popup.style.transform = 'translate(-50%, -50%)'; popup.style.background = '#fff'; popup.style.padding = '20px'; popup.style.borderRadius = '12px'; popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)'; popup.innerHTML = <h3>Match History</h3> ${historyHTML} <button onclick="this.parentElement.remove()" style="margin-top: 15px; background: #6a1b9a; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Close</button>; document.body.appendChild(popup); }

function goHome() { document.getElementById('match-summary').classList.add('hidden'); document.getElementById('home-screen').classList.remove('hidden'); }

// Match setup const setupForm = document.getElementById("setup-form"); setupForm.addEventListener("submit", function(e) { e.preventDefault();

teamA = document.getElementById("teamA").value; teamB = document.getElementById("teamB").value; striker = document.getElementById("striker").value; nonStriker = document.getElementById("nonStriker").value; bowler = document.getElementById("bowler").value; oversLimit = parseInt(document.getElementById("totalOvers").value); tossWinner = document.getElementById("tossWinner").value; tossDecision = document.getElementById("tossDecision").value;

document.getElementById('setup-screen').classList.add('hidden'); document.getElementById('scoring-screen').classList.remove('hidden'); updateScoreboard(); });

function updateScoreboard() { const overs = ${Math.floor(balls / 6)}.${balls % 6}; const runRate = (balls === 0) ? 0 : (score / (balls / 6)).toFixed(2); document.getElementById("score").innerText = Score: ${score}/${wickets}; document.getElementById("overs").innerText = Overs: ${overs}; document.getElementById("runRate").innerText = Run Rate: ${runRate}; document.getElementById("batsmen-info").innerHTML = <p><strong>Striker:</strong> ${striker}</p> <p><strong>Non-Striker:</strong> ${nonStriker}</p> <p><strong>Bowler:</strong> ${bowler}</p>; }

function addRun(runs) { score += runs; balls++; history.push({ score, wickets, balls }); checkOverOrInnings(); updateScoreboard(); }

function addWicket() { wickets++; balls++; history.push({ score, wickets, balls }); checkOverOrInnings(); updateScoreboard(); }

function addWide() { score++; history.push({ score, wickets, balls }); updateScoreboard(); }

function addNoBall() { score++; history.push({ score, wickets, balls }); updateScoreboard(); }

function undoLastAction() { if (history.length > 0) { history.pop(); const last = history[history.length - 1] || { score: 0, wickets: 0, balls: 0 }; score = last.score; wickets = last.wickets; balls = last.balls; updateScoreboard(); } }

function checkOverOrInnings() { if (balls / 6 >= oversLimit || wickets >= 10) { if (isFirstInnings) { firstInningsScore = score; resetForSecondInnings(); } else { showResult(); } } }

function resetForSecondInnings() { alert("First Innings Over. Second Innings will start now."); isFirstInnings = false; score = 0; wickets = 0; balls = 0; updateScoreboard(); }

function showResult() { document.getElementById("scoring-screen").classList.add("hidden"); document.getElementById("match-summary").classList.remove("hidden");

let resultText = ""; let winner = "";

if (score > firstInningsScore) { winner = (tossDecision === 'bat' ? teamB : teamA); resultText = ${winner} won by ${10 - wickets} wickets.; } else if (score < firstInningsScore) { winner = (tossDecision === 'bat' ? teamA : teamB); const runDiff = firstInningsScore - score; resultText = ${winner} won by ${runDiff} runs.; } else { resultText = "Match Tied!"; }

document.getElementById("result").innerText = resultText; document.getElementById("scorecard").innerText = 1st Innings: ${firstInningsScore} 2nd Innings: ${score}/${wickets}; document.getElementById("playerOfMatch").innerText = Player of the Match: ${striker};

matchHistory.push({ summary: resultText, potm: striker }); }

function downloadPDF() { alert("PDF download feature coming soon."); }

