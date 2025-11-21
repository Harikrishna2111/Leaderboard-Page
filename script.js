<<<<<<< HEAD
function showTab(tabName) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add("active");

    document.querySelectorAll(".leaderboard").forEach(lb => lb.classList.add("hidden"));
    document.getElementById(tabName).classList.remove("hidden");
}

function autoFillName() {
    let reg = document.getElementById("reg").value;
    let nameField = document.getElementById("name");

    const students = {
        "720721104001": "Rahul Kumar",
        "720721104002": "Deepika M",
        "720721104003": "Vinitha S"
    };

    nameField.value = students[reg] || "";
}

function addPoints() {
    alert("Points added (dummy function).");
}
=======
// 10 STUDENTS — SAMPLE DATA FOR TESTING

const enigmaOverall = [
  { rank:1, name:"Arun Kumar", year:"I", team:"ByteBenders", score:520 },
  { rank:2, name:"Deepika M", year:"II", team:"CodeMatrix", score:498 },
  { rank:3, name:"Vignesh P", year:"III", team:"BluePhoenix", score:470 },
  { rank:4, name:"Harini S", year:"II", team:"VisionX", score:460 },
  { rank:5, name:"Rahul S", year:"I", team:"CodeHunt", score:440 },
  { rank:6, name:"Jeeva A", year:"IV", team:"DataMinds", score:430 },
  { rank:7, name:"Kavin R", year:"III", team:"AlgoDynamos", score:410 },
  { rank:8, name:"Sneha L", year:"I", team:"NovaTech", score:395 },
  { rank:9, name:"Rithik M", year:"II", team:"TechBlaze", score:380 },
  { rank:10, name:"Ananya R", year:"III", team:"ScriptForge", score:365 }
];

const codeEnigma = [
  { rank:1, name:"Arun Kumar", solved:18, score:240 },
  { rank:2, name:"Deepika M", solved:15, score:230 },
  { rank:3, name:"Vignesh P", solved:14, score:210 },
  { rank:4, name:"Harini S", solved:13, score:205 },
  { rank:5, name:"Rahul S", solved:12, score:200 },
  { rank:6, name:"Jeeva A", solved:11, score:188 },
  { rank:7, name:"Kavin R", solved:10, score:175 },
  { rank:8, name:"Sneha L", solved:9, score:160 },
  { rank:9, name:"Rithik M", solved:8, score:150 },
  { rank:10, name:"Ananya R", solved:8, score:148 }
];

const genesysProjects = [
  { rank:1, project:"AquaSense", lead:"Arun Kumar", year:"III", members:"Arun, Deepika", score:540 },
  { rank:2, project:"SmartBus Tracker", lead:"Vignesh P", year:"II", members:"Vignesh, Rahul", score:520 },
  { rank:3, project:"DiseasePredict AI", lead:"Harini S", year:"III", members:"Harini, Sneha", score:505 },
  { rank:4, project:"CropCare ML", lead:"Rahul S", year:"I", members:"Rahul, Ananya", score:490 },
  { rank:5, project:"AeroVision Drone", lead:"Jeeva A", year:"IV", members:"Jeeva, Kavin", score:480 },
  { rank:6, project:"Vehicular AI", lead:"Ananya R", year:"III", members:"Ananya, Divya", score:470 },
  { rank:7, project:"Smart Classroom IoT", lead:"Kavin R", year:"III", members:"Kavin, Rithik", score:465 },
  { rank:8, project:"WasteSeg System", lead:"Sneha L", year:"I", members:"Sneha, Priya", score:450 },
  { rank:9, project:"WaterSaver ML", lead:"Rithik M", year:"II", members:"Rithik, Hari", score:430 },
  { rank:10, project:"PowerPredictor", lead:"Deepika M", year:"II", members:"Deepika, Vishwa", score:420 }
];

const enigmaOrganizers = [
  "Arun Kumar (III Year)",
  "Deepika M (II Year)",
  "Vignesh P (III Year)",
  "Harini S (II Year)",
  "Rahul S (I Year)"
];

const genesysOrganizers = [
  "Jeeva A (IV Year)",
  "Kavin R (III Year)",
  "Sneha L (I Year)"
];

const winners = [
  "Arun Kumar — Enigma",
  "AquaSense — Genesys",
  "Arun Kumar — CodeEnigma"
];
>>>>>>> b32ecf55093a590a399e9a9aba76c9ed5c868e3e
