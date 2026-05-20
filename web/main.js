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

function crime_rate_chart_update(base_tourists_number, crime_rates, allow_negative_rate) {
    base_tourists_number = Number(base_tourists_number) || 1000;
    crime_rates = JSON.parse(crime_rates);

    if (!Array.isArray(crime_rates)) {
        console.error("crime_rates must be an array like [0,1,5]");
        return;
    }

    const tourist_numbers = crime_rates.map(rate => {
        result = base_tourists_number * (1 - (rate * 0.07 / 100))
        // You can't have negative tourists        
        if (result < 0) result = 0

        if (result > base_tourists_number) {
            if (allow_negative_rate == false) {
                result = base_tourists_number
            }
        }

        return result
    });

    crime_rate_chart.data.labels = crime_rates;
    crime_rate_chart.data.datasets[0].data = tourist_numbers;

    crime_rate_chart.update();
}

function inflation_rate_chart_update(base_tourists_number, inflation_rates, allow_negative_rate) {
    base_tourists_number = Number(base_tourists_number) || 1000;
    inflation_rates = JSON.parse(inflation_rates);

    if (!Array.isArray(inflation_rates)) {
        console.error("inflation_rates must be an array like [0,1,5]");
        return;
    }

    const tourist_numbers = inflation_rates.map(rate => {
        result = base_tourists_number * (1 - ((rate * 2) / 100))
        // You can't have negative tourists
        if (result < 0) result = 0

        if (result > base_tourists_number) {
            if (allow_negative_rate == false) {
                result = base_tourists_number
            }
        }

        return result
    });

    inflation_rate_chart.data.labels = inflation_rates;
    inflation_rate_chart.data.datasets[0].data = tourist_numbers;

    inflation_rate_chart.update();
}