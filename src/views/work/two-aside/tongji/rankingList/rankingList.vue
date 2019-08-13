<template>
    <div class="ranking">
        <header style="height:40px">
            <span class="title">{{title}}</span>
            <select-time style="float:right;" @selectDate="switchData"></select-time>
        </header>
        <div class="ranking-body">
            <div class="table">
                <div class="table-header">
                    <div class="column1">排名</div>
                    <div class="column2">{{columnName}}</div>
                    <div class="column3">执行SQL数量</div>
                </div>
                <div class="table-body">
                    <div class="row" :style="{'border':(index==4?'none':'')}" v-for="(item,index) in data.slice(0,5)" :key="item.id">
                        <div class="column1">
                            <i v-if="index==0" style="color:#D53232;" class="iconfont daiosicon-test1"></i>
                            <i v-else-if="index==1" style="color:#D58000;" class="iconfont daiosicon-test"></i>
                            <i v-else-if="index==2" style="color:#613AB0;" class="iconfont daiosicon-test2"></i>
                            <span v-else>{{index+1}}</span>
                        </div>
                        <div class="column2">{{item.name}}</div>
                        <div class="column3">{{item.number}}</div>
                    </div>
                </div>
            </div>
            <div class="table">
                <div class="table-header">
                    <div class="column1">排名</div>
                    <div class="column2">{{columnName}}</div>
                    <div class="column3">执行SQL数量</div>
                </div>
                <div class="table-body">
                    <div class="row" :style="{'border':(index==4?'none':'')}" v-for="(item,index) in data.slice(5)" :key="item.id">
                        <div class="column1">{{index + 6}}</div>
                        <div class="column2">{{item.name}}</div>
                        <div class="column3">{{item.number}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SelectTime from '../selectTime/selectTime.vue'
export default {
    data() {
        return {
        }
    },
    components: {
        SelectTime
    },
    props: {
        title: {
            type: String,
            default: 'title'
        },
        data: {
            type: Array,
            default: null
        },
        columnName: {
            type: String,
            default: 'name'
        }
    },
    methods: {
        switchData(val) {
            console.log(val)
            this.$emit('changeData',val)
        },
    },
}
</script>
<style lang="scss" scoped>
    @import './rankingList.scss'
</style>
