<template>
    <div class="selectTime">
        <div class="wrapTime">
            <div class="time-item" @click="selectedTime(i,item)" :class="['item'+(i+1),{'active-item': i==index}]" v-for="(item,i) in data" :key="i">{{item}}</div>
        </div>
        <el-date-picker
            v-model="time"
            size="mini"
            type="daterange"
            range-separator="—"
            start-placeholder="开始日期"
            @change="changedTime"
            end-placeholder="结束日期">
        </el-date-picker>
    </div>
</template>
<script>
export default {    
    data() {
        return {
            time: null,
            data: ['日','周','月'],
            index: 0
        }
    },
    methods: {
        selectedTime(val,item) {
            this.index = val;
            this.$emit('selectDate',item)
        },
        changedTime(){
            this.$emit('selectDate',this.time)
        }
    },
}
</script>
<style>
    @import './selectTime.scss'
</style>
