<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getThreeNum="getThreeNum"
        :isShow="!proShow"
      ></CategorySelect>
    </el-card>
    <el-card v-show="isShow==1">
      <el-button type="primary" :disabled="addDisable" @click="addEditSpu" 
        >添加SPU</el-button
      >
      <!-- 表格 -->
      <el-table :data="spuList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="" label="SPU名称" width="280">
          <template slot-scope="{row,$index}">
            <span>{{row.spuName}}</span>     
          </template>
        </el-table-column>
        <el-table-column prop="" label="SPU描述" width="380">
          <template slot-scope="{row,$index}">
            <span>{{row.description}}</span>     
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="width"> 
            <template slot-scope="{row,$index}">
              <!-- 传递过去的title不加： -->
                <HitButton type="primary" icon="el-icon-edit" title="添加Sku" @click.native="editSpu(row)"></HitButton>
                <HitButton type="danger" icon="el-icon-delete"></HitButton>
                <HitButton type="success" icon="el-icon-plus"></HitButton>
                <HitButton type="info" icon="el-icon-info"></HitButton>
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- 函数
        @current-change="getBaseTradmark"
        @size-change="handleSizeChange"
        -->
      <el-pagination
        style="margin-top: 20px; text-align: center"
        :current-page="page"
        :page-size="limit"
        :pager-count="7"
        :page-sizes="[3, 9, 10]"
        layout="prev, pager, next,->,total,sizes"
        :total="total"
        @current-change="getBaseTradmark"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </el-card>
    <AddEditSpu v-show="isShow==2" ref="spuAdd" @letShowOne="letShowOne"></AddEditSpu>
    <AddSku v-show="isShow==3"></AddSku>


  </div>
</template>

<script>AddSku
import AddEditSpu from './addEditSpu'
import AddSku from './addSku'
export default {
  name: "Spu",
  components:{AddEditSpu,AddSku},
  data() {
    return {
      spuId: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      proShow: true,
      data: [1,2,3],
      page:1, //当前显示第几页
      limit:3, //每页显示多少条
      spuList:[],
      total:0, //总页数
      isShow:1, //控制显示哪个
    };
  },
  computed:{
    addDisable(){
      const {category3Id}=this.spuId
      return category3Id!=''
    }
  },
  methods: {
    // 获取id
    getThreeNum(datas) {
      this.spuId = { ...datas };
      // 获取基本数据
      this.getSpuList()
    },
    // 获取基本数据  page,limit,spuId.category3Id
      async getSpuList(){
        const {page,limit,}=this
        const {category3Id}=this.spuId
        let res=await this.$API.spu.reqSpuList(page,limit,category3Id)
        // console.log(res);
        if(res.code==200){
          this.spuList=res.data.records
          this.total=res.data.total
        }else{
          return Promise.reject(new Error('faile'))
        }
      },
      // 跳转页数
      getBaseTradmark(pager){
        this.page=pager
        this.getSpuList()
      },
      // 选则每页有几条数据
      handleSizeChange(limit){
        this.limit=limit
        this.getSpuList()
      },
      // 添加或者修改spu
      addEditSpu(){
        this.isShow=2
      },
      // 点击取消让1出现
      letShowOne(isshow){
        this.isShow=isshow
      },
      // 在spu组件里面发起请求你//点击修改
      editSpu(row){
        this.isShow=2
        this.$refs.spuAdd.getRequest(row)
      }
  },
};
</script>

<style>
</style>