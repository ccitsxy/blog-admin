import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { TabsViewStateInterface } from './state'

const getters: GetterTree<TabsViewStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
