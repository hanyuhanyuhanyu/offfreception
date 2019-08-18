<template>
  <div>
    fromnow
    {{firstDay}}
    {{secondDay}}
  </div>
</template>
<script>
export default{
  props: ["user", "firstDay", "secondDay"],
  data(){
    return {
      datas: {
        first: false,
        second: false,
      }
    }
  },
  methods: {
    methods(){
      return {
        joinFirst() {
          this.datas.first = !this.datas.first
        },
        joinSecond() {
          this.datas.second = !this.datas.second
        }
      }
    },
  }
}
</script>
