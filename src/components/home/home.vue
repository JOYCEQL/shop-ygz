<template>
  <!-- 这里的el-container就是根元素 -->
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div
        class="grid-content bg-purple clearfix logo"
        style="width: 200px;"
      >
        <img
          src="../../assets/image/heima_logo.png"
          alt=""
        >
      </div>

      <div class="grid-content bg-purple-light title">
        <h2>VUE后台管理系统</h2>
      </div>
      <div class="grid-content bg-purple logout">
        <template>
          <el-button
            type="danger"
            @click="handleexit()"
          >退出</el-button>
        </template>
      </div>
    </el-header>
    <!-- 主体(左侧菜单和右侧内容) -->
    <el-container>
      <!-- 左侧部分 -->
      <!-- 开启路由 -->
      <el-aside
        style="width: 200px;"
        ref="aside"
      >
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          unique-opened
          :router="true"
          :collapse="isCollapse"
        >

          <el-submenu :index="menu.path" v-for="menu in menulist" :key="menu.id">
            <!-- 1 -->
            <template slot="title" >
              <i class="el-icon-user-solid"></i>
              <span>{{menu.authName}}</span>
            </template>
            <!-- 2 -->
            <!-- 这里的index值则是路由的path值 -->
            <el-menu-item :index="menu.path" v-for="item in menu.children " :key="item.id">
              <i class="el-icon-menu"></i>
              <span>{{item.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  data () {
    return {
      isCollapse: false,
      menulist: []
    }
  },
  computed: {
    // 设置默认高亮
    active () {
      return this.$route.path.slice(1)
    }
  },
  async created () {
    // 发送请求获取左侧菜单
    const res = await this.$http.get('menus')
    console.log(res)
    if (res.data.meta.status === 200) {
      this.menulist = res.data.data
    }
  },
  methods: {
    handleexit () {
      // 弹框---你确定要退出吗
      this.$confirm('您确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 清空token值
        // 提示消息
        // 去登录页
        localStorage.clear()
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // this.$message.success('退出成功')
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less'>
.container {
  height: 100%;
}
.el-menu {
  background-color: #333744;
  height: 100%;
}

element.style {
  padding-left: 40px;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
}
.el-menu-item {
  color: #fff;
}
.el-submenu__title {
  color: #fff;
}
.el-submenu__title:hover {
  background-color: #292c36;
}
element.style {
  padding-left: 40px;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #292c36;
}
.title {
  flex: 1;
  h2 {
  text-align: center;
  line-height: 60px;
  margin: 0;
  color: #fff;
}
}

img {
  float: left;
  display: block;
  margin-left: 50px;
}

.el-header {
  padding: 0;
  display: flex;
  background: linear-gradient(
    to right,
#b92b27,    #1565C0
  );
  color: #333;
  text-align: center;
  line-height: 60px;
  .logo {
      float: left;
  }
  .logout {
    float: right;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  height: 100%;
  overflow: hidden;
}

.el-main {
  background-color: #ecf0f5;
  color: #333;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

</style>
