<template>
  <div class="item-block" :class="{'flex-start': inputType === 'file'}">
    <div class="item-name-width">
      <div
        v-for="(item, index) in title"
        :key="index"
        class="item-name"
      >{{ item }}</div>
    </div>

    <div v-if="inputType === 'input'" class="items">
      <el-input v-model="valueList.item_1" placeholder="请输入" class="item-class" type="number" @change="handleInput($event, 'item_1')">
        <div slot="suffix" class="el-input__icon">{{ unit }}</div>
      </el-input>
      <el-input v-model="valueList.item_2" placeholder="请输入" class="item-class" type="number" @change="handleInput($event, 'item_2')">
        <div slot="suffix" class="el-input__icon">{{ unit }}</div>
      </el-input>
      <el-input v-model="valueList.item_3" placeholder="请输入" class="item-class" type="number" @change="handleInput($event, 'item_3')">
        <div slot="suffix" class="el-input__icon">{{ unit }}</div>
      </el-input>
      <el-input v-model="valueList.item_4" placeholder="请输入" class="item-class" type="number" @change="handleInput($event, 'item_4')">
        <div slot="suffix" class="el-input__icon">{{ unit }}</div>
      </el-input>
    </div>

    <div v-else-if="inputType === 'file'" class="items">
      <div class="item-class width-226">
        <file-upload :url-arr.sync="valueList.item_1" :limit="1" />
      </div>
      <div class="item-class width-226">
        <file-upload :url-arr.sync="valueList.item_2" :limit="1" />
      </div>
      <div class="item-class width-226">
        <file-upload :url-arr.sync="valueList.item_3" :limit="1" />
      </div>
      <div class="item-class width-226">
        <file-upload :url-arr.sync="valueList.item_4" :limit="1" />
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload/index'
function isNumber(str) {
  const reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
  return reg.test(str)
}
export default {
  components: {
    FileUpload
  },
  props: {
    title: {
      type: Array,
      required: true
    },
    unit: {
      type: String,
      default: '万元'
    },
    values: {
      type: Array,
      default: function() {
        return ['', '', '', '']
      }
    },
    inputType: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
      valueList: {
        item_1: [],
        item_2: [],
        item_3: [],
        item_4: []
      }
    }
  },
  watch: {
    values: {
      handler: function(val) {
        if (this.inputType === 'file') {
          if (val.length) {
            val.forEach((item, index) => {
              this.valueList['item_' + (index + 1)] = item ? [item] : ''
            })
          } else {
            val.forEach((item, index) => {
              this.valueList['item_' + (index + 1)] = []
            })
          }
        } else {
          if (val.length) {
            val.forEach((item, index) => {
              this.valueList['item_' + (index + 1)] = item || ''
            })
          } else {
            val.forEach((item, index) => {
              this.valueList['item_' + (index + 1)] = ''
            })
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getData() {
      if (this.inputType === 'file') {
        return [this.valueList.item_1.toString(), this.valueList.item_2.toString(), this.valueList.item_3.toString(), this.valueList.item_4.toString()]
      }
      return [this.valueList.item_1, this.valueList.item_2, this.valueList.item_3, this.valueList.item_4]
    },
    handleInput(e, index) {
      const count = this.unit === '%' ? 2 : 4
      console.log(e)
      const dot = e.lastIndexOf('.')
      const xiaoshu = e.slice(dot)
      if (xiaoshu.length > count) {
        this.valueList[index] = parseFloat(e).toFixed(count)
      }
      if (!isNumber(parseFloat(e))) {
        this.valueList[index] = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-block {
  display: flex;
  align-items: center;
}
.item-name-width {
  width: 150px;
  margin-right: 10px;
}
.item-name {
  height: 21px;
  font-size: 13px;
  // &:not(:last-child){
  //   margin-bottom: 4px;
  // }
}
.items {
  flex: 1;
  display: flex;
  justify-content: space-between;
  // .item-class {
  //   &:not(:last-child) {
  //     margin-right: 30px;
  //   }
  // }
  /deep/ .el-input__icon {
    width: 40px;
  }
  /deep/ .el-input {
    width: 200px;
  }
}
.flex-start {
  align-items: flex-start;
}
.width-226 {
  width: 200px;
}
</style>
