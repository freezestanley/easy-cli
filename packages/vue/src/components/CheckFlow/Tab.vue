<template>
  <div class="item-flows">
    <el-steps direction="vertical" :active="current" finish-status="success">
      <el-step
        v-for="(f, index) in list"
        :key="index"
        style="height: 100px; flex-basis: auto;"
      >
        <div slot="title">
          <span>{{ f.nodeStatus }}</span>
          <span style="padding-left: 15px;">{{ f.roleName }}</span>
          <span v-if="f.modelUser" style="padding-left: 10px; vertical-align: bottom;">
            <el-tag v-for="u in f.modelUser" :key="u.id" effect="plain" style="margin-right: 10px;"> {{ u.name }}</el-tag>
          </span>
        </div>
        <div slot="description">
          <div>{{ f.handleTime }}</div>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    current() {
      let index = this.list.length
      for (let i = 0; i < index; i++) {
        const item = this.list[i]
        if (item.isHandleNode) {
          index = i
          break
        }
      }
      return index
    }
  },
  methods: {}
}
</script>

