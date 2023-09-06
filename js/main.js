Vue.createApp({
  data: function () {
    return {
      // 表示true/非表示false
      imgShow: false,
      queLoad1: false,
      queLoad2: false,
      queChat1: false,
      queChat2: false,
      ansLoad: false,
      // 表示用リスト
      newList: [],
      // 質問・応答リスト
      messageList: [
        {
          key: 1,
          que: {
            area: false,
            area2: false,
            que1: "２つの方法で相場を計算することができます。",
            continue: true,
            que2: "どちらがご希望に近いですか？",
          },
          opt2: {
            opt2Area: false,
            opt1: {
              a: "ざっくり計算",
              b: "広さや形状から",
              c: "おおまかに",
            },
            opt2: {
              a: "しっかり計算",
              b: "欲しい機能や",
              c: "設備も入れて",
            },
          },
          ans: {
            ansArea: false,
            show1: false,
            show2: false,
            ans1: "ざっくり計算です",
            ans2: "しっかり計算です",
            read: false, //既読
          },
        },
      ],
    };
  },
  created: function () {
    // for文でループ
    let len = this.messageList.length
    
    this.newList[0] = this.messageList[0];
    let msg = this.messageList[0];
    // 画像表示
    setTimeout(() => {
      this.imgShow = true;
    }, 100);
    setTimeout(() => {
      msg.que.area = true;
      this.queLoad1 = true;
    }, 200);
    setTimeout(() => {
      this.queLoad1 = false;
      this.queChat1 = true;
    }, 300);
    setTimeout(() => {
      msg.que.area2 = true;
      this.queLoad2 = true;
    }, 400);
    setTimeout(() => {
      this.queLoad2 = false;
      this.queChat2 = true;
    }, 500);
    setTimeout(() => {
      msg.opt2.opt2Area = true
    }, 600);
  },
  methods: {
    // 応答表示
    // ざっくり回答
    selectOpt1: function () {
      this.newList[0].opt2.opt2Area = false;
      this.newList[0].ans.ansArea = true;
      this.load = true;
      setTimeout(() => {
        this.ansLoad = false;
        this.newList[0].ans.show1 = true;
      }, 100);
      setTimeout(() => {
        this.newList[0].ans.read = true;
      }, 200);
    },
    // しっかり回答
    selectOpt2: function () {
      this.newList[0].opt2.opt2Area = false;
      this.newList[0].ans.ansArea = true;
      this.ansLoad = true;
      setTimeout(() => {
        this.ansLoad = false;
        this.newList[0].ans.show2 = true;
      }, 100);
      setTimeout(() => {
        this.newList[0].ans.read = true;
      }, 200);
    },
  },
})
.mount("#app");

// メッセージ順番表示関数
// msgShow: function (area, load, msg) {
//   // 一つ目のメッセージ
//   setTimeout(() => {
//     area = true;
//     load = true;
//   }, 1000);
//   // 二つ目のメッセージ
//   setTimeout(() => {
//     load = false;
//     msg = true;
//   }, 2000);
// },
