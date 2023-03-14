<template>
  <div class="left-menu pr">
    <header class="logo mb20">
      <img v-img-lazy src="@/assets/images/logo.png" alt="" />
    </header>
    <el-menu default-active="2" class="el-menu-vertical-demo" router>
      <el-menu-item index="/">
        <i class="el-icon-menu theme"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/components">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>组件管理</span>
        </template>
        <el-menu-item index="/components/table">
          <i class="el-icon-menu theme"></i>
          <span slot="title">表格组件</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "right-module",
  data() {
    return {};
  },
};
</script>
<style>
.el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item.is-active {
  border-right: 3px solid #409eff;
}
</style>
<style lang="less">
.left-menu {
  width: 180px;
  height: 100%;

  .logo {
    img {
      width: 180px;
      height: 50px;
    }
  }

  footer {
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
