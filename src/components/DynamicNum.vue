<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  isLocale: {
    type: Boolean,
    default: true,
  },
  frequency: {
    type: Number,
    default: 15,
  },
});
const showNum = ref(0);
const dynamicNum = (val) => {
  if (val <= props.frequency) {
    showNum.value = val;
    return;
  }
  let num = 0;
  const interval = parseInt(val / props.frequency);
  const timer = setInterval(() => {
    num += interval;
    if (num >= val) {
      clearInterval(timer);
      showNum.value = props.isLocale ? val.toLocaleString() : val;
      return val;
    }
    showNum.value = props.isLocale ? num.toLocaleString() : num;
    return num;
  }, 60);
};
watch(() => props.num, () => {
  dynamicNum(props.num);
}, { immediate: true });
</script>

<template>
  <span>{{ showNum }}</span>
</template>

<style lang="less" scoped>

</style>
