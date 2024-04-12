const configs = [
  { title: '借款', path: 'borrow', children: [{ title: '申请借款', path: 'borrow-money' }] }
]

const transConfig = (configs: any[]) => {
  configs.forEach(item => {
    item.name = item.path
    item.component = () => import('@/views/detail/index.vue')
    item.meta = { title: item.title, noCache: true, icon: '' }
    delete item.title
    item.children && transConfig(item.children)
  })
}
transConfig(configs)
export default configs
