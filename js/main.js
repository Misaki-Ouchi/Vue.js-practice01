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
          }, 1000);
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
          }, 1000);
          setTimeout(() => {
            this.read = true;
          }, 2000);
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
      // type: type4 // msg1 + msg1 + select
      // type: type5 // msg2 + msg2 + select
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
          type: "type2",
          show: [],
        },
        {
          name: "wallCabinet",
          name2: "壁面棚",
          msg0: [],
          msg: ["洗い場のカウンターや、小物収納ができる壁面棚を希望しますか？"],
          options: ["はい", "興味がある", "いいえ"],
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
          type: "type2",
          show: [],
        },
        {
          name: "currentType",
          name2: "今のお風呂の形式",
          msg0: ["今のお風呂の状況によって、工事費用が変わってきます。"],
          msg: ["今のお風呂は、どのようなつくりになっていますか？"],
          options: ["ユニットバス", "タイル貼り", "わからない"],
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
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
          selected: "",
          type: "type1",
          answerType: "need",
          current: "true",
          show: [],
        },
        {
          name: "prefecture",
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
          selected: "",
          type: "type1",
          answerType: "need",
          branch: "pref",
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
          selected: "",
          type: "type5",
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
          selected: "",
          type: "type2",
          current: "true",
          show: [],
        },
        {
          name: "city",
          name2: "市区町村",
          msg0: [],
          msg: [
            "市区町村によって補助金が出る可能性があります。市区町村はどちらになりますか？",
          ],
          options: [],
          selected: "",
          type: "type1",
          answerType: "need",
          branch: "city",
          current: "true",
          show: [],
          cityShow: false,
        },
      ],
      lastMsg: {
        name: "lastMsg",
        msg0: [
          "56分30秒",
          "現在、いただいた条件にて私の方で急ぎ算定しております。あと30秒ほどで結果を送付しますので、送付先の入力をお願いします。",
        ],
        msg: ["算定完了しました。送付先の入力をお願いします。"],
        show: [],
      },
      prefCode: [
        { code: 1, name: "北海道" },
        { code: 2, name: "青森県" },
        { code: 3, name: "岩手県" },
        { code: 4, name: "宮城県" },
        { code: 5, name: "秋田県" },
        { code: 6, name: "山形県" },
        { code: 7, name: "福島県" },
        { code: 8, name: "茨城県" },
        { code: 9, name: "栃木県" },
        { code: 10, name: "群馬県" },
        { code: 11, name: "埼玉県" },
        { code: 12, name: "千葉県" },
        { code: 13, name: "東京都" },
        { code: 14, name: "神奈川県" },
        { code: 15, name: "新潟県" },
        { code: 16, name: "富山県" },
        { code: 17, name: "石川県" },
        { code: 18, name: "福井県" },
        { code: 19, name: "山梨県" },
        { code: 20, name: "長野県" },
        { code: 21, name: "岐阜県" },
        { code: 22, name: "静岡県" },
        { code: 23, name: "愛知県" },
        { code: 24, name: "三重県" },
        { code: 25, name: "滋賀県" },
        { code: 26, name: "京都府" },
        { code: 27, name: "大阪府" },
        { code: 28, name: "兵庫県" },
        { code: 29, name: "奈良県" },
        { code: 30, name: "和歌山県" },
        { code: 31, name: "鳥取県" },
        { code: 32, name: "島根県" },
        { code: 33, name: "岡山県" },
        { code: 34, name: "広島県" },
        { code: 35, name: "山口県" },
        { code: 36, name: "徳島県" },
        { code: 37, name: "香川県" },
        { code: 38, name: "愛媛県" },
        { code: 39, name: "高知県" },
        { code: 40, name: "福岡県" },
        { code: 41, name: "佐賀県" },
        { code: 42, name: "長崎県" },
        { code: 43, name: "熊本県" },
        { code: 44, name: "大分県" },
        { code: 45, name: "宮崎県" },
        { code: 46, name: "鹿児島県" },
        { code: 47, name: "沖縄県" },
      ],
      cityList: [], // 市区町村用リスト

      newList: [], // 表示用リスト
      firstOpt: [], // しっかり/ざっくりのtrue/false格納リスト
      firstOptA: [], // しっかり計算表示用リスト
      firstOptB: [], // ざっくり計算表示用リスト
      prefList: [], // 都道府県選択用リスト
      prefShow: false, // 都道府県表示
      prefValue: "", // 都道府県名
      telInput: "", // 入力した電話番号
      telErrorText: "", // 電話番号エラーメッセージ
      submitDisabled: true, // フォーム送信ボタンの状態
      formErrorText: "", // フォーム送信ボタンの状態
    };
  },
  created: function () {
    let push = () => this.list[0].show.push(true);
    let pushT = () => this.firstOpt.push(true);
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
        }, 6000);
        // ２つ目の選択肢
        this.newList.push(this.list[1]);
        setTimeout(() => {
          this.showFunc(this.list[1]);
        }, 9000);
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
        }, 4000);
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
        // 市区町村選択の場合
        if (list.name === "city") {
          setTimeout(() => {
            this.getCityData();
            list.cityShow = true;
          }, 5000);
        } else {
          this.timerFunc(pushT, 5);
        }
        setTimeout(() => {
          this.optScroll(list);
        }, 5000);
      }
      // メッセージが二つの場合
      if (list.type === "type2") {
        pushF();
        pushF();
        this.timerFunc(pushT, 3);
        this.timerFunc(pushT, 5);
        this.timerFunc(pushT, 7);
        setTimeout(() => {
          this.optScroll(list);
        }, 7000);
      }
      // メッセージが一つ + 二つの場合
      if (list.type === "type3") {
        this.timerFunc(pushTF, 3);
        setTimeout(() => {
          this.msgScroll(list);
        }, 5000);
        this.timerFunc(pushT, 5);
        this.timerFunc(pushT, 7);
        this.timerFunc(pushT, 9);
        setTimeout(() => {
          this.optScroll(list);
        }, 9000);
      }
      // メッセージが一つ + 一つの場合
      if (list.type === "type4") {
        this.timerFunc(pushTF, 3);
        setTimeout(() => {
          this.msgScroll(list);
        }, 5000);
        this.timerFunc(pushTF, 5);
        this.timerFunc(pushT, 7);
        setTimeout(() => {
          this.optScroll(list);
        }, 7000);
      }
      // メッセージが二つ + 二つの場合
      if (list.type === "type5") {
        this.timerFunc(pushT, 3);
        this.timerFunc(pushT, 5);
        this.timerFunc(pushT, 7);
        setTimeout(() => {
          this.msgScroll(list);
        }, 7000);
        this.timerFunc(pushT, 9);
        this.timerFunc(pushT, 11);
        setTimeout(() => {
          this.optScroll(list);
        }, 9000);
      }
    },

    // 選択肢クリック後
    selectFunc: function (e) {
      // データに格納している名前から配列が何番目かを特定
      let num = this.getListFunc(e);
      let list = this.list[num];
      // 選択された値
      let value = e.target.dataset.opt;
      // 選択肢を非表示
      list.show[4] = false;
      // 都道府県選択の場合
      if (list.branch === "pref") {
        if (value === "北海道・東北") {
          this.prefList = list.optionsA;
        }
        if (value === "関東") {
          this.prefList = list.optionsB;
        }
        if (value === "北陸・甲信越") {
          this.prefList = list.optionsC;
        }
        if (value === "関西") {
          this.prefList = list.optionsD;
        }
        if (value === "中国") {
          this.prefList = list.optionsE;
        }
        if (value === "四国") {
          this.prefList = list.optionsF;
        }
        // 詳細選択肢表示
        this.prefShow = true;
      } else {
        // 選択したデータをselectedに格納
        if (list.answerType === "need") {
          list.selected = value + "です";
        } else {
          list.selected = value;
        }
        // 回答メッセージ表示
        list.show[5] = true;
        //次の選択肢表示
        if (num < this.list.length) {
          this.newList.push(this.list[num + 1]);
          this.showFunc(this.list[num + 1]);
        }
      }
    },
    // 都道府県選択
    prefClick: function (e) {
      // データに格納している名前から配列が何番目かを特定
      let num = this.getListFunc(e);
      let list = this.list[num];
      // 選択された値
      this.prefValue = e.target.dataset.opt;
      // 選択したデータをselectedに格納
      list.selected = this.prefValue + "です";
      // 詳細選択肢非表示
      this.prefShow = false;
      // 回答メッセージ表示
      list.show[5] = true;
      //次の選択肢表示
      this.newList.push(this.list[num + 1]);
      this.showFunc(this.list[num + 1]);
    },
    // 市区町村データ格納
    getCityData: async function () {
      // 都道府県コード取得
      let num;
      for (let i = 0; i < this.prefCode.length; i++) {
        if (this.prefCode[i]["name"] === this.prefValue) {
          num = i;
        }
      }
      let code = this.prefCode[num]["code"];
      if (code < 10) {
        code = "0" + code; // 一桁の場合、前に0
      }
      // 該当する市区町村データ取得
      let res = await fetch(
        `https://www.land.mlit.go.jp/webland/api/CitySearch?area=${code}`
      );
      let data = await res.json();
      let lists = data["data"];
      // 50音順に並べ替え
      lists.sort((a, b) => {
        return a["name"].localeCompare(b["name"], "ja");
      });
      // リストに格納
      this.cityList = lists;
    },
    // 市区町村選択
    cityFunc: function (e) {
      // データに格納している名前から配列が何番目かを特定
      let num = this.getListFunc(e);
      let list = this.list[num];
      // 選択された値
      let value = e.target.dataset.opt;
      // 選択肢を非表示
      list.cityShow = false;
      // 選択したデータをselectedに格納
      if (list.answerType === "need") {
        list.selected = value + "です";
      } else {
        list.selected = value;
      }
      // 回答メッセージ表示
      list.show[5] = true;
      // 最後のメッセージ表示
      let pushT = () => this.lastMsg.show.push(true);
      this.timerFunc(pushT, 3);
      this.timerFunc(pushT, 5);
      this.timerFunc(pushT, 7);
      setTimeout(() => {
        this.msgScroll(this.lastMsg);
      }, 9000);
      this.timerFunc(pushT, 9);
      this.timerFunc(pushT, 11);
    },
    // 電話番号バリデーション
    telCheck: function () {
      if (!this.telInput.match(/^0\d{9,10}$/)) {
        this.telErrorText = "電話番号を入力してください";
        this.submitDisabled = true
      } else {
        this.telErrorText = "";
        this.submitDisabled = false
      }
    },
    checkForm: function (e) {
      this.formErrorText = "この電話番号は登録済みです"
      event.stopPropagation()
      event.preventDefault()
    },

    // データに格納している名前から配列が何番目かを特定
    getListFunc: function (e) {
      let name = e.target.dataset.name;
      let num;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name === name) {
          num = i;
        }
      }
      return num;
    },

    // スクロール関数
    msgScroll: function (list) {
      // メッセージ
      // 一番上に移動する要素取得
      let elm = document.querySelector(`[data-scr1="${list.name}"]`);
      let h = elm.getBoundingClientRect().top - 10;
      scrollBy({ top: h, behavior: "smooth" });
    },
    optScroll: function (list) {
      // 選択肢
      // 一番上に移動する要素取得
      let elm = document.querySelector(`[data-scr2="${list.name}"]`);
      let h = elm.getBoundingClientRect().top - 10;
      scrollBy({ top: h, behavior: "smooth" });
    },

    // タイマー関数（実行関数、秒数）
    timerFunc: function (func, waitSeconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(func());
        }, waitSeconds * 1000);
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
      }, seconds * 1000);
    },
  },
}).mount("#app");
