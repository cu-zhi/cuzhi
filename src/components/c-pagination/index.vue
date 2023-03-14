<script>
export default {
  props: {
    page: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    pagination: {
      type: Function,
      default: () => {},
    },
  },
  render(h) {
    return h("el-pagination", {
      props: {
        total: this.total,
        "page-sizes": [10, 30, 50, 100],
        "page-size": this.page.pageSize,
        "current-page": this.page.pageNum,
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
        ...this.$attrs,
      },
      on: {
        "size-change": (val) => {
          this.page.pageSize = val;
          this.$emit("pagination");
        },
        "current-change": (val) => {
          this.page.pageNum = val;
          this.$emit("pagination");
        },
      },
    });
  },
};
</script>
