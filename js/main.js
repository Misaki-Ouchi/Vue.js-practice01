// const chatFaceImg = {
//   template: `
//   <div class="chat-faceImg">
//       <img src="" alt="">
//   </div>
//   `
// };
// const chatMessage = {
//   props: ['message'],
//   template: `
//   <div v-if="area" class="chat-message">
//       <div>
//           <p v-if="load">
//               <span class="loading-icon">
//                   <span class="loading-circle1"></span>
//                   <span class="loading-circle2"></span>
//                   <span class="loading-circle3"></span>
//               </span>
//           </p>
//           <p v-if="msg">{{ message }}</p>
//       </div>
//       <span class="chat-message-before"></span>
//   </div>
//   `
// };

Vue.createApp({
  // components: {
  //   'chat-faceImg': chatFaceImg,
  //   'chat-message': chatMessage
  // },
  template: `
    <chat-faceImg v-if="img1" />
  `,
  data: function () {
    return {
      // 最初のメッセージ
      img1: false,
      area1: false,
      load1: false,
      msg1: false,
      area2: false,
      load2: false,
      msg2: false,
      //ざっくりorしっかり
      select1: false,
      ans1: {
        show: false,
        msg: 'ざっくり計算です'
      },
      ans2: {
        show: false,
        msg: 'しっかり計算です'
      },
      area3: false,
      load3: false,
      msg3: false,
      read: false,
    };
  },
  created: function () {
    // 画像表示
    this.con('ac')
    setTimeout(() => {
      this.img1 = true
    }, 700);
    // chatメッセージ順番表示
    this.msgShow(this.area1, this.load1, this.msg1);
    // setTimeout(() => {
    //   this.area1 = true
    //   this.load1 = true
    // }, 1500);
    // setTimeout(() => {
    //   this.load1 = false
    //   this.msg1 = true
    // }, 2500);
    setTimeout(() => {
      this.area2 = true
      this.load2 = true
    }, 3500);
    setTimeout(() => {
      this.load2 = false
      this.msg2 = true
    }, 4500);
    setTimeout(() => {
      this.select1 = true
    }, 5500);
  },
  methods: {


    // 応答表示
    // ざっくり回答
    select1opt1: function () {
      this.select1 = false
      this.area3 = true
      this.load3 = true
      setTimeout(() => {
        this.load3 = false
        this.ans1.show = true
      }, 1000);
      setTimeout(() => {
        this.read = true
      }, 2000);
    },
    // しっかり回答
    select1opt2: function () {
      this.select1 = false
      this.area3 = true
      this.load3 = true
      setTimeout(() => {
        this.load3 = false
        this.ans2.show = true
      }, 1000);
      setTimeout(() => {
        this.read = true
      }, 2000);
    },

    // メッセージ順番表示関数
    msgShow: function (area, load, msg) {
      // 一つ目のメッセージ
      setTimeout(() => {
        area = true
        load = true
        // 二つ目のメッセージ
        setTimeout(() => {
          load = false
          msg = true
        }, 1000);
      }, 1000);
    },
    con: function (msg) {
      console.log('a')
    }
  }
}).mount("#app");

// select1: false, //ざっくりorしっかり
//       ans1: {
//         show: false,
//         msg: 'ざっくり計算です'
//       },
//       ans2: {
//         show: false,
//         msg: 'しっかり計算です'
//       },
//       read: false,
//       area3: false,
//       load3: false,
//       msg3: false,
