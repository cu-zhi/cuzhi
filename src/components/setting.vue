<template>
    <div class="setting ">
        <div class="pa setting-box">
            <i class="el-icon-setting" @click="drawer = true"></i>
        </div>

        <el-drawer title="高德地图设置" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
            <div class="pt20 pr20 pb20 pl20">
                <slot></slot>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'Setting',

    data() {
        return {
            drawer: false
        };
    },

    mounted() {

    },

    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    },
};
</script>

<style lang="less">
.setting-box {
    top: 50%;
    right: 0;
    color: #fff;
    padding: 5px 10px;
    background-color: #42b884;
    transform: translateY(-50%);
}
</style>