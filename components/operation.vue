<template>
  <div class="overall">
    <div class="operation">
      できる操作
    </div>
    <div class="clm">
      <div class="wrap" @click="$emit('keyPushEmulation',{code: 'Enter', ctrlKey: true})" v-if="whenEnter">
        <div class="btn" style="background-color: #d02a2a; color: #fafafa">
          Ctrl + Enter
        </div>
        <div class="ope">
            {{whenEnter}}
        </div>
      </div>
      <div class="wrap" @click="$emit('keyPushEmulation',{code: 'Escape'})" v-if="whenEscape">
        <div class="btn" style="background-color: #1aca1a">
          Esc
        </div>
        <div class="ope">
            {{whenEscape}}
        </div>
      </div>
    </div>
    <div class="clm">
      <div class="wrap" @click="$emit('keyPushEmulation',{code:  'Digit1'})" v-if="when1">
        <div class="btn" style="background-color: #eaea10">
          1(数字)
        </div>
        <div class="ope">
            {{when1}}
        </div>
      </div>
      <div class="wrap" @click="$emit('keyPushEmulation',{code:  'Digit2'})" v-if="when2">
        <div class="btn" style="background-color: #eaea10">
          2(数字)
        </div>
        <div class="ope">
            {{when2}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    "extraOperation": {},
    "when1": {},
    "when2": {},
    "whenEnter": {},
    "whenSpace": {},
    "whenEscape": {},
  },
}
</script>
<style>
.btn{
  border: solid 1.5px;
  border-radius: 10px;
  border-color: #404040;
  padding-left: 8px;
  padding-right: 8px;
}
.wrap{
  display:flex;
  border-color: #404040;
  justify-content: start;
}
.wrap > *{
  font-size: 1.1rem;
  margin: 6px;
  font-weight: bold;
}
.overall{
  position: relative;
  display: flex;
  background-color: #f5f5f5;
  margin-top: 20px;
  border:solid 2px #404040;
  padding: 16px;
  color: #2a2a2a;
  padding-top: 53px;
  border-radius: 20px;
}
.operation{
  border-color: #404040;
  position: absolute;
  border-right: solid 2px #404040;
  border-bottom: solid 2px #404040;
  font-size: 1.3rem;
  left: 0;
  padding: 2px 6px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  top: 0;
  background-color: #dadada;
  font-weight: bold;
}
.clm{
  border-color: #404040;
  display: flex;
  flex-direction: column;
}
</style>
