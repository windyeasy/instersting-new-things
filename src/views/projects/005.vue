<script lang="ts" setup></script>

<template>
  <div class="loading-wrapper flex flex-wrap m-t-4 justify-center">
    <div class="wrap  m-4 bg-black w-[300px] h-[300px] d-c-c">
      <div class="load1">
        loading
      </div>
    </div>
    <div class="wrap  m-4 bg-black w-[300px] h-[300px] d-c-c">
      <div class="load2">
        loading
      </div>
    </div>
    <div class="wrap  m-4 bg-black w-[400px] h-[300px]">
      <div class="load3">
        loading
      </div>
    </div>
    <div class="wrap  m-4 bg-black w-[300px] h-[300px] d-c-c">
      <div class="load4">
        loading
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-c-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.load1 {
  text-indent: -9999px;
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow: inset 0 0 0 14px #6FE;
  border-radius: 50%;
}

@keyframes load-effect {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.load1::before {
  position: absolute;
  content: "";
  width: 100px;
  height: 200px;
  border-radius: 0 200px 200px 0;
  left: 100px;
  background: black;
  animation: load-effect 2s infinite;
  transform-origin: 0 100px;
}

.load1::after {
  position: absolute;
  content: "";
  width: 200px;
  height: 200px;
  border-radius: 50%;
  left: 0;
  box-shadow: inset 0 0 0 14px rgb(255 255 255 / 30%);
}

.load2 {
  font-size: 0;
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow: inset 0 0 0 14px rgb(255 255 255 / 30%);
  border-radius: 50%;
  background: linear-gradient(to left,#fff 11%,rgb(255 255 255 / 0%) 50%);
  animation: load-effect 2s infinite;
}

.load2::before{
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 0 0 100px;
    content:'';
    top: 50%;
    left: 50%;
    background: #fff;
}
.load2::after{
    position: absolute;
    background: #000;
    width: 172px;
    height: 172px;
    border-radius: 50%;
    content:'';
    top: 14px;
    left: 14px;
}

.wrap:nth-child(3) {
  display: flex;
  align-items: center;
}

@keyframes load-effect-v2 {
  0% {
    box-shadow: 2em 0 0 0.8em #6FE, 5em  0 0 -0.1em rgb(102 255 138),  7.5em  0 0 -0.1em rgb(255 176 102),  10em  0 0 -0.3em rgb(255 102 245);
  }
  25% {
    box-shadow: 2em 0 0 -0.1em rgb(102 255 138),  5em   0 0 -0.1em rgb(255 176 102),  7.5em   0 0 -0.3em rgb(255 102 245) ,  10em  0 0 0.5em #6FE;
  }
  50% {
    box-shadow: 2em 0 0 -0.1em rgb(255 176 102),  5em 0 0 -0.3em rgb(255 102 245),  7.5em 0 0 0.5em #6FE,  10em 0 0 -0.1em rgb(102 255 138);
  }
  75% {
    box-shadow: 2em 0 0 -0.3em rgb(255 102 245),  5em  0 0 0.5em #6FE, 7.5em 0 0 -0.1em rgb(102 255 138),  10em 0 0 -0.1em rgb(255 176 102);
  }
  100% {
    box-shadow: 2em 0 0 0.5em #6FE, 5em 0 0 -0.1em rgb(102 255 138) , 7.5em 0 0 -0.1em rgb(255 176 102),  10em 0 0 -0.3em rgb(255 102 245);
  }
}

.load3 {
  text-indent: -9999px;
  position: relative;
  font-size: 33px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  animation: load-effect-v2 0.98s infinite linear;
}
</style>
