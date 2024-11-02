<script lang="ts" setup>
const WIDTH = 400
const HEIGHT = 350

interface Point {
  x: number
  y: number
}

const scorePanel = reactive({
  level: 1,
  score: 0,
})

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + 1) + min
}

function getRandomPoint() {
  const point: Point = {
    x: random(0, (WIDTH - 10) / 10) * 10,
    y: random(0, (HEIGHT - 10) / 10) * 10,
  }

  return point
}

const food = ref<Point>({ x: 0, y: 0 })
function getNewFood() {
  food.value = getRandomPoint()
}

interface Snake {
  head: Point
  bodies: Point[]
  direction: string
  interval: number
  isAlive: boolean
  move: {
    x: number
    y: number
  }
}

const snake: Snake = reactive({
  head: { x: 0, y: 0 },
  isAlive: true,
  bodies: [],
  direction: 'right',
  interval: 200,
  move: {
    x: 10,
    y: 10,
  },

})

function moveBody() {
  for (let i = snake.bodies.length - 1; i > 0; i--) {
    const body = snake.bodies[i]
    const preBody = snake.bodies[i - 1]
    body.x = preBody.x
    body.y = preBody.y
  }
}

function snakeEat() {
  if (snake.head.x === food.value.x && snake.head.y === food.value.y) {
    snake.bodies.push({
      x: snake.bodies[snake.bodies.length - 1].x,
      y: snake.bodies[snake.bodies.length - 1].y,
    })
    getNewFood()
    scorePanel.score++
    if (scorePanel.score % 10 === 0) {
      if (scorePanel.level < 10) {
        scorePanel.level++
        snake.interval -= 10
      }
    }
  }
}

// Detection of snake head collision body
function checkHeadBody() {
  for (let i = 1; i < snake.bodies.length; i++) {
    if (snake.head.x === snake.bodies[i].x && snake.head.y === snake.bodies[i].y) {
      alert('game over')
      snake.isAlive = false
    }
  }
}

// Check whether the snake is out of the box
function checkArea(current: number, move: number, max: number) {
  const value = current + move

  if (value < 0 || value > max) {
    snake.isAlive = false
    alert('Game Over')
    return current
  }

  moveBody()
  return value
}

function move() {
  //
  snakeEat()
  if (!snake.isAlive)
    return

  switch (snake.direction) {
    case 'left':
      snake.head.x = checkArea(snake.head.x, -snake.move.x, WIDTH - 10)
      break
    case 'right':
      snake.head.x = checkArea(snake.head.x, snake.move.x, WIDTH - 10)
      break
    case 'up':
      snake.head.y = checkArea(snake.head.y, -snake.move.y, HEIGHT - 10)
      break

    case 'down':
      snake.head.y = checkArea(snake.head.y, snake.move.y, HEIGHT - 10)
      break
  }
  checkHeadBody()
  setTimeout(move, snake.interval)
}

function getInitFood() {
  getNewFood()

  if (food.value.x === 0 && food.value.y === 0) {
    getInitFood()
  }
}

enum Direction {
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
}

function handlerKeydown(e: KeyboardEvent) {
  switch (e.code) {
    case Direction.LEFT:
      if (snake.direction === 'right')
        return
      snake.direction = 'left'
      break
    case Direction.UP:
      if (snake.direction === 'down')
        return
      snake.direction = 'up'
      break
    case Direction.RIGHT:
      if (snake.direction === 'left')
        return
      snake.direction = 'right'
      break
    case Direction.DOWN:
      if (snake.direction === 'up')
        return
      snake.direction = 'down'
      break
  }
}

function init() {
  // init head
  snake.bodies.push(snake.head)
  getInitFood()

  // add event
  document.addEventListener('keydown', handlerKeydown)
  move()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="snake w-[402px] p-[20px] bg-emerald mx-auto mt-6 rounded-lg">
    <div class="game-area w-full h-[352px] mx-auto border border-solid relative">
      <div class="snake-body">
        <template v-for="(item, _) in snake.bodies" :key="_">
          <div
            class="w-[10px] h-[10px] box-border absolute  border border-solid border-emerald bg-black"
            :style="{ left: `${item.x}px`, top: `${item.y}px` }"
          />
        </template>
      </div>
      <div class="food flex w-[10px] flex-wrap absolute" :style="{ left: `${food.x}px`, top: `${food.y}px` }">
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
      </div>
    </div>
    <div class="panel flex pt-4 justify-between text-lg">
      <div class="score">
        score: {{ scorePanel.score }}
      </div>
      <div class="level">
        level: {{ scorePanel.level }}
      </div>
    </div>
  </div>
</template>
