<template>
    <div class="confirm-order" v-if="confirmOrder">
      <div class="confirmBan">
        <div class="title">订单确认</div>
        <img class="back" @click="confirmOrderOffHandle" src="./img/icon-back.png"/>
      </div>
      <div class="content-wrapper" ref="confirm">
        <div class="content">
          <div class="address-wrapper" v-if="isShowAddBox">
            <address-box></address-box>
          </div>
          <div class="receiver-wrapper" v-else>
            <div class="top">下单次日送达</div>
            <div class="addBox">
              <div class="text-top">
                <span class="type">{{receiverStore[defaultReceiver].type}}</span>
                <span class="name">{{receiverStore[defaultReceiver].add}}</span>
              </div>
              <div class="text-middle">
                <span class="left">{{receiverStore[defaultReceiver].addName+receiverStore[defaultReceiver].addNum}}</span>
                <span class="right icon-keyboard_arrow_right" @click="showAddStoreHandle"></span>
              </div>
              <div class="text-bot">
                <span>{{receiverStore[defaultReceiver].name}}</span>
                <span class="phone">{{receiverStore[defaultReceiver].phone}}</span>
              </div>
              <img src="./img/cut-off-line.png"/>
            </div>
          </div>
          <div class="good-box">
            <div class="ban">
              <div class="line"><span>次日达</span></div>
              <span class="time">次日送达</span>
            </div>
            <div class="good-info clearfix">
              <div class="good-list-wrapper">
                <div class="good-list">
                  <img v-for="item in finalData" :src="item.image"/>
                </div>
              </div>
              <div class="good-num">
                <span class="num">共{{finalCount}}件</span>
                <i class="icon-keyboard_arrow_right"></i>
              </div>
            </div>
          </div>
          <ul class="price-box">
            <li>
                <span class="left">商品总价</span>
                <span class="right">￥{{finalPrice/100}}</span>
            </li>
            <li>
              <span class="left">商品实付</span>
              <span class="right">￥{{finalPrice/100}}</span>
            </li>
            <li>
              <span class="left">运费</span>
              <span class="right">￥{{finalFreight}}</span>
            </li>
            <li>
              <div class="sum">合计<span>￥{{finalPrice/100+finalFreight}}</span></div>
            </li>
          </ul>
          <vip></vip>
          <div class="instruction-box">优惠说明<img src="./img/icon-instruction.png"/></div>
          <div class="pay-box">
            <div class="need-pay">
              <div class="left">还需支付</div>
              <div class="right">￥{{finalPrice/100+finalFreight+vipCost}}</div>
            </div>
            <div class="pay-methods">
              <div class="method1" @click="changeDefaultPayHandle(0)">
                <div class="imgBox" :class="{'active':defaultPay===0}">
                  <div class="payImg"></div>
                  <i class="icon-check_circle" v-show="!defaultPay"></i>
                </div>
                <div class="txt">微信支付</div>

              </div>
              <div class="middle"></div>
              <div class="method2" @click="changeDefaultPayHandle(1)">
                <div class="imgBox" :class="{'active':defaultPay===1}">
                  <div class="payImg"></div>
                  <i class="icon-check_circle" v-show="defaultPay"></i>
                </div>
                <div class="txt">支付宝</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="confirmBot">
        <div class="left">
          <div class="payNum">付款</div>
          <div class="pay">￥<span>{{finalPrice/100+finalFreight+vipCost}}</span></div>
          <div class="vip-cost" v-if="vipCost">包含会员卡费用{{vipCost}}元</div>
        </div>
        <router-link to="/mine">
          <div class="right" @click="confirmOrderOffHandle2">
            <span>去支付</span>
            <img src="./img/icon-go.png"/>
          </div>
        </router-link>
      </div>
    </div>

</template>

