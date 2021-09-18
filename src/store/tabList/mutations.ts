import { MutationTree } from 'vuex'
import { TabListStateInterface } from './state'

import { RouteLocationNormalized } from 'vue-router'

const mutation: MutationTree<TabListStateInterface> = {
  addTag (state: TabListStateInterface, payload: RouteLocationNormalized) {
    if (state.tabList.some(p => p.path === payload.path)) return
    state.tabList.push(payload)
  },
  removeTag (state: TabListStateInterface, payload: RouteLocationNormalized) {
    state.tabList.splice(state.tabList.indexOf(payload), 1)
  }
}

export default mutation
