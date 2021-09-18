import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { TabListStateInterface } from './state'

const getters: GetterTree<TabListStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
