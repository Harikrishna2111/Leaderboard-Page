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
