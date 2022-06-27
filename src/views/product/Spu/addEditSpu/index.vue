<template>
  <el-card>
    <!-- 在form 上写 label-width="80px"  表单内的元素都会继承-->
    <el-form ref="form" :model="spu" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
          <!-- select中label是展示的数据，value是收集的数据 -->
        <el-select v-model="spu.tmId" placeholder="请选择活动品牌">
          <el-option :label="item.tmName" :value="item.id" v-for="(item,index) in tradMark" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="spu.description"
        >
        </el-input>
      </el-form-item>
        <!-- :file-list="skuImg"数据必须是一个数组，而且相对应的字段必须统一，否则无法识别 ，要对图片的数据进行处理-->
      <el-form-item label="活动形式">
        <el-upload
          action="/dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="skuImg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="datas" placeholder="还有3个未选择">
          <el-option :label="item.name" :value="item.id" v-for="item in saleData" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加的销售属性</el-button>
      </el-form-item>

      <!-- 表格 -->
      <el-table :data="saleData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="" label="属性名" width="180"> </el-table-column>
        <el-table-column prop="" label="属性名称列表"> </el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
      </el-table>
      <el-button type="success">保存</el-button>
      <el-button type="primary" @click="showOne">取消</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "AddEditSpu",
  data() {
    return {
      textarea2: "",
      datas: [],
      //   上传图片多张
      dialogImageUrl: "",
      dialogVisible: false,


      spu: {//存贮spu信息属性
        category3Id: 0, //三级分类id
        description: "", //描述
        spuImageList: [  //收集spu图片的信息
          {
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuName: "", //spu名称
        // 平台属性与属性值得收集
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0, 
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
        tmId: 0,
      },//存贮spu信息属性
      
      tradMark: [], //品牌信息
      skuImg: [], //sku图片
      saleData: [], //商品销售shuxig
    };
  },
  mounted() {
    //   this.getRequest()
  },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //  上传完毕

    // 展示one
    showOne() {
      this.$emit("letShowOne", 1);
    },
    // 请求
    async getRequest(row) {
      const { id } = row;
      let spuId = id;
      // 获取spu属性
      let res = await this.$API.spu.reqBaseData(spuId);
      if (res.code == 200) {
        this.spu = res.data;
      }
      // 获取品牌信息
      let resTradmark = await this.$API.spu.reqTrademarkList();
      console.log(resTradmark, "获取品牌信息");
      if (resTradmark.code == 200) {
        this.tradMark = resTradmark.data;
      }

      // 获取sku图片
      let resImg = await this.$API.spu.reqImg(spuId);
      console.log(resImg, "获取sku图片");
      if (resImg.code == 200) {
          let newImgList=resImg.data
          newImgList.forEach(ele => {
              ele.name=ele.imgName
              ele.url=ele.imgUrl
          });
        this.skuImg = newImgList
      }

      // 获取商品销售shuxig
      let resSale = await this.$API.spu.getBaseSle();
      console.log(resSale, "获取商品销售shuxig");
      if (resSale.code == 200) {
        this.saleData = resSale.data;
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>