// Canvases

const crime_rate_chart_canvas = document.getElementById('crime_rate_chart');
const inflation_rate_chart_canvas = document.getElementById('inflation_rate_chart');

// Charts

const options = {
    scales: {
        x: {
            grid: {
                color: "#313131"
            }
        },
        y: {
            grid: {
                color: "#313131"
            }
        }
    }
}

const crime_rate_chart = new Chart(crime_rate_chart_canvas, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Expected Tourists',
            data: [1000],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: options
});

const inflation_rate_chart = new Chart(inflation_rate_chart_canvas, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Expected Tourists',
            data: [1000],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: options
});

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}