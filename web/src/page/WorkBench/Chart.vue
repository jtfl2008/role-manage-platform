<template>
  <div class="page">
    <h3>折线图</h3>
    <chart :options="lineChartOption"></chart>
    <h3>饼状图</h3>
    <chart :options="pieChartOption"></chart>
    <h3>嵌套饼状图</h3>
    <chart :options="pieNestChartOption"></chart>
  </div>
</template>

<script>
  export default {
    data() {
      const colors = ['#5793f3', '#d14a61', '#675bba'];
      return {
        lineChartOption: {
          color: colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['2015 降水量', '2016 降水量'],
          },
          grid: {
            top: 70,
            bottom: 50,
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[1],
                },
              },
              axisPointer: {
                label: {
                  formatter(params) {
                    return (
                      '降水量  ' +
                      params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                    );
                  },
                },
              },
              data: [
                '2016-1',
                '2016-2',
                '2016-3',
                '2016-4',
                '2016-5',
                '2016-6',
                '2016-7',
                '2016-8',
                '2016-9',
                '2016-10',
                '2016-11',
                '2016-12',
              ],
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[0],
                },
              },
              axisPointer: {
                label: {
                  formatter(params) {
                    return (
                      '降水量  ' +
                      params.value +
                      (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                    );
                  },
                },
              },
              data: [
                '2015-1',
                '2015-2',
                '2015-3',
                '2015-4',
                '2015-5',
                '2015-6',
                '2015-7',
                '2015-8',
                '2015-9',
                '2015-10',
                '2015-11',
                '2015-12',
              ],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '2015 降水量',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            },
            {
              name: '2016 降水量',
              type: 'line',
              smooth: true,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
            },
          ],
        },
        pieChartOption: {
          backgroundColor: '#2c343c',
          title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc',
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1],
            },
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' },
              ].sort(function(a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20,
                },
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay() {
                return Math.random() * 200;
              },
            },
          ],
        },
        pieNestChartOption: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: [
              '直达',
              '营销广告',
              '搜索引擎',
              '邮件营销',
              '联盟广告',
              '视频广告',
              '百度',
              '谷歌',
              '必应',
              '其他',
            ],
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner',
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: [
                { value: 335, name: '直达', selected: true },
                { value: 679, name: '营销广告' },
                { value: 1548, name: '搜索引擎' },
              ],
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center',
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0,
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33,
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2,
                    },
                  },
                },
              },
              data: [
                { value: 335, name: '直达' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1048, name: '百度' },
                { value: 251, name: '谷歌' },
                { value: 147, name: '必应' },
                { value: 102, name: '其他' },
              ],
            },
          ],
        },
      };
    },
  };
</script>

<style lang="less" scoped>
  h3 {
    margin: 20px;
  }
</style>