Vue.component('chat-message', {
    props: [' message '],
    template: `
            <div v-if="area" class="chat-message">
                <div>
                    <p v-if="load">
                        <span class="loading-icon">
                            <span class="loading-circle1"></span>
                            <span class="loading-circle2"></span>
                            <span class="loading-circle3"></span>
                        </span>
                    </p>
                    <p v-if="msg">{{ message }}</p>
                </div>
                <span class="chat-message-before"></span>
            </div>
    `,
    data: function() {
      return: {
        area: false,
        load: false,
        msg: false
      }
    },
    created: function() {
      // chatメッセージ順番表示
      setTimeout(() => {
        this.area = true
        this.load = true
      }, 1000);
      setTimeout(() => {
        this.load = false
        this.msg = true
      }, 2000);
    }
  })



    // 選択肢表示
    // showSelect: function (opt1, opt2) {},

  
  // ローディング後にmessage表示
  // showMsg: function () {
  //   setTimeout(() => {
  //     area = true
  //     load = true
  //   }, 1000);
  //   setTimeout(() => {
  //     msg = true
  //   }, 1500);
  // },
  // true false で表示/非表示
  // load t → load f, chat t の繰り返し

// ひとつ前が表示されてたら表示
  // if (msg[i - 1].continue === true) {
    // this.img = true
  // }
