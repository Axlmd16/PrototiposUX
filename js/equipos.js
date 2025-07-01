import staticData from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    // Inicializar selector de equipos
    initTeamSelector();

    // Cargar primer equipo por defecto
    if (staticData.teams.length > 0) {
        loadTeamData(staticData.teams[0].id);
    }
});

function initTeamSelector() {
    const teamSelect = document.getElementById("team-select");

    // Limpiar opciones existentes
    teamSelect.innerHTML = '<option value="">Seleccione un equipo</option>';

    // Agregar equipos
    staticData.teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.id;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    // Manejar cambio de equipo
    teamSelect.addEventListener("change", function () {
        loadTeamData(this.value);
    });
}

function loadTeamData(teamId) {
    const team = staticData.teams.find((t) => t.id === teamId);
    if (!team) return;

    // Actualizar información básica
    document.getElementById("team-name").textContent = team.name;
    document.getElementById("team-coach").querySelector("span").textContent =
        team.coach;
    document.getElementById("team-founded").querySelector("span").textContent =
        team.founded;
    document.getElementById("team-stadium").querySelector("span").textContent =
        team.stadium;
    document.getElementById("team-capacity").querySelector("span").textContent =
        team.capacity.toLocaleString();
    document.querySelector(".team-logo").src = team.logo;

    // Actualizar estadísticas
    updateTeamStats(team.stats);

    // Actualizar competencias
    updateTeamCompetitions(team.currentCompetitions);

    // Actualizar plantilla
    updateTeamPlayers(team.id);

    // Actualizar partidos recientes
    updateTeamMatches(team.id);

    // Actualizar gráficos
    updateTeamCharts(team.stats);
}

function updateTeamStats(stats) {
    document
        .querySelectorAll(".team-stats .stat-item")[0]
        .querySelector(".stat-value").textContent = stats.matches;
    document
        .querySelectorAll(".team-stats .stat-item")[1]
        .querySelector(".stat-value").textContent = stats.wins;
    document
        .querySelectorAll(".team-stats .stat-item")[2]
        .querySelector(".stat-value").textContent = stats.draws;
    document
        .querySelectorAll(".team-stats .stat-item")[3]
        .querySelector(".stat-value").textContent = stats.losses;
    document
        .querySelectorAll(".team-stats .stat-item")[4]
        .querySelector(".stat-value").textContent = stats.goalsFor;
    document
        .querySelectorAll(".team-stats .stat-item")[5]
        .querySelector(".stat-value").textContent = stats.goalsAgainst;
    document
        .querySelectorAll(".team-stats .stat-item")[6]
        .querySelector(".stat-value").textContent = stats.cleanSheets;
    document
        .querySelectorAll(".team-stats .stat-item")[7]
        .querySelector(".stat-value").textContent = stats.yellowCards;
    document
        .querySelectorAll(".team-stats .stat-item")[8]
        .querySelector(".stat-value").textContent = stats.redCards;
}

function updateTeamCompetitions(competitionIds) {
    const competitionsContainer = document.getElementById("team-competitions");
    competitionsContainer.innerHTML = "";

    competitionIds.forEach((compId) => {
        const comp = staticData.competitions.find((c) => c.id === compId);
        if (comp) {
            const compElement = document.createElement("div");
            compElement.className = "competition-item";
            compElement.innerHTML = `
                <h5>${comp.name}</h5>
                <p>Temporada ${comp.season}</p>
                <p class="${comp.current ? "current-comp" : ""}">
                    ${comp.current ? "En curso" : "Finalizado"}
                </p>
            `;
            competitionsContainer.appendChild(compElement);
        }
    });
}

