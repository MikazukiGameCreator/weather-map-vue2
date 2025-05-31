<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

// デフォルトアイコンの問題を解決
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'WeatherMap',
  data() {
    return {
      map: null,
      debounceTimer: null,
      currentMarker: null,
      lastClickTime: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([35.682839, 139.759455], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)

      this.map.on('click', this.debounceHandleClick)
    },
    debounceHandleClick(e) {
      const now = Date.now()
      const { lat, lng } = e.latlng

      // 初回クリックまたは前回のクリックから十分時間が経過している場合は即時実行
      if (!this.lastClickTime || (now - this.lastClickTime) > 1000) {
        this.handleWeatherRequest(lat, lng)
      } else {
        // 連続クリックの場合はデバウンス
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        
        this.debounceTimer = setTimeout(() => {
          this.handleWeatherRequest(lat, lng)
        }, 300)
      }

      this.lastClickTime = now
    },
    async handleWeatherRequest(lat, lng) {
      console.log(`クリック地点: 緯度 ${lat}, 経度 ${lng}`)

      // 既存のマーカーを削除
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker)
      }

      // 新しいマーカーを追加
      this.currentMarker = L.marker([lat, lng]).addTo(this.map)

      try {
        const data = await this.getRainAPI(lat, lng)
        console.log('API Response Data:', {
          time: data.time,
          precipitation: data.precipitation,
          timeLength: data.time.length,
          precipitationLength: data.precipitation.length
        })
        this.$emit('weather-data', data)
      } catch (error) {
        console.error('天気データの取得に失敗しました:', error)
      }
    },
    async getRainAPI(lat, lng) {
      try {
        const config = {
          params: {
            latitude: lat,
            longitude: lng,
            hourly: 'precipitation'
          }
        }
        const res = await axios.get('https://api.open-meteo.com/v1/forecast', config)
        return res.data.hourly
      } catch (error) {
        console.error('APIエラー:', error)
        throw error
      }
    }
  },
  beforeDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    // マーカーの削除
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker)
    }
  }
}
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100vw;
  position: relative;
}

#map {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style> 