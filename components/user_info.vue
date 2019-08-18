<template>
  <div>
    <component
      :is="componentType.replace(/^./, m => m.toUpperCase())"
      v-bind="setting"
      @toggle="toggle"
    />
    {{receptionStatusString}}
    {{abroadStatusString}}
    ハンドルネーム:{{this.user.handleName}}
    一日目:{{this.user.attendFirstDay ? "参加" : "X"}}
    二日目;{{this.user.attendSecondDay ? "参加" : "X"}}
    事前参加費:{{payPre}}
    当日参加費:{{payForHere}}
  </div>
</template>
<script>
import Received from "~/components/users/received.vue"
import Alien from "~/components/users/alien.vue"
import Notyet from "~/components/users/notyet.vue"
import Fortoday from "~/components/users/fortoday.vue"
export default {
  components: {
    Received,
    Alien,
    Notyet,
    Fortoday,
  },
  props: ["user", "componentType", "firstDay", "secondDay", "setting"],
  methods:{
    toggle(target){
      this.$emit("toggle", target)
    }
  },
  computed: {
    payForHere(){
      return this.user.attendFirstDay * 1500 + this.user.attendSecondDay * 3500
    },
    payPre(){
      return this.user.attendFirstDay * 1000 + this.user.attendSecondDay * 3000
    },
    receptionStatusString(){
      return this.user.accepted ? "受付済み" : "まだ受け付けていません"
    },
    abroadStatusString(){
      return this.user.abroad ? "海外の方です" : "日本人です"
    },
  },
}
</script>
