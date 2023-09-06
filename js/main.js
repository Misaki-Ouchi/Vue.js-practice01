const adviserImg = {
  template: `
  <!-- 画像 -->
  <div class="chat-faceImg">
      <img src="" alt="">
  </div>
  `
}
const adviseM = {
  template: `
      <div class="chat-msgArea">
          <!-- メッセージエリア -->
          <div v-show="area" class="chat-message">
              <!-- ローディング -->
              <p v-show="load">
                  <span class="loading-icon">
                      <span class="loading-circle1"></span>
                      <span class="loading-circle2"></span>
                      <span class="loading-circle3"></span>
                  </span>
              </p>
              <!-- メッセージ -->
              <p v-show="msg">{{ message }}</p>
              <span class="chat-message-before"></span>
          </div>
      </div>
  `,
  props: ['message'],
  data: function () {
    return {
      load: false,
      msg: false,
      area: false
    }
  },
  created: function () {
    setTimeout(() => {
      this.area = true
      this.load = true
    }, 100);
    setTimeout(() => {
      this.load = false
      this.msg = true;
    }, 200);
  },
}
const doubleOption = {
  template: `
    <div class="chat-select-opt2">
      <a data-opt="a" class="chat-option">
        <p class="option-title">{{ message.a1 }}</p>
        <p class="option-detail">{{ message.b1 }}<br>{{ message.c1 }}</p>
      </a>
      <a data-opt="b" class="chat-option">
        <p class="option-title">{{ message.a2 }}</p>
        <p class="option-detail">{{ message.b2 }}<br>{{ message.c2 }}</p>
      </a>
    </div>
  `,
  props: ['message', 'selectOpt1', 'selectOpt2']
}
const tripleOption = {
  template: `
    <div class="chat-select-opt3">
      <a data-opt="a" class="chat-option">
          <p class="option-detail">{{ message.a }}</p>
      </a>
      <a data-opt="b" class="chat-option">
          <p class="option-detail">{{ message.b }}</p>
      </a>
      <a data-opt="c" class="chat-option">
          <p class="option-detail">{{ message.c }}</p>
      </a>
    </div>
  `,
  props: ['message', 'selectOpt1', 'selectOpt2', 'selectOpt3']
}
const answerM = {
  template: `
  <div class="chat-ansArea">
      <div class="chat-answer">
          <!-- ローディング -->
          <p v-show="load">
              <span class="loading-icon">
                  <span class="loading-circle1"></span>
                  <span class="loading-circle2"></span>
                  <span class="loading-circle3"></span>
              </span>
          </p>
          <!-- 応答 -->
          <p v-show="msg">{{ message }}</p>
          <span class="chat-answer-after"></span>
          <!-- 既読 -->
          <span v-show="read" class="chat-answer-read">既読</span>
      </div>
  </div>
  `,
  props: ['message'],
  // data: function () {
  //   return {
  //     load: false,
  //     msg: false,
  //     read: false
  //   }
  // },
  // created: function () {
  //   setTimeout(() => {
  //     this.load = true
  //   }, 100);
  //   setTimeout(() => {
  //     this.load = false
  //     this.msg = true;
  //   }, 200);
  //   setTimeout(() => {
  //     this.read = true
  //   }, 300);
  // },
}


Vue.createApp({
  components: {
    'adviser-img': adviserImg, //アドバイザー画像
    'advise-message': adviseM, //アドバイザーメッセージ
    'double-option': doubleOption, //選択肢２つ
    'triple-option': tripleOption, //選択肢３つ
    'answer-message': answerM, //選択後メッセージ
  },
  data: function () {
    return {
      // 表示true/非表示false
      advImgShow: true, //アドバイザー画像
      advMesShow: false, //アドバイザーメッセージ
      dbOpt: false, //選択肢２つ
      tpOpt: false, //選択肢３つ
      ansMesShow: true, //選択後メッセージ

      // リストデータ・追加リスト
      // 質問
      advMesList: ['２つの方法で相場を計算することができます。', 'どちらがご希望に近いですか？'],
      newAdv: [],
      // 選択肢２つ
      dbOptList: [{ a1: 'ざっくり計算', b1: '広さや形状から', c1: 'おおまかに', a2: 'しっかり計算', b2: '欲しい機能や', c2: '設備も入れて'}],
      // 選択肢３つ
      tpOptList: { a: 'はい', b: '興味がある', c: 'いいえ' },
      newTpOpt: [],
      // 答え
      ansMesList: [],
    };
  },
  created: function () {
    setTimeout(() => {
      // this.advImgShow = true
    }, 100);
      this.advMesShow = true
      this.newAdv.push(this.advMesList[0])
    setTimeout(() => {
      this.newAdv.push(this.advMesList[1])
    }, 200);
    setTimeout(() => {
      this.dbOpt = true
    }, 600);
  },
  methods: {
    opt2Func: function (e) {
      this.ansMesShow = true
      if (e.target.dataset.opt === 'a') {
        this.ansMesList.push(this.dbOptList[0].a1)
        console.log(this.ansMesList[0])
        
      }
      if (e.target.dataset.opt === 'b') {
        this.ansMesList.push(this.dbOptList[0].a2)
        console.log(this.ansMesList[0])
      }
    },
  },
})
  .mount("#app");
