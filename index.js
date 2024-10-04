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

function createMatchInfo(score){
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

function showMatchesInfo(seriesIndex){
    switch(seriesIndex){
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
        colors: ['#4CAF50', '#9E9E9E', '#F44336'],
        series: [wins, draws, loses],
        chart: {
            type: 'pie',
            width: '100%',
            events: {
                legendClick: function (chartContext, seriesIndex, opts) {
                    showMatchesInfo(seriesIndex);
                },
                dataPointSelection: function(event, chartContext, config) {
                    showMatchesInfo(config.dataPointIndex)
                }
            }
        },
        dataLabels: {
            textAnchor: 'end',
            formatter: (val, opts) => {
                return [args[opts.seriesIndex], `(${val.toFixed(2)}%)`]
            },
            style: {
                fontSize: '50px',
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
    };

    new ApexCharts(document.getElementById("pie-chart"), options).render();
}

function createRadarChart(isPlayer1) {
    const options = {
        fill: {
            opacity: 0.5,
        },
        markers: {
            size: 0
        },
        chart: {
            type: 'radar',
            width: '100%',
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
                    colors: ["#000","#000","#000","#000","#000","#000"],
                    fontSize: "35px",
                    fontFamily: 'Arial'
                }
            }
        },
    }
    new ApexCharts(document.getElementById("radar-chart"), options).render();

}

function init(isPlayer1) {
    const [wins, draws, loses] = getInfo(isPlayer1);
    const total = matches.length;
    setInfo(wins, draws, loses);
    createPieChart(wins.length, draws.length, loses.length);
    createRadarChart(isPlayer1);
}