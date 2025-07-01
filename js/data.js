// Datos estáticos para la aplicación
const staticData = {
    competitions: [
        {
            id: "torneo_ap",
            name: "Torneo Apertura",
            season: "2023",
            current: true,
        },
        {
            id: "torneo_cl",
            name: "Torneo Clausura",
            season: "2023",
            current: false,
        },
        { id: "copa", name: "Copa Nacional", season: "2023", current: true },
    ],

    teams: [
        {
            id: "halcones",
            name: "Los Halcones",
            coach: "Juan Pérez",
            founded: 2010,
            logo: "img/team-default.png",
            stadium: "Estadio Halcón",
            capacity: 25000,
            currentCompetitions: ["torneo_ap", "copa"],
            stats: {
                matches: 24,
                wins: 15,
                draws: 5,
                losses: 4,
                goalsFor: 32,
                goalsAgainst: 18,
                cleanSheets: 10,
                yellowCards: 25,
                redCards: 3,
                avgPossession: 58,
            },
            squad: {
                goalkeepers: 3,
                defenders: 8,
                midfielders: 7,
                forwards: 5,
                avgAge: 24.5,
            },
            recentForm: ["W", "W", "D", "W", "L"],
            nextMatch: {
                opponent: "Tigres UN",
                date: "25/06/2023",
                competition: "torneo_ap",
                isHome: true,
            },
        },
        // ... más equipos con estructura similar
    ],

    players: [
        {
            id: 1,
            name: "Carlos Torres",
            team: "halcones",
            position: "Delantero",
            age: 25,
            photo: "img/player-default.jpg",
            nationality: "Mexicana",
            height: "1.78m",
            weight: "72kg",
            number: 10,
            career: [
                {
                    team: "halcones",
                    from: "2020",
                    to: "presente",
                    competitions: ["torneo_ap", "torneo_cl", "copa"],
                    matches: 45,
                    goals: 28,
                    highlights: "Máximo goleador Torneo Apertura 2022",
                },
                // ... más períodos ...
            ],
            stats: {
                temporada_actual: {
                    matches: 18,
                    goals: 12,
                    assists: 7,
                    shots: 42,
                    shotsOnTarget: 24,
                    passAccuracy: 82,
                    yellowCards: 3,
                    redCards: 0,
                    avgRating: 7.8,
                },
                ultimos_5_partidos: [
                    {
                        opponent: "Águilas FC",
                        goals: 1,
                        assists: 0,
                        rating: 7.5,
                    },
                    // ... más partidos ...
                ],
            },
        },
        // ... más jugadores
    ],

    matches: [
        {
            id: 1,
            date: "15/06/2023",
            homeTeam: "halcones",
            awayTeam: "aguilas",
            competition: "torneo_ap",
            result: "3-2",
            events: [
                {
                    time: "15'",
                    type: "goal",
                    team: "home",
                    player: "Jugador #10",
                },
                {
                    time: "32'",
                    type: "yellow",
                    team: "away",
                    player: "Jugador #5",
                },
                {
                    time: "45+2'",
                    type: "goal",
                    team: "away",
                    player: "Jugador #9",
                },
                {
                    time: "58'",
                    type: "goal",
                    team: "home",
                    player: "Jugador #7",
                },
            ],
            stats: {
                possession: [58, 42],
                shots: [15, 10],
                shotsOnTarget: [8, 5],
                corners: [6, 3],
                fouls: [12, 15],
                offsides: [2, 4],
            },
            highlights: [
                "Gol de Carlos Torres (15')",
                "Tarjeta amarilla a jugador #5 Águilas (32')",
                // ... más highlights ...
            ],
        },
        // ... más partidos
    ],
};
