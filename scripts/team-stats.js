// scripts/team-stats.js
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#full-league-table tbody");
    const searchInput = document.getElementById("team-search");

    const populateTable = (data) => {
        tableBody.innerHTML = "";
        data.forEach((team) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><span class="position-number">${team.position}</span></td>
                <td class="team-name">${team.team}</td>
                <td class="points">${team.points}</td>
                <td>${team.played}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
            `;
            tableBody.appendChild(row);
        });
        initializeTableEffects();
    };

    const filterTable = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = leagueData.filter((team) =>
            team.team.toLowerCase().includes(searchTerm)
        );
        populateTable(filteredData);
    };

    searchInput.addEventListener("input", filterTable);

    // Initial population
    populateTable(leagueData);
});
