// scripts/player-stats.js
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#player-stats-table tbody");
    const searchInput = document.getElementById("player-search");
    const positionFilter = document.getElementById("position-filter");

    const populateTable = (data) => {
        tableBody.innerHTML = "";
        data.forEach((player) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="team-name" style="font-weight: 600;">${player.name}</td>
                <td>${player.team}</td>
                <td>${player.position}</td>
                <td class="points">${player.goals}</td>
                <td class="points">${player.assists}</td>
                <td>${player.yellowCards}</td>
                <td>${player.redCards}</td>
            `;
            tableBody.appendChild(row);
        });
        initializeTableEffects();
    };

    const filterData = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedPosition = positionFilter.value;

        const filteredData = playerData.filter((player) => {
            const nameMatch = player.name.toLowerCase().includes(searchTerm);
            const positionMatch =
                selectedPosition === "all" ||
                player.position === selectedPosition;
            return nameMatch && positionMatch;
        });

        populateTable(filteredData);
    };

    searchInput.addEventListener("input", filterData);
    positionFilter.addEventListener("change", filterData);

    // Initial population
    populateTable(playerData);
});