<script>
    import BScroll from 'better-scroll'
    import Vip from './vip'
    import AddressBox from './addressbox'
    export default {
      components:{
        Vip,
        AddressBox
      },
      data(){
        return{
          orderInfo:{
            "count":0,
            "price":0,
            "goods":[],
            "time":"",
            "name":"",
            "id":""
          }
        }
      },
      watch:{
        "confirmOrder":function(){
          this._confirmScroll();
        }
      },
      methods:{
        _confirmScroll(){
          if(this.confirmOrder){
            this.$nextTick(() => {
              this.confirmscroll = new BScroll(this.$refs.confirm, {
                click: true
              });
            })
          }
        },
        confirmOrderOffHandle(){
          this.$store.commit("confirmOrderOff")
        },
        showAddStoreHandle(){
          this.$store.commit("showAddStore");
        },
        changeDefaultPayHandle(index){
          this.$store.commit("changeDefaultPay",index)
        },
        confirmOrderOffHandle2(){
          if(this.$store.state.receiverStore.length===0){
            alert("请选择收货地址")
          }else{
            this.$store.commit("confirmOrderOff");
            this.$store.commit("openMineOrder",1); //打开mine中订单页

            //把订单数据存储到订单仓库里
            let date=new Date();
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            let hour=date.getHours();
            let min=date.getMinutes();
            let sec=date.getSeconds();
            month=addZero(month);
            day=addZero(day);
            hour=addZero(hour);
            min=addZero(min);
            sec=addZero(sec);

            function addZero(t){
              if(t>=1 && t<=9){
                t="0"+t
              }
              return t
            }
            this.orderInfo.time=year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
            this.orderInfo.count=this.finalCount;
            this.orderInfo.price=this.finalPrice/100+this.finalFreight+this.vipCost;
            this.orderInfo.goods=this.finalData;
            this.$store.commit("orderStoreHandle",this.orderInfo)
          }
        },
      },
      computed:{
        vipCost(){
          return this.$store.getters.vipCost;
        },
        confirmOrder(){
          return this.$store.state.confirmOrder;
        },
        isShowAddBox(){
          return this.$store.state.isShowAddBox;
        },
        receiver(){
          return this.$store.state.receiver;
        },
        finalData(){
          return this.$store.state.finalData;
        },
        finalCount(){
          return this.$store.getters.finalCount;
        },
        finalPrice(){
          return this.$store.getters.finalPrice;
        },
        finalFreight(){
          return this.$store.getters.finalFreight;
        },
        refund(){
          return this.$store.getters.refund;
        },
        receiverStore(){
          return this.$store.state.receiverStore;
        },
        defaultReceiver(){
          return this.$store.getters.defaultReceiver;
        },
        defaultPay(){ //付款方式
          return this.$store.state.defaultPay;
        }
      }
    }
