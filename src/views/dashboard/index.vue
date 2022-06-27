<template>
  <div class="mainDev">
    <div class="left">222222222222</div>
    <div class="right">
      <div class="gird">3333333333333</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: 3
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style>
.mainDev {
  display: flex;
  width: 100%;
  height: 1000px;
}
.left {
  background: black;
  height: 1000px;
}
.gird {
  /* align-content: center;
  justify-content: center; */
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  flex: 1;
  display: grid;
  place-items: center;
  height: 1000px;
}
</style>