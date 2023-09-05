Vue.createApp({
  data: function () {
    return {
      isShow: false,
      msg: {
        1: {
          1: '２つの方法で相場を計算することができます。',
          2: 'どちらがご希望に近いですか？'
        }
      }
    }
  },
  // created: function () {
  // },
  method: {
    showMessage: function (message) {
      // ローディング後にmessage表示
      // true false で表示/非表示
      // load t → load f, chat t の繰り返し
    }
  }
}).mount('#app')
