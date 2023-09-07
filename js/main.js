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
      <a data-opt="a" :id="message.a1" class="chat-option">
        <p data-opt="a" class="option-title">{{ message.a1 }}</p>
        <p data-opt="a" class="option-detail">{{ message.b1 }}<br>{{ message.c1 }}</p>
      </a>
      <a data-opt="b" class="chat-option">
        <p data-opt="b" class="option-title">{{ message.a2 }}</p>
        <p data-opt="b" class="option-detail">{{ message.b2 }}<br>{{ message.c2 }}</p>
      </a>
    </div>
  `,
  props: ['show', 'message']
}
const tripleOption = {
  template: `
    <div v-show="show" class="chat-select-opt3">
      <a data-opt="a" class="chat-option">
          <p data-opt="a" class="option-detail">{{ message.a }}</p>
      </a>
      <a data-opt="b" class="chat-option">
          <p data-opt="b" class="option-detail">{{ message.b }}</p>
      </a>
      <a data-opt="c" class="chat-option">
          <p data-opt="c" class="option-detail">{{ message.c }}</p>
      </a>
    </div>
  `,
  props: ['show', 'message'],
  data: function () {
    return {
      answer: ''
    }
  }
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
      // 表示true/非表示false（初期画面 ざっくり/しっかり）
      imgShow: false, //アドバイザー画像
      advMesShow: false, //アドバイザーメッセージ
      advMesShow2: false, //アドバイザーメッセージ
      opt1Show: false, //選択肢表示

      // type: type1 // msg1 + select
      // type: type2 // msg2 + select
      // type: type3 // msg1 + msg2 + select
      // list[
      //    { name: 'シャワーヘッド', type: 'type1',
      //      msg0: [], msg: [],
      //      options: [], selected: []
      //    },
      //  ]

      // 表示・非表示用リスト
      showList: {
        opt1: [], calcA: [], calcB: [],
        opt2: [], bathType: [],
        opt3: [], bathSize: [],
        opt4: [], bathShape: [],
        opt5: [], keepWarm: [],
        opt6: [], bubble: [],
        opt7: [], audio: [],
        opt8: [], tv: [],
        opt9: [], light: [],
        opt10: [], addWarm: [],
        opt11: [], forApp: [],
        opt12: [], showerHead: [],
      },
      // メッセージリスト
      msgList: {
        opt1: ['２つの方法で相場を計算することができます。', 'どちらがご希望に近いですか？']
      },
      // 選択肢リスト
      optList: {
        opt1: [{ a1: 'ざっくり計算', b1: '広さや形状から', c1: 'おおまかに', a2: 'しっかり計算', b2: '欲しい機能や', c2: '設備も入れて' }],
        opt2: [{ a: 'ユニットバス', b: 'タイル貼り', c: 'わからない' }],
        opt3: [{ a: '２畳未満', b: '２畳以上', c: 'わからない' }],
        opt4: [{ a: '広さ重視', b: '節水重視', c: '特になし' }],
        opt5: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt6: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt7: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt8: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt9: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt10: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt11: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
        opt12: [{ a: 'はい', b: '興味がある', c: 'いいえ' }],
      },
      // 回答リスト
      ansList: { ans1: '', ans2: '', ans3: '', ans4: '', ans5: '', ans6: '', ans7: '', ans8: '', ans9: '', ans10: '', ans11: '', ans12: '' }
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
      this.opt1Show = true
    }, 6000);
  },
  methods: {
    // ざっくりorしっかり
    opt1Func: function (e) {
      let ans = () => {
        this.showList.opt1.push(true)
      }
      let next = () => {
        this.showList.opt2.push(true)
      }
      this.opt1Show = false //オプション非表示
      ans() //答え表示
      // ざっくり
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans1 = this.optList.opt1[0].a1
        let a = ()=> {
          this.showList.calcA.push('true')
        }
        this.timerFunc(next, 3)
        this.timerFunc(next, 6) //次のオプション表示
      }
      // しっかり
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans1 = this.optList.opt1[0].a2
        let b = ()=> {
          this.showList.calcB.push('true')
        }
        this.interValFunc(b, 7)
        this.timerFunc(next, 9)
        this.timerFunc(next, 12) //次のオプション表示
      }
    },
    // お風呂の形式
    opt2Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        console.log(e.target.dataset.opt)
        this.ansList.ans2 = this.optList.opt2[0].a
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans2 = this.optList.opt2[0].b
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans2 = this.optList.opt2[0].c
      }
      let ans = () => {
        this.showList.bathType.push(true)
      }
      let next = () => {
        this.showList.opt3.push(true)
      }
      this.showList.opt2.pop() //オプション非表示
      ans()
      this.timerFunc(next, 2) //次のオプション表示
      this.timerFunc(next, 6) //次のオプション表示
    },
    // お風呂の大きさ
    opt3Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans3 = this.optList.opt3[0].a
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans3 = this.optList.opt3[0].b
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans3 = this.optList.opt3[0].c
      }
      let ans = () => {
        this.showList.bathSize.push(true)
      }
      let next = () => {
        this.showList.opt4.push(true)
      }
      this.showList.opt3.pop() //オプション非表示
      ans()
      setTimeout(() => {
        this.interValFunc(next, 3) //次のオプション表示
      }, 3000);
      // this.selectFunc(
      //   e,
      //   this.ansList.ans3,
      //   this.optList.opt3[0].a,
      //   this.optList.opt3[0].b,
      //   this.optList.opt3[0].c,
      //   this.showList.bathType,
      //   this.showList.opt3,
      //   this.showList.opt4,
      //   3
      // )
    },
    // 浴槽の形
    opt4Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans4 = '広さ重視'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans4 = '節水重視'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans4 = '特になし'
      }
      let ans = () => {
        this.showList.bathShape.push(true)
      }
      let next = () => {
        this.showList.opt5.push(true)
      }
      this.showList.opt4.pop() //オプション非表示
      ans()
      this.timerFunc(next, 1)
    },
    // 保温効果
    opt5Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans5 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans5 = '興味があります'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans5 = 'いいえ'
      }
      let ans = () => {
        this.showList.keepWarm.push(true)
      }
      let next = () => {
        this.showList.opt6.push(true)
      }
      this.showList.opt5.pop() //オプション非表示
      ans()
      this.timerFunc(next, 1)

    },
    // バブルバス・ジェットバス
    opt6Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans6 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans6 = '興味がある'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans6 = 'いいえ'
      }
      let ans = () => {
        this.showList.bubble.push(true)
      }
      let next = () => {
        this.showList.opt7.push(true)
      }
      this.showList.opt6.pop() //オプション非表示
      ans()
      setTimeout(() => {
        this.interValFunc(next, 2) //次のオプション表示
      }, 3000);
    },
    // オーディオの設置
    opt7Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans7 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans7 = '興味がある'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans7 = 'いいえ'
      }
      let ans = () => {
        this.showList.audio.push(true)
      }
      let next = () => {
        this.showList.opt8.push(true)
      }
      this.showList.opt7.pop()
      ans()
      setTimeout(() => {
        this.interValFunc(next, 2) //次のオプション表示
      }, 3000);
    },
    // テレビの設置
    opt8Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans8 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans8 = '興味がある'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans8 = 'いいえ'
      }
      let ans = () => {
        this.showList.tv.push(true)
      }
      let next = () => {
        this.showList.opt9.push(true)
      }
      this.showList.opt8.pop()
      ans()
      setTimeout(() => {
        this.interValFunc(next, 2) //次のオプション表示
      }, 3000);
    },
    // 機能的な照明
    opt9Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans9 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans9 = '興味がある'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans9 = 'いいえ'
      }
      let ans = () => {
        this.showList.light.push(true)
      }
      let next = () => {
        this.showList.opt10.push(true)
      }
      this.showList.opt9.pop()
      ans()
      setTimeout(() => {
        this.interValFunc(next, 2) //次のオプション表示
      }, 3000);
    },
    // 追い焚き機能
    opt10Func: function (e) {
      if (e.target.dataset.opt === 'a') {
        this.ansList.ans10 = 'はい'
      }
      if (e.target.dataset.opt === 'b') {
        this.ansList.ans10 = '興味がある'
      }
      if (e.target.dataset.opt === 'c') {
        this.ansList.ans10 = 'いいえ'
      }
      let ans = () => {
        this.showList.addWarm.push(true)
      }
      let next = () => {
        this.showList.opt11.push(true)
      }
      this.showList.opt10.pop()
      ans()
      setTimeout(() => {
        this.interValFunc(next, 2) //次のオプション表示
      }, 3000);
    },

    // 選択後のデータ埋め込み、表示・非表示の関数
    selectFunc: function (
      // 引数
      e,
      ansNum,     // 例) this.ansList.ans2
      ansList1,   // 例) this.optList.opt2[0].a
      ansList2,   // 例) this.optList.opt2[0].b
      ansList3,   // 例) this.optList.opt2[0].c
      ansName,    // 例) this.showList.bathType
      optNum,     // 例) this.showList.opt2
      optNextNum, // 例) this.showList.opt3
      nextMsgNum  // 例) 1 (次のオプションのメッセージ数)
    ) {
      let ans = () => {
        ansName.push(true)
      }
      let next = () => {
        optNextNum.push(true)
      }
      optNum.pop()
      ans()
      console.log(ansName)
      setTimeout(() => {
        this.interValFunc(next, nextMsgNum) //次のオプション表示
      }, 3000);
    },

    // タイマー関数（実行関数、秒数）
    timerFunc: function (func, waitSeconds) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(func())
        }, waitSeconds * 1000);
      })
    },
    // 2秒ごとの繰り返し関数(実行関数、回数)
    interValFunc: function (func, count) {
      let i = 0
      setInterval(() => {
        if (i <= count) {
          func()
          i++
        } else {
          clearInterval(null)
        }
      }, 1000);
    }

    // opt3Func: function (e) {
    //   if (e.target.dataset.opt === 'a') {
        
    //   }
    //   if (e.target.dataset.opt === 'b') {
        
    //   }
    //   if (e.target.dataset.opt === 'c') {
        
    //   }
    // },
  }
})
  .mount("#app");
