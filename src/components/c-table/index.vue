<script>
export default {
  name: "c-Table",
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
    page: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          pageNum: 1,
        };
      },
    },
  },
  data() {
    return {
      selectVal: "",
      selectionList: [],

      isIndeterminate: false,
      checkVal: false,
      visible: false,

      columnsShow: false,

      resetColumns: [],
    };
  },
  mounted() {
    // 列数据深克隆一份，用于重置
    this.resetColumns = JSON.parse(JSON.stringify(this.columns));
  },
  render(h) {
    return h(
      "el-card",
      {
        props: {
          header: true,
        },
        scopedSlots: {
          header: (props) => {
            const tooltipConfig = [
              {
                content: "刷新数据",
                icon: "el-icon-refresh",
                click: () => {
                  this.visible = true;
                  this.$emit("pagination");
                },
              },
              {
                content: "列设置",
                icon: "el-icon-setting",
                click: () => {
                  this.visible = false;
                  this.$emit("pagination");
                },
              },
            ];
            return h(
              "div",
              {
                class: ["d-flex", "a-i-c", "j-c-sb"],
              },
              [
                h(
                  "div",
                  this.$slots.header_l
                    ? this.$slots.header_l
                    : [
                        h("span", { class: ["b"] }, "表格"),
                        <el-tooltip
                          effect="dark"
                          content="表格"
                          placement="top"
                          class="item ml5"
                        >
                          <i class="el-icon-question"></i>
                        </el-tooltip>,
                      ]
                ),
                h(
                  "div",
                  this.$slots.header_r
                    ? this.$slots.header_r
                    : [
                        tooltipConfig.map((v) => {
                          return h(
                            "el-tooltip",
                            {
                              props: {
                                effect: "dark",
                                content: v.content,
                                placement: "top",
                              },
                              class: "item ml5",
                            },
                            [
                              h(
                                "el-popover",
                                {
                                  props: {
                                    width: "260",
                                    disabled: this.visible,
                                  },
                                },
                                [
                                  h("div", [
                                    h(
                                      "div",
                                      {
                                        class: "d-flex a-i-c j-c-sb",
                                        style: {
                                          "border-bottom": "1px solid #efeff5",
                                        },
                                      },
                                      [
                                        h(
                                          "el-checkbox",
                                          {
                                            props: {
                                              indeterminate: this.columnsShow,
                                              value: this.columns.every(
                                                (v) => v.isShow === true
                                              ),
                                            },
                                            on: {
                                              change: (val) => {
                                                this.columns.map(
                                                  (v) => (v.isShow = val)
                                                );
                                              },
                                            },
                                          },
                                          "列展示"
                                        ),
                                        h(
                                          "el-button",
                                          {
                                            props: {
                                              type: "text",
                                            },
                                            on: {
                                              click: () => {
                                                this.columns = JSON.parse(
                                                  JSON.stringify(
                                                    this.resetColumns
                                                  )
                                                );
                                              },
                                            },
                                          },
                                          "重置"
                                        ),
                                      ]
                                    ),
                                    this.columns.map((v) => {
                                      return h(
                                        "div",
                                        {
                                          class: "d-flex a-i-c j-c-sb mt20",
                                        },
                                        [
                                          h(
                                            "div",
                                            {
                                              class: "d-flex a-i-c",
                                            },
                                            [
                                              <i class="el-icon-rank f20 mr10"></i>,
                                              h(
                                                "el-checkbox",
                                                {
                                                  props: {
                                                    value: v.isShow,
                                                  },
                                                  on: {
                                                    change: (val) => {
                                                      v.isShow = val;
                                                      const bools =
                                                        this.columns.map(
                                                          (v) => v.isShow
                                                        );
                                                      if (
                                                        bools.every(
                                                          (v) => v === true
                                                        ) ||
                                                        bools.every(
                                                          (v) => v === false
                                                        )
                                                      ) {
                                                        this.columnsShow = false;
                                                      } else {
                                                        this.columnsShow = true;
                                                      }
                                                    },
                                                  },
                                                },
                                                v.label
                                              ),
                                            ]
                                          ),
                                          h(
                                            "div",
                                            {
                                              class: "d-flex a-i-c",
                                            },
                                            [
                                              h(
                                                "el-tooltip",
                                                {
                                                  props: {
                                                    effect: "dark",
                                                    content: "固定在左侧",
                                                    placement: "top",
                                                    class: "item ml5",
                                                  },
                                                },
                                                [
                                                  h("i", {
                                                    class:
                                                      "el-icon-arrow-left pr10",
                                                    style: {
                                                      "border-right":
                                                        "1px solid #e5e5e5",
                                                    },
                                                  }),
                                                ]
                                              ),
                                              h(
                                                "el-tooltip",
                                                {
                                                  props: {
                                                    effect: "dark",
                                                    content: "固定在右侧",
                                                    placement: "top",
                                                    class: "item ml5",
                                                  },
                                                },
                                                [
                                                  h("i", {
                                                    class:
                                                      "el-icon-arrow-right pl10",
                                                  }),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      );
                                    }),
                                  ]),
                                  h("i", {
                                    slot: "reference",
                                    class: v.icon,
                                    on: {
                                      click: v.click,
                                    },
                                  }),
                                ]
                              ),
                            ]
                          );
                        }),
                      ]
                ),
              ]
            );
          },
        },
      },
      [
        h(
          "el-table",
          {
            ref: "c-table",
            attrs: { ...this.$attrs, ...this.$props },
            on: {
              ...this.$listeners,
              "selection-change": (selection) => {
                this.selectionList = selection;

                if (this.selectionList.length === this.data.length) {
                  this.isIndeterminate = false;
                  this.checkVal = true;
                }
                if (this.selectionList.length == 0) {
                  this.isIndeterminate = false;
                  this.checkVal = false;
                }
                if (
                  this.selectionList.length > 0 &&
                  this.selectionList.length < this.data.length
                ) {
                  this.isIndeterminate = true;
                }
              },
            },
          },
          [
            this.columns.map((column) => {
              if (column.isShow) {
                return column.slot
                  ? h("el-table-column", {
                      props: {
                        type: column.type,
                        label: column.label,
                        width: column.width,
                        align: column.align,
                        "show-overflow-tooltip": column.showTooltip,
                      },
                      scopedSlots: {
                        default: (props) => {
                          return h(
                            "div",
                            this.$scopedSlots[column.slot]({
                              $index: props.$index,
                              row: props.row,
                            })
                          );
                        },
                      },
                    })
                  : h("el-table-column", {
                      props: {
                        type: column.type,
                        label: column.label,
                        prop: column.prop,
                        width: column.width,
                        align: column.align,
                        "show-overflow-tooltip": column.showTooltip,
                      },
                    });
              }
            }),
          ]
        ),
        h(
          "div",
          {
            class: ["d-flex a-i-c j-c-sb mt10"],
          },
          [
            h("div", [
              h(
                "el-checkbox",
                {
                  props: {
                    indeterminate: this.isIndeterminate,
                    value: this.checkVal,
                  },
                  on: {
                    change: (val) => {
                      this.$refs["c-table"].toggleAllSelection(val);
                    },
                  },
                },
                ""
              ),
              h(
                "el-select",
                {
                  props: {
                    placeholder: `请选择批量操作（已选择${this.selectionList.length}）`,
                    size: "mini",
                    value: this.selectVal
                      ? `批量${this.selectVal}（已选择${this.selectionList.length}项）`
                      : this.selectVal,
                    disabled: this.selectionList.length > 0 ? false : true,
                  },
                  on: {
                    change: (val) => {
                      this.selectVal = val;
                    },
                  },
                },
                [
                  [
                    {
                      value: "删除",
                      label: "删除",
                    },
                  ].map((v) => {
                    return h("el-option", {
                      props: {
                        label: v.label,
                        value: v.value,
                      },
                    });
                  }),
                ]
              ),
              h(
                "el-button",
                {
                  props: {
                    size: "mini",
                    type: this.selectionList.length > 0 ? "primary" : "",
                    disabled: this.selectionList.length > 0 ? false : true,
                  },
                  on: {
                    click: () => {
                      if (!this.selectVal) {
                        this.$message.error({
                          message: "请选择批量操作类型",
                          duration: 2000,
                          showClose: true,
                        });
                        return;
                      }
                      this.$emit("delHandle", this.selectionList);
                    },
                  },
                  style: {
                    "margin-left": "10px",
                  },
                },
                "批量操作"
              ),
            ]),
            h("c-pagination", {
              attrs: {
                ...this.$attrs,
                ...this.$props,
              },
              on: {
                ...this.$listeners,
              },
            }),
          ]
        ),
      ]
    );
  },
};
</script>
