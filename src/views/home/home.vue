<script setup>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';
import DynamicNum from '@/components/DynamicNum.vue';
import useData from './useData';

const {
  statisticData,
  pieData,
  lineData,
  technologyList,
  getArticleData,
  getRegisterData,
  getArticleDataByMonth,
} = useData();
getArticleData();
getRegisterData();
getArticleDataByMonth();

// 初始化图表
onMounted(() => {
  const myPie = echarts.init(document.querySelector('.pie'));
  const myLine = echarts.init(document.querySelector('.line'));
  watch(() => pieData.value, () => {
    myPie.setOption(pieData.value);
    window.onresize = () => {
      myLine && myLine.resize();
      myPie && myPie.resize();
    };
  }, { immediate: true });

  watch(() => lineData.value, () => {
    console.log(666, lineData.value);
    myLine.setOption(lineData.value);
    window.onresize = () => {
      myLine && myLine.resize();
      myPie && myPie.resize();
    };
  }, { immediate: true });
});

</script>

<template>
  <div class="home">
    <ul class="data-list">
      <li>
        <div class="data">
          <div class="num">
            <DynamicNum :num="statisticData.views" />
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
            <DynamicNum :num="statisticData.comments" />
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
            <DynamicNum :num="statisticData.total" />
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
            <DynamicNum :num="statisticData.registerData" />
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
      <div class="line"></div>
      <div class="pie"></div>
    </div>
    <div class="bottom">
      <div class="option">
        <div class="title">
          使用技术
        </div>
        <div class="list">
          <ul>
            <li
              v-for="item in technologyList"
              :key="item.label"
            >
              <div class="label">
                {{ item.label }}
              </div>
              <div class="value">
                {{ item.value }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="option">
        <div class="title">
          源码地址
        </div>
        <div class="code-list">
          <ul>
            <li>
              <a
                target="_blank"
                href="https://github.com/chend1/blogs-admin"
              >
                管理后台源码地址：blogs-admin
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/chend1/blogs-api"
              >
                接口源码地址：blogs-api
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="option">
        <div class="title">
          版本信息
        </div>
        <div class="content">
          <div class="item">
            当前版本：v1.0.0
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.data-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 5px;
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
    .data {
      flex: 1;
      .num {
        font-size: 28px;
        font-weight: 700;
        color: #333;
      }
      .title {
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
    .comment {
      background-color: #ecf8e7;
    }
    .issue {
      background-color: #e1ffff;
    }
    .register {
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
  padding: 0 5px;
  .line {
    flex: 3;
    margin-right: 15px;
    background-color: #fff;
    min-height: 420px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px 2px 10px;
    &:hover {
      box-shadow: 0 2px 12px #0000001a;
      transition: all 0.3s;
    }
  }
  .pie {
    flex: 1;
    background-color: #fff;
    min-height: 420px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px 5px 0px;
    &:hover {
      box-shadow: 0 2px 12px #0000001a;
      transition: all 0.3s;
    }
  }
}
.bottom {
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  padding: 10px 5px;
  .option {
    flex: 1;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      box-shadow: 0 2px 12px #0000001a;
      transition: all 0.3s;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
      // background-color: #91cc75;
      color: #333;
      line-height: 40px;
      // padding: 0 10px;
      border-bottom: 1px solid #91cc75;
    }
    .content {
      margin-bottom: 10px;
      .item {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
    .list {
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        li {
          width: 50%;
          display: flex;
          align-items: center;
          line-height: 40px;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          .label {
            width: 160px;
            text-align: right;
            box-sizing: border-box;
            padding: 0 10px;
            // background-color: #91cc75;
            // color: #fff;
            background-color: #f7f7f7;
            // background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
            // color: #fff;
          }
          .value {
            flex: 1;
            box-sizing: border-box;
            padding: 0 10px;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
    .code-list {
      ul {
        li {
          width: 100%;
          line-height: 40px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
