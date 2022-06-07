<template>
  <div id="app">
    <canvas ref="canvas" width="1000" height="800"></canvas>
  </div>
</template>

<script>
function dpr (value) {
  return value * window.devicePixelRatio
}

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      logo: null,
      // scaleX, skewY, skewX, scaleY, translateX, translateY
      matrix: [1, 0, 0, 1, 0, 0],
      point: {
        x: 0,
        y: 0
      },
      z: 1
    }
  },
  computed: {
    ctx () {
      return this.$refs.canvas.getContext('2d')
    }
  },
  methods: {
    draw () {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.clearRect(0, 0, dpr(1000), dpr(800))
      this.ctx.setTransform(...this.matrix)
      this.ctx.drawImage(this.logo, dpr(100), dpr(100))
    },
    handleMouseWheel (e) {
      this.zoom((-e.deltaY || e.wheelDeltaY) > 0 ? 1.1 : 1 / 1.1)
    },
    zoom (value) {
      this.z *= value
      this.matrix[0] = this.z // scale x
      this.matrix[3] = this.z // scale y
      this.matrix[4] = this.point.x - (this.point.x - this.matrix[4]) * value
      this.matrix[5] = this.point.y - (this.point.y - this.matrix[5]) * value
      this.draw()
    },
    handleMouseMove (e) {
      this.point.x = e.clientX
      this.point.y = e.clientY
    }
  },
  mounted () {
    dpr()
    const img = new Image()
    img.src = require('@/assets/img_cbti_banner.png')
    img.onload = () => {
      this.logo = img
      this.draw()
      this.$refs.canvas.addEventListener('wheel', this.handleMouseWheel)
    }
    this.$refs.canvas.addEventListener('mousemove', this.handleMouseMove)
  }
}
</script>

<style >
body, html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
canvas {
  height: 800px;
  width: 1000px;
  background-color: #f8f8f8;
}
</style>
