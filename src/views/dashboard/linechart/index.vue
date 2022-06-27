<template>
  <div class="charts" ref="charts">
    <!-- 准备好的容器 -->

    22222222222
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import echarts from "echarts";
export default {
  name: "lineChart",
  data() {
    return {};
  },
  mounted() {
    // 初始化echars实例
    let lineChart = echarts.init(this.$refs.charts);

    // 配置数据
    lineChart.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>