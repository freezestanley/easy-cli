export default {
  props: {
    params: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    alias: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      attachParamForm: {},
      form: { uploadFile: [] }
    }
  },
  watch: {
    attachParamForm: {
      handler: function(val) {
        this.cbMethod()
      },
      deep: true
    }
  },
  created() {
    const { assetAttachFiles } = this.params
    this.oldFileList = assetAttachFiles.map(item => ({
      name: item.fileName,
      url: item.fileUrl
    }))
    // 后台给的数据接口 剥离下
    this.attachParamForm = {
      ...this.params.attachParam
    }
    this.form = {
      ...this.params,
      uploadFile: []
    }
  },
  mounted() {
    this.$emit('formHandle', this.$refs.form, this.alias)
  },
  methods: {
    handleDel() {
      this.$emit('handleDel', this.index, this.alias)
    },
    cbMethod() {
      this.$emit('handleChange', this.index, this.alias, {
        ...this.form,
        attachParam: { ...this.attachParamForm }
      })
    },
    transformData(val) {
      this.form.assetAttachFiles = val.map(item => ({
        fileName: item.name,
        fileUrl: item.url || item.data
      }))
      // this.form.assetAttachFiles = this.form.uploadFile.map(item => ({
      //   fileName: item.name,
      //   fileUrl: item.url || item.data
      // }))
      this.cbMethod()
    },
    handleFileChange(val) {
      this.transformData(val)
    },
    handleFileDel(fileList) {
      this.transformData(fileList)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
