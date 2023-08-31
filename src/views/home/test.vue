<script setup></script>

<template>
  <div class="home">
    首页
    <div class="logo">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
      <div class="text">
        博
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .logo {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 100px auto;
    .one {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #8289dc, #8dbed6);
      border-radius: 69% 31% 19% 81% / 66% 83% 17% 34%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }
    .two {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #8289dc, #8dbed6);
      border-radius: 69% 31% 19% 81% / 66% 83% 17% 34%;
      position: absolute;
      top: -15px;
      left: 0;
      transform: rotateZ(60deg);
      opacity: 0.5;
    }
    .three {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #8289dc, #8dbed6);
      border-radius: 69% 31% 19% 81% / 66% 83% 17% 34%;
      position: absolute;
      top: 0;
      left: 0;
      transform: rotateZ(120deg);
      opacity: 0.5;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 80px;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>
