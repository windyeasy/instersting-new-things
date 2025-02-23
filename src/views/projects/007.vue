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

  function drawLine(l: Line) {
    ctx.beginPath()
    ctx.moveTo(l.start.x, l.start.y)
    ctx.lineTo(l.end.x, l.end.y)
    // Draw the Path
    ctx.stroke()
  }

  // 画线连起来的三角形, 实现一等边三角，给一个起点和一个长度
  interface Triangle {
    start: Point
    length: number
  }

  function drawTriangle(t: Triangle) {
    const { start, length } = t

    const l1: Line = {
      start: t.start,
      end: {
        x: start.x + length,
        y: start.y,
      },
    }

    const l2: Line = {
      start: l1.end,
      end: {
        x: start.x + length / 2,
        y: Math.sqrt(length ** 2 - (length / 2) ** 2) + t.start.y,
      },
    }

    drawLine(l1)
    drawLine(l2)
    const l3: Line = {
      start: l2.end,
      end: l1.start,
    }
    drawLine(l3)
  }

  drawTriangle({
    start: {
      x: 100,
      y: 100,
    },
    length: 200,
  })
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
