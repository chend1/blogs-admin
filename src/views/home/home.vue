<script setup></script>

<template>
  <div class="home">
    <ul class="data-list">
      <li>
        <div class="data">
          <div class="num">
            5946156
          </div>
          <div class="title">
            文章阅读量
          </div>
        </div>
        <div class="icon">
          <svg-icon name="Read" />
        </div>
      </li>
      <li>
        <div class="data">
          <div class="num">
            5946156
          </div>
          <div class="title">
            文章评论条数
          </div>
        </div>
        <div class="icon comment">
          <svg-icon name="Comment" />
        </div>
      </li>
      <li>
        <div class="data">
          <div class="num">
            5946156
          </div>
          <div class="title">
            文章发布量
          </div>
        </div>
        <div class="icon issue">
          <svg-icon name="Issue" />
        </div>
      </li>
      <li>
        <div class="data">
          <div class="num">
            5946156
          </div>
          <div class="title">
            用户注册量
          </div>
        </div>
        <div class="icon register">
          <svg-icon name="Register" />
        </div>
      </li>
    </ul>
    <div class="middle">
      <div class="line">
        用户新增数量
      </div>
      <div class="pie">
        数据统计
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
.data-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 5px 0;
  li {
    width: calc(25% - 10px);
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .data{
      flex: 1;
      .num{
        font-size: 28px;
        font-weight: 700;
        color: #333;
      }
      .title{
        font-size: 14px;
        color: #666;
        margin-top: 10px;
      }
    }
    .icon {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #ecf5ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
    }
    .comment{
      background-color: #ecf8e7;
    }
    .issue{
      background-color: #e1ffff;
    }
    .register{
      background-color: #fef0f0;
    }
    &:hover {
      box-shadow: 0 2px 12px #0000001a;
      transition: all 0.3s;
    }
  }
}
.middle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .line {
    flex: 3;
    margin-right: 10px;
    background-color: #fff;
    min-height: 420px;
    border-radius: 5px;
  }
  .pie {
    flex: 1;
    background-color: #fff;
    min-height: 420px;
    border-radius: 5px;
  }
}
</style>
