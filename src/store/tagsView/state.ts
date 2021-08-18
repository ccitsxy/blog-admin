import { RouteLocationNormalized } from 'vue-router'

export interface TagsViewStateInterface {
  tabList: RouteLocationNormalized[];
}

function state (): TagsViewStateInterface {
  return {
    tabList: []
  }
}

export default state
