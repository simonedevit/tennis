const WINS = 1;
const DRAWS = 0;
const LOSES = 1;
const TOTAL = WINS + DRAWS + LOSES;


function getPercentage(value, total) {
    const percentage = (value / total) * 100;
    return percentage.toFixed(2) + '%';
}

function setInfo(isSimone) {
    const wins = isSimone ? WINS : LOSES;
    const loses = isSimone ? LOSES : WINS;
    document.getElementById("wins").innerHTML = `${wins} (${getPercentage(wins, TOTAL)}).`;
    document.getElementById("draws").innerHTML = `${DRAWS} (${getPercentage(DRAWS, TOTAL)}).`;
    document.getElementById("loses").innerHTML = `${loses} (${getPercentage(loses, TOTAL)}).`;
};

function createRadarChart(isSimone) {
    var options = {
        fill: {
            opacity: 0.5,
        },
        markers: {
            size: 0
        },
        chart: {
            type: 'radar'
        },
        series: [{
            name: 'sales',
            data: isSimone ? [69, 45, 79, 74, 50, 87] : [81, 55, 72, 52, 65, 77]
        }],
        yaxis: {
            show: false
        },
        xaxis: {
            categories: ['SERVIZIO', 'SMASH', 'ROVESCIO', 'SMORZATA', 'VOLEE', 'DIRETTO'],
            labels: {
                show: true,
                style: {
                    colors: ["#a8a8a8"],
                    fontSize: "30px",
                    fontFamily: 'Arial'
                }
            }
        }
    }

    var chart = new ApexCharts(document.getElementById("chart"), options);
    chart.render();
}

function init(isSimone) {
    setInfo(isSimone);
    createRadarChart();
}