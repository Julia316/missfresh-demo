<template>
  <div class="member">
    <div class="memberWrapper" ref="member">
      <div class="memberIn">
        <div class="memBan">
          <div class="titBox">
            <h1>开通优享会员 尊享5大特权</h1>
          </div>
        </div>
        <div class="vipInfo">
          <ul class="list">
            <li class="item">
              <img src="./img/item1.png"/>
              <span>每单返现5%</span>
            </li>
            <li class="item">
              <img src="./img/item2.png"/>
              <span>30%商品享低价</span>
            </li>
            <li class="item">
              <img src="./img/item3.png"/>
              <span>1小时送达</span>
            </li>
            <li class="item">
              <img src="./img/item4.png"/>
              <span>每周红包免费领</span>
            </li>
            <li class="item">
              <img src="./img/item5.png"/>
              <span>专人专线0等待</span>
            </li>
            <li class="item">
              <img src="./img/item6.png"/>
              <span>更多特权敬请期待</span>
            </li>
          </ul>
          <div class="save">
            <img @click="showCalc" src="./img/vip-save.png" />
          </div>
        </div>
        <div class="btn1" @click="showTry">免费体验优享会员</div>
        <div class="btn2" @click="showTry">限时8元开通优享会员</div>
        <div class="redPocket">
          <div class="tit">专属红包周周送</div>
          <div class="subtit">（每周一更新）</div>
          <div class="couponBox" ref="coupon">
            <div class="couponIn" ref="couponin">
              <img src="./img/red1.png"/>
              <img src="./img/red2.png"/>
              <img src="./img/red3.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="calcmask-fade">
      <div class="mask" @click="notShowCalc" v-if="isShowCalc"></div>
    </transition>
    <transition name="calc-fade">
      <div class="calculator" v-if="isShowCalc">
      <div class="cont">
        <img class="titImg" src="./img/calc-title.png"/>
        <p class="p1">根据优鲜用户年平均消费3504元计算</p>
        <p class="p2">会员期间已为您节省</p>
        <p class="p3">¥1121.30</p>
        <ul class="proportion">
          <li>
            <div class="top">
              <div class="left">购物返现</div>
              <div class="right">￥175.20</div>
            </div>
            <div class="bot">单单返现5%无上限</div>
          </li>
          <li>
            <div class="top">
              <div class="left">会员专享价</div>
              <div class="right">￥525.60</div>
            </div>
            <div class="bot">优质商品最高优惠50%</div>
          </li>
          <li>
            <div class="top">
              <div class="left">优惠红包</div>
              <div class="right">￥420.50</div>
            </div>
            <div class="bot">各种优惠享不停</div>
          </li>
        </ul>
        <div class="button">开通优享会员</div>
      </div>
    </div>
    </transition>
    <transition name="trymask-fade">
      <div class="trymask" @click="notShowTry" v-if="isShowTry"></div>
    </transition>
    <transition name="try-fade">
      <div class="try" v-if="isShowTry">
        <div class="cont">
          <div class="button">立即体验</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
      data(){
        return{
          isShowCalc:false,
          isShowTry:false
        }
      },
      mounted(){
        this._initVipScroll();
        this._initCouponScroll();
      },
      methods:{
        _initVipScroll(){
          this.$nextTick(()=> {
            if (!this.vipscroll) {
              this.vipscroll = new BScroll(this.$refs.member, {
                click:true
              })
            } else {
              this.vipscroll.refresh()
            }
          })
        },
        _initCouponScroll(){
          this.$refs.couponin.style.width=615+"px";
          this.$nextTick(()=> {
            if (!this.couponscroll) {
              this.couponscroll = new BScroll(this.$refs.coupon, {
                scrollX: true,
                eventPassthrough: "vertical"
              })
            } else {
              this.couponscroll.refresh()
            }
          })
        },
        showCalc(){
          this.isShowCalc=true;
        },
        notShowCalc(){
          this.isShowCalc=false;
        },
        showTry(){
          this.isShowTry=true;
        },
        notShowTry(){
          this.isShowTry=false;
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
.member
  width:100%
  .memberWrapper
    position:fixed
    top: 0
    bottom:50px
    left: 0
    right:0
    width:100%
    margin:0 auto
    overflow:hidden
    .memberIn
      width:100%
      .memBan
        width: 100%
        text-align:center
        .titBox
          width: 100%
          height:135px
          background:url('./img/vip-ban-bg.png') 50% 50% no-repeat
          background-size:100% 135px
          h1
            width: 100%
            tetx-align:center
            font-size: 22px
            padding-top:30px
            color: #ffffff
            font-weight:600
            font-family:"-apple-system", "Helvetica Neue", Roboto, "Segoe UI", sans-serif
      .vipInfo
        width:100%
        height:227px
        margin:-55px auto 0
        background:url('./img/vipInfo-bg.png') 50% 0% no-repeat
        background-size:90% 227px
        .list
          width:90%
          margin:0 auto
          font-size:0
          padding-top:23px
          .item
            display:inline-block
            width:33%
            height:60px
            white-space:text-wrap
            text-align:center
            margin-bottom:7px
            img
              width: 32px
              height: 32px
              margin:0 auto 4px
            span
              width: 100%
              text-align:center
              font-size:12px
              color: #B17630
              display: block
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
        .save
          width:100%
          height: 24px
          text-align:right
          img
            width:90px
            height:24px
      .btn1
        width: 90%
        height:44px
        margin:10px auto 10px
        text-align:center
        font-size: 16px
        color:#F69C0B
        line-height:44px
        background:url("./img/btn1-bg.png") 50% 50% no-repeat
        background-size:299px 44px
      .btn2
        width: 90%
        height:44px
        margin:0 auto
        text-align:center
        font-size: 16px
        color:#fff
        line-height:44px
        background:url("./img/btn2-bg.png") 50% 50% no-repeat
        background-size:299px 44px
      .redPocket
        width: 100%
        margin:50px auto 0
        padding-bottom:20px
        .tit
          width: 92%
          margin:0 auto
          text-align:left
          font-size:20px
          font-weight:700
          color:#474245
          line-height:20px
        .subtit
          width:92%
          margin:0 auto 20px
          text-align:left
          font-size: 12px
          color:#969696
          line-height: 16px
        .couponBox
          width:100%
          margin:0 auto
          overflow:hidden
          .couponIn
            white-space:nowrap
            img
              display:inline-block
              text-align:left
              width: 190px
              height: 84px
              margin-left:15px
  .calculator
    z-index:200
    position:fixed
    top: 20%
    left: 10%
    width: 80%
    &.calc-fade-enter-active
      transition:0.5s all ease-out
    &.calc-fade-leave-active
      transition:0.3s all ease-out
    &.calc-fade-enter,&.calc-fade-leave-to
      opacity:0
    &.calc-fade-enter-to,&.calc-fade-leave
      opacity:1
    .cont
      width: 100%
      height: 369px
      margin:0 auto
      text-align:center
      -webkit-border-radius: 12px
      -moz-border-radius: 12px
      border-radius: 12px
      background:#FEFCEF
      .titImg
        width: 108px
        height: 26px
      .p1
        width: 100%
        text-align:center
        margin-top: 10px
        font-size: 12px
        line-height: 20px
        color:#474245
        font-weight:normal
      .p2
        width: 100%
        text-align:center
        font-size:20px
        line-height: 20px
        color:#474245
        font-weight:normal
      .p3
        width: 100%
        text-align:center
        font-size:20px
        line-height: 20px
        color:#ff4891
        font-weight:700
      .proportion
        width: 90%
        margin:0 auto
        li
          list-style:none
          height: 40px
          padding:7px 0
          border-bottom-1px(#E9D8B7)
          .top
            display:flex
            flex-direction:row
            width:100%
            .left
              flex: 1
              font-size:14px
              font-weight: 700
              color:#443E42
              line-height:20px
              text-align:left
            .right
              flex: 1
              font-size:14px
              font-weight: 700
              color:rgb(150, 150, 150)
              line-height:20px
              text-align:right
          .bot
            width:100%
            font-size:12px
            font-weight: 700
            color:#969696
            line-height:20px
            text-align:left
      .button
        width: 76%
        height: 40px
        margin:48px auto 0
        text-align:center
        background:#ff4891
        color: #ffffff
        line-height: 40px
  .try
    z-index:200
    position:fixed
    top: 15%
    left: 10%
    width: 80%
    &.try-fade-enter-active
      transition:0.5s all ease-out
    &.try-fade-leave-active
      transition:0.3s all ease-out
    &.try-fade-enter,&.try-fade-leave-to
      opacity:0
    &.try-fade-enter-to,&.try-fade-leave
      opacity:1
    .cont
      width:290px
      height:80px
      margin:0 auto
      padding-top:390px
      text-align:center
      background:url(./img/trynow.png) 50% 0% no-repeat
      background-size:290px 470px
      .button
        width: 76%
        height: 40px
        margin:0 auto
        text-align:center
        background:#ff4891
        color: #ffffff
        line-height: 40px
  .mask,.trymask
    display:inline-block
    z-index:100
    position:fixed
    top: 0
    left: 0
    bottom: 0
    right:0
    width: 100%
    height: 100%
    background:rgba(0,0,0,0.6)
    &.mask
      &.calcmask-fade-enter-active
        transition:0.5s all ease-out
      &.calcmask-fade-leave-active
        transition:0.3s all ease-out
      &.calcmask-fade-enter,&.calcmask-fade-leave-to
        opacity:0
      &.calcmask-fade-enter-to,&.calcmask-fade-leave
        opacity:1
    .trymask
      &.trymask-fade-enter-active
        transition:0.5s all ease-out
      &.trymask-fade-leave-active
        transition:0.3s all ease-out
      &.trymask-fade-enter,&.trymask-fade-leave-to
        opacity:0
      &.trymask-fade-enter-to,&.trymask-fade-leave
        opacity:1
</style>
