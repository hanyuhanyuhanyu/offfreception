<template>
  <div class="container fill vertical">
    <div>
      <input v-model="input" ref="inp" autofocus>
    </div>
    <transition name="fade">
      <UserLogo v-if="lastResult" v-bind="lastResult" />
    </transition>
    <Operation
      v-bind="labelForKeys"
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
        user: {},
        componentType: "",
        firstDay: false,
        secondDay: false,
      },
      lastResult: null,
      labelForKeys: {
        "whenEnter": null,
        "whenSpace": null,
        "whenEscape": "リセット"
      },
    }
  },
  mounted() {
    document.addEventListener("keyup", e => {
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
      this.setting.firstDay = !this.setting.firstDay
    },
    Digit2(){
      this.setting.secondDay = !this.setting.secondDay
    },
    async Enter(e){
      if(!e.ctrlKey){
        await this.Space(e)
        return
      }
      console.log("enter accepted")
      await this[this.enter.func](...this.enter.args)
    },
    Escape(){
      this.init()
    },
    init(){
      this.messaging = false 
      this.showMessage = false
      this.message = ""
      this.input = ""
      this.enter = enterInitial
      this.setting.firstDay = false
      this.setting.secondDay = false
      this.lastResult = null
      this.labelForKeys = {
        "whenEnter": null,
        "whenSpace": null,
        "whenEscape": "リセット"
      }
      this.focus()
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
        "whenEnter": "確認画面へ",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    checkForNewReception(data){
      const {firstDay, secondDay} = this.setting
      const price = firstDay * 1500 + secondDay * 3500
      this.enter.func = "markAsAccepted"
      this.enter.args = [data, {attendFirstDay: firstDay, attendSecondDay: secondDay}]
      this.labelForKeys = {
        "whenEnter": "金額が正しいことを確認して受け付ける",
        "whenSpace": null,
        "whenEscape": "最初の画面へ"
      }
    },
    async markAsAccepted(data, params = {}){
      const {isError} = await this.$axios.$post(baseUrl + "/accept/" + data.id, params)
      this.lastResult = null
    },
    toggle(target){
      this.setting[target] = !this.setting[target]
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
</style>
