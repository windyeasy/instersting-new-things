<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()

const width = ref(0)
const height = ref(0)
const FONT_SIZE = 16

const ctx = computed(() => el.value!.getContext('2d')!)

function setCanvasSizeByWindowSize() {
  width.value = window.innerWidth
  height.value = window.innerHeight

  el.value!.width = width.value
  el.value!.height = height.value
}

function fillRect() {
  ctx.value.fillStyle = 'rgba(0,0,0, 0.05)'
  ctx.value.fillRect(0, 0, width.value, height.value)
}

interface Text {
  color: string
  text: string
  size: number
  start: {
    x: number
    y: number
  }
}
function drawText(t: Text) {
  ctx.value.fillStyle = t.color
  ctx.value.font = `${t.size}px Arial`
  ctx.value.fillText(t.text, t.start.x, t.start.y)
}

const drawsMap: Record<number, number> = {}
function run() {
  fillRect()
  const texts = '123456789'.split('')

  const drawsLength = width.value / FONT_SIZE

  for (let i = 0; i < drawsLength; i++) {
    const text = texts[Math.floor(Math.random() * texts.length)]
    drawsMap[i] = drawsMap[i] === undefined ? 0 : drawsMap[i] + 1
    const y = drawsMap[i] * FONT_SIZE
    if (y > height.value || Math.random() > 0.95) {
      drawsMap[i] = 0
    }

    drawText({
      text,
      color: `#0f0`,
      size: FONT_SIZE,
      start: {
        x: i * FONT_SIZE,
        y,
      },
    })
  }
}

let frameCount = 0
function animate() {
  if (frameCount % 3 === 0) {
    run()
  }
  frameCount++
  requestAnimationFrame(animate)
}
function init() {
  setCanvasSizeByWindowSize()
  animate()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="w-[100vw] h-[100vh] relative">
    <canvas ref="el" class="w-full h-full absolute left-0 top-0 bg-black" />
  </div>
</template>
