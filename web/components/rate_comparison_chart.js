// Rate Comparison Chart

class RateComparisonChart extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./main.css" />
            <div style="display: flex; gap: 8px;">
                <form>
                    <p><b>Configure Graph</b></p>
                    <div style="display: flex; flex-direction: column; gap: 1px; margin-top: 12px;">
                        <p style="margin: 0;">Base no. of tourists</p>
                        <input type="number" placeholder="Default: 1000" data-role="base" />
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1px; margin-top: 12px;">
                        <p style="margin: 0;">${this.getAttribute("rate_name")}</p>
                        <input type="text" placeholder="[0, 1, 5] etc." data-role="rates" />
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 4px; margin-top: 12px;">
                        <p style="margin: 0;">Allow tourist no. increase (e.g. negative rate)?</p>
                        <input type="checkbox" data-role="allow_increase" />
                    </div>
                    <button type="button" style="margin-top: 12px; width: 100%;">Graph</button>
                    <p id="error_msg"></p>
                </form>
                <div>
                    <canvas id=${this.getAttribute("graph_id")}></canvas>
                </div>
            </div>
        `

        const button = this.shadowRoot.querySelector("button");
        button.addEventListener("click", () => {
            const base = this.shadowRoot.querySelector('[data-role="base"]').value;
            const rates = this.shadowRoot.querySelector('[data-role="rates"]').value;
            const allow = this.shadowRoot.querySelector('[data-role="allow_increase"]').checked;

            this.chartUpdate(base, rates, allow, this.calculate, this.rate_chart);
        });

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

        this.error_msg = this.shadowRoot.querySelector("#err_msg");
        this.rate_chart = new Chart(this.shadowRoot.querySelector("canvas"), {
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
    }

    chartUpdate(base_tourists_number, rates, allow_negative_rate, calculate) {
        base_tourists_number = Number(base_tourists_number) || 1000;
        rates = JSON.parse(rates);

        if (!Array.isArray(rates)) {
            this.error_msg.value = "Please enter valid values.";
            return;
        }

        const tourist_numbers = rates.map(rate => {
            var result = calculate(base_tourists_number, rate)
            // You can't have negative tourists
            if (result < 0) result = 0

            if (result > base_tourists_number) {
                if (allow_negative_rate == false) {
                    result = base_tourists_number
                }
            }

            return result
        });

        this.rate_chart.data.labels = rates;
        this.rate_chart.data.datasets[0].data = tourist_numbers;

        this.rate_chart.update();
    }
}

customElements.define("rate-comparison-chart", RateComparisonChart);