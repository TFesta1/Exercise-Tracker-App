<script setup lang="ts">
    import ApexCharts from "apexcharts";
    import { ref, onMounted, computed, watchEffect } from 'vue'

    // Define a constant reference array of numbers
    const numbers = ref([] as number[])

    const title = ref('Squat Progress')



    const chartData = computed(() => {
        if (title.value == 'Squat Progress')
        {
            numbers.value = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10].reverse()
        }
        else if (title.value == 'Chest Press Progress')
        {
            numbers.value = [5, 10, 20, 40, 100]
        }
        else if (title.value == 'Deadlift Progress')
        {
            numbers.value = [5, 1, 20, 10, 30, 40, 50, 55, 50, 70]
        }

        return numbers.value
    })
    

    const chart = ref();
    const options = {
          series: [{
            name: "Session Duration",
            data: chartData.value
          },
        //   {
        //     name: "Page Views",
        //     data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        //   },
        //   {
        //     name: 'Total Visits',
        //     data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        //   }
        ],
          chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        title: { 
          text: '', /* Page Statistics */
          align: 'left'
        },
        legend: {
          tooltipHoverFormatter: function(val: number, opts: any) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
            '10 Jan', '11 Jan', '12 Jan'
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: number) {
                  return val + " (mins)"
                }
              }
            },
            // {
            //   title: {
            //     formatter: function (val: number) {
            //       return val + " per session"
            //     }
            //   }
            // },
            // {
            //   title: {
            //     formatter: function (val: number) {
            //       return val;
            //     }
            //   }
            // }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
        };
    
    function updateChart()
    {
        chart.value.updateSeries([
            {
            // name: 'Series 1',
            data: chartData.value
            }, 
            // {
            //     name: 'Series 2',
            //     data: [5, 10, 15, 20, 25]
            // }
        ])
    }


    onMounted(() => {
        chart.value = new ApexCharts(document.querySelector('#line-chart'), options)
        chart.value.render()
    })

    watchEffect(() => {
        if (chart.value instanceof ApexCharts)
        {
            

            // chart.value.serie
        }
           
    });


    
</script>

<template>

    <select class="selectOptions" v-model="title" @change="updateChart">
        <option>Squat Progress</option>
        <option>Chest Press Progress</option>
        <option>Deadlift Progress</option>
    </select>
    
    <div class="charts">
            <div class="charts-card">
            <p class="chart-title">{{ title }}</p>
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
    .selectOptions{
        width: 100px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin: 0 auto;
        /* margin-bottom: 20px; */
        position: absolute;
        top: 100px;
        left: 60%;
        transform: translate(-50%, 20%); /* X and Y axis */

    }
</style>