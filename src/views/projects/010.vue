<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()
const width = ref(0)
const height = ref(0)

function setCanvasWidthHeight() {
  width.value = window.innerWidth
  height.value = window.innerHeight

  el.value!.width = width.value
  el.value!.height = height.value
}

const ctx = computed(() => el.value!.getContext('2d')!)

interface Circle {
  center: {
    x: number
    y: number
  }
  radius: number
  color: string
  isStroke?: boolean
  mx: number
  my: number
}
function drawCircle(c: Circle) {
  ctx.value.beginPath()
  ctx.value.arc(c.center.x, c.center.y, c.radius, 0, 2 * Math.PI)
  if (c.isStroke) {
    ctx.value.strokeStyle = c.color
    ctx.value.stroke()
    ctx.value.closePath()
    return
  }
  ctx.value.fillStyle = c.color
  ctx.value.fill()
}

function genCircles(num: number) {
  const circles: Circle[] = []
  for (let i = 0; i < num; i++) {
    const x = Math.random() * width.value
    const y = Math.random() * height.value
    circles.push({
      center: { x, y },
      radius: Math.random() * 10,
      color: 'rgba(204, 204, 204, 0.3)',
      mx: Math.random(),
      my: Math.random(),
    })
  }

  return circles
}

interface Line {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
  color: string
}

function drawLine(l: Line) {
  ctx.value.beginPath()
  ctx.value.moveTo(l.start.x, l.start.y)
  ctx.value.lineTo(l.end.x, l.end.y)
  ctx.value.strokeStyle = l.color
  ctx.value.lineWidth = 1
  ctx.value.stroke()
  ctx.value.closePath()
}

function move(c: Circle) {
  let x = c.center.x + c.mx
  let y = c.center.y + c.my

  // 越界，反向移动
  if (x > width.value || x < 0) {
    c.mx = -c.mx
    x = c.center.x + c.mx
  }
  if (y > height.value || y < 0) {
    c.my = -c.my
    y = c.center.y + c.my
  }
  c.center = { x, y }
}

let circles: Circle[] = []
const activeCircle: Circle = {
  // 默认不在 canvas 内
  center: {
    x: -10,
    y: -10,
  },
  radius: 8,
  color: 'rgba(255, 77, 54, 0.6)',
  mx: 0,
  my: 0,
}

function drawLinkLine(c1: Circle, c2: Circle) {
  const lLength = Math.sqrt(
    (c1.center.x - c2.center.x) ** 2
    + (c1.center.y - c2.center.y) ** 2,
  )

  // 超过150px，不绘制
  if (lLength < 150) {
    const l = {
      start: c1.center,
      end: c2.center,
      color: 'rgba(204, 204, 204, 0.3)',
    }
    drawLine(l)
  }
}
function draw() {
  // 清理背景
  ctx.value.clearRect(0, 0, width.value, height.value)
  circles.forEach((c, i) => {
    move(c)
    drawCircle(c)
    // 连接圆
    for (let j = i + 1; j < circles.length; j++) {
      drawLinkLine(c, circles[j])
    }

    // 绘制鼠标移入的圆
    if (activeCircle.center.x !== -10) {
      drawCircle(activeCircle)

      // 画线连接到当前的圆
      for (let k = 1; k < circles.length; k++) {
        drawLinkLine(activeCircle, circles[k])
      }
    }
  })
}

function startFrame() {
  requestAnimationFrame(() => {
    draw()

    startFrame()
  })
}

function init() {
  setCanvasWidthHeight()
  circles = genCircles(60)
  startFrame()

  // 鼠标移入
  window.addEventListener('mousemove', (e: MouseEvent) => {
    activeCircle.center = {
      x: e.clientX,
      y: e.clientY,
    }
  })
  window.addEventListener('mouseout', () => {
    activeCircle.center = {
      x: -10,
      y: -10,
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="wrapper w-full h-[100vh]">
    <canvas ref="el" class="w-full h-full absolute left-0 top-0" />
  </div>
</template>
