<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()

const ctx = computed(() => el.value!.getContext('2d')!)
function exec(ctx: CanvasRenderingContext2D) {
  interface Point {
    x: number
    y: number
  }

  interface Line {
    start: Point
    end: Point
  }

  // 画线连起来的三角形
  function drawLine(l: Line) {
    ctx.beginPath()
    ctx.moveTo(l.start.x, l.start.y)
    ctx.lineTo(l.end.x, l.end.y)
    // Draw the Path
    ctx.stroke()
  }
  const startLine = {
    start: {
      x: 100,
      y: 100,
    },
    end: {
      x: 100,
      y: 200,
    },
  }

  drawLine(startLine)
  const twoLine = {
    start: startLine.end,
    end: {
      ...startLine.end,
      x: startLine.end.x + 100,
    },
  }

  drawLine(twoLine)

  const endLine = {
    start: twoLine.end,
    end: startLine.start,
  }

  drawLine(endLine)
}

onMounted(() => {
  exec(ctx.value)
})
</script>

<template>
  <div class="007 flex justify-center">
    <canvas ref="el" class="w-[400px] h-[400px] mt-20 border border-solid" height="400" width="400" />
  </div>
</template>

<style lang="scss" scoped></style>
