<script setup>
// import { ref } from 'vue';
import useWebData from './useSystemData';

const {
  webData, getWebInfo,
  editWebInfoClick,
} = useWebData();

getWebInfo();

</script>

<template>
  <div class="system-manage">
    <div class="head">
      <div class="title">
        {{ $route.meta.title }}
      </div>
    </div>
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
          <div class="form">
            <div class="option">
              <div class="label">
                网站名称
              </div>
              <div class="value">
                <el-input
                  v-model="webData.web_name"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                网站域名
              </div>
              <div class="value">
                <el-input
                  v-model="webData.domain_name"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                备案号
              </div>
              <div class="value">
                <el-input
                  v-model="webData.provider"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="seo设置">
          <div class="form">
            <div class="option">
              <div class="label">
                网站标题
              </div>
              <div class="value">
                <el-input
                  v-model="webData.title"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                关键字
              </div>
              <div class="value">
                <el-input
                  v-model="webData.keywords"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                网站描述
              </div>
              <div class="value">
                <el-input
                  v-model="webData.description"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系方式">
          <div class="form">
            <div class="option">
              <div class="label">
                联系人
              </div>
              <div class="value">
                <el-input
                  v-model="webData.user_name"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                手机号
              </div>
              <div class="value">
                <el-input
                  v-model="webData.phone"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                联系QQ
              </div>
              <div class="value">
                <el-input
                  v-model="webData.qq"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                微信号
              </div>
              <div class="value">
                <el-input
                  v-model="webData.wx_no"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                邮箱
              </div>
              <div class="value">
                <el-input
                  v-model="webData.email"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div class="option">
              <div class="label">
                联系地址
              </div>
              <div class="value">
                <el-input
                  v-model="webData.address"
                  style="width: 300px;"
                  placeholder="请输入内容"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="operation">
        <el-button
          type="primary"
          @click="editWebInfoClick(webData)"
        >
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.system-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  }
  .content{
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px;
    .form{
      width: 100%;
      min-height: 300px;
      margin-top: 15px;
      .option{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .label{
          width: 80px;
          color: #333;
          font-size: 14px;
        }
        .value{
          flex: 1;
          overflow: hidden;
        }
      }
    }
    .operation{
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
