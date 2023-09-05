Vue.createApp({
  data: function () {
    return {
      question1: "",
      // ざっくりorしっかり
      msg1: {
        // 問いかけ
        que: {
          1: {
            1: "２つの方法で相場を計算することができます。",
            2: "どちらがご希望に近いですか？",
          }
        },
        // 答え
        ans: {
          1: {
            1: "ざっくり計算です",
            2: "しっかり計算です",
            read: false //既読
          }
        },
      },
    };
  },
  created: function () {
    // 画像表示

  },
  methods: {
    // 応答表示
    // ざっくり回答
    // selectopt1: function () {
    //   this.select = false;
    //   this.area3 = true;
    //   this.load3 = true;
    //   setTimeout(() => {
    //     this.load3 = false;
    //     this.ans1.show = true;
    //   }, 1000);
    //   setTimeout(() => {
    //     this.read = true;
    //   }, 2000);
    // },
    // // しっかり回答
    // selectopt2: function () {
    //   this.select = false;
    //   this.area3 = true;
    //   this.load3 = true;
    //   setTimeout(() => {
    //     this.load3 = false;
    //     this.ans2.show = true;
    //   }, 1000);
    //   setTimeout(() => {
    //     this.read = true;
    //   }, 2000);
    // },

    // メッセージ順番表示関数
    msgShow: function (area, load, msg) {
      // 一つ目のメッセージ
      setTimeout(() => {
        area = true;
        load = true;
      }, 1000);
      // 二つ目のメッセージ
      setTimeout(() => {
        load = false;
        msg = true;
      }, 2000);
    },
  },
})

  // .component("chat-faceImg", {
  //   template: `
  //   <div class="chat-faceImg">
  //   <img src="" alt="">
  //   </div>
  // `,
  // })
  // .component("chat-message", {
  //   props: ['message'],
  //   template: `
  //   <div class="chat-message">
  //       <div>
  //           <p>
  //               <span class="loading-icon">
  //                   <span class="loading-circle1"></span>
  //                   <span class="loading-circle2"></span>
  //                   <span class="loading-circle3"></span>
  //               </span>
  //           </p>
  //           <p>{{ message }}</p>
  //       </div>
  //       <span class="chat-message-before"></span>
  //   </div>
  // `,
  // })
  .mount("#app");
