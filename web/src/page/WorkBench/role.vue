<template>
  <div class="page">
    <el-row type="flex">
      <el-col :span="6">
        <h2 class="grid-content">角色列表</h2>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" class="grid-content" size="medium" @click="addFormVisible = true">新增角色</el-button>
      </el-col>
      <el-col :span="6">

      </el-col>
      <el-col :span='6'>
        
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" v-show="!loading">
      <el-table-column prop="role_id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="150">
      </el-table-column>
      <el-table-column prop="system_id" label="系统ID" width="80">
      </el-table-column>
      <el-table-column prop="created_date" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="created_by" label="创建人" width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editUser(tableData,scope.$index)" type="text" size="small">用户</el-button>
          <el-button @click="editResource(tableData,scope.$index)" type="text" size="small">资源</el-button>
          <el-button @click="editRole(tableData,scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteRole(tableData,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 隐藏的表单 -->
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="系统" :label-width="formLabelWidth">
          <el-select v-model='system_option'>
            <el-option v-for='item in systemList' :key='item.system_id' :label='item.system_name' :value='item.system_id'>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="addRole">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用户操作 -->
    <el-dialog title="关联的用户" :visible.sync="userFormVisible">
      <el-form :model="form">
        <el-form-item label="角色ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="已关联的用户" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off" readonly="readonly" disabled type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="编辑用户" :label-width="formLabelWidth">
          <el-input v-model="form.editedName" auto-complete="off" type="textarea" placeholder="用户间以英文格式逗号隔开"></el-input>
          （填写用户ID间以英文格式逗号隔开）
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 资源操作 -->
    <el-dialog title="关联的资源" :visible.sync="resourceFormVisible">
      <el-form :model="form">
        <el-form-item label="角色ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="已关联的资源" :label-width="formLabelWidth">
          <el-input v-model="form.resourceName" auto-complete="off" readonly="readonly" disabled type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="编辑资源" :label-width="formLabelWidth">
          <el-select v-model="seletedResource" multiple placeholder="请选择" @change="selectSource">
            <el-option v-for="item in resourceOptions" :key="item.resource_id" :label="item.resource_name" :value="item.resource_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updateResource">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="角色ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
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
        systemList: [],
        system_option: '',
        editFormVisible: false,
        addFormVisible: false,
        userFormVisible: false,
        resourceFormVisible: false,
        // 存放表单数据
        form: {
          id: '',
          name: '',
          username: '',
          resourceName: '',
          userList: [],
          resourceList: '',
          sysId: '',
          creater: 'admin',
          editedName: '',
          editedResource: '',
          relatedResource: '',
        },
        formLabelWidth: '100px',
        // 保存当前操作table的index
        rowIndex: 0,
        // 资源表单相关
        resourceOptions: [{
          resource_id: '选项1',
          resource_name: '黄金糕',
        }, {
          resource_id: '选项2',
          resource_name: '双皮奶',
        }, {
          resource_id: '选项3',
          resource_name: '蚵仔煎',
        }, {
          resource_id: '选项4',
          resource_name: '龙须面',
        }, {
          resource_id: '选项5',
          resource_name: '北京烤鸭',
        }],
        seletedResource: [],
        cur_system: '',
        checksys_option: '',
        checksysOptions: [],
      };
    },
    components: {
    },
    methods: {
      // 新增角色
      addRole() {
        const that = this;
        const roleName = this.form.name;
        const sysId = this.system_option;
        const creater = this.$store.state.username;
        if (roleName && sysId && creater) {
          this.$http.post('/role-manage/role', {
            role_name: that.form.name,
            system_id: sysId,
            created_by: that.$store.state.username,
          }).then(res => {
            if (res.data.code) {
              that.tableData.push(res.data.data[0]);
              that.$message({
                message: res.data.msg,
                type: 'success',
              });
              that.addFormVisible = false;
              that.form = {
                id: '',
                name: '',
                sysId: '',
              };
              that.system_option = '';
            } else {
              that.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          }).catch(err => {
            console.warn(err);
            that.$message.error('系统错误');
          });
        } else {
          this.$message({
            type: 'warning',
            message: '参数不能为空！',
          });
        }
      },
      // 编辑时保持数据信息
      editRole($data, $index) {
        const rowData = $data[$index];
        this.rowIndex = $index;
        this.form.id = rowData.role_id;
        this.form.name = rowData.role_name;
        this.editFormVisible = true;
      },
      // 获取角色列表
      getRoleList() {
        const that = this;
        this.$http.get('/role-manage/role').then(res => {
          if (res.data.code) {
            that.tableData = res.data.data;
            that.loading = false;
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      // 删除角色
      deleteRole($data, $index) {
        const that = this;
        const id = $data[$index].role_id;
        this.$confirm('是否确定要删除？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          that.$http.delete(`/role-manage/role/${id}`).then(res => {
            if (res.data.code === 1) {
              that.tableData.splice($index, 1);
              that.$message({
                type: 'success',
                message: res.data.msg,
              });
            } else {
              that.$message({
                type: 'warning',
                message: '删除失败',
              });
            }
          }).catch(err => {
            console.warn(err);
            that.$message.error(err.toString());
          });
        });
      },
      // 更新角色
      updateRole() {
        const that = this;
        const id = this.form.id;
        const name = this.form.name;
        if (name) {
          this.$http.put('/role-manage/role', {
            role_id: id,
            role_name: name,
          }).then(res => {
            if (res.data.code === 1) {
              that.tableData[that.rowIndex].role_name = name;
            }
            that.$message({
              type: 'success',
              message: res.data.msg,
            });
            that.editFormVisible = false;
          }).catch(err => {
            console.warn(err);
            that.$message.error(err.toString());
          });
        }
      },
      editUser($data, $index) {
        const id = $data[$index].role_id;
        const that = this;
        this.form.id = id;
        this.userFormVisible = true;
        this.$http.get(`/role-manage/userrole/role/${id}`).then(res => {
          if (res.data.code === 1) {
            const data = res.data.data.users;
            that.form.username = '';
            that.form.userList = [];
            for (let i = 0; i < data.length; i++) {
              if (i === data.length - 1) {
                that.form.username += data[i];
              } else {
                that.form.username += data[i] + ',';
              }
              that.form.editedName = that.form.username;
              that.form.userList.push({ username: data[i] });
            }
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      // 新增用户
      updateUser() {
        const that = this;
        console.log(this.form.username + ';' + this.form.editedName);
        if (this.form.username !== this.form.editedName) {
          if (this.form.editedName.indexOf('，') !== -1) {
            this.$message.error('输入格式有误');
          } else {
            const newUsers = this.form.editedName.split(',');
            const newAdd = {
              user_id: newUsers,
              created_by: that.$store.state.username,
              role_id: that.form.id,
            };
            console.log(newAdd);
            this.$http({
              method: 'post',
              url: '/role-manage/userrole',
              data: newAdd,
            }).then(res => {
              if (res.data.code) {
                that.$message({
                  type: 'success',
                  message: '更新成功',
                });
                that.closeForm();
              } else {
                that.$message({
                  type: 'warning',
                  message: '更新失败',
                });
              }
            }).catch(err => {
              console.warn(err);
              that.$message.error('系统错误');
              that.closeForm();
            });
          }
        } else {
          this.closeForm();
        }
      },
      editResource($data, $index) {
        const id = $data[$index].role_id;
        const that = this;
        this.form.id = id;
        this.resourceFormVisible = true;
        this.$http({
          method: 'get',
          url: `/role-manage/resourcerole/role/${id}`,
        }).then(res => {
          if (res.data.code === 1) {
            const data = res.data.data.resourceList;
            console.log(data);
            that.form.resourceName = '';
            that.form.resourceList = [];
            that.seletedResource = [];
            for (let i = 0; i < data.length; i++) {
              if (i === data.length - 1) {
                that.form.resourceName += data[i].resource_name;
              } else {
                that.form.resourceList += data[i].resource_name + ',';
              }
              that.form.editedResource = that.form.resourceName;
              that.form.resourceList.push({ resource_name: data[i].resource_name, resource_id: data[i].resource_id });
              that.seletedResource.push(data[i].resource_id);
            }
            this.getAllResource($data, $index);
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      // 获取用户列表
      getUser($data, $index) {
        const id = $data[$index].role_id;
        const that = this;
        this.$http.get(`/role-manage/userrole/role/${id}`).then(res => {
          that.$alert(
            `<strong>
            ${res.data.data.users.toString()}
            </strong>`,
            '关联的用户:', {
              dangerouslyUseHTMLString: true,
            }).catch(() => { });
        }).catch(err => {
          console.warn(err);
        });
      },
      // 获取同一个系统下的资源列表
      getAllResource($data, $index) {
        // const id = $data[$index].role_id;
        const sysId = $data[$index].system_id;
        const that = this;
        this.resourceOptions = [];
        this.$http.get('/role-manage/resource').then(res => {
          console.log(res);
          if (res.data.code) {
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              if (+data[i].system_id === +sysId) {
                that.resourceOptions.push({
                  resource_name: data[i].resource_name,
                  resource_id: data[i].resource_id,
                });
              }
            }
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      selectSource() {
        console.log(this.seletedResource);
      },
      updateResource() {
        // this.$http({
        //   method: 'post',
        //   url:
        // })
      },
      // 关闭模态表单时清空临时数据
      closeForm() {
        this.editFormVisible = false;
        this.addFormVisible = false;
        this.userFormVisible = false;
        this.resourceFormVisible = false;
        this.form = {
          id: '',
          name: '',
          username: '',
          userList: [],
          sysId: '',
          creater: 'admin',
          editedName: '',
        };
        this.resourceOptions = [];
        this.seletedResource = '';
      },
      // 获取系统列表
      getSysList() {
        const that = this;
        this.$http.get('/role-manage/system').then(res => {
          if (res.data.code) {
            const data = res.data.data;
            that.systemList = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              that.checksysOptions.push(data[i]);
            }
          }
        }).catch(err => {
          console.warn(err);
          that.systemList = [];
        });
      },
    },
    mounted() {
      this.getRoleList();
      this.getSysList();
    },
  };
</script>

<style scoped lang="less">
  [v-cloak] {
    display: none !important;
  }

  .grid-content {
    text-align: left;
    margin-bottom: 15px;
  }
</style>