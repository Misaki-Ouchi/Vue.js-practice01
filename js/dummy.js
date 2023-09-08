const adviseArea = {
  template: `
  <div class="chat-area">
    <slot></slot>
  </div>
  `,
};
const adviserImg = {
  template: `
  <!-- 画像 -->
  <div v-show="show && show2" class="chat-faceImg">
      <img src="" alt="">
  </div>
  `,
  props: ["show"],
  data: function () {
    return {
      show2: false
    };
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (newData === true) {
          this.show2 = true;
        }
      },
    },
  },
};
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
  props: ["show"],
  data: function () {
    return {
      load: false,
      msg: false,
      area: false
    };
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (newData === true) {
          this.area = true;
          this.load = true;
          setTimeout(() => {
            this.load = false;
            this.msg = true;
          }, 100);
        }
      },
    },
  },
};
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
              <p v-show="msg">{{ message }}</p>
              <span class="chat-answer-after"></span>
              <!-- 既読 -->
              <span v-show="read" class="chat-answer-read">既読</span>
          </div>
      </div>
  </div>
  `,
  props: ["show", "message"],
  data: function () {
    return {
      area: false,
      load: false,
      msg: false,
      read: false,
    };
  },
  watch: {
    show: {
      handler(newData, oldData) {
        if (newData === true) {
          this.area = true;
          this.load = true;
          setTimeout(() => {
            this.load = false;
            this.msg = true;
          }, 100);
          setTimeout(() => {
            this.read = true;
          }, 200);
        }
      },
    },
  },
};

Vue.createApp({
  components: {
    "advise-area": adviseArea, //アドバイザーエリア
    "adviser-img": adviserImg, //アドバイザー画像
    "advise-message": adviseM, //アドバイザーメッセージ
    "answer-message": answerM, //選択後メッセージ
  },
  data: function () {
    return {
      // type: type0 // msg2 + select + msg2
      // type: type1 // msg1 + select
      // type: type2 // msg2 + select
      // type: type3 // msg1 + msg2 + select
      list: [
        {
          name: "calc",
          name2: "相場の計算",
          msg0: [
            "２つの方法で相場を計算することができます。",
            "どちらがご希望に近いですか？",
          ],
          msg: [],
          options: [],
          selected: "",
          type: "type0",
          show: [],
        },
        {
          name: "bathType",
          name2: "お風呂の形式",
          msg0: [],
          msg: ["希望されるお風呂は、どのような形式ですか？"],
          // options: [{ a: 'ユニットバス', b: 'タイル貼り', c: 'わからない' }],
          options: ["ユニットバス", "タイル貼り", "わからない"],
          selected: "",
          type: "type1",
          show: [],
        },
        {
          name: "bathSize",
          name2: "お風呂の大きさ",
          msg0: [],
          msg: ["希望されるお風呂の大きさは、どのくらいですか？"],
          options: ["２畳未満", "２畳以上", "わからない"],
          selected: "",
          type: "type1",
          show: [],
        },
        {
          name: "bathShape",
          name2: "浴槽の形",
          msg0: ["浴槽まわりの希望をお伺いします。"],
          msg: [
            "湯船につかる頻度が多い場合は、浴槽の形が重要です。",
            "浴槽の形にこだわりはありますか？",
          ],
          options: ["広さ重視", "節水重視", "特になし"],
          selected: "",
          type: "type3",
          show: [],
        },
      ],
      newList: [], // 表示用リスト
      showList: [], // true/false格納リスト
      firstOpt: [], // しっかり/ざっくりのtrue/false格納リスト
      firstOptA: [], // しっかり計算表示用リスト
      firstOptB: [], // ざっくり計算表示用リスト
    };
  },
  created: function () {
    let push = () => this.list[0].show.push(true);
    let pushT = () => this.firstOpt.push(true);
    this.interValFunc(push, 2, 1);
    this.timerFunc(pushT, 4);
  },
  methods: {
    // 選択肢クリック後（ざっくり計算/しっかり計算）
    fstSelectFunc: function (e) {
      let pushT = () => this.firstOpt.push(true);
      let pushTa = () => this.firstOptA.push(true);
      let pushTb = () => this.firstOptB.push(true);
      if (e.target.dataset.opt === "しっかり計算") {
        this.list[0].selected = "しっかり計算です";
        this.firstOpt[0] = false;
        this.timerFunc(pushT, 1);
        this.interValFunc(pushTa, 7, 1);
      }
      if (e.target.dataset.opt === "ざっくり計算") {
        this.list[0].selected = "ざっくり計算です";
        this.firstOpt[0] = false;
        this.timerFunc(pushT, 1);
        this.interValFunc(pushT, 2, 1);
        this.timerFunc(pushTb, 3);
        this.timerFunc(pushTb, 5);
      }
      // ２つ目の選択肢
      this.newList.push(this.list[1]);
      setTimeout(() => {
        this.showFunc(this.list[1])
      }, 700);
    },

    // 順番表示の関数
    showFunc: function (list) {
      let pushF = () =>  list.show.push(false)
      let pushTF = () =>  list.show.push(true, false)
      let pushT = () => list.show.push(true);
      // メッセージが一つの場合
      if (list.type === 'type1') {
        pushF()
        pushF()
        this.timerFunc(pushTF, 3)
        this.timerFunc(pushT, 5)
      }
      // メッセージが一つ + 一つの場合
      if (list.type === 'type2') {
        pushF()
        pushF()
        this.interValFunc(pushT, 3, 2);
      }
      // メッセージが一つ + 二つの場合
      if (list.type === 'type3') {
        this.timerFunc(pushTF, 1)
        this.interValFunc(pushT, 3, 1);
      }
    },

    // 選択肢クリック後
    selectFunc: function (e) {
      // データに格納している名前から配列が何番目かを特定
      let name = e.target.dataset.name
      let num
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === name) {
          num = i
        }
      }
      console.log(this.list[num])
      // 選択肢を非表示
      this.list[num].show[4] = false
      // 選択したデータをselectedに格納
      this.list[num].selected = e.target.dataset.opt;
      // 回答メッセージ表示
      this.list[num].show[5] = true
      //次のの選択肢表示
      if (num < this.list.length) {
        this.newList.push(this.list[num + 1]);
        this.showFunc(this.list[num + 1])
      }
    },

    // タイマー関数（実行関数、秒数）
    timerFunc: function (func, waitSeconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(func());
        }, waitSeconds * 100);
      });
    },
    // 一定時間ごとの繰り返し関数(実行関数、回数、秒数)
    interValFunc: function (func, count, seconds) {
      let i = 1;
      setInterval(() => {
        if (i <= count) {
          func();
          i++;
        } else {
          clearInterval(null);
        }
      }, seconds * 100);
    },
  },
}).mount("#app");
