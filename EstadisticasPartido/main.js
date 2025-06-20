// main.js extraído de index.html
const leagueData = [
    { position: 1, team: "Equipo X", points: 60 },
    { position: 2, team: "Equipo Y", points: 58 },
    { position: 3, team: "Equipo Z", points: 55 },
    { position: 4, team: "Real Madrid CF", points: 52 },
    { position: 5, team: "FC Barcelona", points: 48 },
    { position: 6, team: "Atlético Madrid", points: 45 },
    { position: 7, team: "Valencia CF", points: 42 },
    { position: 8, team: "Sevilla FC", points: 39 },
    { position: 9, team: "Real Sociedad", points: 36 },
    { position: 10, team: "Real Betis", points: 33 },
    { position: 11, team: "Villarreal CF", points: 30 },
    { position: 12, team: "Athletic Bilbao", points: 27 },
    { position: 13, team: "Celta de Vigo", points: 24 },
    { position: 14, team: "Getafe CF", points: 21 },
    { position: 15, team: "Osasuna", points: 18 },
    { position: 16, team: "Mallorca", points: 15 },
];
let currentPage = 0;
const itemsPerPage = 8;
function updateLeagueTable() {
    const tbody = document.querySelector("#league-table tbody");
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
    document.getElementById("prev-btn").disabled = currentPage === 0;
    document.getElementById("next-btn").disabled =
        endIndex >= leagueData.length;
}
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
document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
        this.style.transition = "all 0.3s ease";
    });
    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    });
});
document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#f8f9fa";
        this.style.transition = "background-color 0.2s ease";
    });
    row.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "transparent";
    });
});
updateLeagueTable();
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
document.querySelectorAll(".stat-card, .section").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
setTimeout(() => {
    animateOnScroll();
}, 100);
