<template>
  <div class="page">
    <div v-if="!showApplyForm">
      <el-cascader :options="industryList"
        :props="{value: 'id', label: 'name'}"
        v-model="selectedIndustry">
      </el-cascader>
      <el-button type="primary"
        @click="goApply">
        填写表单
      </el-button>
    </div>
    <div v-if="showApplyForm">
      <fieldset>
        <legend>客户信息</legend>
        <el-form :model="contract.applicant"
          label-position="right"
          label-width="130px"
          :rules="rules2">
          <fieldset>
            <legend>投保组织者</legend>
            <el-row :gutter="5">
              <el-col :span="16">
                <el-form-item label="名称">
                  <el-input v-model="contract.applicant.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行业">
                  <el-select style="width: 100%;"
                    v-model="contract.applicant.industry"
                    placeholder="-- 请选择 --">
                    <el-option v-for="industry in industryList"
                      :key="industry.id"
                      :label="industry.name"
                      :value="industry.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="证件类型">
                  <el-select style="width: 100%"
                    v-model="contract.applicant.idType"
                    placeholder="-- 请选择 --">
                    <el-option v-for="industry in industryList"
                      :key="industry.id"
                      :label="industry.name"
                      :value="industry.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码"
                  prop="idNo">
                  <el-input v-model="contract.applicant.idNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构类型">
                  <el-select style="width: 100%;"
                    v-model="contract.applicant.orgType"
                    :remote="true"
                    placeholder="-- 请选择 --">
                    <el-option v-for="industry in industryList"
                      :key="industry.id"
                      :label="industry.name"
                      :value="industry.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="法人姓名">
                  <el-input v-model="contract.applicant.frName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证号码">
                  <el-input v-model="contract.applicant.frIdNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证有效期">
                  <el-date-picker style="width: 100%;"
                    v-model="contract.applicant.frIdDate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="16">
                <el-form-item label="经营范围">
                  <el-input v-model="contract.applicant.bussinessScop"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三证有效期">
                  <el-date-picker style="width: 100%;"
                    v-model="contract.applicant.threeIdDate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
          <fieldset>
            <legend>被保人/投保人/受益人</legend>
            <el-form-item label="个团属性">
              <el-radio v-model="contract.personnelType"
                label="0">个人</el-radio>
              <el-radio v-model="contract.personnelType"
                label="1">团体</el-radio>
            </el-form-item>
            <el-row :gutter="5">
              <el-col :span="16">
                <el-form-item label="名称">
                  <el-input v-model="contract.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主体类型">
                  <el-select style="width: 100%;"
                    v-model="contract.industry"
                    placeholder="-- 请选择 --">
                    <el-option v-for="industry in industryList"
                      :key="industry.id"
                      :label="industry.name"
                      :value="industry.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5"
              type="flex"
              justify="space-between">
              <el-col :span="7">
                <el-form-item label="地址">
                  <el-select style="width: 100%"
                    v-model="contract.province"
                    v-on:change="addressChange('province')"
                    placeholder="-- 省 --">
                    <el-option v-for="province in provinceList"
                      :key="province.code"
                      :label="province.name"
                      :value="province.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-select style="width: 100%"
                  v-model="contract.city"
                  v-on:change="addressChange('city')"
                  placeholder="-- 市 --">
                  <el-option v-for="city in cityList"
                    :key="city.code"
                    :label="city.name"
                    :value="city.code"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select style="width: 100%"
                  v-model="contract.county"
                  v-on:change="addressChange('county')"
                  placeholder="-- 区（县） --">
                  <el-option v-for="county in countyList"
                    :key="county.code"
                    :label="county.name"
                    :value="county.code"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select style="width: 100%"
                  v-model="contract.town"
                  v-on:change="addressChange('town')"
                  placeholder="-- 乡（镇） --">
                  <el-option v-for="town in townList"
                    :key="town.code"
                    :label="town.name"
                    :value="town.code"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select style="width: 100%"
                  v-model="contract.village"
                  v-on:change="addressChange('village')"
                  placeholder="-- 村 --">
                  <el-option v-for="village in villageList"
                    :key="village.code"
                    :label="village.name"
                    :value="village.code"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="16">
                <el-form-item label="完整地址">
                  <el-input v-model="contract.wholeAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构类型">
                  <el-select style="width: 100%;"
                    v-model="contract.orgType"
                    :remote="true"
                    placeholder="-- 请选择 --">
                    <el-option v-for="industry in industryList"
                      :key="industry.id"
                      :label="industry.name"
                      :value="industry.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5"
              v-if="contract.personnelType === '0'">
              <el-col :span="16">
                <el-form-item label="经营范围">
                  <el-input v-model="contract.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三证有效期">
                  <el-date-picker style="width: 100%;"
                    v-model="contract.certificateValidDate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-form>
      </fieldset>
      <fieldset>
        <legend>校验测试</legend>
        <el-form :rules="rules2"
          :model="formObj"
          :label-position="'right'"
          ref="formObj"
          label-width="130px">
          <el-form-item label="类型和范围校验"
            prop="vtest1">
            <el-input v-model="formObj.vtest1"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件号码校验"
                prop="vtest2">
                <el-input v-model="formObj.vtest2"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件类型">
                <el-select style="width: 100%;"
                  v-on:change="idTypeChange()"
                  v-model="formObj.idType"
                  prop="idType"
                  placeholder="-- 请选择 --">
                  <el-option v-for="item in idTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否必须">
            <el-radio v-model="contract.isNeed"
              :label="false">否</el-radio>
            <el-radio v-model="contract.isNeed"
              :label="true">是</el-radio>
          </el-form-item>
          <el-form-item label="求和校验-总和"
            :required="true"
            prop="vtest3">
            <el-input v-model="formObj.vtest3"></el-input>
          </el-form-item>
          <el-form-item label="求和校验-分项1"
            prop="vtest4">
            <el-input v-model="formObj.vtest4"></el-input>
          </el-form-item>
          <el-form-item label="求和校验-分项2"
            prop="vtest5">
            <el-input v-model="formObj.vtest5"></el-input>
          </el-form-item>
          <el-form-item v-for="(duty, index) in formObj.arr"
            :label="'责任属性' + index"
            :key="duty.key"
            :prop="'arr.' + index + '.amount'"
            :rules="arrRule(index, duty)">
            <el-input v-model="duty.amount"></el-input>
          </el-form-item>
        </el-form>
      </fieldset>
      <fieldset>
        <legend>附件上传</legend>
        <el-upload class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".jpg, .png"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger"
            size="small"
            type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;"
            size="small"
            @click="submitUpload">上传到服务器</el-button>
          <div slot="tip"
            class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </fieldset>
      <fieldset>
        <legend>对话框</legend>
        <el-button type="text"
          @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
        <el-dialog title="弹出窗口"
          :visible.sync="dialogTableVisible">
          <el-upload style="margin-bottom: 10px;"
            ref="upload"
            action="https://www.baidu.com/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger"
              size="small"
              type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;"
              size="small"
              @click="submitUpload">上传到服务器</el-button>
            <div slot="tip"
              class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-table :data="gridData">
            <el-table-column property="date"
              label="日期"
              width="150"></el-table-column>
            <el-table-column property="name"
              label="姓名"
              width="200"></el-table-column>
            <el-table-column property="address"
              label="地址"></el-table-column>
          </el-table>
        </el-dialog>
      </fieldset>
      <fieldset>
        <legend>加载遮罩</legend>
        <el-button type="primary"
          @click="openFullScreen">
          显示整页加载，1.5 秒后消失
        </el-button>
      </fieldset>
      <el-button type="primary"
        @click="onSubmit">立即投保</el-button>
      <el-button>暂存</el-button>
    </div>
  </div>
