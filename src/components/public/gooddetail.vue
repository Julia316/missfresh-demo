<template>
  <div class="gooddetail" v-if="detailShow">
    <div class="detail">
        <div class="detail-ban">
          <div class="ban">
            <img class="icon-back" src="./img/detail-back.png" width="22" height="22" @click="closeDetailHandle"/>
            <span class="name">{{nowGoodDetail.name}}</span>
            <img class="icon-share" src="./img/detail-share.png" width="22" height="22" @click="showShareBox"/>
          </div>
        </div>
        <div class="info-wrapper" ref="infohook">
          <div class="info">
            <div class="slideBox">
              <slide-two :nowGoodDetail="nowGoodDetail"></slide-two>
            </div>
            <h1 class="subtit">{{nowGoodDetail.subtitle}}</h1>
            <h2 class="tit">{{nowGoodDetail.name}}</h2>
            <div class="price">
              <div class="new_price" :class="{bigSize:nowGoodDetail.vip_price===nowGoodDetail.price}"><span>￥{{nowGoodDetail.price/100}}</span><span class="old_price" v-if="nowGoodDetail.market_price!==0">￥{{nowGoodDetail.market_price/100}}</span></div>
              <div class="vip_price" v-if="nowGoodDetail.market_price!==nowGoodDetail.price">￥{{nowGoodDetail.vip_price/100}}<img v-if="nowGoodDetail.vip_price" src="./img/vip.png" width="41" height="14"/></div>
              <div class="sales_volume">已售{{nowGoodDetail.sales_volume}}份</div>
            </div>
            <div class="production">
              <span>•产地{{nowGoodDetail.country}}</span>
              <span>•{{nowGoodDetail.delivery_mode_name}}</span>
              <span v-for="item in nowGoodDetail.promotion">•{{item}}</span>
            </div>
            <div class="promotion_box">
              <div class="vip">
                <img class="icon" src="./img/icon-vip.png"/>
                <span class="open">支付8元开会员<br/>购买本商品返<em>0.44</em>元</span>
                <span class="go">去开通</span>
                <img class="arrow_right" src="./img/detail-right-arrow.png" width="19" height="19">
              </div>
              <div class="share">
                <img class="icon" src="./img/icon-refund.png"/>
                <span class="open">{{nowGoodDetail.product_share_info_v2.product_integarl_text}}</span>
                <span class="go">去分享</span>
                <img class="arrow_right" src="./img/detail-right-arrow2.png" width="19" height="19">
              </div>
              <div class="share_num">{{nowGoodDetail.product_share_info_v2.share_product_text}}</div>
            </div>
            <div class="light_pots" v-if="nowGoodDetail.description">
              <h1>亮点</h1>
              <div class="lightBox">
                <img src="./img/icon-dot.png"/>
                <div class="light" v-for="item in nowGoodDetail.description">{{item}}</div>
              </div>
            </div>
            <div class="basic">
              <h1>商品详情</h1>
              <ul>
                <li v-if="nowGoodDetail.unit">规格：{{nowGoodDetail.unit}}</li>
                <li v-if="nowGoodDetail.weight">重量：{{nowGoodDetail.weight}}</li>
                <li v-if="nowGoodDetail.pack">包装：{{nowGoodDetail.pack}}</li>
                <li v-if="nowGoodDetail.storage_time">保质期：{{nowGoodDetail.storage_time}}</li>
                <li v-if="nowGoodDetail.storage_method">储存方法：{{nowGoodDetail.storage_method}}</li>
              </ul>
              <div class="imgBox">
                <img v-for="item in nowGoodDetail.instruction" :src="item.image"/>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_bottom">
          <div class="left">
            <img src="./img/icon-detail-cart.png"/>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="right" @click="addHandle">
            <p>加入购物车</p>
          </div>
        </div>
    </div>
    <transition name="slideUp">
      <div class="detail-mask" v-show="shareBoxShow">
        <div class="share-box">
          <div class="weChat">微信好友</div>
          <div class="moments">朋友圈</div>
          <div class="cancel" @click="hideShareBox">取消</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import SlideTwo from '../public/slidetwo.vue'
  import BScroll from 'better-scroll'
  export default {
    components:{
      SlideTwo
    },
    data(){
      return{
        shareBoxShow:false
      }
    },
    computed:{
      totalCount(){
        return this.$store.getters.totalCount;
      },
      detailShow(){
        return this.$store.state.detailShow;
      },
      nowGoodDetail(){
        return this.$store.state.nowGoodDetail;
      }
    },
    watch:{
      "detailShow":function(val,oldVal){
        if(this.detailShow){
          this._initInfoScroll();
        }
      }
    },
    methods:{
      closeDetailHandle(){
        this.$store.commit("closeDetail")
      },
      _initInfoScroll(){
        this.$nextTick(()=>{
          this.infoscroll=new BScroll(this.$refs.infohook,{
            click:true
          });
        })
      },
      addHandle(event){
        //if(!event._constructed){
          //return
        //}
        this.$store.commit("ballOff");
        if(!this.nowGoodDetail.count){
          Vue.set(this.nowGoodDetail,'count',1)
        }else{
          this.nowGoodDetail.count++
        }
        this.$store.commit("addBall",event.target)
      },
      showShareBox(){
        this.shareBoxShow=true;
      },
      hideShareBox(){
        this.shareBoxShow=false;
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .gooddetail
    z-index:100
    position:absolute
    top:0
    left: 0
    bottom: 0
    display:inline-block
    width:100%
    height:100%
    background:#fff
    &.comfade-enter-active
      transition:0.5s all ease-in-out
    &.comfade-enter-to
      transform:translateX(0)
    &.comfade-enter
      transform:translateX(100%)
    &.comfade-leave-active //disable
      transition:0.4s all ease-in-out
    &.comfade-leave
      transform:translateX(0)
    &.comfade-leave-to
      transform:translateX(-100%)
    .detail
      position:relative
      display:block
      width:100%
      height:100%
      .detail-ban
        //positiont:fixed
        //top:0
        //left:0
        //right:0
        background: #fff
        border-bottom-1px(#f5f5f5)
        box-shadow:0 0 10px rgba(0,0,0,.06)
        .ban
          display:flex
          margin:0 auto
          width:94%
          height:44px
          fon-size:0
          .icon-back,.icon-share
            vertical-align:top
            padding-top:11px
            width:22px
            height:22px
          .icon-back
            padding-right:20px
          .icon-share
            padding-left:20px
          .name
            flex:1
            vertical-align:top
            text-align:center
            font-size:17px
            color:#4b4b4b
            line-height:44px
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
      .info-wrapper
        position:fixed
        top:44px
        left:0
        right:0
        bottom:46px
        width:100%
        text-align:center
        overflow:hidden
        .info
          width:100%
          margin:0 auto
          .subtit,.tit
            display:inline-block
            width:92%
            margin:0 auto
            color:#474245
            text-align:left
          .subtit
            font-size:20px
            font-weight:700
            padding:20px 0 7px
            line-height:28px
          .tit
            font-size:16px
            margin-bottom:22px
            font-weight:400
          .price
            position:relative
            width:92%
            margin:0 auto
            .new_price,.vip_price
              width:100%
              text-align:left
              font-size:0
              color:rgb(255, 72, 145)
              letter-spacing:-1px
              vertical-align:bottom
            .new_price
              font-size:15px
              line-height:15px
              &:bigSize
                font-size:22px
              .old_price
                color:rgb(150, 150, 150)
                font-size:12px
                text-decoration:line-through
                font-weight:400
                padding-left:4px
            .vip_price
              font-size:22px
              line-height:30px
              color:rgb(248, 188, 0)
              img
                padding-left:7px
                width:41px
                height:14px

            .sales_volume
              position:absolute
              top:0
              right:0
              font-size:12px
              color:#969696
              font-weight:400

          .production
            width:92%
            margin:0 auto 15px
            text-align:left
            font-size:12px
            line-height:40px
            color:#262626
            span
              padding-right:20px
          .promotion_box
            width:100%
            margin:0 auto
            .vip,.share
              display:flex
              margin:10px auto
              width:100%
              height:60px
              background:url(./img/icon-vip-bg.png) 50% 50% no-repeat
              background-size:100% 60px
              text-align:left
              font-size:0
              .icon
                vertical-align:top
                width:37px
                height:18px
                padding:21px 0 0 25px
                font-size:14px
                color:#000
              .open
                flex:1
                vertical-align:top
                font-size:14px
                color:#8B572A
                line-height:16px
                height:32px
                padding-top:14px
                padding-left:8px
                letter-spacing:1px
                em
                  font-style:normal
                  color:#ff4891
              .go
                display:inline-block
                height:32px
                vertical-align:top
                font-size:12px
                line-height:32px
                padding-top:14px
                color:#000
              .arrow_right
                display:inline-block
                padding:21px 25px 0 0
                height:19px
                width:19px
                margin-left:-4px
            .share
              background:url(./img/icon-refund-bg.png) 50% 50% no-repeat
              background-size:100% 60px
              margin-bottom:3px
              .open
                padding-top:22px
                color:#474245
              .go
                color:#ff4891
            .share_num
              width:88%
              margin:0 auto
              text-align:left
              font-size:12px
              color:#969696
          .light_pots
            width:100%
            text-align:center
            margin:40px auto
            h1
              font-family:"微软雅黑"
              width:92%
              margin:0 auto 10px
              text-align:left
              font-size:16px
              color:#222
              font-weight:bold
            .lightBox
              box-sizing:border-box
              width:90%
              margin:0 auto
              background:#f5f5f5
              border:15px solid #fff
              border-radius:5px
              box-shadow:0 0 10px rgba(0,0,0,.06)
              padding:10px 14px 12px 14px
              img
                display:block
                text-align:left
                width:30px
                height:20px
              .light
                display:inline-block
                width:100%
                text-align:left
                font-size:14px
                line-height:20px
                color: #474245
                margin-top:8px
          .basic
            width: 100%
            h1
              font-family:"微软雅黑"
              width:92%
              margin:0 auto 10px
              text-align:left
              font-size:16px
              color:#222
              font-weight:bold
            ul
              width: 92%
              margin:0 auto 10px
              text-align:left
              li
                line-height:40px
                font-size:14px
                color:#969696
            .imgBox
              width: 92%
              margin:0 auto
              font-size:0
              img
                width: 100%
                vertical-align :top



      .detail_bottom
        position:absolute
        left:0
        bottom:0
        z-index:60
        display:flex
        flex-direction:row
        width:100%
        height:46px
        background:#fff
        box-shadow:0 0 10px rgba(0,0,0,.08)
        .left
          position:relative
          width:22px
          padding:0 16px
          height:100%
          text-align:center
          img
            width:22px
            height:22px
            padding-top:12px
          .num
            position:absolute
            top:1px
            right:3px
            width:12px
            height:12px
            padding:4px
            font-size:12px
            color:#fff
            line-height:12px
            background:#ff4891
            border-radius:50%
        .right
          flex:1
          text-align:center
          background:#ff4891
          p
            font-size:16px
            line-height:46px
            color:#fff
    .detail-mask
      z-index:110
      position:absolute
      top:0
      left:0
      right:0
      bottom:0
      width:100%
      height:100%
      background:rgba(0,0,0,0.6)
      &.slideUp-enter-active, &.slideUp-leave-active
        transition:0.2s all linear
      &.slideUp-enter, &.slideUp-leave-to
        opacity:0
      &.slideUp-enter-to, &.slideUp-leave
        opacity:1
      &.slideUp-enter-active .share-box, &.slideUp-leave-active .share-box
        transition:0.6s all linear
      &.slideUp-enter .share-box, &.slideUp-leave-to .share-box
        transform:translateY(126px)
      &.slideUp-enter-to .share-box, &.slideUp-leave .share-box
        transform:translateY(0)
      .share-box
        display:inline-block
        width:100%
        background:#fff
        position:absolute
        left:0
        bottom:0
        height:126px
        .weChat,.moments,.cancel
          width:100%
          height:40px
          text-align:center
          font-size:18px
          line-height:40px
          color:#000
        .weChat
          border-bottom-1px(#f0f0f0)
        .moments
          border-bottom:6px solid #efeff4

</style>
