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
            this.area = true
            this.load = true
          setTimeout(() => {
            this.load = false
            this.msg = true;
          }, 1000);
        }
      }
    }
  }
}
// const doubleOption = {
//   template: `
//     <div v-show="show" class="chat-select-opt2">
//       <a v-show="area" :id="obj.a1" class="chat-option">
//         <p :id="obj.a1" class="option-title">{{ obj.a1 }}</p>
//         <p :id="obj.a1" class="option-detail">{{ obj.b1 }}<br>{{ obj.c1 }}</p>
//       </a>
//       <a v-show="area" :id="obj.a2" class="chat-option">
//         <p :id="obj.a2" class="option-title">{{ obj.a2 }}</p>
//         <p :id="obj.a2" class="option-detail">{{ obj.b2 }}<br>{{ obj.c2 }}</p>
//       </a>
//     </div>
//   `,
//   props: ['show', 'obj'],
//   data: function () {
//     return {
//       area: false
//     }
//   },
//   watch: {
//     show: {
//       handler(newData, oldData) {
//         if (oldData !== newData) {
//             this.area = true
//         }
//       }
//     }
//   }
// }
const selectOptions = {
  template: `
    <div v-show="show" v-for="item in list" class="chat-select-opt3">
      <a v-show="area" :id="item" class="chat-option">
          <p :id="item" class="option-detail">{{ item }}</p>
      </a>
    </div>
  `,
  props: ['show', 'list'],
  data: function () {
    return {
      area: false
    }
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (oldData !== newData) {
            this.area = true
        }
      }
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
            this.area = true
            this.load = true
          setTimeout(() => {
            this.load = false
            this.msg = true;
          }, 1000);
          setTimeout(() => {
            this.read = true
          }, 2000);
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
    'select-options': selectOptions, //選択肢
    'answer-message': answerM, //選択後メッセージ
  },
  data: function () {
    return {
      // type: type0 // msg2 + select + msg2
      // type: type1 // msg1 + select
      // type: type2 // msg2 + select
      // type: type3 // msg1 + msg2 + select
      // type: type5 // msg1 + select(4)
      list: [
        {
          name: 'calc',
          name2: '相場の計算',
          msg0: ['２つの方法で相場を計算することができます。', 'どちらがご希望に近いですか？'], // type1のみ
          msg: ['かしこまりました。', 'あなたの費用を、データをもとにざっくり計算します。'],
          msgB: ['かしこまりました。', '一戸建てのお風呂リフォーム相場は', 'あなたの費用を、データをもとにしっかり計算します。'],
          options0: { a1: 'ざっくり計算', b1: '広さや形状から', c1: 'おおまかに', a2: 'しっかり計算', b2: '欲しい機能や', c2: '設備も入れて' },
          selected: '',
          type: 'type0',
          branch: true,
          show: [true]
        },
        {
          name: 'bathType',
          name2: 'お風呂の形式',
          msg: ['希望されるお風呂は、どのような形式ですか？'],
          // options: [{ a: 'ユニットバス', b: 'タイル貼り', c: 'わからない' }],
          options: ['ユニットバス', 'タイル貼り', 'わからない'],
          selected: [],
          type: 'type1',
          show: []
        },
        {
          name: 'bathSize',
          name2: 'お風呂の大きさ',
          msg0: [],
          msg: ['希望されるお風呂の大きさは、どのくらいですか？'],
          options: ['２畳未満', '２畳以上', 'わからない' ],
          selected: [],
          type: 'type1',
          show: []
        },
        {
          name: 'bathShape',
          name2: '浴槽の形',
          msg0: ['浴槽まわりの希望をお伺いします。'],
          msg: ['湯船につかる頻度が多い場合は、浴槽の形が重要です。', '浴槽の形にこだわりはありますか？'],
          options: ['広さ重視', '節水重視', '特になし'],
          selected: [],
          type: 'type3',
          show: []
        },
      ],
      newList: [],
      showList: [],
      opt1Show: false
    };
  },
  created: function () {
    this.newList.push(this.list[0])
    this.newList.push(this.list[1])
    let push = () => this.showList.push(true)
    this.interValFunc(push, 1, 1)
    this.opt1Show = true
  },
  methods: {
    selectFunc: function (e) {
      // しっかり計算の場合
      // if () {
        
      // }
      // typeごとに表示方法変わる
      // クリックしたら次の要素を配列に入れる
    },
    // タイマー関数（実行関数、秒数）
    timerFunc: function (func, waitSeconds) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(func())
        }, waitSeconds * 1000);
      })
    },
    // 1秒ごとの繰り返し関数(実行関数、回数)
    interValFunc: function (func, count, seconds) {
      let i = 0
      setInterval(() => {
        if (i <= count) {
          func()
          i++
        } else {
          clearInterval(null)
        }
      }, seconds * 1000);
    },
  }
})
.mount("#app");
