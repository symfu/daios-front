<template>
  <div class="pop_up_box">
      <div class="wrap">
          <header class="header">
              <span>{{title}}</span>
              <i class="iconfont daioscha" @click="close=true;"></i>
          </header>
          <div class="body">
              <div class="item">
                  <div class="title">工单简介</div>
                  <div class="content">
                      <el-input v-model="intro" size="small"></el-input>
                  </div>
              </div>
              <div class="item">
                  <div class="title">资源类型</div>
                  <div class="content">
                    <el-select v-model="type" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                  </div>
              </div>
              <div class="item">
                  <div class="title">具体资源</div>
                  <div class="content">
                    <div style="width:168px;">
                        <el-select v-model="resource" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in resources"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="title" style="padding-left:28px;">操作</div>
                    <div style="width:174px;">
                        <el-select v-model="operation" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in operations"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                  </div>
              </div>
              <div class="item">
                  <div class="title">审批人</div>
                  <div class="content">
                      <div style="width:168px;">
                        <el-input v-model="approver" size="small"></el-input>
                      </div>
                      <div class="title" style="padding-left:28px;">优先级</div>
                      <div style="width:174px;">
                        <el-select v-model="priority" size="small" placeholder="请选择">
                            <el-option
                            v-for="item in priorities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                      </div>
                  </div>
              </div>
              <div class="item">
                  <div class="title">发起人</div>
                  <div class="content">
                      <el-input v-model="initiator" size="small"></el-input>
                  </div>
              </div>
              <div class="item">
                  <div class="title">说明</div>
                  <div class="content">
                    <el-input
                    type="textarea"
                    :rows="2"
                    v-model="explain">
                    </el-input>
                  </div>
              </div>
          </div>
          <footer class="footer">
              <div style="display:inline-block;" v-if="buttonType==1">
                  <el-button style="margin-right:16px;" type="primary" size="small">同意</el-button>
                  <el-button style="margin-right:16px;margin-left:0px;" type="primary" size="small">拒绝</el-button>
              </div>
              <div v-else style="display:inline-block">
                  <el-button style="margin-right:16px;" type="primary" size="small">提交</el-button>
              </div>
              <el-button size="small" class="cancel" @click="close=true;">取消</el-button>
          </footer>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        intro: null,
        type: null,
        resource: null,
        operation: null,
        approver: null,
        priority: null,
        initiator: null,
        explain: null,
        types: [{
          value: '1',
          label: '项目'
        }, {
          value: '2',
          label: '权限'
        }, {
          value: '3',
          label: 'SQL'
        }],
        resources: [
            {
                label: 'UAC项目',
                value: '1'
            },
            {
                label: 'TEST项目',
                value: '2'
            }
        ],
        operations: [
            {
                label: '申请加入',
                value: '1'
            }
        ],
        priorities: [
            {
                label: '正常',
                value: '1'
            },
            {
                label: '紧急',
                value: '2'
            },
            {
                label: '十万火急',
                value: '3'
            }
        ],
        close: false
    }
  },
  components:{},
  props:{
      title: {
          type: String,
          default: 'title'
      },
      buttonType: {
          type: String,
          default: '1'
      },
      show: {
          type: Boolean,
          default: false
      }
  },
  created() {},
  watch:{
    close: function(newValue) {
        this.$emit('update:show', !newValue)
     } 
  },
  computed:{},
  methods:{

  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
    .pop_up_box{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 100;
        .wrap{
            width: 600px;
            border: 1px solid rgba(75,90,103,1);
            background-color: #1D1E22;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .header{
                height: 36px;
                line-height: 36px;
                background-color: #383A3F;
                padding-left: 32px;
                padding-right: 14px;
                .daioscha{
                    float: right;
                    font-size: 12px;
                    cursor: pointer;
                }
                .daioscha:hover{
                    color: #409EFF;
                }
            }
            .body{
                padding: 28px 38px 47px 37px;
            }
            .item {
                display: flex;
                margin-bottom: 15px;
                line-height: 32px;
                .title{
                    flex: auto;  
                    font-size: 14px;
                }
                .content{
                    width: 420px;
                    display: flex;
                }
            }
            input{
                width: 100%;
                background-color: #27292E;
                height: 30px;
            }
            textarea{
                width: 100%;
                background-color: #27292E;
            }
            .el-select{
                width: 100%;
            }
            .footer{
                height: 62px;
                line-height: 62px;
                background-color: #383A3F;
                text-align: center;
                .cancel{
                    background-color: #161616;
                    color: #999999;
                    border-color: #3B4853;
                }
                .cancel:hover{
                    background-color: #409EFF;
                    color: white;
                }
            }
        }
    }
</style>