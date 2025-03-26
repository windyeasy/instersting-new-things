<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()

const ctx = computed(() => el.value!.getContext('2d')!)

const WIDTH = 600
const HEIGHT = 600

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}
function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath()
  ctx.value.moveTo(p1.x, p1.y)
  ctx.value.lineTo(p2.x, p2.y)
  ctx.value.stroke()
}

function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}
function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

const pendingTasks: Function[] = []
function step(b: Branch, depth = 4) {
  const end = getEndPoint(b)
  drawBranch(b)

  if (depth > 0 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + Math.random() * 2 - 1,
      theta: b.theta + 0.2 * Math.random(),
    }, depth - 1))
  }

  if (depth > 0 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length + Math.random() * 2 - 1,
      theta: b.theta - 0.2 * Math.random(),
    }, depth - 1))
  }
}

function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(t => t())
}

let frameCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    frameCount++
    if (frameCount % 6 === 0)
      frame()
    startFrame()
  })
}
startFrame()

onMounted(() => {
  ctx.value.strokeStyle = '#666'

  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 20,
    theta: -Math.PI / 2,
  })
})
</script>

<template>
  <div flex justify-center mt-10>
    <canvas ref="el" width="600" height="600" border border-solid border-black />
  </div>
  <div class="description text-center mt-4 text-lg">
    from: <a class="link" href="https://www.bilibili.com/video/BV1ia411b7jY/?spm_id_from=333.999.0.0&vd_source=2e92372410e6a2961ab1498a2164aa7c">antfu bilibili video</a>
  </div>
</template>