</template>

<script>
import rules from '@/validate';

export default {
  data() {
    const validateSum = (rule, value, callback) => {
      if (this.formObj.vtest4 && this.formObj.vtest5) {
        if (Number(value) < Number(this.formObj.vtest4) + Number(this.formObj.vtest5)) {
          callback(new Error('总和不能小于分项1与分项2之和！'));
        }
      }
      callback();
    };
    const validateSub = (rule, value, callback) => {
      if (this.formObj.vtest4 && this.formObj.vtest5) {
        this.$refs.formObj.validateField('vtest3');
      }
      callback();
    };
    const numberValidList = {
      '01': rules.identificationCard,
      '02': rules.passport,
    };
    const validateIdNo = (rule, value, callback) => {
      if (value && !numberValidList[this.formObj.idType].pattern.test(value)) {
        callback(new Error(numberValidList[this.formObj.idType].message));
      }
      callback();
    };
    return {
      showApplyForm: false,
      fullscreenLoading: false,
      rules2: {
        vtest1: rules.posint02,
        vtest2: {
          validator: validateIdNo,
        },
        vtest3: [
          rules.number,
          {
            validator: validateSum,
            trigger: 'change',
          },
        ],
        vtest4: [
          rules.posint02,
          {
            validator: validateSub,
            trigger: 'change',
          },
        ],
        vtest5: [
          rules.number,
          {
            validator: validateSub,
            trigger: 'change',
          },
        ],
        arr: [
          rules.number,
          {
            validator: validateSub,
            trigger: 'change',
          },
        ],
        idNo: {
          validator: validateIdNo,
        },
      },
      formObj: {
        vtest1: '',
        vtest2: '',
        vtest3: '',
        vtest4: '',
        vtest5: '',
        arr: [
          {
            amount: '',
            key: '1',
            max: 1000,
            min: 10,
          },
          {
            amount: '',
            key: '2',
            max: 500,
            min: 10,
          },
          {
            amount: '',
            key: '3',
            max: 100,
            min: 0,
          },
        ],
        idType: '01',
      },
      idTypeList: [
        {
          name: '身份证',
          code: '01',
        },
        {
          name: '护照',
          code: '02',
        },
      ],
      contract: {
        applicant: {
          name: '',
          industry: '',
          idType: '',
          idNo: '',
          orgType: '',
          frName: '',
          frIdNo: '',
          frIdDate: '',
          bussinessScope: '',
          threeIdDate: '',
        },
        isNeed: true,
        name: '',
        industry: '',
        certificateType: '',
        certificateNo: '',
        certificateValidDate: '',
        orgType: '',
        personnelType: '0',
        province: '',
        city: '',
        county: '',
        town: '',
        village: '',
        wholeAddress: '',
      },
      provinceList: [],
      cityList: [],
      countyList: [],
      townList: [],
      villageList: [],
      industryList: [],
      selectedIndustry: [],
      fileList: [],
      gridData: [
        {
          date: '2017-09-02',
          name: '测试1',
          address: '深圳市福田区平安国际金融大厦',
        },
        {
          date: '2017-09-04',
          name: '测试2',
          address: '深圳市福田区平安国际金融大厦',
        },
        {
          date: '2017-09-01',
          name: '测试3',
          address: '深圳市福田区平安国际金融大厦',
        },
        {
          date: '2017-09-03',
          name: '测试4',
          address: '深圳市福田区平安国际金融大厦',
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    };
  },
  mounted() {
    this.$http.get('/industry').then(response => {
      this.industryList = response.data;
    });
    this.$http.get('/provinceList').then(response => {
      this.provinceList = response.data;
    });
  },
  methods: {
    goApply() {
      this.showApplyForm = true;
    },
    onSubmit() {
      this.$refs.formObj.validate(pass => {
        this.alert({
          title: pass ? '成功' : '错误',
          type: pass ? 'success' : 'error',
          text: pass ? '校验成功' : '校验失败',
          confirmButtonText: '确认',
        });
      });
    },
    addressChange(type) {
      console.log(type + ' changed');
      const typeList = ['province', 'city', 'county', 'town', 'village'];
      const currIndex = typeList.indexOf(type);
      const nextType = typeList[currIndex + 1];
      const url = '/' + nextType + 'List';
      this.contract.wholeAddress = typeList.reduce((str, type) => {
        const list = this[type + 'List'];
        const item = list.find(e => {
          return e.code === this.contract[type];
        });
        return item ? str + item.name : '';
      }, '');
      if (nextType) {
        this.$http.get(url).then(response => {
          this[nextType + 'List'] = response.data;
          this.$set(this.contract, nextType, this[nextType + 'List'][0].code);
        });
      }
    },
    idTypeChange() {
      console.log('idTypeChange');
      this.$refs.formObj.validateField('vtest2');
    },
    arrRule(index, duty) {
      return [
        rules.number,
        {
          required: true,
          message: '责任属性' + index + '不能为空',
        },
        {
          type: 'number',
          transform(val) {
            return val * 1;
          },
          max: duty.max,
          min: duty.min,
          message: '责任属性' + index + '必须大于等于' + duty.min + '小于等于' + duty.max,
        },
      ];
    },
    handleChange() {
      console.log('changed!');
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    openFullScreen() {
      const mask = this.$loading({
        lock: false,
      });
      setTimeout(() => {
        mask.close();
      }, 1500);
    },
  },
  computed: {},
};
</script>
