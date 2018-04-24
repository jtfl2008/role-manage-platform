const patterns = {
  length15: {
    pattern: /^.{15}$/,
    message: '长度必须是15个字符',
  },
  length15or18or20: {
    pattern: /^.{15}$|^.{18}$|^.{20}$/,
    message: '长度必须是15、18、20个字符',
  },
  length18: {
    pattern: /^.{18}$/,
    message: '长度必须是18个字符',
  },
  length20: {
    pattern: /^.{1,20}$/,
    message: '长度不能超过20个字符',
  },
  length30: {
    pattern: /^.{1,30}$/,
    message: '长度不能超过30个字符',
  },
  length50: {
    pattern: /^.{1,50}$/,
    message: '长度不能超过50个字符',
  },
  length75: {
    pattern: /^.{1,75}$/,
    message: '长度不能超过75位',
  },
  length99: {
    pattern: /^.{1,99}$/,
    message: '长度不能超过99位',
  },
  length128: {
    pattern: /^.{1,128}$/,
    message: '长度不能超过128位',
  },
  number: {
    pattern: /^0$|^[1-9](\d+)?(\.\d+)?$|^0\.(\d+)[1-9]$|^0\.[1-9](\d+)?$/,
    message: '请输入合法数字',
  },
  positive: {
    pattern: /^[1-9](\d+)?$/,
    message: '必须为大于0的正整数',
  },
  double2: {
    pattern: /^[1-9](\d+)?(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为大于0的数字且只能保留2位小数',
  },
  double3: {
    pattern: /^[0-9](\d+)?(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为数字且只能保留2位小数',
  },
  double4: {
    pattern: /^[0-9](\d+)?(\.\d{1,4})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为数字且只能保留2位小数',
  },
  double5: {
    pattern: /^[1-9]{1}\d{0,4}(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为非负数、整数位在5位以内且只能保留2位小数',
  },
  double11: {
    pattern: /^[1-9]{1}\d{0,10}(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为非负数、整数位在11位以内且只能保留2位小数',
  },
  double14: {
    pattern: /^[1-9]{1}\d{0,13}(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为非负数、整数位在14位以内且只能保留2位小数',
  },
  nonNegative: {
    pattern: /^[0-9]{1,8}(\.\d{1,2})?$/,
    message: '必须为非负数、整数位在8位以内且只能保留2位小数',
  },
  nonNegative2: {
    pattern: /^[1-9]{1}\d{0,7}(\.\d{1,2})?$|^0\.\d[1-9]$|^0\.[1-9]\d?$/,
    message: '必须为大于0、整数位在8位以内且只能保留2位小数',
  },
  nonIntLength8: {
    pattern: /^0$|^[1-9](\d{1,7})?$/,
    message: '必须大于等于0且只能输入8位以内的正整数',
  },
  intLength3: {
    pattern: /^[1-9](\d{1,2})?$/,
    message: '必须大于0且只能输入3位以内的正整数',
  },
  intLength4: {
    pattern: /^[1-9](\d{1,3})?$/,
    message: '必须大于0且只能输入4位以内的正整数',
  },
  intLength04: {
    pattern: /0|^[1-9](\d{1,3})?$/,
    message: '只能输入4位以内的非负整数',
  },
  intLength5: {
    pattern: /^\d{1,5}(\.0{1,2})?$/,
    message: '只能输入5位以内的正整数',
  },
  intLength6: {
    pattern: /^[1-9](\d{1,5})?$/,
    message: '必须大于0且只能输入6位以内的正整数',
  },
  intLength8: {
    pattern: /^[1-9](\d{1,7})?$/,
    message: '必须大于0且只能输入8位以内的正整数',
  },
  intLength10: {
    pattern: /^[1-9](\d{1,9})?$/,
    message: '必须大于0且只能输入10位以内的正整数',
  },
  percent: {
    pattern: /^[0-9]{1}$|^[1-9][0-9]$/,
    message: '必须为0-100内的正整数',
  },
  Telephone: {
    pattern: /^([0]{1}[1-9]{1}[0-9]{1,2})-([1-9]{1}[0-9]{6,7})$/,
    message: '请输入正确的固定电话(区号-电话号码)',
  },
  AreaCode: {
    pattern: /^([0]{1}[1-9]{1}[0-9]{1,2})$/,
    message: '请输入正确的电话号码区号(首位为0且次位不为0，3至4位数字)',
  },
  Cphone: {
    pattern: /^([1-9]{1}[0-9]{6,7})$/,
    message: '请输入正确的电话号码(电话号码为首位非0，7至8位数字)',
  },
  phone: {
    pattern: /^1[34578]\d{9}$/,
    message: '请输入正确的联系电话',
  },
  model5: {
    pattern: /^[1-9]?[0|5]$|^[0|5]$/,
    message: '必须为5的倍数且小于100',
  },
  model100: {
    pattern: /^[1-9](\d+)?00$/,
    message: '必须为100的倍数',
  },
  float100: {
    pattern: /^0$|^[1-9](\d{1,5})?00(\.00)?$/,
    message: '必须为100的倍数且不能超过八位数',
  },
  nonInt0To50: {
    pattern: /^[0-9]$|^[1-4][0-9]$|^50$/,
    message: '请录入[0，50]的正整数。',
  },
  zipCode: {
    pattern: /^\d{6}$/,
    message: '请录入正确的邮政编码',
  },
  phoneAndTel: {
    pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,
    message: '请录入正确的固话(区号-电话号码)或手机号码',
  },
  maxLength128: {
    pattern: /^.{1,128}$/,
    message: '长度不能超过128个字符',
  },
  maxLength30: {
    pattern: /^.{1,30}$/,
    message: '长度不能超过30个字符',
  },
  minLength2: {
    pattern: /^.{2,}$/,
    message: '至少输入2个字符',
  },
  mLength21: {
    pattern: /^.{21}$/,
    message: '长度必须是21个字符',
  },
  number20: {
    pattern: /^(?!00000000000000000000)[0-9]{20}$/,
    message: '请如实填写，谢谢！',
  },
  pos1to4Percent2: {
    pattern: /^\d{1,2}(\.\d{1,2})?$/,
    message: '0到100之间(包含0)的数字，最多两位小数',
  },
  pos1to2Percent: {
    pattern: /^(\d{1,2}(\.\d{1,2})?|100)$/,
    message: '0至100，保留两位小数',
  },
  amountFloat4: {
    pattern: /^\d{1,2}(\.\d{1,4})?$|^100(\.0{1,4})?$/,
    message: '输入数据应在0~100范围且小数位不能超过4位',
  },
  amountFloat5: {
    pattern: /^[1-9](\d)?(\.\d{1,4})?$|^0(\.){1}(\d{1,3})?[1-9]{1}$|^100(\.0{1,4})?$/,
    message: '输入数据应大于0小于或等于100且小数位不能超过4位',
  },
  amountFloat6: {
    pattern: /^\d{1,2}(\.\d{1,2})?$|^100(\.0{1,2})?$/,
    message: '输入数据应在0~100范围且小数位不能超过2位',
  },
  posfloat2: {
    pattern: /^(\d+(\.\d{1,2})?)$/,
    message: '正小数(保留两位小数)',
  },
  posint8: {
    pattern: /^([1-9]\d{0,7})$/,
    message: '1-8位整数',
  },
  posint100: {
    pattern: /^(?:0|[1-9][0-9]?|100)$/,
    message: '0到100之间的正整数',
  },
  posint1004: {
    pattern: /^(\d{1,2}(\.\d{1,4})?)$/,
    message: '0-100的正小数(保留四位小数)',
  },
  posint1002: {
    pattern: /^(\d{1,2}(\.\d{1,2})?)$/,
    message: '0-100的正小数(保留两位小数)',
  },
  pos3to2Percent: {
    pattern: /^(\d{1,3}(\.\d{1,2})?)$/,
    message: '1-3位整数,2位小数',
  },
  pos2to4Percent: {
    pattern: /^(\d{1,2}(\.\d{1,4})?)$/,
    message: '1-2位整数,4位小数',
  },
  pos8to2Percent: {
    pattern: /^(\d{1,8}(\.\d{1,2})?)$/,
    message: '1-8位整数,2位小数',
  },
  pos6to2Percent: {
    pattern: /^(\d{1,6}(\.\d{1,2})?)$/,
    message: '1-6位整数,2位小数',
  },
  posint02: {
    pattern: /^(?:0|[1-9][0-9]?)$/,
    message: '0到99之间的整数',
  },
  posint090: {
    pattern: /^(?:[1-9]|[0-8][0-9]?|90)$/,
    message: '0到90的正整数',
  },
  pos7to2Percent: {
    pattern: /^(\d{1,7}(\.\d{1,2})?)$/,
    message: '1-7位整数,2位小数',
  },
  pos9to2Percent: {
    pattern: /^(\d{1,9}(\.\d{1,2})?)$/,
    message: '1-9位整数,2位小数',
  },
  pos1to10to2Percent: {
    pattern: /^(10)$|^(\d{0,1}(\.\d{0,2})?)$/,
    message: '0-10的数值,保留两位小数',
  },
  identificationCard: {
    pattern: /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}))$/,
    message: '请输入有效的身份证',
  },
  passport: {
    pattern: /^[A-Z]{1}[0-9]{8,}$/,
    message: '请输入有效的护照证件号码',
  },
};

export default patterns;
