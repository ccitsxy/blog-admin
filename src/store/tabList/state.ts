import { RouteLocationNormalized } from 'vue-router'

export interface TabListStateInterface {
  tabList: RouteLocationNormalized[];
}

function state (): TabListStateInterface {
  return {
    tabList: []
  }
}

export default state
