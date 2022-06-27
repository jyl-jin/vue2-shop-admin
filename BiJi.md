后台接口文档
http://39.98.123.211:8170/swagger-ui.html

## 重点 element Ui ##


### 表格 ###
<!-- 表格:<el-table-column></el-table-column>列标签
        border：给表格添加边框
        label：每一列的标签名字
        width：每一列的宽度
        注意：这个玩意展示数据是一列一列的
        type="index":默认序号
        :data="list"：传过来的数组
        prop里面直接可以放属性名
    -->


### 分液器 ### 
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
### 上传图片 ### 
<!-- 不能使用v-model  action设置上传图片的地址
        :on-success="handleAvatarSuccess":当图片上传成功 会执行一次
        :before-upload="beforeAvatarUpload">：上传图片之前会执行一次
        -->

### 技巧  ### 
<!-- async getBaseTradmark(pager = 1) {
      //没有参数的时候pager默认是1
      // 这里如果选择椰树的时候，如果页数没有传进来，就默认是1，穿件来就改变
      // 有参数的时候 -->

发送接口请求在子组件，可以给子组件打ref标签，这样我们啊可以拿到自组件身上的方法和数据

修改数据就是把收集到的数据保存到服务器返回过来的接口数据上，添加的话，要重新在data里面写
### <el-card> ### 
标签：比较好看的div纯白背景的


### ### 
在收集接口数据的时候，可以往里面直接扔，记得名字要一样，
lodash的深拷贝，引入直接cloneDeep
或者Json.parse（Json.stringy（））


### ### 
// 修改   的时候要加上flag属性，但是不能直接加，直接加的话不是响应式数据，用$set添加
// $set(item,'属性名'，属性值)ex$set(item,'flag'，true)


### ### 
在有些时候，不能及时拿到更新后节点数据，需要使用$nextTick(()=>{
      this.$refs.xxx.focus()
})


### loding ### 
在关闭带有loding效果的页面之前，把loding属性设置位true，页面数据清空，防止点击下一个的时候没有


### 解决scoped样式穿透 ###
原生css使用    >>>
less使用       /deep/
sass使用       ::v-deep
### 数据可视化 ###
## canvas ## 
画布：h5新增的一个新属性<canvas></canvas>双闭合标签
默认宽度高度为300*150
浏览器默认canvas为一张图片，它始终都只是一个节点，上面的内容都是像素点构成的
给canvas添加任何文本，任何子节点没有意义，canvas绘制文本图形都是通过js来完成的
它的宽和高必须通过canvas自身的宽高属性来设置
全都是通过笔来完成ex：
let  canvas=document.querySelector('canvas')
<!-- 获取画布中的笔 -->
let ctx=canvas.getContext('2d')
<!-- ctx就是笔，上面有很多api -->

### 路由权限问题 ###
把路由设置成动态路由（包含所有用户都会显示的，一些用户会显示的）
是否有权限的话是后台返回来的，会返回一个数组，里面包含着用户可以展示哪些路由的字段，包括按钮的权限也是，


# 也就是在获取用户信息的时候，会把相应的用户所拥有的菜单的权限数据返回来，和路由信息相比较（路由也分为同步路由：全部都能展示的和异步路由：就是有权限才能展示的），计算出哪些路由应该展示：拿着异步路由和后台返回的那个包含着用户权限的数据过滤，过滤出来都有哪些权限，最后再和同步路由合并，最后给router添加addRetes #
### ###

### ###

### ###

### ###


### ###

### ###

### ###
### ###
