<template>
  <div
    :id="id"
    :class="className"
    :style="{
      width: width,
      height: height
    }"
  />
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/resizeMixin.js'

export default {
  name: 'Ring',
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
      default: 'ring-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    activeColor: {
      type: String,
      default: '#317AE6'
    },
    showRatio: {
      type: String,
      default: '0%'
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
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data() {
      this.initChart()
      this.chart.resize()
    }
  },
  mounted() {
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        color: ['#C6DDFF', 'rgb(64, 169, 255)'],
        tooltip: {
          trigger: 'item',
          position: ['10%', '10%'],
          formatter: '{b} <br/> {c} ({d}%)'
        },
        graphic: [{
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            // text: this.showRatio,
            // fill: this.activeColor,
            // width: 30,
            // height: 30,
            // fontSize: 14,
          }
        }],
        series: [
          {
            type: 'pie',
            data: this.data,
            radius: ['60%', '80%'],
            // hoverAnimation: false, hover放大效果
            // avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                // position: 'center',
                // formatter: '{d}',
                // color: this.activeColor,
              },
              emphasis: {
                show: false,
                // textStyle: {
                //   fontSize: '18',
                //   fontWeight: 'bold',
                //   color: '#0096fa',
                // }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
          }
        ]
      })
    }
  }
}
</script>
