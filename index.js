// Matt posizione 0 (player1), Simo posizione 1
const matches = [
    {
        date: "19/09/2024",
        sets: [{ result: [6, 2], tieBreak: false }, { result: [4, 6], tieBreak: false }],
        duration: "01:48:19",
        kcal: 909
    },
    {
        date: "23/09/2024",
        sets: [{ result: [6, 0], tieBreak: false }, { result: [6, 6], tieBreak: [4, 7] }, { result: [3, 6], tieBreak: false }],
        duration: "02:03:28",
        kcal: 1059
    },
    {
        date: "30/09/2024",
        sets: [{ result: [6, 1], tieBreak: false }, { result: [6, 3], tieBreak: false }],
        duration: "01:25:58",
        kcal: 1097
    },
    {
        date: "30/09/2024",
        sets: [{ result: [6, 3], tieBreak: false }, { result: [4, 6], tieBreak: false }, { result: [6, 2], tieBreak: false }],
        duration: "02:09:34",
        kcal: 1375
    },
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

function getInfo(isPlayer1) {
    let wins = [];
    let draws = [];
    let loses = [];

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
        if (setsPlayer1 === setsPlayer2) {
            draws.push({
                date: match.date,
                score: getSetsScore(match.sets)
            })
        } else if (setsPlayer1 > setsPlayer2) {
            wins.push({
                date: match.date,
                score: getSetsScore(match.sets)
            })
        } else {
            loses.push({
                date: match.date,
                score: getSetsScore(match.sets)
            })
        }
    })
    if (isPlayer1) {
        return [wins, draws, loses];
    } else return [loses, draws, wins];
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
            document.getElementById("wins").style.display = "flex";
            document.getElementById("draws").style.display = "none";
            document.getElementById("loses").style.display = "none";
            break;
        case 1:
            document.getElementById("wins").style.display = "none";
            document.getElementById("draws").style.display = "flex";
            document.getElementById("loses").style.display = "none";
            break;
        case 2:
            document.getElementById("wins").style.display = "none";
            document.getElementById("draws").style.display = "none";
            document.getElementById("loses").style.display = "flex";
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
            data: isPlayer1 ? [81, 55, 72, 52, 65, 77] : [69, 45, 79, 74, 50, 87]
        }],
        yaxis: {
            show: false,
        },
        xaxis: {
            categories: ['SERVIZIO', 'SMASH', 'ROVESCIO', 'SMORZATA', 'VOLEE', 'DIRETTO'],
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

function createMultiLineChart() {

    const options = {
        series: [
            { name: "MATTEO", data: [{ x: '19/09/2024', y: 0 }, { x: '23/09/2024', y: 0 }, { x: '30/09/2024', y: 1 }, { x: '10/04/2024', y: 2 }] },
            { name: "SIMONE", data: [{ x: '19/09/2024', y: 0 }, { x: '23/09/2024', y: 1 }, { x: '30/09/2024', y: 1 }, { x: '10/04/2024', y: 1 }] }

        ],
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
            labels: {
                format: 'dd/MM',
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

    new ApexCharts(document.getElementById("multiline-chart"), options).render();
}

function init(isPlayer1) {
    const [wins, draws, loses] = getInfo(isPlayer1);
    console.log(wins, draws, loses);
    const total = matches.length;
    setInfo(wins, draws, loses);
    createPieChart(wins.length, draws.length, loses.length);
    createRadarChart(isPlayer1);
    createMultiLineChart();
}