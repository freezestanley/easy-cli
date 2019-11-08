import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const authDtoList = store.getters && store.getters.authDtoList

    if (value && value.length > 0) {
      const permissionButton = value || ''

      const hasPermission = authDtoList.some(role => {
        return permissionButton.trim() === role.perms
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need authDtoList! Like v-permission="['PLATFORM_0','PLATFORM_1']"`)
    }
  }
}
