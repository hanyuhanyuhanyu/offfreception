<template>
  <div class="w">
    <div class="message" style="background-color: #d02a2a; color: #fafafa">
      <p>
        支払いが必要です
      </p>
      <p>
        受領金額を良く確認してから受け付けを行ってください
      </p>
    </div>
    <div class="price">
      <div class="ocane">
        参加費:
      </div>
      {{priceMessage}}
    </div>
  </div>
</template>
<script>
export default{
  props:{
    price: {},
  },
  computed: {
    priceMessage(){
      return `${this.price}円`
    }
  }
}
</script>
<style>
  .message{
    border: solid 1.5px;
    border-radius: 10px;
    border-color: #404040;
    padding-left: 8px;
    padding-right: 8px;
    background-color: #d02a2a;
    color: #fafafa;
    font-weight: bold;
    font-size: 1.3rem;
    padding: 2px 6px;
  }
  .ocane{
    position: absolute;
    left: 0;
    padding: 2px 6px;
    bottom: 0;
    height: 100%;
  }
  .price {
    position: relative;
    margin: 20px;
    font-size: 1.3rem;
    padding: 2px 6px;
    padding-left: 24px;
    border-bottom: solid 1.5px;
    border-color: #404040;
    font-weight: bold;
    color: #2a2a2a;
    width: 40%;
  }
  .w{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
