<template>
    <div class="wrapChart">
        <header class="header">
            <span class="title">{{title}}</span>
            <select-time style="float:right;" @selectDate="switchData"></select-time>
        </header>
        <div ref="lineChart" class="chart"></div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import SelectTime from '../selectTime/selectTime.vue'
export default {
    data() {
        return {
            myChart: null,
        }
    },
    components: {
        SelectTime
    },
    props: {
        color: {
            type: String,
            default: '#2E5FB8'
        },
        title: {
            type: String,
            default: null
        },
        data: {
            type: Object,
            default: null
        }
    },
    watch: {
        data(newValue) {
            let option = this.myChart.getOption();
            option.xAxis[0].data = newValue.xData;
            option.series[0].data = newValue.yData;
            this.myChart.setOption(option);
        },
        '$store.state.theme.isCollapse':function(){
            this.reDraw()
        }
    },
    mounted() {
        this.$nextTick(function(){
            this.initChart()
        })
    },
    methods: {
        initChart() {
            this.myChart = echarts.init(this.$refs.lineChart);
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                xAxis: {
                    data: this.data.xData,
                    axisTick: {
                        show: false    //是否显示坐标轴刻度
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,     //是否显示坐标轴线
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisTick: {
                        show: false    //是否显示坐标轴刻度
                    },
                    splitLine: {    //坐标轴中分割线的样式
                        lineStyle: {
                            color: '#666'
                        }
                    }
                },
                grid: {
                    left: '50',
                    top: 20,
                    right: 10,
                    bottom: 30
                },
                series: [{
                    data: this.data.yData,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,     //不显示数据点
                    areaStyle: {
                        color: {                             //加渐变区域
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                            {
                                offset: 0,
                                color: this.transeformColor(this.color,1)
                            },
                            {
                                offset: 0.5,
                                color: this.transeformColor(this.color,0)
                            }
                            ],
                            globalCoord: true
                        }
                    },
                    itemStyle: {
                        color: this.color
                    }
                }]  
            })
            // window.onresize = ()=> {    //当窗口尺寸改变时，echarts动态自适应
            //     this.myChart.resize();
            // }
            window.addEventListener("resize", this.reDraw);
        },
        /**
         * 将‘#333333’或‘#333’格式的颜色值转换为rgba格式
         */
        transeformColor(val,num) {
            if(val.length>4){
                return 'rgba(' + parseInt(val.slice(1,3),16) + ',' + parseInt(val.slice(3,5),16) + ',' + parseInt(val.slice(5),16) + ',' + num + ')'
            }else{
                return 'rgba(' + parseInt(val.slice(1,2)+val.slice(1,2),16) + ',' + parseInt(val.slice(2,3)+val.slice(2,3),16) + ',' + parseInt(val.slice(3)+val.slice(3),16) + ',' + num + ')'
            }
        },
        switchData(val) {
            this.$emit('changeData',val)
        },
        /**
         * 当浏览器窗口改变时，重绘echarts
         */
        reDraw() {
            setTimeout(()=>{
                this.myChart.resize()
            },300)
        }
    },
    destroyed() {
        window.removeEventListener("resize",this.reDraw)
    }
}
</script>
<style>
    @import './lineChart.scss'
</style>

