<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">新增成员</span>
    <el-form style="padding:20px" label-width="80px" :model="form">
      <el-form-item label="搜索用户">
        <!-- <el-input v-model="form.name" placeholder="从该系统中搜索用户添加到本项目"></el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="filterText"
          size="mini"
          style="width:100%"
          :fetch-suggestions="querySearch"
          placeholder="从该系统中搜索用户添加到本项目"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select style="width:100%" size="mini" v-model="users" @change="changeUsers" placeholder="请选择用户组">
          <el-option v-for="item,i in userList" :key="i" :label="item.groupName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="已选中">
        <el-tag
          :key="tag.value"
          v-for="tag in dynamicTags"
          closable
          size="mini"
          effect="dark"
          style="margin-right:5px;"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag.value}}</el-tag>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submit" type="blue" size="mini">确定</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapState({
      toProjectId: state => state.project.toProjectId
    })
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.users = "";
        this.filterText = "";
        this.dynamicTags = [];
      }
    }
  },
  data() {
    return {
      users: "",
      filterText: "",
      userList: [],
      dynamicTags: [],
      sub: []
    };
  },

  methods: {
    /**
     * @description 根据用户昵称搜索用户
     * @param
     */
    searchPmUseer() {
      this.$api.project.pro.searchPmUseer(this.filterText).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    querySearch(queryString, cb) {
      var results;
      this.$api.project.pro.searchPmUseer(this.filterText).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          results = JSON.parse(
            JSON.stringify(res.data).replace(/nickName/g, "value")
          );
          cb(results);
        } else {
          this.$message.error(res.resMsg);
        }
      });
      // 调用 callback 返回建议列表的数据
    },
    handleSelect(item) {
      console.log(item);
      let tag = item;
      tag["userGroupId"] = this.users || null;
      this.dynamicTags.push(tag);
      this.dynamicTags = _.uniqBy(this.dynamicTags, "value");
    },
    /**
     * @description 获取用户组
     * @param
     */
    loadUsers() {
      this.$api.project.pro.getPmGroup(this.toProjectId).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.userList = res.data;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 提交
     * @param
     */
    submit() {
      if (this.dynamicTags.length == 0) {
        this.$message.error("用户不能为空");
        return false;
      } else if (this.users == "") {
        this.$message.error("用户组不能为空");
        return false;
      }
      console.log(this.dynamicTags);
      let params = [];
      for (let i = 0; i < this.dynamicTags.length; i++) {
        let element = this.dynamicTags[i];
        let obj = {};
        obj.userGroupId = element.userGroupId;
        obj.userId = element.userId;
        params.push(obj);
      }
      console.log(params);
      this.$api.project.pro.addPmPeople(params).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.$message.success(res.resMsg);
          this.$emit("clickSubmit", false);
          this.$parent.loadUserList();
        } else {
          this.$message.error(res.resMsg);
        }
      });
      //
    },
    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    },
    /**
     * @description 选择用户组
     * @param
     */
    changeUsers(data) {
      console.log(data);
      console.log(this.dynamicTags);
      for (let i = 0; i < this.dynamicTags.length; i++) {
        let element = this.dynamicTags[i];
        if (element.userGroupId == null) {
          element.userGroupId = data;
        }
      }
    },
    /**
     * @description 移除标签
     * @param
     */
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  },

  created() {
    this.loadUsers();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.el-tag--dark {
  background-color: #27292e;
  border-color: #27292e;
  color: #999999;
}
.el-autocomplete-suggestion.el-popper {
  background-color: #27292e;
  border: none;
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background-color: #1d1e22;
  color: #fff;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #131415;
}
</style>
