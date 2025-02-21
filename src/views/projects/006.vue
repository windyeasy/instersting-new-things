<script lang="ts" setup>
const textRef = ref<HTMLDivElement>()
const INTERVAL = 75

let timer: null | NodeJS.Timeout = null

function typewriter(el: Element, delay: number) {
  let progress = 0

  const str = el.innerHTML!
  el.innerHTML = ''
  function run() {
    const current = str.slice(progress, progress + 1)

    if (current === '<') {
      progress = str.indexOf('>', progress) + 1
    }
    else {
      progress++
    }

    const content = `${str.slice(0, progress)}_`
    el.innerHTML = content

    if (progress >= str.length) {
      timer && clearInterval(timer)
    }
  }

  timer = setInterval(() => {
    run()
  }, delay)
}

onMounted(() => {
  typewriter(textRef.value!, INTERVAL)
})
</script>

<template>
  <div class="wrapper w-[100vw] h-[100vh] bg-[#ffffee] py-[40px] box-border">
    <div ref="textRef" class="ml-[30vw] text-red box-border">
      <p class="p-0 m-0">
        <span>要是有些事我没说，</span><br>
        <span>地坛，</span><br>
        <span>你别以为是我忘了，</span><br>
        <span>我什么也没忘，</span><br>
        <span>但是有些事只适合收藏。</span><br>
        <span>不能说，</span><br>
        <span>也不能想，</span><br>
        <span>却又不能忘。</span><br>
        <span>它们不能变成语言，</span><br>
        <span>它们无法变成语言，</span><br>
        <span>一旦变成语言就不再是它们了。</span><br>
        <span>它们是一片朦胧的温馨与寂寥，</span><br>
        <span>是一片成熟的希望与绝望，</span><br>
        <span>它们的领地只有两处：</span><br>
        <span>心与坟墓。</span><br>
        <span>比如说邮票，</span><br>
        <span>有些是用于寄信的，</span><br>
        <span>有些仅仅是为了收藏。</span><br><br>
        <span class="say"><span class="space w-[200px] inline-block" /> -- 史铁生《我与地坛》</span>
      </p>
    </div>
  </div>
</template>
