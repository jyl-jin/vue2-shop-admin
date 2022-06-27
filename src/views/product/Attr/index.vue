<!-- 三级联动 -->
<template>
  <div>
    <el-card>
      <CategorySelect @getThreeNum="getThreeNum" :isShow="!proShow"></CategorySelect>
    </el-card>
    <el-card>
      <div v-if="proShow">
        <el-button
          type="primary"
          @click="addPro"
          :disabled="!productList.length"
          >添加</el-button
        >
        <el-table :data="productList" stripe style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="280"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性值列表">
            <template slot-scope="{ row }">
              <!-- {{row}} -->
              <el-tag
                type="success"
                v-for="proItem in row.attrValueList"
                :key="proItem.id"
                style="margin: 3px 20px"
                >{{ proItem.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="updateRow(row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card v-if="!proShow">
      <el-form :model="attrForm" label-width="80px">
        <el-form-item label="属性名">
          <el-input
            v-model="attrForm.attrName"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        icon="el-icon-plus"
        size="medium"
        :disabled="!attrForm.attrName"
        @click="addAttrName"
        >添加属性值</el-button
      >
      <el-button @click="noAdd">取消</el-button>
      <el-table
        :data="attrForm.attrValueList"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="" label="属性值列表">
          <template slot-scope="{ row, $index }">
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性名"
              :ref="$index"
              size="mini"
              v-if="row.flag"
              @blur="sellBlur(row)"
              @keyup.native.enter="sellBlur(row)"
            ></el-input>
            <span
              v-else
              @click="showFlag(row, $index)"
              style="display: block"
              >{{ row.valueName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteList($index)">
              <el-button type="danger" icon="el-icon-delete" slot="reference" ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addUpdateAttr" :disabled="!attrForm.attrValueList.length>0">保存</el-button>
      <el-button @click="noAdd">取消</el-button>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      catId: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      productList: [],
      // 傻逼扶贫列表展示
      proShow: true,
      // 收集添的数据  或者修改
      attrForm: {
        attrName: "", //属性名就是表单的输入框
        attrValueList: [
          //属性名中的属性值   比如颜色拉id拉，是一个数组
          //   {
          //     attrId: 0,
          //     valueName: "",
          //   },
        ],
        categoryId: 0, //category3Id
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 获取展示数据
    async getThreeNum(datas) {
      this.catId = { ...datas };
      const { category1Id, category2Id, category3Id } = this.catId;
      let res = await this.$API.attr.getProductList(
        category1Id,
        category2Id,
        category3Id
      );
      console.log(res.code);
      if (res.code == 200) {
        this.productList = res.data;
      } else {
        return Promise.reject(new Error("productList Faile"));
      }
    },
    // 点击添加，商品消失
    addPro() {
      this.proShow = false;
    },
    // 取消添加
    noAdd() {
      this.proShow = true;
      this.attrForm = {
        attrName: "", //属性名就是表单的输入框
        attrValueList: [
          //属性名中的属性值   比如颜色拉id拉，是一个数组
          {
            attrId: 0,
            valueName: "",
          },
        ],
        categoryId: this.catId.category3Id, //category3Id
        categoryLevel: 3,
      };
    },
    // 添加属性名   dianji的时候  想那个数组里面添加
    addAttrName() {
      this.attrForm.attrValueList.push({
        // 新增的时候是没有id的，但是修改的话是有的，在重新赋值下就好
        attrId: this.attrForm.attrValueList.attrId || undefined,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrForm.attrValueList.length - 1].focus();
      });
    },
    // 修改   的时候要加上flag属性，但是不能直接加，直接加的话不是响应式数据，用$set添加
    // $set(item,'属性名'，属性值)ex$set(item,'flag'，true)
    updateRow(row) {
      console.log(row);
      this.proShow = false;
      //  zhege 就相当于浅拷贝，但是数据里面的解构有多层，要用浅拷贝
      //  this.attrForm={...row}
      // 深拷贝
      //  this.attrForm=JSON.parse(JSON.stringify(row))
      // lodash
      this.attrForm = cloneDeep(row);
      // console.log(this.attrForm);
      //  console.log("tianjia flag修改");
      this.attrForm.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 失焦
    sellBlur(row) {
      if (row.valueName.trim() == "") {
        this.$message("不能为空");
        return;
      } else {
        row.flag = false;
      }
    },
    // 点击spam显示input
    showFlag(row, index) {
      console.log(row, index);
      console.log(this.$refs[index]);

      row.flag = true;
      console.log("点击spam显示input");
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除icon
    deleteList(index){
      this.attrForm.attrValueList.splice(index,1)
    },
    // 保存
    async addUpdateAttr(){
      console.log(2333333);
      this.attrForm.attrValueList= this.attrForm.attrValueList.filter((item)=>{
        if(item.valueName!=''){
          delete item.flag
          return true
        }
      })
      try {
        // 发请求
        let res= await this.$API.attr.updateList(this.attrForm)
        if(res.code==200){
        this.proShow = true;
        this.$message.success("保存成功")
        // 保存成功按道理是要重新获取列表
        // this.getThreeNum()
        }else{
          this.$message("保存shibai")
        }
      } catch (error) {
        
      }
    } 
  },
};
</script>

<style>
</style>