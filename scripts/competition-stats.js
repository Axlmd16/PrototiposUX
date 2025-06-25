// scripts/competition-stats.js
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("competition-stats-grid");

    // Calculate stats
    const totalMatches = (leagueData.length / 2) * (leagueData.length - 1); // Simplified
    const totalGoals = playerData.reduce(
        (sum, player) => sum + player.goals,
        0
    );
    const avgGoalsPerMatch = (
        totalGoals /
        (leagueData[0].played * (leagueData.length / 2))
    ).toFixed(2);

    const topScorer = playerData.sort((a, b) => b.goals - a.goals)[0];
    const topAssister = playerData.sort((a, b) => b.assists - a.assists)[0];
    const mostCardsPlayer = playerData.sort(
        (a, b) =>
            b.yellowCards + b.redCards * 2 - (a.yellowCards + a.redCards * 2)
    )[0];

    const stats = [
        {
            title: "Goles Totales en la Liga",
            value: totalGoals,
            highlight: true,
        },
        {
            title: "Promedio de Goles por Partido",
            value: avgGoalsPerMatch,
            highlight: true,
        },
        {
            title: "Equipos Participantes",
            value: leagueData.length,
            highlight: false,
        },
        {
            title: "Partidos Jugados (por equipo)",
            value: leagueData[0].played,
            highlight: false,
        },
    ];

    // Populate grid
    grid.innerHTML = stats
        .map(
            (stat) => `
        <div class="stat-card">
            <h3>${stat.title}</h3>
            <div class="stat-value ${stat.highlight ? "stat-highlight" : ""}">${
                stat.value
            }</div>
        </div>
    `
        )
        .join("");

    // Populate leader cards
    document.getElementById("top-scorer").innerHTML = `
        <h3>Máximo Goleador</h3>
        <div class="stat-value">${topScorer.name}</div>
        <p style="color: #28a745; font-weight: bold; font-size: 1.2rem;">${topScorer.goals} Goles</p>
        <p style="color: #666; font-size: 1rem;">${topScorer.team}</p>
    `;

    document.getElementById("top-assister").innerHTML = `
         <h3>Máximo Asistidor</h3>
        <div class="stat-value">${topAssister.name}</div>
        <p style="color: #28a745; font-weight: bold; font-size: 1.2rem;">${topAssister.assists} Asistencias</p>
        <p style="color: #666; font-size: 1rem;">${topAssister.team}</p>
    `;

    document.getElementById("most-disciplined").innerHTML = `
        <h3>Más Tarjetas</h3>
        <div class="stat-value">${mostCardsPlayer.name}</div>
        <p style="color: #666; font-weight: bold; font-size: 1.2rem;">${mostCardsPlayer.yellowCards} Amarillas, ${mostCardsPlayer.redCards} Rojas</p>
        <p style="color: #666; font-size: 1rem;">${mostCardsPlayer.team}</p>
    `;

    initializeCardEffects();
});
