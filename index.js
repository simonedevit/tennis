const player1 = {
    name: 'MATTEO',
    radar: { serve: 90, smash: 80, backhand: 60, dropShot: 50, volley: 60, forehand: 70 }
}

const player2 = {
    name: 'SIMONE',
    radar: { serve: 70, smash: 50, backhand: 70, dropShot: 80, volley: 65, forehand: 90 }
}

const Court = {
    GRASS: 0,
    CLAY: 1,
    HARD: 2
};

function convertDateFormat(dateString) {
    const [day, month] = dateString.split('/');
    return `${day}/${month}`;
}

function convertTimeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Matt posizione 0 (player1), Simo posizione 1
const matches = [
    {
        date: "19/09/2024",
        sets: [{ result: [6, 2], tieBreak: false }, { result: [4, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "01:48:19",
        kcal: 909
    },
    {
        date: "23/09/2024",
        sets: [{ result: [6, 0], tieBreak: false }, { result: [6, 6], tieBreak: [4, 7] }, { result: [3, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "02:03:28",
        kcal: 1059
    },
    {
        date: "30/09/2024",
        sets: [{ result: [6, 1], tieBreak: false }, { result: [6, 3], tieBreak: false }],
        court: Court.HARD,
        duration: "01:25:58",
        kcal: 1097
    },
    {
        date: "04/10/2024",
        sets: [{ result: [6, 3], tieBreak: false }, { result: [4, 6], tieBreak: false }, { result: [6, 2], tieBreak: false }],
        court: Court.HARD,
        duration: "02:09:34",
        kcal: 1375
    },
    {
        date: "07/10/2024",
        sets: [{ result: [3, 6], tieBreak: false }, { result: [3, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "01:46:15",
        kcal: 1016
    },
    {
        date: "11/10/2024",
        sets: [{ result: [7, 5], tieBreak: false }, { result: [6, 2], tieBreak: false }],
        court: Court.HARD,
        duration: "01:14:30",
        kcal: 891
    },
    {
        date: "14/10/2024",
        sets: [{ result: [4, 6], tieBreak: false }, { result: [6, 6], tieBreak: [2, 7] }],
        court: Court.HARD,
        duration: "02:04:07",
        kcal: 1312
    },
    {
        date: "17/10/2024",
        sets: [{ result: [6, 6], tieBreak: [4, 7] }, { result: [2, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "01:49:35",
        kcal: 1162
    },
    {
        date: "23/10/2024",
        sets: [{ result: [6, 2], tieBreak: false }, { result: [2, 6], tieBreak: false }, { result: [6, 1], tieBreak: false }],
        duration: "01:54:30",
        kcal: 1300
    },
    {
        date: "28/10/2024",
        sets: [{ result: [4, 6], tieBreak: false }, { result: [4, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "01:43:19",
        kcal: 1093
    },
    {
        date: "31/10/2024",
        sets: [{ result: [6, 2], tieBreak: false }, { result: [2, 6], tieBreak: false }],
        court: Court.CLAY,
        duration: "01:26:25",
        kcal: 930
    },
    {
        date: "04/11/2024",
        sets: [{ result: [7, 5], tieBreak: false }, { result: [3, 6], tieBreak: false }],
        court: Court.HARD,
        duration: "02:05:31",
        kcal: 1153
    },
    {
        date: "28/11/2024",
        sets: [{ result: [6, 4], tieBreak: false }, { result: [6, 3], tieBreak: false }],
        court: Court.HARD,
        duration: "01:36:32",
        kcal: 1015
    },
    {
        date: "01/01/2025",
        sets: [{ result: [6, 4], tieBreak: false }, { result: [6, 0], tieBreak: false }],
        court: Court.HARD,
        duration: "01:23:15",
        kcal: 961
    }
];

function getSetsScore(sets) {
    return sets.reduce((result, set, index) => {
        result += set.result.join('-');
        if (set.tieBreak) {
            result += ` (TB: ${set.tieBreak.join('-')})`
        }
        if (index < sets.length - 1) {
            result += ', '
        }
        return result;
    }, '')
}


function getInfo() {

    const player1 = {
        wins: [],
        draws: [],
        loses: [],
        race: []
    }

    const player2 = {
        wins: [],
        draws: [],
        loses: [],
        race: []
    }

    const kcalsAndDuration = {
        kcals: [],
        durations: [],
        dates: []
    }

    matches.forEach(match => {
        let setsPlayer1 = 0;
        let setsPlayer2 = 0;
        match.sets.forEach(set => {
            const [scorePlayer1, scorePlayer2] = set.result;
            // tie break
            if (scorePlayer1 === scorePlayer2) {
                if (set.tieBreak[0] > set.tieBreak[1]) {
                    setsPlayer1++;
                } else setsPlayer2++;
            }
            else if (scorePlayer1 > scorePlayer2) {
                setsPlayer1++;
            } else {
                setsPlayer2++;
            }
        })
        const result = {
            date: match.date,
            score: getSetsScore(match.sets)
        }
        // draw
        if (setsPlayer1 === setsPlayer2) {
            player1.draws.push(result);
            player2.draws.push(result);
            // player 1 wins
        } else if (setsPlayer1 > setsPlayer2) {
            player1.wins.push(result);
            player2.loses.push(result);
            // player 2 wins
        } else {
            player2.wins.push(result);
            player1.loses.push(result);
        }

        const date = convertDateFormat(match.date);
        // race
        player1.race.push({ x: date, y: player1.wins.length });
        player2.race.push({ x: date, y: player2.wins.length });

        // kcals and duration
        kcalsAndDuration.kcals.push(match.kcal);
        kcalsAndDuration.durations.push(convertTimeToSeconds(match.duration));
        kcalsAndDuration.dates.push(date);
    })
    return {
        player1,
        player2,
        kcalsAndDuration
    }
}

/*function getPercentage(value, total) {
    const percentage = (value / total) * 100;
    return percentage.toFixed(2) + '%';
}*/

function createMatchInfo(score) {
    const li = document.createElement("li");
    li.className = "info";
    li.textContent = score;
    return li;
}

function setInfo(wins, draws, loses) {
    wins.forEach(win => {
        const scoreDiv = createMatchInfo(win.score);
        document.getElementById("wins").appendChild(scoreDiv)
    })
    draws.forEach(draw => {
        const scoreDiv = createMatchInfo(draw.score);
        document.getElementById("draws").appendChild(scoreDiv)
    })
    loses.forEach(lose => {
        const scoreDiv = createMatchInfo(lose.score);
        document.getElementById("loses").appendChild(scoreDiv)
    })
};

function showMatchesInfo(seriesIndex) {
    switch (seriesIndex) {
        case 0:
            document.getElementById("wins").style.display = "block";
            document.getElementById("draws").style.display = "none";
            document.getElementById("loses").style.display = "none";
            break;
        case 1:
            document.getElementById("wins").style.display = "none";
            document.getElementById("draws").style.display = "block";
            document.getElementById("loses").style.display = "none";
            break;
        case 2:
            document.getElementById("wins").style.display = "none";
            document.getElementById("draws").style.display = "none";
            document.getElementById("loses").style.display = "block";
            break;
    }
}

function createPieChart(...args) {
    const [wins, draws, loses] = args;
    const options = {
        fill: {
            opacity: 0.95,
        },
        colors: ['#4CAF50', '#9E9E9E', '#F44336'],
        series: [wins, draws, loses],
        chart: {
            type: 'pie',
            width: '100%',
            offsetY: -50,
            events: {
                legendClick: function (chartContext, seriesIndex, opts) {
                    showMatchesInfo(seriesIndex);
                },
                dataPointSelection: function (event, chartContext, config) {
                    setTimeout(() => {
                        showMatchesInfo(config.dataPointIndex)
                    }, 10);
                }
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -100,
                }
            }
        },
        dataLabels: {
            textAnchor: 'end',
            formatter: (val, opts) => {
                return [args[opts.seriesIndex], `(${val.toFixed(0)}%)`]
            },
            style: {
                fontSize: '70px',
            },
        },
        legend: {
            offsetY: 10,
            position: 'bottom',
            fontSize: '40px',
            markers: {
                size: 20,
                offsetX: 0,
            }
        },
        labels: ['VITTORIE', 'PAREGGI', 'SCONFITTE'],
        tooltip: {
            enabled: false
        }
    };

    new ApexCharts(document.getElementById("pie-chart"), options).render();
}

function createRadarChart(isPlayer1) {
    const options = {
        fill: {
            opacity: 0.2,
        },
        markers: {
            size: 0
        },
        chart: {
            toolbar: {
                show: false
            },
            type: 'radar',
            width: '100%',
            height: '900px',
            offsetY: -100
        },
        series: [{
            name: 'sales',
            data: Object.values((isPlayer1 ? player1 : player2).radar)
        }],
        yaxis: {
            stepSize: 10,
            max: 100,
            show: false,
        },
        xaxis: {
            categories: ['SERVIZIO', 'SMASH', 'ROVESCIO', 'SMORZATA', 'VOLEE', 'DIRITTO'],
            labels: {
                show: true,
                style: {
                    colors: ["#000", "#000", "#000", "#000", "#000", "#000"],
                    fontSize: "35px",
                    fontFamily: 'Arial'
                }
            }
        },
    }
    new ApexCharts(document.getElementById("radar-chart"), options).render();
}

function createRaceChart(series) {

    const options = {
        series,
        yaxis: {
            stepSize: 1,
            labels: {
                style: {
                    fontSize: '30px'
                }
            },
        },
        xaxis: {
            //type: 'datetime',
            offsetY: 30,
            labels: {
                rotate: -45,
                rotateAlways: false,
                //format: 'dd/MM',
                style: {
                    fontSize: '30px'
                }
            },
        },
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        legend: {
            offsetY: 10,
            position: 'bottom',
            fontSize: '40px',
            markers: {
                size: 20,
                offsetX: 0,
            }
        },
    };

    new ApexCharts(document.getElementById("race-chart"), options).render();
}

function createKcalsAndDurationsChart(kcals, durations, dates) {
    const options = {
        series: [{
            name: 'DURATA (h)',
            type: 'column',
            data: durations
        }, {
            name: 'CALORIE (kcal)',
            type: 'line',
            data: kcals
        }],
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: false
        },
        stroke: {
            width: [0, 4]
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
            style: {
                fontSize: '30px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: undefined
            },
        },
        labels: dates,
        xaxis: {
            //type: 'datetime',
            offsetY: 30,
            labels: {
                rotate: -45,
                rotateAlways: true,
                //format: 'dd/MM',
                style: {
                    fontSize: '30px'
                }
            },
        },
        yaxis: [{
            labels: {
                formatter: (seconds) => {
                    return convertSecondsToTime(seconds)
                },
                style: {
                    fontSize: '30px'
                }
            },
        }, , {
            max: Math.max(...kcals),
            labels: {
                style: {
                    fontSize: '30px'
                },
            },
            opposite: true,

        }],
        legend: {
            offsetY: 10,
            position: 'bottom',
            fontSize: '40px',
            markers: {
                size: 20,
                offsetX: 0,
            }
        },
    };
    new ApexCharts(document.getElementById("kcals-and-durations-chart"), options).render();

}

function init(isPlayer1) {
    const info = getInfo();
    const { wins, draws, loses } = isPlayer1 ? info.player1 : info.player2;
    const raceSeries = [
        { name: player1.name, data: info.player1.race },
        { name: player2.name, data: info.player2.race }
    ]
    const { kcalsAndDuration: { kcals, durations, dates } } = info;
    //const total = matches.length;
    setInfo(wins, draws, loses);
    createPieChart(wins.length, draws.length, loses.length);
    createRadarChart(isPlayer1);
    createRaceChart(raceSeries);
    createKcalsAndDurationsChart(kcals, durations, dates);
}
