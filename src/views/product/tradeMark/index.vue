<template>
  <div>
    <h1>tradeMark</h1>
    <el-button type="primary" icon="el-icon-plus" @click="addTradmark"
      >添加</el-button
    >
    <!-- 表格:<el-table-column></el-table-column>列标签
        border：给表格添加边框
        label：每一列的标签名字
        width：每一列的宽度
        注意：这个玩意展示数据是一列一列的
        type="index":默认序号
        :data="list"：传过来的数组
        prop里面直接可以放属性名
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌Logo"
        width="width"
        align="center"
      >
        <template slot-scope="{ row }">
          <img v-if="row.logoUrl" :src="row.logoUrl" alt="22" style="width: 80px" />
          <img v-else src="./preview.jpg" alt="22" style="width: 80px" />

        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button type="warning" icon="el-icon-collection" @click="update(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deletePro(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页面器 -->
    <!-- 
      current-page:初始页
      page-size：每页多少条
      total：总共多晒也
      size-change：每一页个数发生变化  @size-change="handleSizeChange"
      current-change：页数发生变化  @current-change="handleCurrentChange"
      :page-sizes="[3,5,10]"   设置每页几个，中间的断层数字
      ->:可以直接放到最右边
      layout：修改布局
      page-count:展示多少个按钮
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, next,->,total,sizes"
      @current-change="getBaseTradmark"
      @size-change="handleSizeChange"
      :total="total"
    >
    </el-pagination>
    <!-- 弹出框 -->
    <!-- 
      title：但画框标题
     -->
    <el-dialog :title="tmForm.id?'修改商品':'添加商品'" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" style="width:90%" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth" prop="logoUrl">
        <!-- 不能使用v-model  action设置上传图片的地址
        :on-success="handleAvatarSuccess":当图片上传成功 会执行一次
        :before-upload="beforeAvatarUpload">：上传图片之前会执行一次
        -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUpdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1, //第几页
      limit: 3, //每页几条
      total: 0, //共多少页
      list: [], //列表数据
      dialogFormVisible: false, //弹出框是否显示
      tmForm: {
      
          tmName:'',
          logoUrl:''
        },
        formLabelWidth: '120px', //表单宽度
        imageUrl: '',//上传图片使用的属性
        // 收集品牌名字和图片  对象 
        // 表单校验规则 
      rules: {
          tmName: [
            // required:红色的型号，代表表单验  message：弹出的消息   trigger：用户的行为设置
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          logoUrl: [ // 这个上传不都是表单，用户行为可以去掉
            { required: true, message: '请选择图片' }
          ],
      }
    };
  },
  mounted() {
    this.getBaseTradmark();
  },
  methods: {
    // 获取品牌列表
    async getBaseTradmark(pager = 1) {
      //没有参数的时候pager默认是1
      // 这里如果选择椰树的时候，如果页数没有传进来，就默认是1，穿件来就改变
      // 有参数的时候
      this.page = pager;
      const { page, limit } = this;
      let res = await this.$API.tradMark.reqBaseTradmarkList(page, limit);
      // console.log(res);
      if (res.code == 200) {
        this.total = res.data.total;
        this.list = res.data.records;
        console.log("success");
      }
    },
    // 改变每页的个数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getBaseTradmark();
    },
    // 显示弹出框
    addTradmark() {
      this.dialogFormVisible = true;
      this.tmForm={tmName:'',logoUrl:''}
    },
    //   handleCurrentChange(pager){
    //   console.log(event.target);

    //   console.log(pager);
    // }
    // 上传图片
    handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(res,"上传成功");
        // 可以直接存到收集表单的数据里面，显示不显示也是这个来判断
        this.tmForm.logoUrl=res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 添加图片
      addUpdate(){
        this.$refs.ruleForm.validate(async(success) => {
          if (success) {
             this.dialogFormVisible = false
            let res=await this.$API.tradMark.reqAddOrEdit(this.tmForm)
            console.log(res);
            if(res.code==200){
              // 上传成功根据有没有id看是否是修改的
              this.$message.success(this.tmForm.id?'修改成功':'上传成功');
              // 重新掉列表  如果是添加商品要调到第一页，如果是修改的话，保持那一页
              this.getBaseTradmark(this.tmForm.id?this.page:1);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


       
      },
      // 更新图片
      update(row){
        // row 是ele里面内置的，可以获取到当前点击的数据
        // 在点击要修改的元素后，重新赋值下，就可以把元素复现，但是会造成没有点击确定就会修改，这里我们要用到浅拷贝
        this.tmForm={...row}
        console.log(row);
        this.dialogFormVisible=true
      },
      // delete 删除
      deletePro(row){
        

        this.$confirm(`你确定删除${row.tmName}嘛？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        let res=await this.$API.tradMark.deleteProduct(row.id)
        if(res.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 当你删除的时候  当夜数据会变少，如果小于1，回上一页
          this.getBaseTradmark(this.list.length>1?this.page:this.page-1);
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
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
    border-color: #409EFF;
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