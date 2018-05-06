<template>
  <div class="vipBox">
    <div class="des">
      <img src="./img/icon-vip.png"/>
      <div class="refund">开通{{nowVipClass.des}}会员可得<span>红包</span>，<br/>本单更返<span>{{refund}}</span>元</div>
    </div>
    <ul class="vipItem" ref="vipItem">
      <li class="cardBox">
        <img class="card" src="./img/icon-vipCard1.png"/>
        <div class="choose" :class="{checked:nowVipClass.id===0}" @click="chooseVip($event,0)"></div>
        <!--<img class="choose" @click="chooseVip($event,0)" src="./img/icon-unchecked.png"/>-->
      </li>
      <li class="cardBox">
        <img class="card" src="./img/icon-vipCard2.png"/>
        <div class="choose" :class="{checked:nowVipClass.id===1}" @click="chooseVip($event,1)"></div>
      </li>
      <li class="cardBox">
        <img class="card" src="./img/icon-vipCard3.png"/>
        <div class="choose" :class="{checked:nowVipClass.id===2}" @click="chooseVip($event,2)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          vipTime:"月度"
        }
      },
      computed:{
        refund(){
          return this.$store.getters.refund;
        },
        nowVipClass(){
          return this.$store.state.nowVipClass;
        }
      },
      methods:{
        chooseVip(event,index){
          this.$store.commit("vipClassHandle",index);
        }
      }
    }
</script>

<style lang="stylus">
@import '../../common/styl/mixin.styl'
.vipBox
  background:#fff
  width:100%
  .des
    width:92%
    padding:0 4% 5px
    margin:0 auto
    height:43px
    font-size:0
    text-align:left
    border-bottom-1px(#e5e5e5)
    img
      vertical-align:top
      width:37px
      height:18px
      padding-top:15px
    .refund
      vertical-align:top
      display:inline-block
      padding-top:3px
      padding-left:5px
      font-size:14px
      line-height:20px
      color:#000
      span
        color:#FF4891
  .vipItem
    width:100%
    .cardBox
      width:92%
      height:50px
      padding:10px 4%
      font-size:0
      border-bottom-1px(#e5e5e5)
      .card
        float:left
        display:inline-block
        width:275px
        height:50px
      .choose
        float:right
        display:inline-block
        width:22px
        height:22px
        padding-top:14px
        background:url("./img/icon-unchecked.png") 50% 100% no-repeat;
        background-size:22px 22px;
        &.checked
          background:url("./img/icon-checked.png") 50% 100% no-repeat;
          background-size:22px 22px;
</style>
