const configs = [
  {
    title: '借款',
    path: 'borrow',
    children: [
      { title: '申请借款', path: 'borrow-money' },
      { title: '绑卡', path: 'borrow-bindbankcard' }
    ]
  },
  {
    title: '智选借款',
    path: 'borrow-adv',
    children: [{ title: '申请借款', path: 'adv-borrow-money' }]
  },
  { title: '智选还款', path: 'repayment-adv', children: [{ title: '未还账单', path: 'waitbill' }] },
  {
    title: '半流程',
    path: 'guide',
    children: [{ title: '渠道登录', path: 'guide' }]
  },
  {
    title: '运营',
    path: 'operation',
    children: [{ title: '推广下载', path: 'operation-download' }]
  }
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
