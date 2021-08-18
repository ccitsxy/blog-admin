import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { TagsViewStateInterface } from './state'

const getters: GetterTree<TagsViewStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