function updateTeamPlayers(teamId) {
    const playersContainer = document.getElementById("team-players");
    playersContainer.innerHTML = "";

    const teamPlayers = staticData.players.filter(
        (player) => player.team === teamId
    );

    if (teamPlayers.length === 0) {
        playersContainer.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-users"></i>
                <p>No hay jugadores registrados en este equipo</p>
                <button class="btn btn-primary btn-sm">Agregar Jugadores</button>
            </div>
        `;
        return;
    }

    teamPlayers.forEach((player) => {
        const playerElement = document.createElement("div");
        playerElement.className = "team-player";
        playerElement.innerHTML = `
            <img src="${player.photo}" alt="${player.name}" class="player-thumb">
            <div class="player-details">
                <h5>${player.name}</h5>
                <p>${player.position} · #${player.number}</p>
                <div class="player-stats-short">
                    <span>G: ${player.stats.total.goals}</span>
                    <span>A: ${player.stats.total.assists}</span>
                </div>
            </div>
        `;
        playerElement.addEventListener("click", () => {
            // Cambiar a la sección de jugadores y cargar este jugador
            document
                .querySelector(`.main-nav a[data-section="jugadores"]`)
                .click();
            setTimeout(() => loadPlayerData(player.id), 100);
        });
        playersContainer.appendChild(playerElement);
    });
}

function updateTeamMatches(teamId) {
    const matchesContainer = document.getElementById("team-matches");
    matchesContainer.innerHTML = "";

    const teamMatches = staticData.matches
        .filter(
            (match) => match.homeTeam === teamId || match.awayTeam === teamId
        )
        .slice(0, 5); // Últimos 5 partidos

    if (teamMatches.length === 0) {
        matchesContainer.innerHTML =
            '<p class="no-matches">No hay partidos recientes</p>';
        return;
    }

    teamMatches.forEach((match) => {
        const matchElement = document.createElement("div");
        matchElement.className = "team-match";

        const homeTeam = staticData.teams.find((t) => t.id === match.homeTeam);
        const awayTeam = staticData.teams.find((t) => t.id === match.awayTeam);
        const competition = staticData.competitions.find(
            (c) => c.id === match.competition
        );

        matchElement.innerHTML = `
            <div class="match-teams">
                <div class="match-team ${
                    match.homeTeam === teamId ? "current-team" : ""
                }">
                    <img src="${homeTeam.logo}" alt="${homeTeam.name}">
                    <span>${homeTeam.name}</span>
                </div>
                <div class="match-score">
                    ${match.result}
                </div>
                <div class="match-team ${
                    match.awayTeam === teamId ? "current-team" : ""
                }">
                    <img src="${awayTeam.logo}" alt="${awayTeam.name}">
                    <span>${awayTeam.name}</span>
                </div>
            </div>
            <div class="match-details">
                <span>${competition.name}</span>
                <span>${match.date}</span>
            </div>
        `;

        matchesContainer.appendChild(matchElement);
    });
}

function updateTeamCharts(stats) {
    // Gráfico de goles
    const goalsChart = Chart.getChart("team-goals-chart");
    if (goalsChart) {
        goalsChart.data.datasets[0].data = [
            stats.goalsFor,
            stats.goalsAgainst,
            stats.goalsFor - stats.goalsAgainst,
        ];
        goalsChart.update();
    }

    // Gráfico de posesión
    const possessionChart = Chart.getChart("team-possession-chart");
    if (possessionChart) {
        possessionChart.data.datasets[0].data = [
            stats.avgPossession,
            100 - stats.avgPossession,
        ];
        possessionChart.update();
    }

    // Gráfico de rendimiento por competencia
    const compPerformanceCtx = document
        .getElementById("team-comp-performance-chart")
        .getContext("2d");
    if (!Chart.getChart("team-comp-performance-chart")) {
        new Chart(compPerformanceCtx, {
            type: "bar",
            data: {
                labels: ["Victorias", "Empates", "Derrotas"],
                datasets: [
                    {
                        label: "Torneo Apertura",
                        data: [8, 2, 1],
                        backgroundColor: "#3498db",
                    },
                    {
                        label: "Copa Nacional",
                        data: [3, 1, 0],
                        backgroundColor: "#2ecc71",
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }
}
