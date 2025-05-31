<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'RainChart',
  extends: Line,
  props: {
    weatherData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '時間ごとの降水量'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: '降水量 (mm)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: '時間'
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    }
  },
  watch: {
    weatherData: {
      handler(newData) {
        if (newData) {
          const times = newData.time.map(time => {
            const date = new Date(time)
            return `${date.getHours()}:00`
          })
          
          this.renderChart({
            labels: times,
            datasets: [{
              label: '降水量 (mm)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1,
              data: newData.precipitation,
              fill: true
            }]
          }, this.chartOptions)
        }
      },
      immediate: true
    }
  }
}
</script> 