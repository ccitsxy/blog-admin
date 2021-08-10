import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { TabsViewStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const tabsViewModule: Module<TabsViewStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default tabsViewModule
