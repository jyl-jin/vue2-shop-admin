<template>
  <div>
    <!-- inline代表的是行内表单，一行可以放置多个 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <!-- v-model相当于绑定的：value -->
        <el-select
          v-model="formInline.category1Id"
          placeholder="请选择"
          @change="getOne"
          :disabled="isShow"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in listOne"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="formInline.category2Id"
          placeholder="请选择"
          @change="getTwo"
          :disabled="isShow"

        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in listTwo"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="formInline.category3Id"
          placeholder="请选择"
          @change="getAll"
          :disabled="isShow"

        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in listThr"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['isShow'],
  data() {
    return {
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      listOne: [],
      listTwo: [],
      listThr: [],
     
    };
  },
  mounted() {
    console.log(this);
    this.getOneClassList();
  },
  methods: {
    //获取一级列表
    async getOneClassList() {
      let res = await this.$API.attr.getOneClass();
      if (res.code == 200) {
        this.listOne = res.data;
      } else {
        return Promise.reject(new Error("一级faile"));
      }
    },
    // 选择一节列表获取二级列表
    async getOne() {
      // 点击一级列表的时候二级三级清空
      this.formInline.category2Id = "";
      this.formInline.category3Id = "";
      this.listTwo = [];
      this.listThr = [];
      console.log(this.formInline.category1Id);
      const { category1Id } = this.formInline;
      let res = await this.$API.attr.getTwoClass(category1Id);
      // console.log(res);
      if (res.code == 200) {
        this.listTwo = res.data;
      } else {
        return Promise.reject(new Error("list2 faile"));
      }
    },
    // 点击二级获取三级
    async getTwo() {
      // 点击二级清空三级
      this.formInline.category3Id = "";
      this.listThr = [];
      const { category2Id } = this.formInline;
      let res = await this.$API.attr.getThrClass(category2Id);
      if (res.code == 200) {
        this.listThr = res.data;
      } else {
        return Promise.reject(new Error("list3 faile"));
      }
    },
    // 获取总数据
    getAll() {
      console.log("all");
      const { formInline } = this;
      this.$emit("getThreeNum", formInline);
    },
  },
};
</script>

<style>
</style>