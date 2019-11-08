<template>
  <div :id="id" :class="className" style="height:100%;width:100%;overflow: hidden;" />
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import resize from '@/utils/resizeMixin.js'

export default {
  name: 'Bar',
  mixins: [resize],
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '600px'
    },
    axis: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    position: {
      type: Object,
      default() {
        return {
          top: 50,
          left: 120,
          bottom: 60,
          right: 200,
        }
      }
    }
  },
  data() {
    return {
      chartData: {},
      chart: null
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
    data() {
      this.initChart()
      this.chart.resize()
    }
  },
  mounted() {
    // this.getData()
    // this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData() {
      this.chartData = this.transform([this.data])
    },
    transform(list) {
      if (list.length) {
        return list.map((obj, index) => {
          return {
            name: obj.corpName,
            value: obj.amount,
            time: obj.expireDate,
            isCore: +obj.level === 1,
            level: obj.level,
            corpNo: obj.corpNo,
            children: obj.children ? this.transform(obj.children) : []
          }
        })
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: this.title,
          subtext: ''
        },
        grid: [
          { x: '20%', y: '17%' },
        ],
        xAxis: {
          data: this.axis,
          axisLabel: {
            textStyle: {
              color: '#5E6D82'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#cfd8e5'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#5E6D82'
            }
          }
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          // renderMode: 'rich',
          // formatter(params, ticket, callback){
          //   console.log('data==', params, ticket)
          //   return ticket
          // }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            },
            data: this.data
          }
        ]
      })
    }
  }
}
</script>
