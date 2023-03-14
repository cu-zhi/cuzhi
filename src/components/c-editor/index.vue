<template lang="html">
    <div class="wangeditor">
        <div ref="toolbar" class="toolbar"></div>
        <div ref="wangeditor" class="text"></div>
    </div>
</template>
   
<script>
import E from "wangeditor";
export default {
    props: {
        html: String
    },
    data() {
        return {
            wangEditor: null,
        };
    },
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        isClear: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isClear(val) {
            // 触发清除文本域内容
            if (val) {
                this.wangEditor.txt.clear();
                this.html = null;
            }
        },
        value: function (value) {
            if (value !== this.wangEditor.txt.html()) {
                this.isClear = false;
                this.wangEditor.txt.html(this.value); //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
            }
        }
    },
    mounted() {
        this.initEditor();
        this.wangEditor.txt.html(this.value);
    },
    methods: {
        initEditor() {
            this.wangEditor = new E(this.$refs.toolbar, this.$refs.wangeditor);
            this.wangEditor.customConfig = this.wangEditor.customConfig ? this.wangEditor.customConfig : this.wangEditor.config
            //  this.wangEditor.customConfig.uploadImgShowBase64 = true; // base64存储图片（推荐）
            this.wangEditor.customConfig.uploadImgServer = "http://www.darkma.xyz:3000/upload"; // 配置服务器端地址（不推荐）
            this.wangEditor.customConfig.uploadImgHeaders = {}; // 自定义header
            this.wangEditor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
            this.wangEditor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为（默认最大支持2M）
            this.wangEditor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传6张图片
            this.wangEditor.customConfig.uploadImgTimeout = 1 * 60 * 1000; // 设置超时时间（默认1分钟）

            // 配置菜单
            this.wangEditor.customConfig.menus = [
                "head", // 标题
                "bold", // 粗体
                "fontSize", // 字号
                "fontName", // 字体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                "emoticon", // 表情
                "image", // 插入图片
                "table", // 表格
                "video", // 插入视频
                "code", // 插入代码
                "undo", // 撤销
                "redo", // 重复
                "fullscreen" // 全屏
            ];
            this.wangEditor.customConfig.uploadImgHooks = {
                fail: (xhr, editor, result) => {
                    // 插入图片失败回调
                },
                success: (xhr, editor, result) => {
                    // 图片上传成功回调
                },
                timeout: (xhr, editor) => {
                    // 网络超时的回调
                },
                error: (xhr, editor) => {
                    // 图片上传错误的回调
                },
                customInsert: (insertImg, result, editor) => {
                    // 图片上传成功，插入图片的回调（不推荐）
                    insertImg(result.path);
                }
            };
            this.wangEditor.customConfig.onchange = html => {
                this.$emit("update:html", html)
                this.$emit("change", this.html); // 将内容同步到父组件中
            };
            // 创建富文本编辑器
            this.wangEditor.create();
        }
    }
};
</script>
   
<style lang="less">
.wangeditor {
    height: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;

    .toolbar {
        border-bottom: 1px solid #e6e6e6;
        box-sizing: border-box;
    }

    .text {
        min-height: 300px;
    }
}
</style>
  