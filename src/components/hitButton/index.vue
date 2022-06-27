<template>
  <a :title="title">
      <el-button v-bind="$attrs" ></el-button>
  </a>
</template>
<!-- v-bind="$attrs"可以接受所有来自于传递过来的参数，props声明的除外 -->
<!-- v-on="listeners"可以接收所有来自父组件的事件 -->
<script>
export default {
    name:'HitButton',
    props:['title']

}
</script>

<style>

</style>