</script>
<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .confirm-order
    z-index:120
    display:block
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    background:#f0f0f0
    &.confirmfade-enter-active
      transition:0.5s all ease-in-out
    &.confirmfade-enter-to
      transform:translateX(0)
    &.confirmfade-enter
      transform:translateX(100%)
    &.confirmfade-leave-active //disable
      transition:0.4s all ease-in-out
    &.confirmfade-leave
      transform:translateX(0)
    &.confirmfade-leave-to
      transform:translateX(-100%)
    .confirmBan
      z-index:130
      position:relative
      width:100%
      height:44px
      background:#fff
      border-bottom-1px(#e5e5e5)
      box-shadow:0 0 10px rgba(0,0,0,.06)
      .title
        position:absolute
        top:0
        width:100%
        text-align:center
        color:#000
        font-size:17px
        line-height:44px
        font-weight:500
      .back
        position:absolute
        width:20px
        height:20px
        top:12px
        left:4%
    .content-wrapper
      width:100%
      position:absolute
      top:45px
      bottom:46px
      text-align:center
      overflow:hidden
      .content
        width:100%
        .address-wrapper
          width:100%
        .receiver-wrapper
          width:100%
          margin-bottom:10px
          background:#fff
          .top
            width:92%
            height:30px
            padding:0 4%
            text-align:left
            font-size:12px
            line-height:30px
            color:#4b4b4b
            background:#fff9e2
          .addBox
            width:100%
            background:#fff
            padding-top:14px
            .text-top
              width:92%
              margin:0 auto
              text-align:left
              font-size:0
              padding:8px 0 4px
              .type
                vertical-align:top
                width: 13px
                height:7px
                border:1px solid #bbb
                background:#f5f5f5
                font-size:12px
                border-radius:2px
                color:#474245
              .name
                vertical-align:top
                padding-left:6px
                font-size:14px
                line-height:20px
                color:#474245
            .text-middle
              display:flex
              flex-direction:row
              align-items:center
              width:92%
              margin:0 auto
              text-align:left
              padding:0 0 7px
              .left
                flex:1
                font-size: 20px
                color: #474245
                font-weight:500
                line-height:26px
                overflow: hidden
                white-space:normal
                text-overflow:ellipsis
                -webkit-line-clamp: 2
              .right
                width:20px
                padding-left:20px
                font-weight:200
                font-size:28px
                color:#bbb

            .text-bot
              width:92%
              margin:0 auto
              text-align:left
              font-size:0
              padding:3px 0 8px
              span
                vertical-align:top
                font-size:14px
                color:#444
              .phone
                padding-left:6px
            img
              margin:0 auto
              padding:0
              width:100%
              height:5px
              font-size:0
              vertical-align:bottom
        .good-box
          width:100%
          margin-bottom:10px
          background:#fff
          .ban
            width:92%
            margin:0 auto
            height:44px
            font-size:0
            border-bottom-1px(#eee)
            .line
              float:left
              vertical-align:top
              padding-top:15px
              span
                display:inline-block
                height:14px
                padding:0 4px
                border-left:4px solid #ff4891
                font-size:14px
                color:#000
            .time
              float:right
              vertical-align:top
              font-size:14px
              color:#969696
              padding-top:15px


          .good-info
            display:flex
            width:92%
            margin:0 auto
            height:77px
            .good-list-wrapper
              flex:1
              float:left
              height:41px
              padding-top:18px
              overflow:hidden
              text-align:left
              .good-list
                height:41px
                img
                  display:inline-block
                  padding:3px
                  width:35px
                  height:35px
                  border-radius:50%
            .good-num
              float:right
              width:76px
              padding-left:14px
              font-size:0
              text-align:right
              .num
                display:inline-block
                vertical-align:top
                padding-top:28px
                font-size:12px
                color:#262626
                line-height:22px
              i
                display:inline-block
                vertical-align:top
                padding-top:28px
                width:16px
                font-size:22px
                color:#bbb
                line-height:22px


        .price-box
          display:block
          width:100%
          margin-bottom:10px
          background:#fff
          li
            display:inline-block
            width:100%
            height:50px
            border-bottom-1px(#eee)
            &:last-of-type
              border-none()
            .left,.right
              float:left
              padding-left:4%
              font-size:14px
              color:rgb(38, 38, 38)
              line-height:50px
            .right
              float:right
              padding-right:4%
            .sum
              float:right
              padding-right:4%
              font-size:18px
              line-height:50px
              color:rgb(38, 38, 38)
              span
                color:#ff4891
                padding-left:10px
        .instruction-box
          width:92%
          margin:0 auto
          height:30px
          line-height:30px
          font-size:12px
          color:#969696
          text-align:right
          img
            vertical-align:top
            width:13px
            height:13px
            padding-top:9px
            padding-left:4px

        .pay-box
          width:100%
          background:#fff
          .need-pay
            width:100%
            height:49px
            border-bottom-1px(#eee)
            .left,.right
              display:inline-block
              line-height:49px
              width:46%
              height:49px
              font-size:14px
              color:#4b4b4b
            .left
              //padding-left:4%
              text-align:left
            .right
              //padding-right:4%
              text-align:right


          .pay-methods
            display:flex
            width:80%
            margin:0 auto
            text-align:left
            .method1,.method2
              display:inline-block
              width:100px
              padding:28px 0
              text-align:center
              .imgBox
                position:relative
                margin:0 auto
                width:52px
                height:52px
                border:1px solid #44be00
                border-radius:50%
                background:#fff
                &.active
                  background:#44be00
                  border:1px solid #fff
                  .payImg
                    background:url(./img/icon-pay-weChat.png) 50% 50% no-repeat
                    background-size:52px 52px
                .payImg
                  width:52px
                  height:52px
                  background:url(./img/icon-pay-weChat1.png) 50% 50% no-repeat
                  background-size:52px 52px
                i
                  position:absolute
                  top:2px
                  right:-4px
                  width:16px
                  height:16px
                  font-size:16px
                  color:#44be00
                  border:1px solid #fff
                  border-radius:50%
                  background:#fff
              .txt
                width:100%
                padding:8px 0
                text-align:center
                font-size:16px
                color:#444
            .method2
              .imgBox
                border:1px solid #039dff
                &.active
                  background:#039dff
                  .payImg
                    background:url(./img/icon-pay-aliPay.png) 50% 50% no-repeat
                    background-size:52px 52px
                .payImg
                  width:52px
                  height:52px
                  padding-left:8px
                  background:url(./img/icon-pay-aliPay1.png) 50% 50% no-repeat
                  background-size:52px 52px
                i
                  color:#039dff
            .middle
              flex:1
              display:inline-block
              height:100%
    .confirmBot
      display:flex
      position:fixed
      left:0
      right:0
      bottom:0
      width:100%
      height:46px
      background:#fff
      box-shadow:0 0 10px rgba(0,0,0,.06)
      border-top:1px solid #eee
      .left
        flex:1
        height:100%
        padding-left:4%
        text-align:left
        font-size:0
        .payNum
          vertical-align:top
          display:inline-block
          line-height:46px
          font-size:17px
          color:rgb(38, 38, 38)
        .pay
          vertical-align:top
          display:inline-block
          padding-left:8px
          line-height:46px
          font-size:17px
          color:rgb(255, 72, 145)
          span
            font-size:17px
            padding-top:19px
            font-weight:700
        .vip-cost
          display:inline-block
          vertical-align:top
          font-size:12px
          line-height:17px
          padding-top:17px
          padding-left:7px
          color:rgb(150, 150, 150)
      .right
        width:102px
        background:#ff4891
        text-align:center
        font-size:0
        span
          vertical-align:top
          font-size:17px
          line-height:46px
          color:#fff
        img
          vertical-align:top
          width:7px
          height:10px
          padding-top:18px
          margin-left:11px
</style>
