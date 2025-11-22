// --------------------
// Demo data (frontend only). Backend should send `prevRank` and `photo` fields.
// Replace these arrays with your API responses.
// --------------------
const enigmaOverall = [
  { rank:1, prevRank:3, reg:"CS20B101", name:"Aarav S", year:"II", team:"CipherCrew", score:510, photo:"img/p1.jpg" },
  { rank:2, prevRank:1, reg:"CS19B202", name:"Diya R", year:"III", team:"AlgoMatrix", score:495, photo:"img/p2.jpg" },
  { rank:3, prevRank:2, reg:"CS18B303", name:"Vishal K", year:"IV", team:"NeuralEdge", score:480, photo:"img/p3.jpg" },
  { rank:4, prevRank:4, reg:"CS21B404", name:"Kavya M", year:"II", team:"VisionX", score:470, photo:"img/p4.jpg" },
  { rank:5, prevRank:8, reg:"CS19B505", name:"Harish P", year:"III", team:"DataSmiths", score:455, photo:"img/p5.jpg" },
  { rank:6, prevRank:6, reg:"CS22B606", name:"Nandhini T", year:"I", team:"QuantumBits", score:440, photo:"img/p6.jpg" },
  { rank:7, prevRank:5, reg:"CS20B707", name:"Pranav G", year:"II", team:"TechTitans", score:430, photo:"img/p7.jpg" },
  { rank:8, prevRank:9, reg:"CS18B808", name:"Ritika S", year:"IV", team:"ByteForce", score:420, photo:"img/p8.jpg" },
  { rank:9, prevRank:7, reg:"CS19B909", name:"Santhosh R", year:"III", team:"ModelMinds", score:408, photo:"img/p9.jpg" },
  { rank:10, prevRank:10, reg:"CS21B010", name:"Meenakshi P", year:"II", team:"CodeWave", score:400, photo:"img/p10.jpg" }
];

const codeEnigma = [
  { rank:1, prevRank:2, name:"Aarav S", solved:18, score:260, photo:"img/p1.jpg" },
  { rank:2, prevRank:1, name:"AlgoQueen", solved:17, score:250, photo:"img/p2.jpg" },
  { rank:3, prevRank:4, name:"CoderX", solved:16, score:240, photo:"img/p3.jpg" },
  { rank:4, prevRank:3, name:"BinaryBeast", solved:14, score:230, photo:"img/p4.jpg" },
  { rank:5, prevRank:6, name:"ScriptLord", solved:13, score:220, photo:"img/p5.jpg" },
  { rank:6, prevRank:5, name:"Devisha", solved:12, score:210, photo:"img/p6.jpg" },
  { rank:7, prevRank:8, name:"Nishanth", solved:11, score:205, photo:"img/p7.jpg" },
  { rank:8, prevRank:7, name:"ByteGuru", solved:10, score:200, photo:"img/p8.jpg" },
  { rank:9, prevRank:10, name:"NeuralNinja", solved:9, score:190, photo:"img/p9.jpg" },
  { rank:10, prevRank:9, name:"OmegaCoder", solved:9, score:185, photo:"img/p10.jpg" }
];

const genesysProjects = [
  { rank:1, prevRank:2, project:"Project Nova", lead:"Arun", year:"III", members:"Arun, Ria", score:520, photo:"img/p1.jpg" },
  { rank:2, prevRank:1, project:"AquaSense", lead:"Divya", year:"II", members:"Divya, Kavin", score:505, photo:"img/p2.jpg" },
  { rank:3, prevRank:3, project:"MedScan AI", lead:"Ragul", year:"IV", members:"Ragul, Surya", score:490, photo:"img/p3.jpg" },
  { rank:4, prevRank:5, project:"EcoVision", lead:"Ishika", year:"III", members:"Ishika, Roshan", score:475, photo:"img/p4.jpg" },
  { rank:5, prevRank:4, project:"AgroBot", lead:"Manoj", year:"II", members:"Manoj, Karthik", score:468, photo:"img/p5.jpg" },
  { rank:6, prevRank:6, project:"SafeRoute", lead:"Priya", year:"I", members:"Priya, Rithik", score:460, photo:"img/p6.jpg" },
  { rank:7, prevRank:8, project:"SmartBin", lead:"Sahana", year:"III", members:"Sahana, Akash", score:452, photo:"img/p7.jpg" },
  { rank:8, prevRank:7, project:"HeartGuard", lead:"Jeevan", year:"IV", members:"Jeevan, Varun", score:445, photo:"img/p8.jpg" },
  { rank:9, prevRank:9, project:"RiskPredict", lead:"Harini", year:"II", members:"Harini, Naveen", score:430, photo:"img/p9.jpg" },
  { rank:10, prevRank:10, project:"GreenPulse", lead:"Ajay", year:"III", members:"Ajay, Shreya", score:420, photo:"img/p10.jpg" }
];

const enigmaOrganizers = ["XXX (III Year)", "YYY (II Year)", "ZZZ (I Year)"];
const genesysOrganizers = ["Alpha (III Year)", "Beta (II Year)"];
const winners = ["AAA", "Project Nova", "CoderX"];

