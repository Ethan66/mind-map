export interface CustomRouterRaw {
  alwaysShow: boolean
  children: Array<CustomRouterRaw>
  component: any
  hidden: boolean
  meta: { title: string; icon: string; noCache: boolean; link: string }
  name: string
  path: string
  redirect: string
}
