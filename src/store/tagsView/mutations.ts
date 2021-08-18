import { MutationTree } from 'vuex'
import { TagsViewStateInterface } from './state'

import { RouteLocationNormalized } from 'vue-router'

const mutation: MutationTree<TagsViewStateInterface> = {
  addTag (state: TagsViewStateInterface, payload: RouteLocationNormalized) {
    if (state.tabList.some(p => p.path === payload.path)) return
    state.tabList.push(payload)
  },
  removeTag (state: TagsViewStateInterface, payload: RouteLocationNormalized) {
    state.tabList.splice(state.tabList.indexOf(payload), 1)
  }
}

export default mutation
