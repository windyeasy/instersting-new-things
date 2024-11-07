<script lang="ts" setup>
const text = ref('')
const content = 'Hello, World!'
const DELAY = 200

let timer: null | NodeJS.Timeout = null
let i = 0
function textAnimation() {
  timer = setTimeout(() => {
    if (i >= content.length) {
      if (timer)
        clearTimeout(timer)
      return
    }
    text.value += content[i]

    i++
    textAnimation()
  }, DELAY)
}
onMounted(() => {
  textAnimation()
})
</script>

<template>
  <div>
    {{ text }}
  </div>
</template>

<style lang="scss" scoped></style>
