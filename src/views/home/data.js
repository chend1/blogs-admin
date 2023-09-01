// 文章数据统计 折线图
export const lineOption = {
  title: {
    text: '文章数据统计',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['发布量', '评论量', '阅读量', '收藏量'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '发布量',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
    },
    {
      name: '评论量',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
    },
    {
      name: '阅读量',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410],
    },
    {
      name: '收藏量',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330, 320],
    },
  ],
};
// 注册用户统计 饼图
export const pieOption = {
  title: {
    text: '用户注册性别分析',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' },
        { value: 735, name: '未知' },
      ],
    },
  ],
};

// 技术列表
export const technologyList = [
  {
    label: 'vite',
    value: '^4.3.9',
  },
  {
    label: 'Vue',
    value: '^3.2.47',
  },
  {
    label: 'pinia',
    value: '^2.0.34',
  },
  {
    label: 'vue-router',
    value: '4',
  },
  {
    label: 'element-plus',
    value: '^2.3.6',
  },
  {
    label: 'axios',
    value: '^1.4.0',
  },

  {
    label: 'echarts',
    value: '^5.4.3',
  },
  {
    label: '其他技术',
    value: '......',
  },
];