// ------------------------------
// Helper: get rank-change HTML
// ------------------------------
function getRankChangeHTML(curr, prev) {
  if (typeof prev === 'undefined' || prev === null) return `<span class="rank-same">-</span>`;
  if (prev > curr) {
    return `<span class="rank-change rank-up">▲ ${prev - curr}</span>`;
  } else if (prev < curr) {
    return `<span class="rank-change rank-down">▼ ${curr - prev}</span>`;
  } else {
    return `<span class="rank-same">-</span>`;
  }
}

// ------------------------------
// Render functions (preserve your structure)
// ------------------------------
function renderEnigmaOverall() {
  const tbody = document.getElementById("enigmaOverallBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  enigmaOverall.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.rank}</td>
      <td><div class="sub muted small">${r.reg || ''}</div></td>
      <td>
        <div class="name-title">
          <img class="avatar" src="${r.photo}" alt="${r.name}"/>
          <div>
            <div style="font-weight:800">${r.name}</div>
            <div class="sub">${r.team}</div>
          </div>
        </div>
      </td>
      <td>${r.year}</td>
      <td>${r.score}</td>
      <td>${getRankChangeHTML(r.rank, r.prevRank)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCodeEnigma() {
  const tbody = document.getElementById("codeEnigmaBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  codeEnigma.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.rank}</td>
      <td>
        <div class="name-title">
          <img class="avatar" src="${r.photo}" alt="${r.name}"/>
          <div>${r.name}</div>
        </div>
      </td>
      <td>${r.solved} solved</td>
      <td>${r.score}</td>
      <td>${getRankChangeHTML(r.rank, r.prevRank)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderGenesys() {
  const tbody = document.getElementById("genesysBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  genesysProjects.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.rank}</td>
      <td>
        <div class="name-title">
          <img class="avatar" src="${r.photo}" alt="${r.project}"/>
          <div>
            <div style="font-weight:800">${r.project}</div>
            <div class="sub">Lead: ${r.lead}</div>
          </div>
        </div>
      </td>
      <td>${r.year}</td>
      <td>${r.members}</td>
      <td>${r.score}</td>
      <td>${getRankChangeHTML(r.rank, r.prevRank)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderOrganizers() {
  const a = document.getElementById("enigmaOrganizers");
  const b = document.getElementById("genesysOrganizers");
  const w = document.getElementById("rightWinners");
  if (a) a.innerHTML = enigmaOrganizers.map(x=>`<li>${x}</li>`).join("");
  if (b) b.innerHTML = genesysOrganizers.map(x=>`<li>${x}</li>`).join("");
  if (w) w.innerHTML = winners.map(x=>`<li>${x}</li>`).join("");
}

// initial render
renderEnigmaOverall();
renderCodeEnigma();
renderGenesys();
renderOrganizers();

// ------------------------------
// Tabs (preserve your logic)
// ------------------------------
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const t = btn.dataset.tab;
    document.getElementById('enigmaSection').style.display = (t==='enigma') ? '' : 'none';
    document.getElementById('genesysSection').style.display = (t==='genesys') ? '' : 'none';
  });
});

// mini tabs inside enigma
document.querySelectorAll('.mini-tab').forEach(mt=>{
  mt.addEventListener('click', ()=>{
    document.querySelectorAll('.mini-tab').forEach(m=>m.classList.remove('active'));
    mt.classList.add('active');
    const m = mt.dataset.mini;
    document.getElementById('overallContent').style.display = (m==='overall') ? '' : 'none';
    document.getElementById('codeenigmaContent').style.display = (m==='codeenigma') ? '' : 'none';
  });
});

// batch toggle (first / non-first)
document.querySelectorAll('.batch-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.batch-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    // TODO: filter the tables (call backend or filter arrays)
    console.log('Batch filter set:', b.dataset.batch);
  });
});

document.getElementById('refreshBtn').addEventListener('click', ()=>{
  // placeholder for re-fetch
  renderEnigmaOverall(); renderCodeEnigma(); renderGenesys(); renderOrganizers();
});

// ------------------------------
// Search (simple client-side filter)
// ------------------------------
const searchInput = document.getElementById('globalSearch');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    // filter enigmaOverall example — adjust to re-fetch in production
    const filtered = enigmaOverall.filter(x => {
      return x.name.toLowerCase().includes(q) || (x.team && x.team.toLowerCase().includes(q)) || (x.reg && x.reg.toLowerCase().includes(q));
    });
    const tbody = document.getElementById("enigmaOverallBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    filtered.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.rank}</td>
        <td>${r.reg || ''}</td>
        <td>
          <div class="name-title">
            <img class="avatar" src="${r.photo}" alt="${r.name}"/>
            <div>
              <div style="font-weight:800">${r.name}</div>
              <div class="sub">${r.team}</div>
            </div>
          </div>
        </td>
        <td>${r.year}</td>
        <td>${r.score}</td>
        <td>${getRankChangeHTML(r.rank, r.prevRank)}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}

// ------------------------------
// THEME: persist preference in localStorage
// ------------------------------
const themeBtn = document.getElementById('themeBtn');
const currentTheme = localStorage.getItem('aids_theme');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (themeBtn) themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (themeBtn) themeBtn.textContent = '🌙';
  }
}

applyTheme(currentTheme || 'light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('aids_theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  });
}
