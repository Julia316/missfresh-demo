<template>
    <div class="counting">
      <div class="hasCount" v-if="good.count">
        <div class="decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCountHandle"></div>
        <div class="num">{{good.count}}</div>
        <div class="increase icon-add_circle" @click.stop.prevent="addCountHandle"></div>
      </div>
      <div class="cart" v-else @click="addCountHandle">
        <img src="./img/icon_cart.png" width="49" height="49"/>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
      props:{
        good:{
          type:Object
        }
      },
      watch:{
        "good":{
          handler:function(val,oldVal){
            this.$store.commit("currentGood",val)
          },
          deep:true
        }
      },
      methods:{
        addCountHandle(event){
          this.$store.commit("ballOn");
          if(!event._constructed){
            return
          }
          if(!this.good.count){
            Vue.set(this.good,'count',1)
          }else{
            this.good.count++
          }
          this.$store.commit("addBall",event.target)
        },
        decreaseCountHandle(event){
          this.$store.commit("ballOn");
          if(!event._constructed){
            return
          }
          if(this.good.count>0){
            this.good.count--
          }
        }
      }
    }
</script>

<style lang="stylus">
.counting
  z-index:10
  .hasCount
    font-size:0
    .decrease,.increase
      display:inline-block
      vertical-align:top
      padding:4px
      font-size:25px
      color:#ff4891
      font-weight:200
    .num
      display:inline-block
      vertical-align:top
      padding-top:5px
      width:25px
      font-size:14px
      line-height:22px
      color:#474747
      text-align:center
  .cart
    width:49px
    height:49px


</style>
