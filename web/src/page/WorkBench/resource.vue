<template>
  <div class="page">
    <el-row type="flex">
      <el-col :span="6">
        <h2 class="grid-content">资源列表</h2>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" class="grid-content" size="medium" @click="addFormVisible = true">新增资源</el-button>
      </el-col>
      <el-col :span="6">

      </el-col>
      <el-col :span='6'>
        <el-select v-model='checksys_option' @change="selectSystem">
          <el-option v-for='item in checksysOptions' :key='item.system_id' :label='item.system_name' :value='item.system_id'>
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%" v-show="!loading">
      <el-table-column prop="resource_id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="resource_name" label="资源名称" width="150">
      </el-table-column>
      <el-table-column prop="resource_type" label="资源类型" width="150">
      </el-table-column>
      <el-table-column prop="system_id" label="系统ID" width="80">
      </el-table-column>
      <el-table-column prop="created_date" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="created_by" label="创建人" width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="roleFormVisible = true" type="text" size="small">角色</el-button>
          <el-button @click="getResourceValue(tableData,scope.$index)" type="text" size="small">内容</el-button>
          <el-button @click="editResource(tableData,scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteResource(tableData,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 隐藏的表单 -->
    <el-dialog title="新增资源" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="资源类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="系统" :label-width="formLabelWidth">
          <el-select v-model='system_option'>
            <el-option v-for='item in systemList' :key='item.system_id' :label='item.system_name' :value='item.system_id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.value" auto-complete="off" placeholder="选填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="addResource">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="关联的资源" :visible.sync="roleFormVisible">
      <el-form :model="form">
        <el-form-item label="角色ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="已关联的资源" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" readonly="readonly" disabled type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="关联新资源" :label-width="formLabelWidth">
          <el-select v-model="seletedRole" multiple placeholder="请选择">
            <el-option v-for="item in roleOptions" :key="item.role_id" :label="item.role_name" :value="item.role_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="角色ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" readonly="readonly" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源内容" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="updateResource">确 定</el-button>
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
        roleFormVisible: false,
        // 存放表单数据
        form: {
          id: '',
          type: '',
          sysId: '',
          name: '',
          creater: 'admin',
          value: '',
        },
        formLabelWidth: '100px',
        // 保存当前操作table的index
        rowIndex: 0,
        // 资源表单相关
        roleOptions: [{
          role_id: '选项1',
          role_name: '黄金糕',
        }, {
          role_id: '选项2',
          role_name: '双皮奶',
        }, {
          role_id: '选项3',
          role_name: '蚵仔煎',
        }, {
          role_id: '选项4',
          role_name: '龙须面',
        }, {
          role_id: '选项5',
          role_name: '北京烤鸭',
        }],
        seletedRole: [],
        checksys_option: '',
        checksysOptions: [{
          system_name: '全部系统',
          system_id: '',
        }],
      };
    },
    components: {

    },
    methods: {
      // 新增资源
      addResource() {
        const that = this;
        const type = this.form.type;
        const name = this.form.name;
        const sysId = parseInt(this.system_option);
        const creater = this.form.creater;
        const value = this.form.value;
        if (type && sysId && creater && name) {
          this.$http.post('/role-manage/resource', {
            resource_type: type,
            resource_name: name,
            system_id: sysId,
            created_by: creater,
            value,
          }).then(res => {
            if (res.data.code) {
              that.tableData.push(res.data.data[0]);
              that.$message({
                message: res.data.msg,
                type: 'success',
              });
              that.addFormVisible = false;
              that.closeForm();
            } else {
              that.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          }).catch(err => {
            // that.$message.error(err.toString());
            console.warn(err);
          });
        } else {
          that.$message.error('资源类型、资源名称、系统ID或创建者 不能为空！');
        }

      },
      // 编辑时保持数据信息
      editResource($data, $index) {
        const rowData = $data[$index];
        this.rowIndex = $index;
        this.form = {
          id: rowData.resource_id,
          type: rowData.resource_type,
          sysId: rowData.system_id,
          name: rowData.resource_name,
          creater: 'admin',
          value: rowData.value,
        };
        this.editFormVisible = true;
      },
      // 删除角色
      deleteResource($data, $index) {
        const that = this;
        const id = $data[$index].resource_id;
        this.$confirm('是否确定要删除？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          that.$http.delete(`/role-manage/resource/${id}`).then(res => {
            if (res.data.code === 1) {
              that.tableData.splice($index, 1);
              that.$message({
                type: 'success',
                message: res.data.msg,
              });
            } else {
              that.$message({
                type: 'warning',
                message: res.data.msg,
              });
            }
          }).catch(err => {
            console.warn(err);
            that.$message.error(err.toString());
          });
        }).catch(() => { });
      },
      // 更新资源
      updateResource() {
        const that = this;
        const id = this.form.id;
        const name = this.form.name;
        const type = this.form.type;
        const data = {
          resource_id: id,
        };
        if (name) {
          data.resource_name = name;
        }
        if (type) {
          data.resource_type = type;
        }
        if (name && type) {
          this.$http.put('/role-manage/resource', data).then(res => {
            if (res.data.code === 1) {
              Object.assign(that.tableData[that.rowIndex], data);
              that.$message({
                type: 'success',
                message: res.data.msg,
              });
              that.editFormVisible = false;
            } else {
              that.$message({
                type: 'warning',
                message: res.data.msg,
              });
            }
          }).catch(err => {
            console.warn(err);
            that.$message.error(err.toString());
          });
        } else {
          that.$message.error('参数不能为空');
        }
      },
      // 获取用户列表
      getRole($data, $index) {
        const id = $data[$index].resource_id;
        const that = this;
        this.$http.get(`/role-manage/resourcerole/resource/${id}`).then(res => {
          const data = res.data.data.roleList;
          const roleNames = [];
          for (let i = 0; i < data.length; i++) {
            roleNames.push(data[i].role_name);
          }
          that.$alert(`<strong>${roleNames.toString()}</strong>`, '关联的角色:', {
            dangerouslyUseHTMLString: true,
          }).catch(() => { });
        }).catch(err => {
          console.warn(err);
        });
      },
      // 获取资源列表
      getResourceValue($data, $index) {
        const that = this;
        const val = $data[$index].value;
        that.$alert(`<strong>${val}</strong>`, '资源内容（Value）:', {
          dangerouslyUseHTMLString: true,
        }).catch(() => { });
      },
      // 关闭模态表单时清空临时数据
      closeForm() {
        this.editFormVisible = false;
        this.addFormVisible = false;
        this.form = {
          id: '',
          type: '',
          sysId: '',
          name: '',
          creater: 'admin',
          value: '',
        };
      },
      // 获取全部资源
      getResourceList() {
        const that = this;
        this.$http.get('/role-manage/resource').then(res => {
          that.tableData = res.data.data;
          that.loading = false;
        }).catch(err => {
          console.warn(err);
          that.tableData = [];
        });
      },
      // 获取系统列表
      getSysList() {
        const that = this;
        this.$http.get('/role-manage/system').then(res => {
          if (res.data.code) {
            that.systemList = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              that.checksysOptions.push(res.data.data[i]);
            }
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      // 选择系统
      selectSystem() {
        const sysId = this.checksys_option;
        const that = this;
        this.$http.get('/role-manage/resource').then(res => {
          if (res.data.code === 1) {
            const data = res.data.data;
            that.tableData = [];
            if (sysId) {
              for (let i = 0; i < data.length; i++) {
                if (+data[i].system_id === +sysId) {
                  that.tableData.push(data[i]);
                }
              }
            } else {
              that.tableData = res.data.data;
            }

          }
        }).catch(err => {
          console.warn(err);
        });
      },
    },
    mounted() {
      this.getResourceList();
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