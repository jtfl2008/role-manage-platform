import Mock from 'mockjs';
const Random = Mock.Random;

Random.extend({
  industryList() {
    const industryList = [
      {
        name: '林业',
        id: 'A01',
        children: [
          {
            name: '林木火灾',
            id: 'A0101',
          },
          {
            name: '林木综合',
            id: 'A0102',
          },
          {
            name: '林木其他',
            id: 'A0103',
          },
        ],
      },
      {
        name: '养殖业',
        id: 'A02',
        children: [
          {
            name: '奶牛养殖',
            id: 'A0201',
          },
          {
            name: '牦牛养殖',
            id: 'A0202',
          },
          {
            name: '种猪养殖',
            id: 'A0203',
          },
          {
            name: '藏系羊养殖',
            id: 'A0204',
          },
        ],
      },
      {
        name: '种植业',
        id: 'A03',
        children: [],
      },
      {
        name: '涉农',
        id: 'A04',
        children: [],
      },
    ];
    return industryList;
  },
  provinceList() {
    const provinceList = [
      { code: '110000', name: '北京市' },
      { code: '120000', name: '天津市' },
      { code: '130000', name: '河北省' },
      { code: '140000', name: '山西省' },
      { code: '150000', name: '内蒙古自治区' },
      { code: '210000', name: '辽宁省' },
      { code: '220000', name: '吉林省' },
      { code: '230000', name: '黑龙江省' },
      { code: '310000', name: '上海市' },
      { code: '320000', name: '江苏省' },
      { code: '330000', name: '浙江省' },
      { code: '340000', name: '安徽省' },
      { code: '350000', name: '福建省' },
      { code: '360000', name: '江西省' },
      { code: '370000', name: '山东省' },
      { code: '410000', name: '河南省' },
      { code: '420000', name: '湖北省' },
      { code: '430000', name: '湖南省' },
      { code: '440000', name: '广东省' },
      { code: '450000', name: '广西壮族自治区' },
      { code: '460000', name: '海南省' },
      { code: '500000', name: '重庆市' },
      { code: '510000', name: '四川省' },
      { code: '520000', name: '贵州省' },
      { code: '530000', name: '云南省' },
      { code: '540000', name: '西藏自治区' },
      { code: '610000', name: '陕西省' },
      { code: '620000', name: '甘肃省' },
      { code: '630000', name: '青海省' },
      { code: '640000', name: '宁夏回族自治区' },
      { code: '650000', name: '新疆维吾尔自治区' },
    ];
    return provinceList;
  },
  cityList() {
    const cityList = [
      { code: '440500', name: '汕头市' },
      { code: '440200', name: '韶关市' },
      { code: '440600', name: '佛山市' },
      { code: '440700', name: '江门市' },
      { code: '440800', name: '湛江市' },
      { code: '441200', name: '肇庆市' },
      { code: '441300', name: '惠州市' },
      { code: '441400', name: '梅州市' },
      { code: '441500', name: '汕尾市' },
      { code: '441600', name: '河源市' },
      { code: '441700', name: '阳江市' },
      { code: '442000', name: '中山市' },
      { code: '445100', name: '潮州市' },
      { code: '445200', name: '揭阳市' },
      { code: '445300', name: '云浮市' },
      { code: '440300', name: '深圳市' },
      { code: '440100', name: '广州市' },
      { code: '441900', name: '东莞市' },
      { code: '440400', name: '珠海市' },
      { code: '440900', name: '茂名市' },
      { code: '441800', name: '清远市' },
    ];
    return cityList;
  },
  countyList() {
    const countyList = [
      { code: '440507', name: '龙湖区' },
      { code: '440511', name: '金平区' },
      { code: '440512', name: '濠江区' },
      { code: '440513', name: '潮阳区' },
      { code: '440514', name: '潮南区' },
      { code: '440515', name: '澄海区' },
      { code: '440523', name: '南澳县' },
    ];
    return countyList;
  },
  townList() {
    const townList = [
      { code: '440507001', name: '金霞街道' },
      { code: '440507002', name: '龙祥街道' },
      { code: '440507003', name: '鸥汀街道' },
      { code: '440507004', name: '新津街道' },
      { code: '440507005', name: '珠池街道' },
      { code: '440507100', name: '外砂镇' },
      { code: '440507101', name: '新溪镇' },
    ];
    return townList;
  },
  villageList() {
    const villageList = [
      { code: '440507002001', name: '周厝温' },
      { code: '440507002002', name: '夏桂埔居委会' },
      { code: '440507002003', name: '洋滨居委会' },
      { code: '440507002004', name: '如龙居委会' },
      { code: '440507002005', name: '泰龙居委会' },
      { code: '440507002006', name: '新兴居委会' },
      { code: '440507002007', name: '衡山居委会' },
      { code: '440507002008', name: '祥和居委会' },
    ];
    return villageList;
  },
});

Mock.mock('/industry', 'get', '@INDUSTRYLIST');
Mock.mock('/provinceList', 'get', '@PROVINCELIST');
Mock.mock('/cityList', 'get', '@CITYLIST');
Mock.mock('/countyList', 'get', '@COUNTYLIST');
Mock.mock('/townList', 'get', '@TOWNLIST');
Mock.mock('/villageList', 'get', '@VILLAGELIST');
