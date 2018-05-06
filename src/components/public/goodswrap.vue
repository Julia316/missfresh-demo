<template>
  <div class="goods">
    <div class="goodsWrap" v-for="item,index in this.goodsData[datanum]" :key="index">
      <div class="title">
        <img v-if="item.tit_img" :src="item.tit_img" width="100%"/>
        <p class="titTxt" v-if="item.tit">{{item.tit}}</p>
      </div>
      <ul class="good_list">
        <li  class="good" v-for="good in item.wares">
          <div class="left">
            <img class="image" :src="good.image" width="120"/>
            <img v-if="good.promote_tag" class="tag" :src="good.promote_tag" width="25" height="32"/>
          </div>
          <div class="right">
            <div class="titBox"  @click="showDetailHandle(good)">
              <p class="tit">{{good.name}}</p>
              <p class="subtit">{{good.subtitle}}</p>
              <p class="price"><span>￥{{good.price/100}}</span><span class="old_price" v-if="good.market_price!==0">￥{{good.market_price/100}}</span></p>
              <p class="vip_price" v-if="good.vip_price!==0">￥{{good.vip_price/100}}<img v-if="good.vip_price" src="./img/vip.png" width="35" height="12"/></p>
            </div>
            <div class="counting-wrapper">
              <counting :good="good"></counting>
            </div>
          </div>
          <div style="clear:both"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Counting from '../public/counting.vue'
  import GoodDetail from '../public/gooddetail.vue'
  export default {
    props:{
      datanum:{
        type:Number,
        default:0
      }
    },
    components:{
      Counting,
      GoodDetail
    },
    computed:{
      goodsData(){
        return this.$store.state.goodsData;
      }
    },
    methods: {
      showDetailHandle(nowgood) {
        this.$store.commit("showDetail",nowgood)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .goodsWrap
    width:100%
    margin-top:15px
    .title
      display:block
      width:100%
      .titTxt
        width:92%
        margin:0 auto 10px
        text-align:left
        font-size: 20px
        line-height: 30px
        color: #000
    .good_list
      width:100%
      .good
        display:block
        width:375px
        height:120px
        margin:0 auto
        padding:20px 0 23px
        border-bottom-1px(#f5f5f5)
        .left
          position :relative
          float:left
          margin:0 15px 0 20px
          width:120px
          height:120px
          .image
            width:120px
            height:120px
          .tag
            position:absolute
            top:-5px
            left:0
            width:25px
            height:32px
        .right
          float:left
          position:relative
          width:210px
          .titBox
            width:100%
            text-align:left
            .tit
              width:100%
              font-size:16px
              padding-top:15px
              color:#474245
              letter-spacing :-1px
              overflow:hidden
              white-space:nowrap
              text-overflow:ellipsis
            .subtit
              line-height :24px
              font-size:14px
              color:#969696
              overflow:hidden
              white-space:nowrap
              text-overflow:ellipsis
              padding-bottom :17px
            .price,.vip_price
              width:100%
              text-align:left
              font-size:0
              color:rgb(255, 72, 145)
              letter-spacing:-1px
              vertical-align:bottom
            .price
              font-size:15px
              line-height:15px
              .old_price
                color:rgb(150, 150, 150)
                font-size:12px
                text-decoration:line-through
                font-weight:400
                padding-left:4px
            .vip_price
              font-size:16px
              line-height:18px
              color:rgb(248, 188, 0)
              img
                padding-left:7px
                width:35px
                height:12px
          .counting-wrapper
            position:absolute
            right:0
            bottom:-10px
</style>
