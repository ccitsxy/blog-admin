import * as icons from '@ant-design/icons-vue'
import { App } from 'vue'
import routes from '../../router/routes'
import { RouteRecordRaw } from 'vue-router'

const filterIcons: string[] = []

let item: RouteRecordRaw

function filterRoutesIcons (children: RouteRecordRaw[] | undefined) {
  for (item of children as RouteRecordRaw[]) {
    filterIcons.push(item.meta?.icon as string)
    if (item.children !== undefined) {
      filterRoutesIcons(item.children)
    }
  }
}

export default (app: App) => {
  filterRoutesIcons(routes[0].children)
  Object.keys(icons)
    .filter(k => filterIcons.includes(k))
    .forEach(k => {
      // @ts-ignore
      if (icons[k].displayName !== undefined) {
        // @ts-ignore
        app.component(icons[k].displayName, icons[k])
        // @ts-ignore
        console.log(icons[k].displayName)
      }
    })
}
