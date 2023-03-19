<template>
  <div class="home">
    <header>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <div class="d-flex a-i-c j-c-sb w100">
              <div>
                <p class="f14 theme b">当月营业额</p>
                <p class="b f24 mt10">12.2k</p>
              </div>
              <el-progress color="#ac5dd9" text-color="#ac5dd9" type="circle" :percentage="25"
                stroke-width="10"></el-progress>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <div class="d-flex a-i-c j-c-sb w100">
              <div>
                <p class="f14 theme b">订单量</p>
                <p class="b f24 mt10">101</p>
              </div>
              <el-progress color="#00cfde" text-color="#00cfde" type="circle" :percentage="25"
                stroke-width="10"></el-progress>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <div class="d-flex a-i-c j-c-sb w100">
              <div>
                <p class="f14 theme b">用户量</p>
                <p class="b f24 mt10">120</p>
              </div>
              <el-progress color="#fdac42" text-color="#fdac42" type="circle" :percentage="25"
                stroke-width="10"></el-progress>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </header>
    <footer class="mt20">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card shadow="never">
            <broken-line title="本月销量" height="200px"></broken-line>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">

          </el-card>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
export default {
  components: {
    "broken-line": () => import("@/components/Echarts/broken-line.vue")
  },
  data() {
    return {
      data: []
    }
  }
}
</script>

<style lang="less">
.home {
  .el-progress-circle {
    width: 80px !important;
    height: 80px !important;
  }

  footer .el-card__body {
    height: calc(100vh - 323px);
  }
}
</style>
