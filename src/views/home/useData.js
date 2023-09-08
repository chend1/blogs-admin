import { ref } from 'vue';
import {
  articleData,
  commentData,
  registerData,
  articleMonthData,
  commentMonthData,
  starMonthData,
  viewMonthData,
} from '@/api/index';
import { lineOption, pieOption, technologyList } from './data';

export default function useData() {
  const statisticData = ref({});
  const pieData = ref({});
  const lineData = ref({});
  // 获取文章数据
  const getArticleData = async () => {
    const res = await articleData();
    statisticData.value = res;
    const result = await commentData();
    statisticData.value.comments = result.total;
    // console.log(res);
  };
  // 获取用户数据
  const getRegisterData = async () => {
    const res = await registerData();
    let total = 0;
    const data = [];
    res.forEach((item) => {
      total += item.total;
      data.push({
        value: item.total,
        name: ['保密', '男', '女'][item.sex],
      });
    });
    statisticData.value.registerData = total;
    pieData.value = pieOption;
    pieData.value.series[0].data = data;
    pieData.value.title.text = '注册人数分析';
  };
  // 根据月份获取文章数据
  const getArticleDataByMonth = async () => {
    const pointTitle = ['发布量', '评论数', '收藏数', '浏览量'];
    const pointData = [];
    Promise.all([
      articleMonthData(),
      commentMonthData(),
      starMonthData(),
      viewMonthData(),
    ]).then((res) => {
      res.forEach((item, index) => {
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        item.forEach((option) => {
          data[option.month - 1] = option.count;
        });
        pointData.push({
          name: pointTitle[index],
          type: 'line',
          stack: 'Total',
          data,
        });
      });
      lineData.value = lineOption;
      lineData.value.legend.data = pointTitle;
      lineData.value.series = pointData;
    });
  };
  return {
    lineData,
    pieData,
    technologyList,
    statisticData,
    getArticleData,
    getRegisterData,
    getArticleDataByMonth,
  };
}
