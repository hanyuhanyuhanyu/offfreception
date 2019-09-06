<template>
  <div class="container fill vertical">
    <div>
      <input :style="inputStyle" v-model="input" ref="inp" autofocus>
    </div>
      <PaymentInfo
        v-if="needPay"
        :price="payment"
      />
      <AcceptedList 
        class="accepted-list"
        :list="acceptedList"
      />
    <transition name="fade">
      <UserLogo v-if="lastResult" v-bind="lastResult" />
    </transition>
    <Operation
      v-bind="labelForKeys"
      @keyPushEmulation="keyPushEmulation($event)"
    />
  </div>
</template>

<script>
import UserLogo from "~/components/user_logo.vue"
import Operation from "~/components/operation.vue"
import Received from "~/components/users/received.vue"
import Alien from "~/components/users/alien.vue"
import Notyet from "~/components/users/notyet.vue"
import Fortoday from "~/components/users/fortoday.vue"
import PaymentInfo from "~/components/payment.vue"
import AcceptedList from "~/components/accepted_list.vue"
const port = 3000
const baseUrl = `http://localhost:${port}`
const enterInitial = {func: "init", args: []}

export default {
  components: {
    UserLogo,
    Operation,
    Received,
    Alien,
    Notyet,
    Fortoday,
    PaymentInfo,
    AcceptedList,
  },
  data() {
    return {
      input: "",
      got: "",
      showMessage: false,
      messaging: false,
      message: "",
      user: {},
      enter: enterInitial,
      setting: {
        user: null,
        componentType: "",
        firstDay: false,
        secondDay: false,
      },
      lastResult: false,
      locked: false,
      acceptedList: [],
      labelForKeys: {
        "whenEnter": null,
        "whenSpace": null,
        "whenEscape": "リセット"
      },
      enterJobs: [],
    }
  },
  mounted() {
    document.addEventListener("keyup", e => {
      console.log(e.code)
      const func = this[e.code]
      if(typeof func === "function"){
        func(e)
      }
    })
    const letItFocus = () => {
      if(this.messaging){
        return
      }
      this.$refs.inp.focus()
    }
    this.$refs.inp.addEventListener('focusout', letItFocus)
    this.$refs.inp.addEventListener('mousedown', letItFocus)
    this.$refs.inp.addEventListener('focusin', () => {
      if(this.messaging){
        this.$refs.inp.blur()
      }
    })
  },
  methods: {
    keyPushEmulation(ev){
      (this[ev.code] || (() => 0))()
    },
    focus(){
      this.$refs.inp.focus()
    },
    async Space(e){
      if(this.messaging){
        return
      }
      //入力を探しに行く
      const lastResult = await this.search(this.input.trim())
      this.lastResult = lastResult.args[0]
      if(!lastResult) {
        //ダメなら初期化処理
        this.init()
        this.showMessage = true
        this.message = "与えられた入力に一致するものがありませんでした"
        return
      }
      this.messaging = true
      this.$refs.inp.blur()
      this.setting.componentType = lastResult.func
      this[lastResult.func](...(lastResult.args))
      //未承認
      //承認済み
      //現生払え
    },
    Digit1(){
      if(this.setting.user && !this.locked){
        this.setting.user.attendFirstDay = !this.setting.user.attendFirstDay
      }
    },
    Digit2(){
      if(this.setting.user && !this.locked){
        this.setting.user.attendSecondDay = !this.setting.user.attendSecondDay
      }
    },
    async Enter(e){
      if(!e.ctrlKey){
        if(this.messaging){
          return
        }
        //入力を探しに行く
        const lastResult = await this.search(this.input.trim())
        this.lastResult = lastResult.args[0]
        if(!lastResult) {
          //ダメなら初期化処理
          this.init()
          this.showMessage = true
          this.message = "与えられた入力に一致するものがありませんでした"
          return
        }
        this.messaging = true
        this.$refs.inp.blur()
        this.setting.componentType = lastResult.func
        this[lastResult.func](...(lastResult.args))
        //未承認
        //承認済み
        //現生払え
        return
      }
      console.log("enter accepted")
      this[this.enter.func](...this.enter.args)
    },
    Escape(){
      this.init()
    },
    state(){
    },
    init(){
      this.locked=false
      this.messaging = false 
      this.showMessage = false
      this.message = ""
      this.input = ""
      this.enter = enterInitial
      this.setting = {
        user: null,
        componentType: "",
        firstDay: false,
        secondDay: false,
      }
      this.lastResult = false
      this.labelForKeys = {
        "whenEnter": null,
        "whenSpace": null,
        "whenEscape": "リセット"
      }
      this.$nextTick(() => this.focus())
    },
    async search(input){
      const data = await this.$axios.$get(baseUrl + "/fetch/" + input)
      if(!data){
        return false
      }
      this.setting.user = data
      this.showMessage = true
      const ret = {func: "notyet", args: [data]}
      if(data.accepted){
        ret.func = "received"
      } else if(data.forToday){
        ret.func = "fortoday"
      } else if(data.abroad){
        ret.func = "abroad"
      }
      return ret
    },
    notyet(data){
      this.enter.func = "markAsAccepted"
      this.enter.args = [data]
      this.labelForKeys = {
        "whenEnter": "受け付ける",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    received(){
      this.labelForKeys = {
        "whenEnter": null,
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    abroad(data){
      this.enter.func = "markAsAccepted"
      this.enter.args = [data]
      this.labelForKeys = {
        "whenEnter": "受け付ける",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    fortoday(data){
      this.enter.func = "checkForNewReception"
      this.enter.args = [data]
      this.labelForKeys = {
        "when1": "1日目参加の切り替え",
        "when2": "2日目参加の切り替え",
        "whenEnter": "確認画面へ",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    checkForNewReception(data){
      if(this.payment < 1){
        return
      }
      const {attendFirstDay, attendSecondDay} = this.setting.user
      this.locked =  true
      this.enter.func = "markAsAccepted"
      this.enter.args = [this.setting.user, {attendFirstDay, attendSecondDay}]
      this.labelForKeys = {
        "whenEnter": "金額が正しいことを確認して受け付ける",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    async markAsAccepted(data, params = {}){
      const {isError} = await this.$axios.$post(baseUrl + "/accept/" + data.id, params)
      this.acceptedList.push(this.setting.user)
      if(this.acceptedList.length > 20){
        this.acceptedList.splice(20)
      }
      this.lastResult = false
      this.init()
    },
    toggle(target){
      this.setting[target] = !this.setting[target]
    }
  },
  computed: {
    needPay: function(){
      if(!this.lastResult){
        return false
      }
      return this.lastResult.abroad || this.lastResult.forToday
    },
    payment: function(){
      if(!this.setting.user){
        return 0
      }
      if(this.setting.user.forToday){
        return this.setting.user.attendFirstDay * 1500 + this.lastResult.attendSecondDay * 3500
      }
      return this.setting.user.attendFirstDay * 1000 + this.lastResult.attendSecondDay * 3000
    },
    inputStyle: function(){
      let display = 'inline-block'
      if(this.lastResult){
        display='none'
      }
      return {display}
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.fill{
  height: 100%;
  width: 100%;
}
.vertical{
  flex-direction: column;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.accepted-list{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
