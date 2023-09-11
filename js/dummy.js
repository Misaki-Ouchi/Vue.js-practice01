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
      show2: false,
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
      area: false,
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
      // type: type1 // msg1 + msg1 + select

      // 工事の時期 の選択肢
      // 市区町村 の選択肢

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
          answerType: "need",
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
          answerType: "need",
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
          answerType: "need",
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
          answerType: "need",
          show: [],
        },
        {
          name: "keepWarm",
          name2: "保温効果",
          msg0: [],
          msg: ["お湯の冷めにくい、保温効果のある浴槽をご希望されますか？"],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type1",
          show: [],
        },
        {
          name: "bubbleJet",
          name2: "バブルバス・ジェットバス",
          msg0: [],
          msg: [
            "リラックス・マッサージ効果のある、バブルバス・ジェットバスをご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type1",
          show: [],
        },
        {
          name: "audio",
          name2: "オーディオの設置",
          msg0: [],
          msg: [
            "お風呂に埋込み型のオーディオを設置すると、音の広がりがよく、また見た目もスッキリします。",
            "お風呂にオーディオの設置を希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "tv",
          name2: "テレビの設置",
          msg0: [],
          msg: [
            "ゆったりお湯に浸かりながら、最大24インチの大迫力の画面でテレビを楽しむこともできます。",
            "お風呂にテレビの設置を希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "light",
          name2: "機能的な照明",
          msg0: [],
          msg: [
            "設置する照明にこだわると、利用シーンに合わせて浴室の雰囲気を手軽に変えることができます。",
            "機能的な照明をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "reheat",
          name2: "追い焚き機能",
          msg0: [],
          msg: [
            "湯船に浸かる人が複数いたり、利用時間がバラバラな場合は、追い焚き機能が便利です。",
            "追い焚き機能をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "forApp",
          name2: "アプリ対応",
          msg0: [],
          msg: [
            "お湯はりや浴室暖房などをスマートフォンアプリで操作できるお風呂があります。",
            "アプリ対応のお風呂をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "showerHead",
          name2: "シャワーヘッド",
          msg0: ["つづいて、洗い場など浴室全体の希望をお伺いします"],
          msg: [
            "シャワーヘッドを変更することで、節水して水道代を抑えながら、適度な水圧による刺激を得ることができます。",
            "シャワーヘッドは機能的なものをご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type3",
          show: [],
        },
        {
          name: "bodyShower",
          name2: "ボディシャワー",
          msg0: [],
          msg: [
            "全身にくまなくお湯を当ててくれるボディシャワーを利用することで、忙しい時のシャワーだけでもしっかりと体を温めることができます。",
            "通常のシャワーに加えて、ボディシャワーの設置もご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "barrierFree",
          name2: "バリアフリー",
          msg0: [],
          msg: [
            "浴室で不意の事故がおきないよう、年配の方でも安全に入浴できるお風呂を希望される方が増えています。",
            "段差の解消や手すりの設置など、バリアフリーなお風呂を希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "wallCabinet",
          name2: "壁面棚",
          msg0: [],
          msg: ["洗い場のカウンターや、小物収納ができる壁面棚を希望しますか？"],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type1",
          show: [],
        },
        {
          name: "mistSauna",
          name2: "ミストサウナ",
          msg0: [],
          msg: [
            "ミストサウナとは、室内に蒸気をたっぷり充満させてじんわり体を温めるサウナです。室内の温度が40～60度ほどなので、設備さえあれば自宅の浴室でも楽しむことができます。",
            "お風呂にミストサウナの設置を希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "floorHeating",
          name2: "床暖房",
          msg0: [],
          msg: [
            "床暖房機能があると、浴室の床が乾きやすくなり、カビやぬめりの発生を防ぐことができます。また、冬場のヒートショックを防ぐ効果もあります。",
            "床暖房の設置はご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "autoWash",
          name2: "自動洗浄のついた浴槽",
          msg0: ["つぎに、入浴以外でのお風呂の活用について、お伺いします。"],
          msg: [
            "掃除の手間を減らすため、入浴後、自動で浴槽を洗浄してくれる機能があります。",
            "自動洗浄のついた浴槽をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type3",
          show: [],
        },
        {
          name: "removeBacteria",
          name2: "入浴後の除菌機能",
          msg0: [],
          msg: [
            "浴室の掃除の負担をへらすため、入浴後、床を水流で自動洗浄し、除菌する機能があります。",
            "掃除の負担をへらすために、この機能をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "bathroomDryer",
          name2: "浴室乾燥機",
          msg0: [],
          msg: [
            "浴室乾燥機能があると、天候や季節、花粉などを気にせずに、浴室で洗濯物を乾かすことができます。暖房とセットのため、冬場のヒートショックを防ぐ効果もあります。",
            "浴室乾燥機をご希望されますか？",
          ],
          options: ["はい", "興味がある", "いいえ"],
          selected: [],
          type: "type2",
          show: [],
        },
        {
          name: "currentType",
          name2: "今のお風呂の形式",
          msg0: ["今のお風呂の状況によって、工事費用が変わってきます。"],
          msg: ["今のお風呂は、どのようなつくりになっていますか？"],
          options: ["ユニットバス", "タイル貼り", "わからない"],
          selected: [],
          type: "type4",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "yearOfUse",
          name2: "使用年数",
          msg0: [],
          msg: ["ご使用年数は、どのくらいですか？"],
          options: ["1~10年", "10~20年", "20年~", "0年(購入前)"],
          selected: [],
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "window",
          name2: "浴室に窓",
          msg0: [],
          msg: ["浴室に窓はありますか？"],
          options: ["ある", "ない"],
          selected: [],
          type: "type1",
          current: "true",
          show: [],
        },
        {
          name: "placeOfFan",
          name2: "換気扇の場所",
          msg0: [],
          msg: ["換気扇は、どこについていますか？"],
          options: ["天井", "窓"],
          selected: [],
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "constPeriod",
          name2: "工事の時期",
          msg0: [],
          msg: ["工事の時期はお決まりですか？"],
          options: ["1~10年", "10~20年", "20年~", "0年(購入前)"],
          selected: [],
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "budget",
          name2: "予算",
          msg0: [],
          msg: ["予算はいくらですか？"],
          options: ["50万円未満", "50~80万円", "80~150万円", "150万円以上"],
          selected: [],
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "estimate",
          name2: "見積もり",
          msg0: [],
          msg: ["見積もりはお持ちですか？"],
          options: ["持っていない", "1社", "2社", "3社以上"],
          selected: [],
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "address",
          name2: "物件の場所",
          msg0: [],
          msg: ["物件の場所はどちらになりますか？"],
          options: [
            "北海道・東北",
            "関東",
            "北陸・甲信越",
            "関西",
            "中国",
            "四国",
          ],
          optionsA: [
            "北海道",
            "青森県",
            "岩手県",
            "宮城県",
            "秋田県",
            "山形県",
          ],
          optionsB: [
            "茨城県",
            "栃木県",
            "群馬県",
            "千葉県",
            "東京都",
            "神奈川県",
          ],
          optionsC: [
            "新潟県",
            "富山県",
            "石川県",
            "福井県",
            "山梨県",
            "長野県",
            "新潟県",
          ],
          optionsD: [
            "大阪府",
            "京都府",
            "兵庫県",
            "奈良県",
            "滋賀県",
            "和歌山県",
          ],
          optionsE: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
          optionsF: ["愛媛県", "香川県", "高知県", "徳島県"],
          selected: [],
          type: "type1",
          answerType: "need",
          branch: true,
          current: "true",
          show: [],
        },
        {
          name: "contractor",
          name2: "リフォーム会社決まっているか",
          msg0: [
            "31個の入力ありがとうございました。",
            "最後になりますが、補助金が出るか確認いたします。",
          ],
          msg: [
            "国の補助金事業「長期優良住宅化リフォーム推進事業」によって、補助金が出る場合があります。",
            "リフォーム会社はすでにお決まりですか？",
          ],
          options: ["はい", "いいえ"],
          selected: [],
          type: "type3",
          current: "true",
          show: [],
        },
        {
          name: "nursingCare",
          name2: "家族に要支援または要介護認定",
          msg0: [],
          msg: [
            "介護保険を利用した補助金があります。",
            "要支援または要介護認定されている方は、ご家族にいらっしゃいますか？",
          ],
          options: ["はい", "いいえ"],
          selected: [],
          type: "type1",
          current: "true",
          show: [],
        },
        // はい
        {
          name: "municipalities",
          name2: "市区町村",
          msg0: [],
          msg: [
            "市区町村によって補助金が出る可能性があります。市区町村はどちらになりますか？",
          ],
          options: [],
          selected: "",
          type: "type1",
          current: "true",
          show: [],
        },
        {
          name: "telNumber",
          name2: "電話番号（ショートメッセージ）",
          msg0: [
            "ご回答ありがとうございました。56分30秒ほどかかりましたが、あと少しです。",
            "現在、いただいた条件にて私の方で急ぎ算定しております。あと30秒ほどで結果を送付しますので、送付先の入力をお願いします。",
          ],
          msg: ["算定完了しました。送付先の入力をお願いします。"],
          selected: [],
          type: "type3",
          current: "true",
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
    // this.interValFunc(push, 2, 1);
    this.timerFunc(push, 1);
    this.timerFunc(push, 3);
    this.timerFunc(pushT, 5);
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
        this.timerFunc(pushTa, 3);
        this.timerFunc(pushTa, 5);
        setTimeout(() => {
          this.interValFunc(pushTa, 4, 1);
        }, 600);
        // ２つ目の選択肢
        this.newList.push(this.list[1]);
        setTimeout(() => {
          this.showFunc(this.list[1]);
        }, 900);
      }
      if (e.target.dataset.opt === "ざっくり計算") {
        this.list[0].selected = "ざっくり計算です";
        this.firstOpt[0] = false;
        this.timerFunc(pushT, 1);
        this.timerFunc(pushTb, 3);
        this.timerFunc(pushTb, 5);
        // ２つ目の選択肢
        this.newList.push(this.list[1]);
        setTimeout(() => {
          this.showFunc(this.list[1]);
        }, 400);
      }
    },

    // 順番表示の関数
    showFunc: function (list) {
      let pushF = () => list.show.push(false);
      let pushTF = () => list.show.push(true, false);
      let pushT = () => list.show.push(true);

      // メッセージが一つの場合
      if (list.type === "type1") {
        pushF();
        pushF();
        this.timerFunc(pushTF, 3);
        this.timerFunc(pushT, 5);
        setTimeout(() => {
          this.optScroll(list)
        }, 500);
      }
      // メッセージが二つの場合
      if (list.type === "type2") {
        pushF();
        pushF();
        this.timerFunc(pushT, 3);
        this.timerFunc(pushT, 5);
        this.timerFunc(pushT, 7);
        setTimeout(() => {
          this.optScroll(list)
        }, 700);
      }
      // メッセージが一つ + 二つの場合
      if (list.type === "type3") {
        this.timerFunc(pushTF, 3);
        setTimeout(() => {
          this.msgScroll(list)
        }, 500);
        this.timerFunc(pushT, 5);
        this.timerFunc(pushT, 7);
        this.timerFunc(pushT, 9);
        setTimeout(() => {
          this.optScroll(list)
        }, 900);
      }
      // メッセージが一つ + 一つの場合
      if (list.type === "type4") {
        this.timerFunc(pushTF, 3);
        setTimeout(() => {
          this.msgScroll(list)
        }, 500);
        this.timerFunc(pushTF, 5);
        this.timerFunc(pushT, 7);
        setTimeout(() => {
          this.optScroll(list)
        }, 700);
      }
    },

    // 選択肢クリック後
    selectFunc: function (e) {
      // データに格納している名前から配列が何番目かを特定
      let name = e.target.dataset.name;
      let num;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === name) {
          num = i;
        }
      }
      let list = this.list[num];
      // 選択肢を非表示
      list.show[4] = false;
      // 選択したデータをselectedに格納
      if (list.answerType === "need") {
        list.selected = e.target.dataset.opt + "です";
      } else {
        list.selected = e.target.dataset.opt;
      }
      // 回答メッセージ表示
      list.show[5] = true;
      //次のの選択肢表示
      if (num < this.list.length) {
        this.newList.push(this.list[num + 1]);
        this.showFunc(this.list[num + 1]);
      }
    },

    // スクロール関数
    msgScroll: function (list) {
      // メッセージ
      let elm = document.querySelector(`[data-scr1="${list.name}"]`);
      let h = elm.getBoundingClientRect().top - 10
      scrollBy({ top: h, behavior: "smooth" });
    },
    optScroll: function (list) {
      // 選択肢
      // 一番上に移動する要素取得
      let elm = document.querySelector(`[data-scr2="${list.name}"]`);
      let h = elm.getBoundingClientRect().top - 10
      scrollBy({ top: h, behavior: "smooth" });
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
