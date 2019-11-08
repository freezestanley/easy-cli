import Pagination from '@/components/Pagination/'
import checkPermission from '@/utils/permission'
/**
 * 搜索过滤 + 表格 展示数据页面通用方法提取
 * 约定命名规范
 * @total 当前查询记录总条数
 * @pageSize 查询参数，每页查询多少条
 * @pageNum 当前第几页（与后端参数保持一致，降低命名出错概率）
 * @onSearch 点击查询按钮时触发方法 这里主要是调用getData方法
 * @onResetForm 查询表单点击重置时触发 （默认重置搜索过滤表单）
 * @onSizeChange 分页时，调整每页条数事件
 * @onCurrentChange 当前页码变化
 */
export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    }
  },
  created() {
    const query = this.$route.query
    for (var key in this.ruleForm) {
      if (query[key]) {
        this.ruleForm[key] = query[key]
      }
    }
  },
  methods: {
    checkPermission,
    onSizeChange (s) {
      this.pageNum = 1
      this.pageSize = s
      this.getData()
    },
    onCurrentChange (p) {
      this.pageNum = p
      this.getData()
    },
    /**
     * 默认约定搜索表单未ruleForm
     * @param {String} formName 请注意表单命名
     */
    onResetForm (formName = 'ruleForm') {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      } else {
        const form = this[`${formName}`]
        for (var key in form) {
          this.$set(form, key, typeof form[key] === 'object' ? [] : '')
        }
      }
    },
    // 点击查询按钮时， 从第一页开始查询
    onSearch () {
      this.pageNum = 1
      this.getData()
    },
    // 格式化时间
    formatterTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
      if (time !== null && time !== undefined) {
        return this.$dayjs(time).format(format)
      } else {
        return ''
      }
    },
  }
}
