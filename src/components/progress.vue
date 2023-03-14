<template>
  <div class="progress pa bgc-fff">
    <el-progress
      type="circle"
      :percentage="$store.state.upload.progress"
    ></el-progress>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.progress {
  bottom: 50px;
  right: 50px;
  z-index: 99999;
  border-radius: 1999px;
}
</style>
