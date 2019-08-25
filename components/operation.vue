<template>
  <div>
    <div v-if="extraOperation">
    </div>
    <div v-if="when1">
      1 => {{when1}}
    </div>
    <div v-if="when2">
      2 => {{when2}}
    </div>
    <div v-if="whenEnter">
      ctrl + enter => {{whenEnter}}
    </div>
    <div v-if="whenEscape">
      escape => {{whenEscape}}
    </div>
    <div v-if="whenSpace">
      space => {{whenSpace}}
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
</style>
