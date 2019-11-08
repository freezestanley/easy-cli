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
      <div class="item-class">{{ valueList.item_1 }}</div>
      <div class="item-class">{{ valueList.item_2 }}</div>
      <div class="item-class">{{ valueList.item_3 }}</div>
      <div class="item-class">{{ valueList.item_4 }}</div>
    </div>

    <div v-else-if="inputType === 'file'" class="items">
      <div class="item-class width-226">
        <file-show :url.sync="valueList.item_1" />
      </div>
      <div class="item-class width-226">
        <file-show :url.sync="valueList.item_2" />
      </div>
      <div class="item-class width-226">
        <file-show :url.sync="valueList.item_3" />
      </div>
      <div class="item-class width-226">
        <file-show :url.sync="valueList.item_4" />
      </div>
    </div>
  </div>
</template>

<script>
import FileShow from '@/components/FileShow/index'

export default {
  components: {
    FileShow
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
      required: true
    },
    inputType: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
      // valueList: {
      //   item_1: this.values[0] ? this.values[0] + this.unit : '',
      //   item_2: this.values[1] ? this.values[1] + this.unit : '',
      //   item_3: this.values[2] ? this.values[2] + this.unit : '',
      //   item_4: this.values[3] ? this.values[3] + this.unit : ''
      // }
    }
  },
  computed: {
    valueList() {
      if (this.inputType === 'input') {
        return {
          item_1: this.values[0] ? this.values[0] + this.unit : '',
          item_2: this.values[1] ? this.values[1] + this.unit : '',
          item_3: this.values[2] ? this.values[2] + this.unit : '',
          item_4: this.values[3] ? this.values[3] + this.unit : ''
        }
      } else {
        return {
          item_1: this.values[0] ? this.values[0] : '',
          item_2: this.values[1] ? this.values[1] : '',
          item_3: this.values[2] ? this.values[2] : '',
          item_4: this.values[3] ? this.values[3] : ''
        }
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
  width: 200px;
  margin-right: 12px;
}
.item-name {
  height:21px;
  font-size:14px;
  // &:not(:last-child){
  //   margin-bottom: 4px;
  // }
}
.items {
  flex: 1;
  display: flex;
  justify-content: space-between;
  .item-class {
    width: 214px;
    font-size: 14px;
  }
  // .item-class {
  //   &:not(:last-child) {
  //     margin-right: 30px;
  //   }
  // }
}
.flex-start {
  align-items: flex-start;
}
.width-226 {
  width: 200px;
}
</style>
