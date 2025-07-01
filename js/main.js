// Navegación entre secciones principales
document.addEventListener("DOMContentLoaded", function () {
    // Manejar clics en el menú de navegación
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remover clase active de todos los enlaces
            navLinks.forEach((navLink) => {
                navLink.classList.remove("active");
            });

            // Agregar clase active al enlace clickeado
            this.classList.add("active");

            // Ocultar todas las secciones
            const sections = document.querySelectorAll(".content-section");
            sections.forEach((section) => {
                section.classList.remove("active");
            });

            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute("data-section");
            document.getElementById(sectionId).classList.add("active");
        });
    });

    // Manejar pestañas internas
    setupTabs();

    // Inicializar gráficos
    initializeCharts();
});

function setupTabs() {
    // Configurar event listeners para todas las pestañas
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const tabId = this.getAttribute("data-tab");

            // Encontrar el contenedor de pestañas más cercano
            const tabContainer = this.closest(
                ".player-stats, .team-stats-container, .marker-tabs"
            );

            // Remover active de todos los botones en este grupo
            tabContainer
                .querySelectorAll(".tab-btn")
                .forEach((t) => t.classList.remove("active"));

            // Remover active de todos los contenidos en este grupo
            tabContainer
                .querySelectorAll(".tab-content")
                .forEach((c) => c.classList.remove("active"));

            // Agregar active al botón clickeado
            this.classList.add("active");

            // Mostrar el contenido correspondiente
            document.getElementById(`${tabId}-tab`).classList.add("active");
        });
    });
}

function initializeCharts() {
    // Gráfico de ejemplo para la sección de competencia
    const compStatsCtx = document
        .getElementById("comp-stats-chart")
        ?.getContext("2d");
    if (compStatsCtx) {
        new Chart(compStatsCtx, {
            type: "bar",
            data: {
                labels: [
                    "Los Halcones",
                    "Águilas FC",
                    "Tigres UN",
                    "Leones SC",
                    "Cóndores",
                    "Panteras",
                ],
                datasets: [
                    {
                        label: "Puntos",
                        data: [45, 42, 38, 35, 28, 22],
                        backgroundColor: "#3498db",
                        borderColor: "#2980b9",
                        borderWidth: 1,
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

    // Gráfico de ejemplo para jugadores
    const playerPerfCtx = document
        .getElementById("player-performance-chart")
        ?.getContext("2d");
    if (playerPerfCtx) {
        new Chart(playerPerfCtx, {
            type: "line",
            data: {
                labels: [
                    "Fecha 1",
                    "Fecha 2",
                    "Fecha 3",
                    "Fecha 4",
                    "Fecha 5",
                    "Fecha 6",
                    "Fecha 7",
                ],
                datasets: [
                    {
                        label: "Goles",
                        data: [1, 0, 2, 1, 1, 0, 2],
                        borderColor: "#2ecc71",
                        backgroundColor: "rgba(46, 204, 113, 0.1)",
                        tension: 0.3,
                        fill: true,
                    },
                    {
                        label: "Asistencias",
                        data: [0, 1, 0, 1, 0, 1, 0],
                        borderColor: "#3498db",
                        backgroundColor: "rgba(52, 152, 219, 0.1)",
                        tension: 0.3,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
            },
        });
    }

    // Gráficos de ejemplo para equipos
    const teamGoalsCtx = document
        .getElementById("team-goals-chart")
        ?.getContext("2d");
    if (teamGoalsCtx) {
        new Chart(teamGoalsCtx, {
            type: "bar",
            data: {
                labels: ["Goles a favor", "Goles en contra", "Diferencia"],
                datasets: [
                    {
                        label: "Goles",
                        data: [32, 18, 14],
                        backgroundColor: ["#2ecc71", "#e74c3c", "#3498db"],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } },
            },
        });
    }

    const teamPossessionCtx = document
        .getElementById("team-possession-chart")
        ?.getContext("2d");
    if (teamPossessionCtx) {
        new Chart(teamPossessionCtx, {
            type: "doughnut",
            data: {
                labels: ["Posesión propia", "Posesión rival"],
                datasets: [
                    {
                        data: [58, 42],
                        backgroundColor: ["#3498db", "#e74c3c"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                cutout: "70%",
            },
        });
    }
}
