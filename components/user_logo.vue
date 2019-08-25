<template>
  <div>
    <div class="outer">
    <img src="/static/accepted.svg" class="accepted" v-if="accepted">
      <div class="first" v-if="attendFirstDay">
        1
      </div>
      <div class="second" v-if="attendSecondDay">
        2
      </div>
      <div class="abroad" v-if="abroad">
        海外
      </div>
      <div class="name">
        {{handleName}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    "handleName": {
      type: String,
      default: "当日受付"
    },
    "attendFirstDay": {},
    "attendSecondDay": {},
    "abroad": {},
    "accepted": {}
  },
  computed: {
  },
}
</script>
<style scoped>
.outer{
  height: 200px;
  width: 560px;
  position: relative;
  border-style: solid;
  border-color: #404040;
  color: #404040;
  border-radius: 24px;
}
.name{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  bottom: -4px;
}
.first, .second, .abroad, .accepted{
  position: absolute;
}
.first, .second, .abroad{
  font-weight: bold;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  border: solid;
  border-width: 0.175rem;
  background-color: #fff0f0;
  top: 8px;
  font-size: 24px;
}
.abroad {
  width: 96px;
  border-color: #00f;
}
.first, .second{
  border-color: #0a0;
}
.first {
  left: 8px;
}
.second{
  left: 60px;
}
.abroad{
  left: 112px;
}
.accepted{
  right: -28px;
  top: -20px;
  width: 240px;
  height: auto;
  transform: rotate(20deg);
}
</style>
