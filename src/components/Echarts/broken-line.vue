<script>
import * as echarts from "echarts";
export default {
    name: "ring-chart",
    props: {
        width: {
            default: "100%",
            type: String,
        },
        height: {
            default: "200px",
            type: String,
        },
        title: {
            default: "",
            type: String,
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var myChart = echarts.init(this.$refs["ring"]);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: this.title,
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["上月", "本月"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["第一周", "第二周", "第三周", "第四周"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "上月",
                        type: "line",
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: "linear",
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(101, 131, 219, 1)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(101, 131, 219, 0)", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },

                        data: [0, 32, 101, 134],
                    },
                    {
                        name: "本月",
                        type: "line",
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: "linear",
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(159, 224, 128, 1)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(159, 224, 128, 0)", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        data: [100, 82, 191, 234],
                    }
                ],
            });
        },
    },
    render(h) {
        return this.$createElement("div", {
            ref: "ring",
            style: {
                width: this.width,
                height: this.height,
            },
        });
    },
};
</script>
