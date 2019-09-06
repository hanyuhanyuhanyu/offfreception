<template>
  <ul class="lst">
    <div style="height: 80px; top: 0; left: 0; font-size: 2rem; vertical-align: middle; display: flex; align-items: center;">
      受付履歴
    </div>
    <li style="position: relative" v-for="usr in list">
      {{usr.handleName}}
    </li>
  </ul>
</template>

<script>
export default{
  props: {
    list: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style>
.lst {
  width: 320px;
  text-align: left;
}
li {
  list-style-type: none;
  left: 0;
}
</style>
