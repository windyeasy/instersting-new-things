<script lang="ts" setup>
function shake() {
  const el = document.body
  const timer = setInterval(() => {
    const radomX = Math.floor(Math.random() * 21) - 10
    const radomY = Math.floor(Math.random() * 21) - 10

    el.style.transform = `translate(${radomX}px, ${radomY}px)`
    el.style.height = '100vh'
  }, 50)

  setTimeout(() => {
    clearInterval(timer)
    alert('done')
    el.style.transform = 'none'
    el.style.height = 'none'
  }, 3000)
}

function zoomText() {
  const el = document.body
  const timer = setInterval(() => {
    const randomScale = Math.random()
    el.style.transform = `scale(${randomScale})`
  }, 1000)

  setTimeout(() => {
    clearInterval(timer)
    el.style.transform = 'scale(1)'
    shake()
  }, 4000)
}

onMounted(() => {
  zoomText()
})
</script>

<template>
  <div class="008 font-bold text-lg w-[900px] mx-auto">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nam et eum beatae error amet laborum est neque doloribus voluptates fuga, nisi dolorem ut corporis voluptas id eveniet vitae nemo.
  </div>
</template>
