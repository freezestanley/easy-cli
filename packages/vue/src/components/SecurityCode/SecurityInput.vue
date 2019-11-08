<template>
  <div class="com-security-code">
    <div class="square-box clearfix">
      <div
        v-for="(k, index) in dots"
        :key="index"
        :class="['square', {active: index === safeCode.length}]"
      >{{ safeCode[index] || ' ' }}</div>
    </div>
    <div v-show="isError" class="error-msg">动态码错误</div>
    <div class="tar">
      <input ref="focusInput" autofocus style="height:1px; width: 1px;border:none;outline-color: #fff;">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :disabled="not6" @click="comfirm">确定</el-button>
    </div>
  </div>
</template>

<script>
const PASS_LEN = 6
const KEY_ENTER = 13
const KEY_BACK = 8
// function banackSpace(e) {
//   let obj = e.relatedTarget || e.srcElement || e.target || e.currentTarget
//   let tagName = obj.nodeName
//   if (tagName !== 'input' && tagName !== 'textarea') {
//     return stopIt(e)
//   }
//   let tagType = obj.type.toUpperCase()
//   if (tagType === 'INPUT' && (tagType !== 'TEXT') )
// }
function stopIt (e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  if (e.returnValue) {
    e.returnValue = false
  }
  return false
}
export default {
  name: '',
  props: {
    isError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dots: new Array(PASS_LEN),
      safeCode: ''
    }
  },
  computed: {
    not6() {
      return this.safeCode.length < PASS_LEN
    }
  },
  watch: {
    isError(v, o) {
      if (v) {
        this.safeCode = ''
      }
    }
  },
  mounted() {
    console.log('securityCode mounted')
    this.$refs.focusInput.focus()
    document.addEventListener('keydown', this.onInputChange, true)
  },
  beforeDestroy() {
    console.log('securityCode beforeDestroy')
    document.removeEventListener('keydown', this.onInputChange, true)
    this.safeCode = ''
  },
  methods: {
    cancel() {
      this.safeCode = ''
      this.$emit('cancel')
    },
    comfirm() {
      if (!this.safeCode) return
      this.$emit('ok', this.safeCode)
      // document.removeEventListener('keyup', this.onInputChange, true)
      this.safeCode = ''
    },
    onInputChange(e) {
      const len = this.safeCode.length
      const keyCode = e.keyCode ? e.keyCode : (e.which ? e.which : e.charCode)
      if (keyCode === KEY_BACK) {
        if (len) {
          this.safeCode = this.safeCode.slice(0, len - 1)
        }
        stopIt(e)
      } else if (/\d/.test(e.key) && len < PASS_LEN) {
        this.safeCode += e.key
      } else if (len === PASS_LEN && keyCode === KEY_ENTER) {
        this.comfirm()
      } else {
        console.log('输入了字符', e.key)
      }
    }
  }
}
</script>

<style lang="scss" >
input {
  width: 2em;
}
.com-security-code {
  margin: 10px;
  .square-box {
    width: 415px;
    margin: 10px auto;
    overflow: hidden;
  }
  .error-msg {
    color: $error;
    height: 20px;
    width: 415px;
    margin: 10px auto;
    font-size: 14px;
  }
}
.square {
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin-right: 25px;
  border: 1px solid #c0ccda;
  text-align: center;
  font-size: 20px;
  border-radius: 4px;
  float: left;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    border-color: #262626;
    position: relative;
    &:after {
      content: '|';
      position: absolute;
      left: 48%;
      color: $theme;
      animation: flash 1s infinite;
    }
  }
}
@keyframes flash {
  50% {
    opacity: 0;
  }
}
</style>
