import staticData from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    // Inicializar controles del marcador
    initMatchControls();

    // Cargar historial de partidos
    loadMatchHistory();

    // Configurar selector de partidos
    initMatchSelector();
});

function initMatchControls() {
    // Variables de estado del partido
    let matchTime = 0;
    let matchInterval;
    let isMatchRunning = false;
    let homeScore = 0;
    let awayScore = 0;
    let currentMatchEvents = [];

    // Eventos de los botones de control
    document
        .getElementById("start-match")
        .addEventListener("click", startMatch);
    document
        .getElementById("pause-match")
        .addEventListener("click", pauseMatch);
    document.getElementById("end-match").addEventListener("click", endMatch);
    document
        .getElementById("add-event")
        .addEventListener("click", addMatchEvent);

    function startMatch() {
        if (!isMatchRunning) {
            isMatchRunning = true;
            matchInterval = setInterval(() => {
                matchTime++;
                updateMatchTime();
            }, 1000); // Cada segundo representa 1 minuto de partido
        }
    }

    function pauseMatch() {
        if (isMatchRunning) {
            isMatchRunning = false;
            clearInterval(matchInterval);
        }
    }

    function endMatch() {
        pauseMatch();

        // Guardar el partido simulado
        const newMatch = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            homeTeam: "halcones",
            awayTeam: "aguilas",
            competition: "torneo_ap",
            result: `${homeScore}-${awayScore}`,
            events: [...currentMatchEvents],
        };

        staticData.matches.unshift(newMatch);

        // Actualizar historial
        loadMatchHistory();

        // Mostrar confirmación
        showMatchResult(newMatch);

        // Reiniciar marcador
        resetMatch();
    }

    function showMatchResult(match) {
        const homeTeam = staticData.teams.find((t) => t.id === match.homeTeam);
        const awayTeam = staticData.teams.find((t) => t.id === match.awayTeam);

        const resultHTML = `
            <div class="match-result">
                <h3>Partido Finalizado</h3>
                <div class="result-teams">
                    <div class="result-team">
                        <img src="${homeTeam.logo}" alt="${homeTeam.name}">
                        <span>${homeTeam.name}</span>
                        <strong>${match.result.split("-")[0]}</strong>
                    </div>
                    <div class="result-team">
                        <img src="${awayTeam.logo}" alt="${awayTeam.name}">
                        <span>${awayTeam.name}</span>
                        <strong>${match.result.split("-")[1]}</strong>
                    </div>
                </div>
                <button id="close-result" class="btn btn-primary">Aceptar</button>
            </div>
        `;

        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = resultHTML;
        document.body.appendChild(overlay);

        document
            .getElementById("close-result")
            .addEventListener("click", () => {
                document.body.removeChild(overlay);
            });
    }

    function resetMatch() {
        matchTime = 0;
        homeScore = 0;
        awayScore = 0;
        currentMatchEvents = [];
        updateScoreDisplay();
        updateMatchTime();
        document.getElementById("events-list").innerHTML = "";
    }

    function updateMatchTime() {
        const minutes = matchTime % 90; // Partido de 90 minutos
        document.getElementById("current-minute").textContent = `${minutes}'`;

        // Si llega al final del partido
        if (minutes >= 90) {
            endMatch();
        }
    }

    function updateScoreDisplay() {
        document.getElementById("home-score").textContent = homeScore;
        document.getElementById("away-score").textContent = awayScore;
    }

    function addMatchEvent() {
        const eventType = document.getElementById("event-type").value;
        const eventTeam = document.getElementById("event-team").value;
        const playerName =
            document.getElementById("event-player").value.trim() ||
            "Jugador desconocido";

        if (!isMatchRunning) {
            alert(
                "El partido no está en juego. Inicia el partido para agregar eventos."
            );
            return;
        }

        const currentTime =
            document.getElementById("current-minute").textContent;
        const eventsList = document.getElementById("events-list");
        const newEvent = document.createElement("li");

        let eventText = "";
        let teamName = eventTeam === "home" ? "Los Halcones" : "Águilas FC";
        let eventData = {
            time: currentTime,
            type: eventType,
            team: eventTeam,
            player: playerName,
        };

        switch (eventType) {
            case "goal":
                eventText = `<span class="event-type goal">⚽ Gol</span> - ${teamName} (${playerName})`;
                // Actualizar marcador
                if (eventTeam === "home") {
                    homeScore++;
                } else {
                    awayScore++;
                }
                updateScoreDisplay();
                break;
            case "yellow":
                eventText = `<span class="event-type yellow">🟨 Amarilla</span> - ${teamName} (${playerName})`;
                break;
            case "red":
                eventText = `<span class="event-type red">🟥 Roja</span> - ${teamName} (${playerName})`;
                break;
            case "sub":
                eventText = `<span class="event-type sub">🔄 Cambio</span> - ${teamName} (${playerName})`;
                break;
        }

        newEvent.innerHTML = `<span class="event-time">${currentTime}</span> ${eventText}`;
        eventsList.prepend(newEvent);
        currentMatchEvents.unshift(eventData);

        // Limpiar campos del formulario
        document.getElementById("event-player").value = "";
    }
}

