// Charts

const crime_rate_chart_canvas = document.getElementById('crime_rate_chart');

const crime_rate_chart = new Chart(crime_rate_chart_canvas, {
    type: 'line',
    data: {
        labels: [0, 1],
        datasets: [{
            label: 'Expected Tourists',
            data: [1000,],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function crime_rate_chart_update(base_tourists_number, crime_rates) {
    base_tourists_number = Number(base_tourists_number) || 1000;
    crime_rates = JSON.parse(crime_rates);

    if (!Array.isArray(crime_rates)) {
        console.error("crime_rates must be an array like [0,1,5]");
        return;
    }

    const tourist_numbers = crime_rates.map(rate => {
        result = base_tourists_number * (1 - (rate * 0.07 / 100))
        // You can't have negative tourists
        return result > 0 ? result : 0
    });

    console.log(crime_rate_chart)

    crime_rate_chart.data.labels = crime_rates;
    crime_rate_chart.data.datasets[0].data = tourist_numbers;

    crime_rate_chart.update();
}