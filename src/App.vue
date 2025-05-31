<template>
  <div id="app">
    <h2 class="title">クリック位置の雨量をグラフ化！</h2>
    <weather-map @weather-data="handleWeatherData" />
    <rain-chart class="chart-display" :weather-data="currentWeatherData" />
  </div>
</template>

<script>
import WeatherMap from './components/WeatherMap.vue'
import RainChart from './components/RainChart.vue'

export default {
  name: 'App',
  components: {
    WeatherMap,
    RainChart
  },
  data() {
    return {
      currentWeatherData: null
    }
  },
  methods: {
    handleWeatherData(data) {
      this.currentWeatherData = data
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  position: relative;
  margin: 0;
  padding: 0;
}

.title {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  padding: 6px 12px;
  font-size: 1.2em;
  border: 2px solid #333;
  margin: 0;
}

.chart-display {
  position: absolute !important;
  top: 16px;
  right: 8px;
  width: 35% !important;
  height: 35% !important;
  background-color: white;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
