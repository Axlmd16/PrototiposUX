// Lógica para la sección de competencia
document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos de la tabla de competencia
    loadCompetitionTable();

    // Manejar cambios en los filtros
    document
        .getElementById("comp-select")
        .addEventListener("change", function () {
            loadCompetitionTable(this.value);
        });
});

function loadCompetitionTable(competitionId = "") {
    // Simulación de datos - en una aplicación real esto vendría de una API
    const data = {
        torneo_ap: [
            {
                position: 1,
                team: "Los Halcones",
                played: 15,
                won: 14,
                drawn: 1,
                lost: 0,
                goalsFor: 32,
                goalsAgainst: 8,
                points: 43,
            },
            {
                position: 2,
                team: "Águilas FC",
                played: 15,
                won: 12,
                drawn: 2,
                lost: 1,
                goalsFor: 28,
                goalsAgainst: 10,
                points: 38,
            },
            {
                position: 3,
                team: "Tigres UN",
                played: 15,
                won: 10,
                drawn: 3,
                lost: 2,
                goalsFor: 25,
                goalsAgainst: 12,
                points: 33,
            },
            {
                position: 4,
                team: "Leones SC",
                played: 15,
                won: 8,
                drawn: 4,
                lost: 3,
                goalsFor: 22,
                goalsAgainst: 15,
                points: 28,
            },
            {
                position: 5,
                team: "Cóndores",
                played: 15,
                won: 6,
                drawn: 3,
                lost: 6,
                goalsFor: 18,
                goalsAgainst: 20,
                points: 21,
            },
        ],
        torneo_cl: [
            {
                position: 1,
                team: "Panteras",
                played: 10,
                won: 8,
                drawn: 2,
                lost: 0,
                goalsFor: 20,
                goalsAgainst: 5,
                points: 26,
            },
            {
                position: 2,
                team: "Leones SC",
                played: 10,
                won: 7,
                drawn: 1,
                lost: 2,
                goalsFor: 18,
                goalsAgainst: 8,
                points: 22,
            },
            {
                position: 3,
                team: "Águilas FC",
                played: 10,
                won: 6,
                drawn: 2,
                lost: 2,
                goalsFor: 16,
                goalsAgainst: 9,
                points: 20,
            },
            {
                position: 4,
                team: "Los Halcones",
                played: 10,
                won: 5,
                drawn: 3,
                lost: 2,
                goalsFor: 15,
                goalsAgainst: 10,
                points: 18,
            },
            {
                position: 5,
                team: "Tigres UN",
                played: 10,
                won: 4,
                drawn: 2,
                lost: 4,
                goalsFor: 12,
                goalsAgainst: 12,
                points: 14,
            },
        ],
        "": [
            {
                position: 1,
                team: "Los Halcones",
                played: 25,
                won: 19,
                drawn: 4,
                lost: 2,
                goalsFor: 47,
                goalsAgainst: 18,
                points: 61,
            },
            {
                position: 2,
                team: "Águilas FC",
                played: 25,
                won: 18,
                drawn: 4,
                lost: 3,
                goalsFor: 44,
                goalsAgainst: 19,
                points: 58,
            },
            {
                position: 3,
                team: "Leones SC",
                played: 25,
                won: 15,
                drawn: 5,
                lost: 5,
                goalsFor: 40,
                goalsAgainst: 23,
                points: 50,
            },
            {
                position: 4,
                team: "Tigres UN",
                played: 25,
                won: 14,
                drawn: 5,
                lost: 6,
                goalsFor: 37,
                goalsAgainst: 24,
                points: 47,
            },
            {
                position: 5,
                team: "Panteras",
                played: 25,
                won: 13,
                drawn: 3,
                lost: 9,
                goalsFor: 35,
                goalsAgainst: 28,
                points: 42,
            },
        ],
    };

    const tableData = data[competitionId] || data[""];
    const tableBody = document.querySelector("#comp-stats-table tbody");
    tableBody.innerHTML = "";

    tableData.forEach((team) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.position}</td>
            <td><strong>${team.team}</strong></td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td><strong>${team.points}</strong></td>
        `;
        tableBody.appendChild(row);
    });

    // Actualizar gráfico según la competencia seleccionada
    updateCompetitionChart(competitionId);
}

function updateCompetitionChart(competitionId) {
    // Simulación de datos para el gráfico
    const chartData = {
        torneo_ap: {
            labels: [
                "Los Halcones",
                "Águilas FC",
                "Tigres UN",
                "Leones SC",
                "Cóndores",
            ],
            data: [43, 38, 33, 28, 21],
        },
        torneo_cl: {
            labels: [
                "Panteras",
                "Leones SC",
                "Águilas FC",
                "Los Halcones",
                "Tigres UN",
            ],
            data: [26, 22, 20, 18, 14],
        },
        "": {
            labels: [
                "Los Halcones",
                "Águilas FC",
                "Leones SC",
                "Tigres UN",
                "Panteras",
            ],
            data: [61, 58, 50, 47, 42],
        },
    };

    const data = chartData[competitionId] || chartData[""];
    const chart = Chart.getChart("comp-stats-chart");

    if (chart) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.data;
        chart.update();
    }
}
