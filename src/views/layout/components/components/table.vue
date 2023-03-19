<template>
  <div class="project-list">
    <c-table
      @pagination="projectGet"
      @delHandel="delHandle"
      :data="tableData"
      :columns="columns"
      :total="total"
      :page="params"
      height="calc(100vh - 322px)"
      border
    >
      <template slot="description" slot-scope="{ row }">
        <el-popover placement="bottom" trigger="hover">
          <span v-html="row.description"></span>
          <span
            slot="reference"
            class="ellipsis"
            v-html="row.description"
          ></span>
        </el-popover>
      </template>
      <template slot="handle" slot-scope="{ row }">
        <el-button type="text" @click="delHandle(row)">删除</el-button>
      </template>
    </c-table>
  </div>
</template>

<script>
export default {
  name: "projectList",

  data() {
    return {
      params: {
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [
        {
          id: 1678760608542,
          title: "无人机数据云平台",
          keyWord:
            "vue2，Echarts.js，Element-ui，Axios，高德地图，webScoket，轨迹巡航，轨迹回放",
          description:
            '<p><b>技术栈：</b><font size="2">vue2，Echarts.js，Element-ui，Axios，高德地图，webScoket，轨迹巡航，轨迹回放</font></p><p><font size="3" style=""><b>项目描述：</b></font></p><ol><li><font size="2">通过webScoket获取并存储无人机传感器数据，数据通过Echarts折线图进行渲染展示。</font></li><li><font size="2">存储的数据可以通过查看历史记录进行回放，回放的内容包括（绘制飞行轨迹，传感器数据）。</font></li><li><span style="font-size: 14px;">可以通过参数设置对不同类型的机器进行对应的控制，类型为：水文仪，空气传感器，抛投器，取水器。<font color="#c24f4a"><b>这个只能设置当前账号对应的机器类型</b></font></span><span style="font-size: 14px;"></span><span style="font-size: 14px;"></span></li></ol>',
          imgList:
            "http://116.204.84.54:3000/uploads/Snipaste_2023-03-14_10-12-32@1678759967824.png,http://116.204.84.54:3000/uploads/Snipaste_2023-03-14_10-14-48@1678760096759.png,http://116.204.84.54:3000/uploads/Snipaste_2023-03-14_10-18-05@1678760291786.png,http://116.204.84.54:3000/uploads/Snipaste_2023-03-14_10-22-54@1678760578951.png",
          url: "http://39.152.220.155:10020/user",
        },
      ],
      columns: [
        {
          type: "selection",
          align: "center",
          showTooltip: false,
          width: "55",
          isShow: true,
        },
        {
          label: "项目标题",
          prop: "title",
          align: "center",
          showTooltip: true,
          width: "160",
          isShow: true,
        },
        {
          label: "项目关键字",
          prop: "keyWord",
          align: "center",
          showTooltip: true,
          width: "250",
          isShow: true,
        },
        {
          label: "项目描述",
          slot: "description",
          align: "left",
          showTooltip: false,
          isShow: true,
        },
        {
          label: "操作",
          slot: "handle",
          align: "center",
          showTooltip: false,
          width: "120",
          isShow: true,
        },
      ],
      total: 1,
    };
  },

  mounted() {},

  methods: {
    projectGet() {
      // 调用接口获取数据
    },
    delHandle(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped></style>
