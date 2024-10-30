import type { RouteRecordRaw } from 'vue-router'
import { useStorage } from '@vueuse/core'

export function readProjectsFiles() {
  const modules = import.meta.glob('@/views/projects/*.vue')
  return modules
}

export function getRoutesConfigByProjects() {
  const modules = readProjectsFiles()

  const routes: RouteRecordRaw[] = []

  for (const key in modules) {
    if (key && key.includes('.vue')) {
      const parts = key.split('/')
      if (!parts || parts.length === 0)
        continue

      const length = parts.length
      const name = parts[length - 1].split('.')[0]
      const route: RouteRecordRaw = {
        path: `/${name}`,
        component: modules[key],
        name,
      }

      routes.push(route)
    }
  }

  // cache
  const list = useStorage('routes', routes)
  list.value = routes

  return routes
}
