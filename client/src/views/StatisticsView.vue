<script setup lang="ts">
    import ApexCharts from "apexcharts";
    import { ref, onMounted } from 'vue'
    const chart = ref();
    const options = {
        chart: {
            height: 350,
            type: "line",
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        series: [
            {
            name: "Series A",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
            },
            {
            name: "Series B",
            data: [20, 29, 37, 36, 44, 45, 50, 58]
            }
        ],
        stroke: {
            width: [4, 4]
        },
        plotOptions: {
            bar: {
            columnWidth: "20%"
            }
        },
        xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yaxis: [
            {
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
                color: "#FF1654"
            },
            labels: {
                style: {
                colors: "#FF1654"
                }
            },
            title: {
                text: "Series A",
                style: {
                color: "#FF1654"
                }
            }
            },
            {
            opposite: true,
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
                color: "#247BA0"
            },
            labels: {
                style: {
                colors: "#247BA0"
                }
            },
            title: {
                text: "Series B",
                style: {
                color: "#247BA0"
                }
            }
            }
        ],
        tooltip: {
            shared: false,
            intersect: true,
            x: {
            show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
        };

    onMounted(() => {
      chart.value = new ApexCharts(document.querySelector('#line-chart'), options)
      chart.value.render()
    })


    
</script>

<template>
    
    <div class="charts">
            <div class="charts-card">
            <p class="chart-title">Squat Weight Progress</p>
            <div id="line-chart"></div>
        </div>
    </div>
    
    

</template>

<style>
    .charts-card {
        width: 50%;
        height: 100%;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute; /* or position: fixed; */
        left: 60%;
        transform: translate(-50%, 800%); /* X and Y axis */
    }
    .chart-title {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 20px;
    }
    
    #line-chart {
        width: 100%;
        height: 100%;
    }
</style>