<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: '2fc3f4c37d30bd0b4cdecb85ed8c249f'
    }
  },
  watch: {
    point: function (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
}
</script>
