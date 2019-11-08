<template>
  <div class="flex">
    <div class="title">财务报表分析</div>
    <div class="items">
      <el-select v-model="item_1" value-key="label" class="width-226">
        <el-option
          v-for="(item, index) in selectedObj"
          :key="index"
          :label="item.label"
          :value="item"
        />
      </el-select>
      <el-date-picker
        v-model="item_2.year"
        type="year"
        :clearable="false"
        class="year-picker"
        :value-format="'yyyy'"
        :picker-options="pickerOptions"
        :editable="false"
      />
      <el-date-picker
        v-model="item_3.year"
        type="year"
        :clearable="false"
        class="year-picker"
        :value-format="'yyyy'"
        :picker-options="pickerOptions"
        :editable="false"
      />
      <el-date-picker
        v-model="item_4.year"
        type="year"
        :clearable="false"
        class="year-picker"
        :value-format="'yyyy'"
        :picker-options="pickerOptions"
        :editable="false"
      />
    </div>
  </div>
</template>

<script>
const QUARTER_MAP = ['第一季度', '第二季度', '第三季度', '第四季度']

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: function() {
        return [
          {
            year: '',
            quarter: ''
          },
          {
            year: '',
            quarter: ''
          },
          {
            year: '',
            quarter: ''
          },
          {
            year: '',
            quarter: ''
          },
        ]
      }
    }
  },
  data() {
    this.currentYear = this.$dayjs().format('YYYY') // 当前年份
    this.currentQuarter = this.$dayjs().quarter() // 当前季度
    this.currentYear_1 = this.$dayjs().subtract(1, 'year').format('YYYY')
    this.currentYear_2 = this.$dayjs().subtract(2, 'year').format('YYYY')
    this.currentYear_3 = this.$dayjs().subtract(3, 'year').format('YYYY')

    return {
      item_1: {
        year: this.currentYear,
        quarter: this.currentQuarter,
        label: this.formatLable(this.currentYear, this.currentQuarter)
      },
      item_2: {
        year: this.currentYear_1
      },
      item_3: {
        year: this.currentYear_2
      },
      item_4: {
        year: this.currentYear_3
      },
      pickerOptions: {
        disabledDate: (time) => {
          return this.disabledDateArr.includes(time.getFullYear().toString())
        }
      },
      // disabledDateArr: []
    }
  },
  computed: {
    selectedObj() {
      const result = []
      const hasInitData = this.values.some((item) => {
        return item.year !== ''
      })
      // 对比传入的年份
      if (hasInitData) {
        const getYear = this.values[0].year
        const diff = this.currentYear - getYear
        for (let i = 0; i < diff; i++) {
          if (i === 0) {
            result.push({
              year: parseInt(getYear) + i + '',
              quarter: this.values[0].quarter,
              label: this.formatLable(parseInt(getYear) + i + '', this.values[0].quarter)
            })
          } else {
            result.push({
              year: parseInt(getYear) + i + '',
              quarter: '',
              label: this.formatLable(parseInt(getYear) + i + '', '')
            })
          }
        }
      }
      // 当前年的
      for (let i = 0; i < this.currentQuarter; i++) {
        result.push({
          year: this.currentYear,
          quarter: i + 1,
          label: this.formatLable(this.currentYear, i + 1)
        })
      }

      return result
    },
    disabledDateArr() {
      const result = []

      result.push(this.item_1.year)
      result.push(this.item_2.year)
      result.push(this.item_3.year)
      result.push(this.item_4.year)

      return result
    }
  },
  watch: {
    values: {
      handler: function(val) {
        const hasInitData = val.some((item) => {
          return item.year !== ''
        })
        // 有初始值的按初始值赋值，没有初始值就是添加，按data中的值处理就可以
        if (hasInitData) {
          val.forEach((item, index) => {
            if (index === 0) {
              this['item_1'] = {
                year: item.year || '',
                quarter: item.quarter || '',
                label: this.formatLable(item.year, item.quarter)
              }
            } else {
              this['item_' + (index + 1)] = {
                year: item.year || '',
                quarter: item.quarter || ''
              }
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    formatLable(year, quarter) {
      const yearStr = year + '年'
      const quarterStr = quarter ? QUARTER_MAP[quarter - 1] : ''

      return yearStr + quarterStr
    },
    getData() {
      return [
        {
          year: this.item_1.year,
          quarter: this.item_1.quarter || ''
        },
        {
          year: this.item_2.year,
          quarter: this.item_2.quarter || ''
        },
        {
          year: this.item_3.year,
          quarter: this.item_3.quarter || ''
        },
        {
          year: this.item_4.year,
          quarter: this.item_4.quarter || ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.title {
  // font-size: 20px;
  line-height: 28px;
  width: 150px;
  margin-right: 12px;
}
.items {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.year-picker {
  /deep/ .el-input__prefix {
    display: none;
  }
  /deep/ .el-input__inner {
    width: 200px;
    padding: 0 30px 0 15px;
    background: rgba(101, 85, 246, 0.0621);
  }
}
.width-226 {
  width: 200px;
  margin-right: 26px;
}
</style>