function initMatchSelector() {
    const matchSelect = document.getElementById("match-select");

    // Limpiar opciones existentes
    matchSelect.innerHTML = '<option value="">Seleccione un partido</option>';

    // Agregar partidos
    staticData.matches.forEach((match) => {
        const homeTeam = staticData.teams.find((t) => t.id === match.homeTeam);
        const awayTeam = staticData.teams.find((t) => t.id === match.awayTeam);

        const option = document.createElement("option");
        option.value = match.id;
        option.textContent = `${homeTeam.name} vs ${awayTeam.name} - ${match.date}`;
        matchSelect.appendChild(option);
    });

    // Manejar cambio de partido
    matchSelect.addEventListener("change", function () {
        if (this.value) {
            const match = staticData.matches.find(
                (m) => m.id === parseInt(this.value)
            );
            if (match) {
                showMatchDetails(match);
            }
        }
    });
}

function loadMatchHistory() {
    const historyContainer = document.getElementById("match-history");
    historyContainer.innerHTML = "";

    staticData.matches.slice(0, 10).forEach((match) => {
        // Mostrar últimos 10 partidos
        const homeTeam = staticData.teams.find((t) => t.id === match.homeTeam);
        const awayTeam = staticData.teams.find((t) => t.id === match.awayTeam);
        const competition = staticData.competitions.find(
            (c) => c.id === match.competition
        );

        const matchElement = document.createElement("div");
        matchElement.className = "history-match";
        matchElement.innerHTML = `
            <div class="match-teams">
                <div class="match-team">
                    <img src="${homeTeam.logo}" alt="${homeTeam.name}">
                    <span>${homeTeam.name}</span>
                </div>
                <div class="match-score ${
                    match.result.split("-")[0] > match.result.split("-")[1]
                        ? "winner"
                        : ""
                }">
                    ${match.result.split("-")[0]}
                </div>
                <div class="match-vs">vs</div>
                <div class="match-score ${
                    match.result.split("-")[1] > match.result.split("-")[0]
                        ? "winner"
                        : ""
                }">
                    ${match.result.split("-")[1]}
                </div>
                <div class="match-team">
                    <img src="${awayTeam.logo}" alt="${awayTeam.name}">
                    <span>${awayTeam.name}</span>
                </div>
            </div>
            <div class="match-details">
                <span>${competition.name}</span>
                <span>${match.date}</span>
                <button class="btn btn-small btn-view" data-match="${
                    match.id
                }">Ver Detalles</button>
            </div>
        `;

        matchElement
            .querySelector(".btn-view")
            .addEventListener("click", () => {
                showMatchDetails(match);
            });

        historyContainer.appendChild(matchElement);
    });
}

function showMatchDetails(match) {
    const homeTeam = staticData.teams.find((t) => t.id === match.homeTeam);
    const awayTeam = staticData.teams.find((t) => t.id === match.awayTeam);
    const competition = staticData.competitions.find(
        (c) => c.id === match.competition
    );

    const detailsHTML = `
        <div class="match-details-modal">
            <h3>Detalles del Partido</h3>
            <div class="match-header">
                <div class="match-team">
                    <img src="${homeTeam.logo}" alt="${homeTeam.name}">
                    <h4>${homeTeam.name}</h4>
                </div>
                <div class="match-result">
                    ${match.result}
                </div>
                <div class="match-team">
                    <img src="${awayTeam.logo}" alt="${awayTeam.name}">
                    <h4>${awayTeam.name}</h4>
                </div>
            </div>
            
            <div class="match-info">
                <p><strong>Competencia:</strong> ${competition.name}</p>
                <p><strong>Fecha:</strong> ${match.date}</p>
                <p><strong>Estadio:</strong> ${homeTeam.stadium}</p>
            </div>
            
            <div class="match-events">
                <h4>Eventos del Partido</h4>
                ${
                    match.events && match.events.length > 0
                        ? `<ul>${match.events
                              .map(
                                  (event) => `
                        <li>
                            <span class="event-time">${event.time}</span>
                            <span class="event-type ${event.type}">
                                ${getEventIcon(event.type)}
                            </span>
                            ${
                                event.team === "home"
                                    ? homeTeam.name
                                    : awayTeam.name
                            } (${event.player})
                        </li>
                    `
                              )
                              .join("")}</ul>`
                        : "<p>No hay eventos registrados para este partido.</p>"
                }
            </div>
            
            <button id="close-details" class="btn btn-primary">Cerrar</button>
        </div>
    `;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = detailsHTML;
    document.body.appendChild(overlay);

    document.getElementById("close-details").addEventListener("click", () => {
        document.body.removeChild(overlay);
    });
}

function getEventIcon(eventType) {
    switch (eventType) {
        case "goal":
            return "⚽ Gol";
        case "yellow":
            return "🟨 Amarilla";
        case "red":
            return "🟥 Roja";
        case "sub":
            return "🔄 Cambio";
        default:
            return "🔹 Evento";
    }
}
