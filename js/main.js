const adviseArea = {
  template: `
  <div class="chat-area">
    <slot></slot>
  </div>
  `
}
const adviserImg = {
  template: `
  <!-- 画像 -->
  <div v-show="show" class="chat-faceImg">
      <img src="" alt="">
  </div>
  `,
  props: ['show']
}
const adviseM = {
  template: `
      <div v-show="show" class="chat-msgArea">
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
              <p v-show="msg"><slot></slot></p>
              <span class="chat-message-before"></span>
          </div>
      </div>
  `,
  props: ['show', 'message'],
  data: function () {
    return {
      load: false,
      msg: false,
      area: false
    }
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (oldData !== newData) {
          setTimeout(() => {
            this.area = true
            this.load = true
          }, 1000);
          setTimeout(() => {
            this.load = false
            this.msg = true;
          }, 2000);
        }
      }
    }
  }
}
const doubleOption = {
  template: `
    <div v-show="show" class="chat-select-opt2">
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
  props: ['show', 'message']
}
const answerM = {
  template: `
  <div v-show="show" class="chat-area">
      <div v-show="area" class="chat-ansArea">
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
              <p v-show="msg"><slot></slot></p>
              <span class="chat-answer-after"></span>
              <!-- 既読 -->
              <span v-show="read" class="chat-answer-read">既読</span>
          </div>
      </div>
  </div>
  `,
  props: ['show'],
  data: function () {
    return {
      area: false,
      load: false,
      msg: false,
      read: false
    }
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (oldData !== newData) {
          setTimeout(() => {
            this.area = true
            this.load = true
          }, 1000);
          setTimeout(() => {
            this.load = false
            this.msg = true;
          }, 2000);
          setTimeout(() => {
            this.read = true
          }, 3000);
        }
      }
    }
  }
}
const tripleOption = {
  components: {
    'answer-message': answerM
  },
  template: `
    <div v-show="show" class="chat-select-opt3">
      <a @click="ansA" class="chat-option">
          <p class="option-detail">{{ message.a }}</p>
      </a>
      <a @click="ansB" class="chat-option">
          <p class="option-detail">{{ message.b }}</p>
      </a>
      <a @click="ansC" class="chat-option">
          <p class="option-detail">{{ message.c }}</p>
      </a>
    </div>
    <answer-message>{{ answer }}です</answer-message>
  `,
  props: ['show', 'message'],
  data: function () {
    return {
      answer: ''
    }
  },
  methods: {
    ansA: function (e) {
      this.answer = e.target.value
    },
    ansB: function (e) {
      this.answer = e.target.value
    },
    ansC: function (e) {
      this.answer = e.target.value
    }
  }
}


Vue.createApp({
  components: {
    'advise-area': adviseArea, //アドバイザーエリア
    'adviser-img': adviserImg, //アドバイザー画像
    'advise-message': adviseM, //アドバイザーメッセージ
    'double-option': doubleOption, //選択肢２つ
    'triple-option': tripleOption, //選択肢３つ
    'answer-message': answerM, //選択後メッセージ
  },
  data: function () {
    return {
      // 表示true/非表示false
      // createdにshow = true をsettimeoutで
      imgShow: false, //アドバイザー画像
      advMesShow: false, //アドバイザーメッセージ
      advMesShow2: false, //アドバイザーメッセージ
      dbOpt: false, //選択肢２つ
      tpOpt: false, //選択肢３つ
      ansMesShow1: false, //選択後メッセージ
      ansMesShow2: false, //選択後メッセージ
      // 選択後はmethodsで順番にtrueにしていく
      showList: [{ 'reform': false }, { 'reform1': false }, { 'reform2': false }, { 'reform3': false }, { 'reform4': false }
    ],
    };
  },
  created: function () {
    setTimeout(() => {
      this.imgShow = true
      this.advMesShow = true
    }, 1000);
    setTimeout(() => {
    }, 2000);
    setTimeout(() => {
      this.advMesShow2 = true
    }, 3000);
    setTimeout(() => {
      this.dbOpt = true
    }, 6000);
  },
  methods: {
    // ざっくりorしっかり
    opt2Func1: function (e) {
      // ざっくり
      if (e.target.dataset.opt === 'a') {
        this.ansMesShow1 = true
        this.dbOpt = false
        // リフォーム費用画像削除
        this.showList.unshift(
          { 'reform': false }, { 'reform1': false }, { 'reform2': false }, { 'reform3': false }, { 'reform4': false }
        )
      }
      // しっかり
      if (e.target.dataset.opt === 'b') {
        this.ansMesShow2 = true
        this.dbOpt = false
        this.showFunc(this.showList)
      }
    },
    // お風呂の形式
    opt3Func1: function (e) {
      // ユニットバス
      if (e.target.dataset.opt === 'a') {
        // this.ansMesShow1 = true
        // this.dbOpt = false
        // // リフォーム費用画像削除
        // this.showList.unshift(
        //   { 'reform': false }, { 'reform1': false }, { 'reform2': false }, { 'reform3': false }, { 'reform4': false }
        // )
      }
      // タイル貼り
      if (e.target.dataset.opt === 'b') {
        // this.ansMesShow2 = true
        // this.dbOpt = false
        // this.showFunc(this.showList)
      }
      // わからない
      if (e.target.dataset.opt === 'b') {
        // this.ansMesShow2 = true
        // this.dbOpt = false
        // this.showFunc(this.showList)
      }
    },
    opt3Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        
      }
      if (e.target.dataset.opt === 'b') {
        
      }
      if (e.target.dataset.opt === 'b') {
        
      }
    },
    showFunc: function (list) {
      let i = 0
      setTimeout(() => {
        list[i].key = true
        i++
        if (i < list.length) {
          this.showFunc(list)
        }
      }, 1000);
      // for (let i = 0; i < list.length; i++){
      //   if (list[i].key === false) {
      //   setTimeout(() => {
      //       list[i].key = true
      //     }, 1000);
      //   }
      // }
    }
  }
})
  .mount("#app");
