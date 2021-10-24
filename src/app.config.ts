export default {
  pages: [
    'pages/user/index/index',
    'pages/home/index',
    'pages/user/login/index',
    'pages/user/about/index',
    'pages/user/contact/index',
    'pages/user/fav/index',
    'pages/user/noti/index',
    'pages/user/order/index',
    'pages/user/profile/index',
  ],
  tabBar: {
    selectedColor: '#6190E8',
    list: [
      { pagePath: 'pages/home/index', text: '首页', iconPath: 'static/images/home.png', selectedIconPath: 'static/images/selected_home.png' },
      // { pagePath: 'pages/user/login/index', text: '登录', iconPath: 'static/images/sign-in.png', selectedIconPath: 'static/images/selected_sign-in.png'  },
      // { pagePath: 'pages/user/profile/index', text: '个人资料', iconPath: 'static/images/user.png', selectedIconPath: 'static/images/selected_user.png'  },
      { pagePath: 'pages/user/index/index', text: '菜单', iconPath: 'static/images/user.png', selectedIconPath: 'static/images/selected_user.png'  },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
