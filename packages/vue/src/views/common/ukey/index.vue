<template>
  <div class="page page-ukey">
    <div class="tips-box">
      <div class="title">
        <i class="el-icon-warning" />
        <div>请先完成ukey控件安装，才可正常使用Ukey。
          <a class="theme" @click="getDownload">下载Ukey控件 </a>
        </div>
        <div v-if="isChrome">请先安装chrome扩展插件安装，才能在chrome浏览上使用Ukey。
          <a class="theme" @click="getDownloadChrome">下载扩展插件 </a>
          |
          （<a class="theme" target="_blank" :href="UKEY_HELP">插件安装手册 </a>）
        </div>
      </div>
    </div>
    <div class="container">
      <div class="bind-box">
        <p class="text">在业务操作中，需要您插入绑定的Ukey，并在Ukey上完成确认操作。</p>
        <div class="ukeymap df">
          <!-- 经办 -->
          <div class="ukey">
            <div v-if="hasHandle" @click="unbind(UKEY_TYPE.HANDLE)">
              <div class="df">
                <div class="info" style="margin-right: 40px">
                  <label>Ukey序列号</label>
                  <div>{{ myHandle.serialNo }}</div>
                </div>
                <div class="info">
                  <label>类型</label>
                  <div>{{ UKEY_TYPE_TEXT.HANDLE }}</div>
                </div>
              </div>
              <div class="theme fs14"><svg-icon icon-class="unbind" />  解绑</div>
            </div>
            <div v-else class="line70" @click="showBand(UKEY_TYPE.HANDLE)">
              绑定 <span class="theme">{{ UKEY_TYPE_TEXT.HANDLE }}</span> Ukey
            </div>
          </div>
          <!-- 复核 -->
          <div class="ukey">
            <div v-if="hasCheck" @click="unbind(UKEY_TYPE.CHECK)">
              <div class="df">
                <div class="info" style="margin-right: 40px">
                  <label>Ukey序列号</label>
                  <div>{{ myCheck.serialNo }}</div>
                </div>
                <div class="info">
                  <label>类型</label>
                  <div>{{ UKEY_TYPE_TEXT.CHECK }}</div>
                </div>
              </div>
              <div class="theme fs14"><svg-icon icon-class="unbind" />  解绑</div>
            </div>
            <div v-else class="line70" @click="showBand(UKEY_TYPE.CHECK)">
              +绑定 <span class="theme">{{ UKEY_TYPE_TEXT.CHECK }}</span> Ukey
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="binded-box">
        <div class="ukeymap">
          <div class="ukey" @click="unbind('HANDLE')">
            <div class="df">
              <div class="info" style="margin-right: 40px">
                <label>Ukey序列号</label>
                <div>{{ myHandle.serialNo }}</div>
              </div>
              <div class="info">
                <label>类型</label>
                <div>{{ UKEY_TYPE.HANDLE }}</div>
              </div>
            </div>
            <div class="theme fs14"><svg-icon icon-class="unbind" />  解绑</div>
          </div>
        </div>
      </div> -->
      <div v-loading="loading">
        <el-table v-if="hasData" :data="list" :empty-text="' '" fit highlight-current-row stripe>
          <el-table-column align="center" label="编号" type="index" />
          <el-table-column label="Ukey序列号" prop="serialNo" width="120px" />
          <el-table-column label="登录名" prop="loginName" width="120px" />
          <el-table-column label="姓名" prop="nickName" />
          <el-table-column label="邮箱" prop="email" width="220px" />
          <el-table-column label="类型" width="70px">
            <template slot-scope="scope">
              {{ UKEY_TYPE_TEXT[scope.row.ukeyType] }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                v-permission="['FUND_OPERATOR', 'CORE_OPERATOR', 'CHAIN_OPERATOR']"
                type="text"
                @click="handleEdit(scope.row)"
              >更换操作员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 更换操作员 -->
    <el-dialog :visible.sync="editDialogVisible" title="更改操作员" :append-to-body="true">
      <el-form ref="bindForm" :model="bindForm" label-width="100px" label-position="left">
        <el-form-item label="Ukey序列号" prop="serialNo">
          <span>{{ bindForm.serialNo }}</span>
        </el-form-item>
        <el-form-item label="类型" prop="ukeyType">
          <span>{{ UKEY_TYPE_TEXT[bindForm.ukeyType] }}</span>
        </el-form-item>
        <el-form-item label="更改后操作员" prop="operNo">
          <el-select
            v-model="bindForm.operNo"
            placeholder="选择操作员"
            style="width: 100%"
          >
            <el-option
              v-for="u in opers"
              :key="u.operNo"
              :label="u.nickName"
              :value="u.operNo"
              :disabled="u.operNo === bindForm.operNo"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { isWindows, isChrome } from '@/utils/browser'
import { DOWNLOAD, UKEY_TYPE, UKEY_TYPE_TEXT, UKEY_HELP } from '@/utils//constant/index'
import { MessageBox } from 'element-ui'
import { CommonApi } from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'UkeyManage',

  data () {
    return {
      UKEY_TYPE,
      UKEY_TYPE_TEXT,
      UKEY_HELP,
      loading: true,
      editDialogVisible: false,
      list: [],
      opers: [],
      isChrome: isChrome(),
      bindForm: {
        serialNo: '',
        operNo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    hasData() {
      return !!this.list.length
    },
    myUkey() {
      return this.userInfo.ukeyList // this.list.filter(item => item.loginName === this.userInfo.loginName)
    },
    hasHandle() {
      return this.myUkey.includes(UKEY_TYPE.HANDLE)
    },
    myHandle() {
      return this.hasHandle ? this.list.filter(item => item.ukeyType === UKEY_TYPE.HANDLE)[0] : { serialNo: '' }
    },
    hasCheck() {
      return this.myUkey.includes(UKEY_TYPE.CHECK)
    },
    myCheck() {
      return this.hasCheck ? this.list.filter(item => item.ukeyType === UKEY_TYPE.CHECK)[0] : { serialNo: '' }
    },
  },
  mounted() {
    this.getData()
    this.getOpers()
  },
  methods: {
    getData() {
      this.loading = true
      CommonApi.queryUkeyList().then(res => {
        console.log('绑定列表', res)
        this.list = res.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    getOpers() {
      CommonApi.queryOperByCorpNo().then(res => {
        this.opers = res.data
      })
    },
    getDownload() {
      if (!isWindows()) {
        MessageBox.alert('请使用Windows系统操作网银ukey', '警告', {
          confirmButtonText: '确定'
        })
      } else {
        window.open(DOWNLOAD.suiyin)
      }
    },
    getDownloadChrome() {
      if (!isWindows()) {
        MessageBox.alert('请使用Windows系统操作网银ukey', '警告', {
          confirmButtonText: '确定'
        })
      } else {
        window.open(DOWNLOAD.chrome)
      }
    },
    showBand(t) {
      this.$ukey({ isBindUkeyOnly: true }).then((res) => {
        this.band({
          ...res,
          ukeyType: t
        })
      }).catch((err) => {
        console.log('有问题', err)
      })
    },
    band(params) {
      CommonApi.bindUkey(params).then(res => {
        this.$message.success('绑定成功')
        this.$store.dispatch('user/getInfo')
        this.getData()
      })
    },
    unbind(ukeyType) {
      this.$confirm('是否需要解绑Ukey，解绑后您将不能进行业务操作', '解绑Ukey', {
        type: 'warning'
      }).then(() => {
        console.log('确认解绑')
        CommonApi.unBindUkey({ ukeyType }).then(res => {
          this.$message.success('解绑成功')
          this.$store.dispatch('user/getInfo')
          this.getData()
        })
      })
    },
    handleEdit(user) {
      this.bindForm.serialNo = user.serialNo
      this.bindForm.ukeyType = user.ukeyType
      this.bindForm.operNo = user.operNo
      this.editDialogVisible = true
    },
    cancel() {
      this.editDialogVisible = false
      this.$refs.bindForm.resetFields()
    },
    confirmUser() {
      CommonApi.changeOper({
        ...this.bindForm
      }).then(res => {
        this.editDialogVisible = false
        this.$message.success('操作成功')
        this.getData()
        this.$store.dispatch('user/getInfo')
        this.$refs.bindForm.resetFields()
      }).catch(() => {
        this.editDialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" >
.tips-box {
	background: rgba(104, 88, 246, .05);
	border-radius: 4px;
	width: 100%;
	padding: 20px 0;
	margin-bottom: 20px;
	.title {
		line-height: 28px;
		padding-left: 56px;
    position: relative;
    font-size: 14px;
		i {
			display: inline-block;
			width: 24px;
			height: 24px;
			font-size: 24px;
			border-radius: 50%;
			position: absolute;
			left: 20px;
			top: 0;
      color: #3F94F7;
		}
		span {
			color: $textColor;
    }
	}
}
.page-ukey {
  .text {
    font-size: 12px;
    line-height: 40px;
  }
  .ukey {
    margin-right: 36px;
    cursor: pointer;
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(101, 85, 246, 0.2);
    border-radius: 12px;
    background: url('../../../assets/images/ukey-icon.png') no-repeat;
    background-position: right center;
    background-size: 44px 32px;
    line-height: 30px;
    font-size: 16px;
    transition: 0.4s;
    &:hover {
      box-shadow: 0px 0px 16px 0px rgba(78, 65, 194, 0.4);
    }
  }
  // .bind-box {
  //   margin-bottom: 30px;
  //   .ukey {
  //     width: 260px;
  //     height: 110px;
  //     padding: 20px 20px 12px;
  //     line-height: 70px;
  //   }
  // }
  .bind-box {
    margin-bottom: 30px;
    font-size: 14px;
    .df {
      // height: 64px;
      width: 80%;
      justify-content: start;
      font-size: 16px;
      label {
        color: $tipColor;
        font-size: 14px;
        font-weight: 400;
      }
      .info {
        height: 66px;
        color: $titleColor;
      }
    }
    .ukey {
      width: 260px;
      height: 110px;
      padding: 12px 20px;
      .line70 {
        line-height: 78px
      }
    }
  }
}
</style>
