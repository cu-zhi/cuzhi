<template>
  <div class="layout pr">
    <div class="d-flex box">
      <div style="width: 180px; height: 100%" class="ml20 mr20 pt20">
        <left-menu></left-menu>
      </div>
      <div class="d-flex j-c-sb ovh" style="flex: 1">
        <div class="bgc-theme pl20 pr20 pt20 pb20 w100">
          <com-header></com-header>
          <div
            class="container-box scrollbar"
            v-loading="$store.state.loading_state"
          >
            <router-view />
          </div>
        </div>
      </div>
      <div style="width: 200px; height: 100%; padding: 30px 20px">
        <right-module></right-module>
      </div>
    </div>
    <Progress v-if="$store.state.upload.isProgress" />
  </div>
</template>

<script>
export default {
  name: "CuzhiLayout",
  components: {
    "left-menu": () => import("@/components/left-menu.vue"),
    "right-module": () => import("@/components/right-module.vue"),
    "com-header": () => import("@/components/com-header.vue"),
    Progress: () => import("@/components/progress"),
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.layout {
  background-color: #fff;
  height: calc(100vh - 60px);
  border-radius: 16px;
  margin: 30px 20px;

  .box {
    height: 100%;
  }

  .container-box {
    height: calc(100vh - 180px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
