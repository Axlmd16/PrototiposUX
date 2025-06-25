// scripts/live-match.js
// Tab functionality
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Simulate match events
document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");
    const events = [
        {
            time: "15'",
            type: "goal",
            player: "K. Benzema",
            text: "¡GOL! Remate de cabeza tras un centro.",
        },
        {
            time: "28'",
            type: "yellow-card",
            player: "Pedri",
            text: "Tarjeta amarilla por falta táctica.",
        },
        {
            time: "44'",
            type: "goal",
            player: "R. Lewandowski",
            text: "¡GOL! Anota de penalti.",
        },
        {
            time: "76'",
            type: "goal",
            player: "Vinícius Jr.",
            text: "¡GOL! Define en el uno contra uno.",
        },
        {
            time: "82'",
            type: "substitution",
            player: "Sale: L. Modrić, Entra: D. Ceballos",
            text: "Cambio para refrescar el mediocampo.",
        },
    ];

    events.forEach((event) => {
        const li = document.createElement("li");
        li.className = `timeline-item ${event.type}`;
        li.innerHTML = `
            <div class="timeline-time">${event.time}</div>
            <div class="timeline-content">
                <strong>${event.player}</strong>
                <p>${event.text}</p>
            </div>
        `;
        timeline.appendChild(li);
    });

    // Simulate clock
    let minute = 82;
    const minuteElement = document.getElementById("minute");
    setInterval(() => {
        if (minute < 95) {
            // Stop after 95 mins
            minute++;
            minuteElement.textContent = `${minute}'`;
        }
    }, 60000); // Update every minute
});
