<template>
  <div>
    <el-card>
      <el-table :data="skuList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="180" align="center">
        </el-table-column>
        <el-table-column prop="" label="默认图片" width="180" align="center">
          <template slot-scope="{ row, $index }">
            <img
              style="width: 50px"
              :src="row.skuDefaultImg"
              alt="图片"
            /> </template
          >>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量(KG)"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格(元)"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="" label="操作" width="width" align="center">
          <template slot-scope="{ row, $index }">
            <el-button
              type="success"
              icon="el-icon-bottom"
              v-if="row.isSale == 0"
              @click="puTShelf(row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-top"
              v-else
              @click="offShelf(row)"
            ></el-button>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
            <el-button
              type="info"
              icon="el-icon-info"
              @click="goDetail(row)"
              style="margin-left: 16px"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
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

      <!-- chou ti -->
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      skuList: [],
      // 默认下架
      isPut: true,
      //   chou ti
      drawer: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //   获取展示数据
    async getSkuList() {
      const { page, limit } = this;
      let res = await this.$API.sku.reqSkuList(page, limit);
      console.log(res);
      if (res.code == 200) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      } else {
        Promise.reject(new Error("faile"));
      }
    },
    //   跳转页数
    getBaseTradmark(pager) {
      this.page = pager;
      this.getSkuList();
    },
    //   每页有介个数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async puTShelf(row) {
      const { id } = row;
      let res = await this.$API.sku.reqOnSale(id);
      if (res.code == 200) {
        row.isSale = 1;
        this.$message.success("上架成功");
      } else {
        Promise.reject(new Error("faile"));
      }
    },
    // xia架
    async offShelf(row) {
      const { id } = row;
      let res = await this.$API.sku.reqCancelSale(id);
      if (res.code == 200) {
        row.isSale = 0;
        this.$message.success("下架成功");
      } else {
        Promise.reject(new Error("faile"));
      }
    },
    // 商品详情
    async goDetail(row) {
      this.drawer = true;
      const { id } = row;
      let res = await this.$API.sku.reqShopDetail(id);
      if (res.code == 200) {
        this.$message.success("获取成功");
      } else {
        Promise.reject(new Error("faile"));
      }
    },
  },
};
</script>

<style>
</style>