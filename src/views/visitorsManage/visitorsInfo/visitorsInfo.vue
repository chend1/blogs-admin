<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route);
</script>

<template>
  <div class="visitors-info">
    <div class="head">
      <div class="title">
        {{ route.query.title }}
      </div>
    </div>
    <div class="content">
      <div class="info"></div>
      <div class="form"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.visitors-info {
  width: 100%;
  height: 100%;
  // background-color: #fff;
  box-sizing: border-box;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    color: #333;
    background-color: #fff;
  }
}
</style>
