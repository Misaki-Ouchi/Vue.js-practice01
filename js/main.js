Vue.createApp({
  data: function () {
    return {
      show0: false,
      
      show1: false,
      load1a: false,
      show1b: false,

      show2: false,
      load2a: false,
      show2b: false,

      show3: false,
      // msg: {
        // 1: {
        //   1: "２つの方法で相場を計算することができます。",
        //   2: "どちらがご希望に近いですか？",
        //   a: "",
        // },
      // },
    };
  },
  created: function () {
    // 画像表示
    setTimeout(() => {
      this.show0 = true
    }, 700);
    // chatメッセージ順番表示
    setTimeout(() => {
      this.show1 = true
      this.load1a = true
    }, 1500);
    setTimeout(() => {
      this.load1a = false
      this.show1b = true
    }, 2500);
    setTimeout(() => {
      this.show2 = true
      this.load2a = true
    }, 3500);
    setTimeout(() => {
      this.load2a = false
      this.show2b = true
    }, 4500);
    setTimeout(() => {
      this.show3 = true
    }, 5500);
  },
  method: {

    // ローディング後にmessage表示
    showMsg: function () {
      setTimeout(() => {
        area = true
        load = true
      }, 1000);
      setTimeout(() => {
        msg = true
      }, 1500);
    },
    // true false で表示/非表示
    // load t → load f, chat t の繰り返し

    // 選択肢表示
    showSelect: function (opt1, opt2) {},

    // 応答表示
    selectMsg: function (message) {},
  },
}).mount("#app");
