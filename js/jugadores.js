import staticData from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    // Inicializar búsqueda y lista de jugadores
    initPlayerSearch();
    loadPlayerList();

    // Cargar primer jugador por defecto
    if (staticData.players.length > 0) {
        loadPlayerData(staticData.players[0].id);
    }
});

function initPlayerSearch() {
    const searchInput = document.getElementById("player-search");
    const searchBtn = document.querySelector(".btn-search");

    searchBtn.addEventListener("click", searchPlayer);
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") searchPlayer();
    });
}

function searchPlayer() {
    const searchTerm = document
        .getElementById("player-search")
        .value.trim()
        .toLowerCase();
    const results = staticData.players.filter(
        (player) =>
            player.name.toLowerCase().includes(searchTerm) ||
            player.team.toLowerCase().includes(searchTerm) ||
            player.position.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById("player-results");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML =
            '<p class="no-results">No se encontraron jugadores</p>';
        return;
    }

    results.forEach((player) => {
        const playerCard = document.createElement("div");
        playerCard.className = "player-card";
        playerCard.innerHTML = `
            <img src="${player.photo}" alt="${
            player.name
        }" class="player-thumb">
            <div class="player-info-short">
                <h4>${player.name}</h4>
                <p>${player.position} | ${
            staticData.teams.find((t) => t.id === player.team).name
        }</p>
            </div>
        `;
        playerCard.addEventListener("click", () => loadPlayerData(player.id));
        resultsContainer.appendChild(playerCard);
    });
}

function loadPlayerList() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    staticData.players.forEach((player) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${player.photo}" alt="${
            player.name
        }" class="player-thumb">
            <span>${player.name}</span>
            <span class="player-team">${
                staticData.teams.find((t) => t.id === player.team).name
            }</span>
        `;
        li.addEventListener("click", () => loadPlayerData(player.id));
        playerList.appendChild(li);
    });
}

function loadPlayerData(playerId) {
    const player = staticData.players.find((p) => p.id === playerId);
    if (!player) return;

    // Actualizar información básica
    document.getElementById("player-name").textContent = player.name;
    document.getElementById("player-team").querySelector("span").textContent =
        staticData.teams.find((t) => t.id === player.team).name;
    document
        .getElementById("player-position")
        .querySelector("span").textContent = player.position;
    document.getElementById("player-age").querySelector("span").textContent =
        player.age;
    document
        .getElementById("player-nationality")
        .querySelector("span").textContent = player.nationality;
    document.getElementById("player-height").querySelector("span").textContent =
        player.height;
    document.getElementById("player-weight").querySelector("span").textContent =
        player.weight;
    document.getElementById("player-number").querySelector("span").textContent =
        player.number;
    document.querySelector(".player-photo").src = player.photo;

    // Actualizar estadísticas
    updatePlayerStats(player.stats);

    // Actualizar carrera
    updatePlayerCareer(player.career);

    // Actualizar gráficos
    updatePlayerCharts(player.stats);
}

function updatePlayerStats(stats) {
    const statsContainer = document.getElementById("player-stats-container");
    statsContainer.innerHTML = "";

    // Datos de ejemplo si no hay estadísticas
    if (!stats || Object.keys(stats).length === 0) {
        statsContainer.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-chart-line"></i>
                <p>No hay estadísticas disponibles para este jugador</p>
                <button class="btn btn-primary btn-sm">Agregar Estadísticas</button>
            </div>
        `;
        return;
    }

    for (const [category, values] of Object.entries(stats)) {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "stats-category";
        categoryDiv.innerHTML = `<h4>${category}</h4>`;

        for (const [statName, statValue] of Object.entries(values)) {
            const statDiv = document.createElement("div");
            statDiv.className = "stat-item";
            statDiv.innerHTML = `
                <span class="stat-name">${statName}</span>
                <span class="stat-value">${statValue}</span>
            `;
            categoryDiv.appendChild(statDiv);
        }

        statsContainer.appendChild(categoryDiv);
    }
}

function updatePlayerCareer(career) {
    const careerContainer = document.getElementById("player-career");
    careerContainer.innerHTML = "";

    // Datos de ejemplo si no hay carrera
    if (!career || career.length === 0) {
        careerContainer.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-history"></i>
                <p>No se ha registrado historial de carrera</p>
                <button class="btn btn-primary btn-sm">Agregar Trayectoria</button>
            </div>
        `;
        return;
    }

    career.forEach((period) => {
        const team = staticData.teams.find((t) => t.id === period.team);
        const periodDiv = document.createElement("div");
        periodDiv.className = "career-period";

        periodDiv.innerHTML = `
            <div class="career-team">
                <img src="${team.logo}" alt="${
            team.name
        }" class="team-logo-small">
                <h5>${team.name}</h5>
            </div>
            <div class="career-dates">${period.from} - ${period.to}</div>
            <div class="career-competitions">
                ${period.competitions
                    .map((compId) => {
                        const comp = staticData.competitions.find(
                            (c) => c.id === compId
                        );
                        return `<span class="competition-badge">${comp.name}</span>`;
                    })
                    .join("")}
            </div>
        `;

        careerContainer.appendChild(periodDiv);
    });
}

function updatePlayerCharts(stats) {
    // Actualizar gráficos de rendimiento
    const performanceChart = Chart.getChart("player-performance-chart");
    if (performanceChart) {
        performanceChart.data.labels = stats.performance.labels;
        performanceChart.data.datasets[0].data = stats.performance.goals;
        performanceChart.data.datasets[1].data = stats.performance.assists;
        performanceChart.update();
    }

    // Gráfico de radar para habilidades
    const skillsCtx = document
        .getElementById("player-skills-chart")
        .getContext("2d");
    if (!Chart.getChart("player-skills-chart")) {
        new Chart(skillsCtx, {
            type: "radar",
            data: {
                labels: [
                    "Velocidad",
                    "Disparo",
                    "Pase",
                    "Regate",
                    "Defensa",
                    "Físico",
                ],
                datasets: [
                    {
                        label: "Habilidades",
                        data: [85, 78, 82, 90, 65, 88],
                        backgroundColor: "rgba(52, 152, 219, 0.2)",
                        borderColor: "rgba(52, 152, 219, 1)",
                        pointBackgroundColor: "rgba(52, 152, 219, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(52, 152, 219, 1)",
                    },
                ],
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                    },
                },
            },
        });
    }
}
