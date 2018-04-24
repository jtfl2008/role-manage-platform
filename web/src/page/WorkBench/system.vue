<template>
  <div class="page">
    <el-row type="flex">
      <el-col :span="6">
        <h2 class="grid-content">系统列表</h2>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" class="grid-content" size="medium" @click="showAddForm">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" v-show="!loading">
      <el-table-column prop="system_id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="system_name" label="系统名称" width="150">
      </el-table-column>
      <el-table-column prop="created_date" label="创建日期" width="220">
      </el-table-column>
      <el-table-column prop="created_by" label="创建人" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="getDetail(tableData,scope.$index)" type="text" size="small">详情</el-button>
          <el-button @click="editSystem(tableData,scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="editPassword(tableData,scope.$index)" type="text" size="small">修改密码</el-button>
          <!-- <el-button @click="deleteSys(tableData,scope.$index)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 隐藏的表单 -->
    <!-- 新增系统 -->
    <el-dialog title="新增系统" :visible.sync="addFormVisible">
      <el-form :model="addForm">
        <el-form-item label="系统名字" :label-width="formLabelWidth">
          <el-input v-model="addForm.sysName" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="系统密码" :label-width="formLabelWidth">
          <el-input v-model="addForm.password" auto-complete="off" placeholder="必填" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="addSystem">确定</el-button>
      </div>
    </el-dialog>
    <!-- 系统详情 -->
    <el-dialog title="系统详情" :visible.sync="detailFormVisible">
      <el-form :model="form">
        <el-form-item label="角色列表" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.roleList" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="资源列表" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.resourceList" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeForm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑系统 -->
    <el-dialog title="编辑系统" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="系统ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="系统名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updateSystem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="编辑系统" :visible.sync="pwdFormVisible">
      <el-form :model="form">
        <el-form-item label="系统ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        tableData: [],
        editFormVisible: false,
        detailFormVisible: false,
        addFormVisible: false,
        pwdFormVisible: false,
        form: {
          id: '',
          name: '',
          roleList: '',
          roleArr: [],
          resourceList: '',
          resourceArr: [],
          oldPassword: '',
          newPassword: '',
        },
        addForm: {
          sysName: '',
          password: '',
        },
        formLabelWidth: '100px',
        // 保存当前操作table的index
        rowIndex: 0,
      };
    },
    components: {

    },
    methods: {
      showAddForm() {
        const userRoles = this.$store.state.role;
        if (userRoles.includes('admin')) {
          this.addFormVisible = true;
        } else {
          this.$message.error('你不是超级管理员（supervisor），无权操作权限！');
        }
      },
      addSystem() {
        const that = this;
        if (!this.addForm.sysName || !this.addForm.password) {
          const msg = !this.addForm.sysName ? '请输入系统名称' : '请输入系统密码';
          this.$message.error(msg);
          return;
        }
        const sysName = this.addForm.sysName;
        // md5 加密
        const pwd = this.Md5(this.addForm.password + this.Salt);
        const creater = this.$store.state.username;
        this.$http.post('/role-manage/system', {
          system_name: sysName,
          password: pwd,
          created_by: creater,
        }).then(res => {
          this.addFormVisible = false;
          if (res.data.code === 1) {
            that.$message({
              type: 'success',
              message: '添加成功!',
            });
            this.tableData.push(res.data.data[0]);
          } else {
            that.$message({
              type: 'warning',
              message: res.data.msg,
            });
          }
        }).catch(err => {
          this.addFormVisible = false;
          console.warn(err);
          that.$message.error('系统错误!');
        });

      },
      editSystem(data, $index) {
        const userRoles = this.$store.state.role;
        if (userRoles.includes('admin')) {
          const rowData = data[$index];
          this.rowIndex = $index;
          this.form.id = rowData.system_id;
          this.form.name = rowData.system_name;
          this.editFormVisible = true;
        } else {
          this.$message.error('你不是超级管理员（supervisor），无权操作权限！');
        }
      },
      getSysList() {
        const that = this;
        // 子组件
        this.$http.get('/role-manage/system').then(res => {
          if (res.data.code) {
            that.tableData = res.data.data;
            that.loading = false;
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      updateSystem() {
        const that = this;
        const id = this.form.id;
        const name = this.form.name;
        if (name) {
          this.$http.put('/role-manage/system', {
            system_id: id,
            system_name: name,
          }).then(res => {
            that.editFormVisible = false;
            if (res.data.code === 1) {
              that.tableData[that.rowIndex].system_name = name;
              that.$message({
                message: res.data.msg,
                type: 'success',
              });
            } else {
              that.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          }).catch(err => {
            console.warn(err);
            that.editFormVisible = false;
            that.$message.error('系统错误');
          });
        }
      },
      getDetail(data, $index) {
        const that = this;
        const rowData = data[$index];
        this.rowIndex = $index;
        this.form.id = rowData.system_id;
        this.form.name = rowData.system_name;
        this.detailFormVisible = true;
        this.$http.get(`/role-manage/system/${that.form.id}`).then(res => {
          if (res.data.code) {
            const data = res.data.data;
            // 拼接string
            const getStr = type => {
              let str = '';
              const len = data[`${type}List`].length;
              for (let i = 0; i < len; i++) {
                if (i < len - 1) {
                  str += data[`${type}List`][i][`${type}_name`] + ' ,';
                } else {
                  str += data[`${type}List`][i][`${type}_name`];
                }
              }
              return str;
            };
            that.form.roleList = getStr('role');
            that.form.resourceList = getStr('resource');
          } else {
            that.form.roleList = '';
            that.form.resourceList = '';
          }
        }).catch(err => {
          console.warn(err);
          that.form.roleList = '';
          that.form.resourceList = '';
        });
      },
      editPassword(data, $index) {
        const userRoles = this.$store.state.role;
        if (userRoles.includes('admin')) {
          const rowData = data[$index];
          this.rowIndex = $index;
          this.form.id = rowData.system_id;
          this.form.name = rowData.system_name;
          this.pwdFormVisible = true;
        } else {
          this.$message.error('你不是超级管理员（supervisor），无权操作权限！');
        }
      },
      updatePassword() {
        const that = this;
        const id = this.form.id;
        const oldPwd = this.Md5(this.form.oldPassword + this.Salt);
        const newPwd = this.Md5(this.form.newPassword + this.Salt);
        if (!oldPwd || !newPwd) {
          const msg = !oldPwd ? '请输入原密码' : '请输入新密码';
          this.$message.error(msg);
          return;
        }
        this.$http({
          method: 'put',
          url: '/role-manage/system',
          data: {
            system_id: id,
            oldPassword: oldPwd,
            newPassword: newPwd,
          },
        }).then(res => {
          if (res.data.code === 1) {
            that.closeForm();
            that.$message({
              message: res.data.msg,
              type: 'success',
            });
          } else {
            that.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        }).catch(err => {
          console.warn(err);
          that.closeForm();
          that.$message.error('系统错误');
        });
      },
      deleteSys() {
        const userRoles = this.$store.state.role;
        if (userRoles.includes('admin')) {
          this.addFormVisible = true;
        } else {
          this.$message.error('你不是超级管理员（supervisor），无权操作权限！');
        }
      },
      // 关闭模态表单时清空临时数据
      closeForm() {
        this.detailFormVisible = false;
        this.addFormVisible = false;
        this.editFormVisible = false;
        this.pwdFormVisible = false;
        this.form = {
          id: '',
          name: '',
          roleList: '',
          resourceList: '',
          oldPassword: '',
          newPassword: '',
        };
        this.addForm = {
          sysName: '',
          password: '',
        };
      },
    },
    mounted() {
      this.getSysList();
    },
  };
</script>

<style scoped lang="less">
  .grid-content {
    text-align: left;
    margin-bottom: 15px;
  }
</style>