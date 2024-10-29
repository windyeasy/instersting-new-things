<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()

const canvasWidth = ref(0)
const canvasHeight = ref(0)

const ctx = computed(() => el.value!.getContext('2d')!)

interface Point {
  x: number
  y: number
}

interface Snow {
  center: Point
  radius: number
  alpha: number
  move: {
    x: number
    y: number
  }
}

function drawSnow(snow: Snow) {
  ctx.value.fillStyle = `rgba(255, 255, 255, ${snow.alpha})`
  ctx.value.beginPath()
  ctx.value.arc(snow.center.x, snow.center.y, snow.radius, 0, 2 * Math.PI)
  ctx.value.closePath()
  ctx.value.fill()
}

function setCanvasSize() {
  const width = window.innerWidth
  const height = window.innerHeight
  const canvas = el!.value!
  canvas.width = width
  canvas.height = height

  canvasWidth.value = width
  canvasHeight.value = height
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function getSnows(number: number) {
  const snows: Snow[] = []
  for (let i = 0; i < number; i++) {
    snows.push({
      center: {
        x: Math.random() * canvasWidth.value,
        y: Math.random() * canvasHeight.value,
      },
      radius: random(1, 5),
      alpha: random(0.3, 1),
      move: {
        x: random(-0.35, 0.35),
        y: random(0.75, 1.5),
      },
    })
  }

  return snows
}

function moving(snow: Snow) {
  snow.center.x += snow.move.x
  snow.center.y += snow.move.y

  if (snow.center.x >= canvasWidth.value) {
    snow.center.x = Math.random() * canvasWidth.value
    snow.center.y = 0
  }
  if (snow.center.y > canvasHeight.value) {
    snow.center.x = Math.random() * canvasWidth.value
    snow.center.y = 0
  }

  drawSnow(snow)
}

function animate(snows: Snow[]) {
  function frame() {
    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    snows.forEach(snow => moving(snow))
    requestAnimationFrame(frame)
  }
  frame()
}

function init() {
  const snows = getSnows(500)
  animate(snows)
}

onMounted(() => {
  setCanvasSize()

  init()
})
</script>

<template>
  <div class="wrapper">
    <canvas id="canvas" ref="el" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-image: url("@/assets/imgs/winterForest.png");
  background-repeat: repeat-x;
  background-position: bottom center;
  background-color: #133D7C;
  width: 100vw;
  height: 100vh;
  position: relative;
}

#canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
