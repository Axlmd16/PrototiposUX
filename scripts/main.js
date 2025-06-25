// Datos globales
const leagueData = [
    {
        position: 1,
        team: "Real Madrid",
        points: 78,
        played: 30,
        wins: 24,
        draws: 6,
        losses: 0,
    },
    {
        position: 2,
        team: "FC Barcelona",
        points: 75,
        played: 30,
        wins: 23,
        draws: 6,
        losses: 1,
    },
    {
        position: 3,
        team: "Atlético Madrid",
        points: 65,
        played: 30,
        wins: 19,
        draws: 8,
        losses: 3,
    },
    {
        position: 4,
        team: "Real Sociedad",
        points: 58,
        played: 30,
        wins: 17,
        draws: 7,
        losses: 6,
    },
    {
        position: 5,
        team: "Real Betis",
        points: 55,
        played: 30,
        wins: 16,
        draws: 7,
        losses: 7,
    },
    {
        position: 6,
        team: "Villarreal",
        points: 52,
        played: 30,
        wins: 15,
        draws: 7,
        losses: 8,
    },
    {
        position: 7,
        team: "Athletic Bilbao",
        points: 49,
        played: 30,
        wins: 14,
        draws: 7,
        losses: 9,
    },
    {
        position: 8,
        team: "Valencia",
        points: 46,
        played: 30,
        wins: 13,
        draws: 7,
        losses: 10,
    },
    {
        position: 9,
        team: "Sevilla",
        points: 43,
        played: 30,
        wins: 12,
        draws: 7,
        losses: 11,
    },
    {
        position: 10,
        team: "Celta Vigo",
        points: 40,
        played: 30,
        wins: 11,
        draws: 7,
        losses: 12,
    },
    {
        position: 11,
        team: "Osasuna",
        points: 37,
        played: 30,
        wins: 10,
        draws: 7,
        losses: 13,
    },
    {
        position: 12,
        team: "Getafe",
        points: 34,
        played: 30,
        wins: 9,
        draws: 7,
        losses: 14,
    },
    {
        position: 13,
        team: "Mallorca",
        points: 31,
        played: 30,
        wins: 8,
        draws: 7,
        losses: 15,
    },
    {
        position: 14,
        team: "Cádiz",
        points: 28,
        played: 30,
        wins: 7,
        draws: 7,
        losses: 16,
    },
    {
        position: 15,
        team: "Almería",
        points: 25,
        played: 30,
        wins: 6,
        draws: 7,
        losses: 17,
    },
    {
        position: 16,
        team: "Valladolid",
        points: 22,
        played: 30,
        wins: 5,
        draws: 7,
        losses: 18,
    },
];

const recentResults = [
    {
        date: "1 de marzo",
        opponent: "Real Madrid",
        result: "2-1",
        type: "victory",
    },
    {
        date: "8 de marzo",
        opponent: "FC Barcelona",
        result: "1-1",
        type: "draw",
    },
    {
        date: "15 de marzo",
        opponent: "Atlético Madrid",
        result: "3-0",
        type: "victory",
    },
    {
        date: "22 de marzo",
        opponent: "Valencia",
        result: "0-2",
        type: "defeat",
    },
    {
        date: "29 de marzo",
        opponent: "Sevilla",
        result: "2-1",
        type: "victory",
    },
    {
        date: "5 de abril",
        opponent: "Real Betis",
        result: "4-0",
        type: "victory",
    },
    {
        date: "12 de abril",
        opponent: "Villarreal",
        result: "2-2",
        type: "draw",
    },
    {
        date: "19 de abril",
        opponent: "Athletic Bilbao",
        result: "1-3",
        type: "defeat",
    },
];

// Variables de paginación
let currentPage = 0;
const itemsPerPage = 8;

// Función para actualizar la tabla de liga
function updateLeagueTable() {
    const tbody = document.querySelector("#league-table tbody");
    if (!tbody) return;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = leagueData.slice(startIndex, endIndex);

    tbody.innerHTML = "";
    pageData.forEach((team) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><span class="position-number">${team.position}</span></td>
            <td class="team-name">${team.team}</td>
            <td class="points">${team.points}</td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar botones de paginación
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = endIndex >= leagueData.length;
}

// Funciones de paginación
function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        updateLeagueTable();
    }
}

function nextPage() {
    if ((currentPage + 1) * itemsPerPage < leagueData.length) {
        currentPage++;
        updateLeagueTable();
    }
}

// Función para poblar resultados recientes
function populateRecentResults() {
    const tbody = document.querySelector("#recent-results tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    recentResults.slice(0, 5).forEach((match) => {
        const row = document.createElement("tr");
        const resultClass = match.type;
        const resultText =
            match.type === "victory"
                ? "(V)"
                : match.type === "draw"
                ? "(E)"
                : "(D)";

        row.innerHTML = `
            <td>${match.date}</td>
            <td class="team-name">${match.opponent}</td>
            <td><span class="result ${resultClass}">${match.result} ${resultText}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Efectos de hover para tarjetas
function initializeCardEffects() {
    document.querySelectorAll(".stat-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)";
            this.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.12)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
        });
    });
}

// Efectos de hover para filas de tabla
function initializeTableEffects() {
    document.querySelectorAll("tbody tr").forEach((row) => {
        row.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#f8f9fa";
        });

        row.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "transparent";
        });
    });
}

// Animaciones de entrada
function animateOnScroll() {
    const elements = document.querySelectorAll(".stat-card, .section");

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Inicializar estilos para animaciones
function initializeAnimations() {
    document.querySelectorAll(".stat-card, .section").forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
}

// Funciones de utilidad
function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
}

function calculateWinPercentage(wins, total) {
    return ((wins / total) * 100).toFixed(1);
}

// Función para mostrar loading
function showLoading(element) {
    element.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Función para ocultar loading
function hideLoading(element, content) {
    element.innerHTML = content;
}

// Navegación activa
function setActiveNavigation() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Inicializar componentes
    initializeAnimations();
    updateLeagueTable();
    populateRecentResults();
    initializeCardEffects();
    setActiveNavigation();

    // Trigger animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

// Event listeners para scroll
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Hacer funciones globales para HTML
window.previousPage = previousPage;
window.nextPage = nextPage;

// Función para búsqueda en tablas
function searchTable(searchTerm, tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Función para filtrar por resultado
function filterByResult(resultType) {
    const rows = document.querySelectorAll("#recent-results tbody tr");
    rows.forEach((row) => {
        const resultClass = row.query;
        Selector(".result").classList.contains(resultType);
        if (resultClass) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
// Función para resetear filtros
function resetFilters() {
    const rows = document.querySelectorAll("#recent-results tbody tr");
    rows.forEach((row) => {
        row.style.display = "";
    });
}
// Hacer funciones globales para HTML
window.searchTable = searchTable;
window.filterByResult = filterByResult;
window.resetFilters = resetFilters;
// Función para mostrar el modal de contacto
function showContactModal() {
    const modal = document.getElementById("contact-modal");
    if (modal) {
        modal.style.display = "block";
    }
}
