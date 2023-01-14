
function generateData(min, max) {

    var series = [];
    let startTime = new Date('10/02/2021'); // 01 October 2021
    let endTime = new Date('01/01/2023'); // 31 December 2022

    for (startTime; startTime <= endTime; startTime.setDate(startTime.getDate() + 1)) {
        series.push([new Date(startTime).getTime(), randomInRange(min, max)]);
    }

    return series;

}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

salesData = generateData(70, 80);
ordersData = generateData(60, 70);

function Chart() {
    function salesChart() {
        var options = {
            series: [
                {
                    name: "Sales",
                    data: salesData,
                }, {
                    name: "Oders",
                    data: ordersData,
                },
            ],
            chart: {
                type: 'line',
                toolbar: {
                    show: false
                },
                width: '100%',
                height: 380,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false,
                colors: ['#05b171', '#ff6e40']
            },
            stroke: {
                curve: 'smooth',
                colors: ['#ff6e40', '#05b171'],
                width: 4,
            },
            grid: {
                row: {
                    colors: ['transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                tickAmount: 4,
                type: "datetime",
                min: new Date("12/02/2022").getTime(), // 01 December 2022
                labels: {
                    format: 'dd MMMM',
                    style: {
                        colors: '#B8B8B8',
                        fontSize: '12px',
                    }
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#B8B8B8',
                        fontSize: '12px',
                    }
                }
            },
            colors: ['#ff6e40', '#05b171'],
            tooltip: {
                x: {
                    format: 'dd MMMM yyyy'
                }
            },
            legend: {
                fontSize: '14px',
                fontFamily: 'Poppins',
                itemMargin: {
                    horizontal: 22,
                },
                offsetX: 6,
                height: 30,
                markers: {
                    offsetX: -6,
                }
            },
        };

        var chart = new ApexCharts(document.querySelector("#sales-chart"), options, { toolbar: { show: false } });
        chart.render();

        const fillter = document.querySelector("#sales-date-picker");

        fillter.addEventListener("change", () => {
            chart.updateOptions({
                xaxis: {
                    min: new Date(fillter.value).getTime()
                }
            });
        });
    }

    function channelsChart() {
        var options = {
            series: [48, 30, 22],
            chart: {
                type: 'donut',
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                pie: {
                    customScale: 0.8,
                    donut: {
                        size: '35%'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    expandOnClick: false,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 0,
            },
            labels: ['Social Media', 'Google', 'Email'],
            legend: {
                show: false,
            },
            colors: ['#fd7e14', '#0DCAF0', '#6610F2'],

        };

        var chart = new ApexCharts(document.querySelector("#channels-chart"), options, { toolbar: { show: false } });
        chart.render();
    }

    function run() {
        salesChart();
        channelsChart();
    }

    return run();
}

Chart();