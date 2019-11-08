<template>
  <div class="com-pagination">
    <el-pagination
      background
      layout="prev, pager, next, total, sizes"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'prev, pager, next, total, sizes'
    },
    currentPage: {
      type: [Number],
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    currentChange: {
      type: Function,
      default() {
        this.$emit('current-change')
      }
    },
    sizeChange: {
      type: Function,
      default() {
        this.$emit('size-change')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .com-pagination {
    text-align: right;
    margin-top: 16px;
  }
</style>
