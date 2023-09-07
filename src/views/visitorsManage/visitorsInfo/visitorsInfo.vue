<script setup>
import { useRoute } from 'vue-router';
import {
  User,
  Location,
  Male,
  Female,
  OfficeBuilding,
} from '@element-plus/icons-vue';
import { visitorsInfo } from '@/api';
import { ref } from 'vue';

const route = useRoute();
console.log(route);
// 获取游客详情
const visitorsDetail = ref({});
const getVisitorsInfo = async () => {
  const res = await visitorsInfo({
    id: route.query.id,
  });
  visitorsDetail.value = res;
  console.log(res);
};
getVisitorsInfo();

const activeName = ref('first');
const handleClick = (tab) => {
  console.log(tab);
};
</script>

<template>
  <div class="visitors-info">
    <div class="head">
      <div class="title">
        游客详情
      </div>
    </div>
    <div class="content">
      <div class="info">
        <div class="avatar">
          <img
            :src="visitorsDetail.avatar"
            alt=""
          />
        </div>
        <div class="name">
          {{ visitorsDetail.name }}
        </div>
        <div class="description">
          {{ visitorsDetail.description }}
        </div>
        <div class="list">
          <div class="option">
            <div class="icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="value">
              {{ visitorsDetail.occupation }}
            </div>
          </div>
          <div class="option">
            <div class="icon">
              <el-icon><svg-icon name="Birthday" /></el-icon>
            </div>
            <div class="value">
              {{ visitorsDetail.birthday }}
            </div>
          </div>
          <div class="option">
            <div class="icon">
              <el-icon v-if="visitorsDetail.sex === 1">
                <Male />
              </el-icon>
              <el-icon v-if="visitorsDetail.sex === 2">
                <Female />
              </el-icon>
            </div>
            <div class="value">
              {{ visitorsDetail.sex === 1 ? '男' : '女' }}
            </div>
          </div>
          <div class="option">
            <div class="icon">
              <el-icon><svg-icon name="Tech" /></el-icon>
            </div>
            <div
              v-if="visitorsDetail.technology"
              class="value"
            >
              <span
                v-for="(item, index) in visitorsDetail.technology.split(',')"
                :key="index"
              >
                <el-tag :type="['', 'success', 'warning', 'info'][index % 3]">{{
                  item
                }}</el-tag>
              </span>
            </div>
          </div>
          <div class="option">
            <div class="icon">
              <el-icon><Location /></el-icon>
            </div>
            <div class="value">
              {{ visitorsDetail.address }}
            </div>
          </div>
          <div class="option">
            <div class="icon">
              <el-icon><OfficeBuilding /></el-icon>
            </div>
            <div class="value">
              {{ visitorsDetail.company }}
            </div>
          </div>
        </div>
        <div class="tag">
          <div class="title">
            个性标签
          </div>
          <div
            v-if="visitorsDetail.tags"
            class="tag-list"
          >
            <span
              v-for="item in visitorsDetail.tags.split(',')"
              :key="item"
            >
              <el-tag>
                {{ item }}
              </el-tag>
            </span>
          </div>
        </div>
      </div>
      <div class="form">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="更多信息"
            name="first"
          >
            <div class="base-info">
              <div class="option">
                <div class="label">
                  学历：
                </div>
                <div class="value">
                  {{ visitorsDetail.education }}
                </div>
              </div>
              <div class="option">
                <div class="label">
                  手机号：
                </div>
                <div class="value">
                  {{ visitorsDetail.phone }}
                </div>
              </div>
              <div class="option">
                <div class="label">
                  微信：
                </div>
                <div class="value">
                  {{ visitorsDetail.wx }}
                </div>
              </div>
              <div class="option">
                <div class="label">
                  Q Q：
                </div>
                <div class="value">
                  {{ visitorsDetail.qq }}
                </div>
              </div>
              <div class="option">
                <div class="label">
                  邮箱：
                </div>
                <div class="value">
                  {{ visitorsDetail.email }}
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane
            label="账号绑定"
            name="second"
          >
            账号绑定
          </el-tab-pane> -->
        </el-tabs>
      </div>
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
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex: 1;
    box-sizing: border-box;
    padding: 10px 0;
    .info {
      width: 500px;
      background-color: #fff;
      margin-right: 10px;
      border-radius: 3px;
      box-sizing: border-box;
      padding: 20px 50px;
      &:hover {
        box-shadow: 0 2px 12px #0000001a;
        transition: all 0.3s;
      }
      .avatar {
        width: 100%;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 22px;
        font-weight: 700;
        color: #555;
        text-align: center;
      }
      .description {
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        margin: 10px 0;
        padding: 0 0 10px;
        border-bottom: 1px solid #eee;
      }
      .list {
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        .option {
          display: flex;
          height: 35px;
          align-items: center;
          .icon {
            display: flex;
            align-items: center;
            font-size: 18px;
            margin-right: 5px;
          }
          .value {
            font-size: 14px;
            span {
              margin: 0 3px;
            }
          }
        }
      }
      .tag {
        margin: 15px 0 10px;
        font-size: 14px;
        font-weight: 700;
        .title {
          margin-bottom: 10px;
        }
        .tag-list {
          span {
            margin-right: 6px;
          }
        }
      }
    }
    .form {
      flex: 1;
      background-color: #fff;
      border-radius: 3px;
      box-sizing: border-box;
      padding: 20px 20px;
      &:hover {
        box-shadow: 0 2px 12px #0000001a;
        transition: all 0.3s;
      }
      .base-info {
        .option {
          display: flex;
          align-items: center;
          // margin-bottom: 10px;
          font-size: 14px;
          .label {
            width: 60px;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            text-align: justify;
            margin-right: 20px;
            &::after {
              content: '';
              display: inline-block;
              width: 100%;
              line-height: 0;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
