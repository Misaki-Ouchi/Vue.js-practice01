const msg = '';
const chatFaceImg = `
  <div class="chat-faceImg">
      <img src="" alt="">
  </div>
  `;
const chatMessage =  `
  <div class="chat-message">
      <div>
          <p>
              <span class="loading-icon">
                  <span class="loading-circle1"></span>
                  <span class="loading-circle2"></span>
                  <span class="loading-circle3"></span>
              </span>
          </p>
          <p> ${ msg } </p>
      </div>
      <span class="chat-message-before"></span>
  </div>
  `;

Vue.createApp({
  // components: {
  //   "chat-faceImg": chatFaceImg,
  //   "chat-message": chatMessage,
  // },
  data: function () {
    return {
      // ざっくりorしっかり
      msg1: {
        // 問いかけ
        que: {
          img: false,
          que1: {
            show: false,
            msg: '２つの方法で相場を計算することができます。',
            area: false,
            load: false,
          },
          que2: {
            show: false,
            msg: 'どちらがご希望に近いですか？',
            area: false,
            load: false
          },
          select: false
        },
        // 答え
        ans: {
          area: false,
          load: false,
          ans1: {
            show: false,
            msg: "ざっくり計算です",
          },
          ans2: {
            show: false,
            msg: "しっかり計算です",
          },
          read: false,
        },
      },
    };
  },
  created: function () {
    // 画像表示
    setTimeout(() => {
      this.firstMsg.img1 = true;
    }, 700);
    // chatメッセージ順番表示
    setTimeout(() => {
      this.firstMsg.area1 = true;
      this.firstMsg.load1 = true;
    }, 1500);
    setTimeout(() => {
      this.firstMsg.load1 = false;
      this.firstMsg.msg1 = true;
    }, 2500);
    setTimeout(() => {
      this.firstMsg.area2 = true;
      this.firstMsg.load2 = true;
    }, 3500);
    setTimeout(() => {
      this.firstMsg.load2 = false;
      this.firstMsg.msg2 = true;
    }, 4500);
    setTimeout(() => {
      this.select = true;
    }, 5500);
  },
  methods: {
    // 応答表示
    // ざっくり回答
    selectopt1: function () {
      this.select = false;
      this.area3 = true;
      this.load3 = true;
      setTimeout(() => {
        this.load3 = false;
        this.ans1.show = true;
      }, 1000);
      setTimeout(() => {
        this.read = true;
      }, 2000);
    },
    // しっかり回答
    selectopt2: function () {
      this.select = false;
      this.area3 = true;
      this.load3 = true;
      setTimeout(() => {
        this.load3 = false;
        this.ans2.show = true;
      }, 1000);
      setTimeout(() => {
        this.read = true;
      }, 2000);
    },

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
}).mount("#app");

// select: false, //ざっくりorしっかり
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
