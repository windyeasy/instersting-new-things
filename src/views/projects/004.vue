<script lang="ts" setup>
const panelInfo = reactive({
  level: 1,
  score: 0,
})
</script>

<template>
  <div class="snake w-[402px] p-[20px] bg-emerald mx-auto mt-6 rounded-lg">
    <div class="game-area w-full h-[352px] mx-auto border border-solid">
      <div class="snake-body">
        <div class="w-[10px] h-[10px] box-border  border border-solid border-emerald bg-black" />
      </div>
      <div class="food flex w-[10px] flex-wrap">
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
        <div class="w-[5px] h-[5px] bg-black rotate-45" />
      </div>
    </div>
    <div class="panel flex pt-4 justify-between text-lg">
      <div class="level">
        level: {{ panelInfo.level }}
      </div>
      <div class="score">
        score: {{ panelInfo.score }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
