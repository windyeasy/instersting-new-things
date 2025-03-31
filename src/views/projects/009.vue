<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()

const WIDTH = 300
const HEIGHT = 300
const BG_RADIUS = 130

const ctx = computed(() => el.value!.getContext('2d')!)

interface Circle {
  center: {
    x: number
    y: number
  }
  color: string
  radius: number
}

function drawCircle(c: Circle) {
  ctx.value.beginPath()
  ctx.value.fillStyle = c.color
  ctx.value.arc(c.center.x, c.center.y, c.radius, 0, 2 * Math.PI)
  ctx.value.fill()
}
function drawBg() {
  if (!ctx.value)
    return
  ctx.value.clearRect(0, 0, WIDTH, HEIGHT)

  //
  ctx.value.save()
  ctx.value.translate(WIDTH / 2, HEIGHT / 2)
  drawCircle({
    center: { x: 0, y: 0 },
    color: 'white',
    radius: BG_RADIUS,
  })
  ctx.value.restore()
}

function toCenterAndExec(fn: Function | null) {
  ctx.value.save()
  ctx.value.translate(WIDTH / 2, HEIGHT / 2)
  fn && fn()
  ctx.value.restore()
}

function drawNumbers() {
  toCenterAndExec(() => {
    const numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
    for (let i = 0; i < numbers.length; i++) {
      const angle = (i / numbers.length) * Math.PI * 2
      const x = Math.cos(angle) * 100
      const y = Math.sin(angle) * 100

      ctx.value.save()

      ctx.value.font = '30px Fangsong'
      ctx.value.textAlign = 'center'
      ctx.value.textBaseline = 'middle'
      ctx.value.fillText(String(numbers[i]), x, y)

      ctx.value.restore()
    }
  })
}

interface Hand {
  length: number
  color: string
  lineWidth: number
}
function drawHand(h: Hand, fn: Function | null = null) {
  toCenterAndExec(() => {
    ctx.value.save()
    fn && fn()

    ctx.value.beginPath()
    ctx.value.lineWidth = h.lineWidth
    ctx.value.strokeStyle = h.color
    ctx.value.lineCap = 'round'
    ctx.value.moveTo(0, 0)
    ctx.value.lineTo(0, -h.length)

    ctx.value.stroke()
    ctx.value.restore()
  })
}

// hour hand
function drawHands() {
  const time = new Date()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  // hour hand
  drawHand({
    length: 40,
    color: 'black',
    lineWidth: 6,
  }, () => {
    ctx.value.rotate(
      Math.PI * 2 / 12 * hour
      + Math.PI * 2 / 12 / 60 * minute
      + Math.PI * 2 / 12 / 60 / 60 * second,
    )
  })

  // 绘制分针
  drawHand({
    length: 60,
    color: 'black',
    lineWidth: 3,

  }, () => {
    ctx.value.rotate(
      Math.PI * 2 / 60 * minute
      + Math.PI * 2 / 60 / 60 * second,
    )
  })

  // 绘制秒针
  drawHand({
    length: 80,
    color: 'red',
    lineWidth: 1,
  }, () => {
    ctx.value.rotate(
      Math.PI * 2 / 60 * second,
    )
  })
}

function drawRotateLine(num: number, lineLine: number, lineWidth: number = 4) {
  for (let i = 0; i < num; i++) {
    ctx.value.save()

    ctx.value.rotate(2 * Math.PI / num * i)
    ctx.value.translate(0, -BG_RADIUS)
    ctx.value.beginPath()
    ctx.value.lineWidth = lineWidth
    ctx.value.moveTo(0, 0)
    ctx.value.lineTo(0, lineLine)

    ctx.value.stroke()
    ctx.value.restore()
  }
}
function drawAScale() {
  toCenterAndExec(() => {
    // 绘制时针刻度
    drawRotateLine(12, 10)
    // 绘制分针刻度
    drawRotateLine(60, 6, 1)
  })
}

function startFrame() {
  requestAnimationFrame(() => {
    init()
    startFrame()
  })
}

function drawCenterBg() {
  toCenterAndExec(() => {
    ctx.value.save()
    drawCircle({
      center: {
        x: 0,
        y: 0,
      },
      radius: 8,
      color: 'black',
    })
    drawCircle({
      center: {
        x: 0,
        y: 0,
      },
      radius: 5,
      color: '#808080',
    })
    ctx.value.restore()
  })
}

function init() {
  if (!ctx.value)
    return
  ctx.value.save()

  // 绘制前景
  drawBg()
  // 绘制数字
  drawNumbers()
  // 绘制刻度
  drawAScale()
  // 绘制时、分秒针
  drawHands()

  // 绘制中心点
  drawCenterBg()

  ctx.value.restore()
}

onMounted(() => {
  startFrame()
})
</script>

<template>
  <div w-300px h-300px bg-black rounded-30px>
    <canvas ref="el" width="300" height="300" />
  </div>
</template>
