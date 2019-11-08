<template>
  <el-tooltip placement="top" content="鼠标滚轮可以缩放，鼠标拖动线条可以平移">
    <div
      :id="id"
      :class="className"
      style="height:100%;width:100%;overflow: hidden; cursor:grab"
    />
  </el-tooltip>
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/resizeMixin.js'
import { mapGetters } from 'vuex'
const LABEL = {
  1: '授信时间',
  2: '授信有效期',
}
export default {
  name: '',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'tree-chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '600px'
    },
    data: {
      type: [Object, Array],
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
          right: 280,
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
      this.getData()
      this.initChart()
    }
  },
  mounted() {
    this.getData()
    this.initChart()
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
      const userInfo = this.userInfo
      this.chart = echarts.init(document.getElementById(this.id))
      // echarts.util.each(tdata.children, function (datum, index) {
      //   index % 3 === 0 && (datum.collapsed = true)
      // })
      this.chart.setOption({
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
            type: 'tree',

            data: this.transform([this.data]), // this.chartData,

            top: this.position.top,
            left: this.position.left,
            bottom: this.position.bottom,
            right: this.position.right,
            roam: true, // false, move, scale，true（move + scale）
            // symbol: 'rect',
            // symbolSize: 10,
            itemStyle: {
              color: '#6555F6',
              borderColor: '#6555F6'
            },
            label: {
              formatter: function({ data }) {
                const name = `${data.name} (${data.value}) `
                const minW = (name.length < 40 ? name.padEnd(40 - name.length, ' ') : name)
                const time = (LABEL[data.level] ? LABEL[data.level] : '签发有效期') + '(' + data.time + ')'
                const at = data.corpNo === userInfo.corpNo ? `{cur| ${minW}} \n ` : `{a| ${minW}} \n `
                const bt = data.corpNo === userInfo.corpNo ? `{b2| ${time}}` : `{b| ${time}}`
                return at + bt
              },

              rich: {
                a: {
                  color: '#6555F6',
                  height: 50,
                  // width: 160,
                  borderWidth: '2px',
                  borderColor: '#6555F6',
                  borderRadius: 10,
                  lineHeight: 20,
                  offsetY: -160
                },
                b: {
                  color: '#475669',
                  fontSize: 10,
                  offsetY: -36
                },
                b2: {
                  color: '#fff',
                  fontSize: 10,
                  offsetY: -36
                },
                cur: {
                  color: '#fff',
                  height: 50,
                  borderWidth: '2px',
                  borderRadius: 10,
                  lineHeight: 20,
                  offsetY: -160,
                  fontWeight: 600,
                  opacity: 1,
                  backgroundColor: '#6555F6',
                }
              },
            },

            leaves: {
              itemStyle: {
                color: '#6555F6'
              },
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },

            expandAndCollapse: false, // 子书展开的交互 boolean
            initialTreeDepth: 3, // 默认展开层数
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" >
canvas {
  cursor: grab;
}
</style>
