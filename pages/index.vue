<template>
  <div class="container fill vertical">
    <div>
      <input v-model="input" ref="inp" autofocus>
    </div>
    <div>
      <span v-if="showMessage">
        {{message}}
      </span>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      input: "",
      got: "",
      showMessage: false,
      messaging: false,
      message: "",
    }
  },
  mounted() {
    document.addEventListener("keyup", e => {
      const func = this[e.code]
      console.log(e.code)
      if(typeof func === "function"){
        func(e)
      }
    })
    this.$refs.inp.addEventListener('focusout', () => {
      if(this.messaging){
        return
      }
      this.$refs.inp.focus()
    })
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
    Space(e){
      if(this.messaging){
        return
      }
      //入力を探しに行く
      console.log(this.input)
      const lastResult = this.search(this.input.trim())
      if(!lastResult) {
        //ダメなら初期化処理
        this.init()
        this.showMessage = true
        this.message = "与えられた入力に一致するものがありませんでした"
        return
      }
      this.messaging = true
      this.$refs.inp.blur()
      this[lastResult.func]()
      //未承認
      //承認済み
      //現生払え
    },
    Escape(){
      this.init()
    },
    init(){
      this.messaging = false 
      this.showMessage = false
      this.message = ""
      this.input = ""
      this.focus()
    },
    search(input){
      switch(input){
        case "notyet":
          return {func: "notyet"}
        case "received":
          return {func: "received"}
        case "abroad":
          return {func: "abroad"}
      }
      return false
    },
    notyet(){
      this.showMessage = true
      this.message = "まだ受け付けていません"
    },
    received(){
      this.showMessage = true
      this.message = "既に受付済みです"
    },
    abroad(){
      this.showMessage = true
      this.message = "海外の方です"
    },
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
</style>
