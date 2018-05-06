<template>
    <div class="mine">
      <div class="mine-wrapper" ref="minewrap">
        <div class="mine-content">
          <div class="topBox">
            <div class="sign"><p @click="openSignMask">签到<i v-show="!signed"></i></p></div>
            <div class="user">
              <img class="avatar" src="./img/avatar.png"/>
              <div class="nameBox">
                <span class="name">小鲜</span>
                <img class="level" src="./img/level.png"/>
              </div>
            </div>
            <div class="expired">2019.01.01会员到期</div>
          </div>
          <ul class="asset">
            <li class="asset-item" v-for="item in assets">
              <div class="top">{{item.num}}<span>{{item.unit}}</span></div>
              <div class="bot">{{item.des}}<img v-if="item.image" :src="item.image"/></div>
            </li>
          </ul>
          <div class="vipContent">
            <div class="tit">
              会员权益
              <span>去续费<img src="./img/arrow-right.png"/></span>
            </div>
            <div class="subtit">成为优享会员，预计1年将为你<span>节省1121.30元</span></div>
            <div class="welfareBox" ref="welfarebox">
              <ul class="welfare" ref="welfare">
                <li class="welfare-item" v-for="item in welfares">
                  <img :src="item.image"/>
                  <div class="des">{{item.des}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="imageBox">
            <img src="./img/image-left.png"/>
            <img src="./img/image-right.png"/>
          </div>
          <ul class="mine-list">
            <li class="mine-item">
              <div class="left">账户与安全</div>
              <div class="right" @click="openPop(0)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">我的订单</div>
              <div class="right" @click="openPop(1)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">我的地址</div>
              <div class="right" @click="openPop(2)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">客服与帮助</div>
              <div class="right" @click="openPop(3)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">意见反馈</div>
              <div class="right" @click="openPop(4)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">消息</div>
              <div class="right" @click="openPop(5)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">关于我们</div>
              <div class="right" @click="openPop(6)"><img src="./img/arrow-right.png"/></div>
            </li>
            <li class="mine-item">
              <div class="left">设置</div>
              <div class="right" @click="openPop(7)"><img src="./img/arrow-right.png"/></div>
            </li>
          </ul>
        </div>
      </div>
      <transition name="diminish">
        <div class="signMask" v-if="isShowSignMask">
          <div class="signIn">
            <img class="todayImg" src="./img/signPic.jpg"/>
            <img class="imgShadow" src="./img/sign-imgs-shadow.png"/>
            <div class="tip">
              <img src="./img/sign-pointer.png"/>
              <span>长按上图 保存图片发送到朋友圈</span>
              <transition name="sign-tip">
                <div class="already-signed" v-if="signTip">
                  <div class="txt" v-if="!signed">签到成功啦</div>
                  <div class="txt" v-else>您今天已经签过到了哦</div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
      <transition name="sign-fade">
        <div class="signMaskBg" @click="closeSignMask" v-if="isShowSignMask"></div>
      </transition>
      <transition name="pop-slide">
        <div class="pop" v-if="isShowPop">
          <div class="pop-ban" v-for="item,index in pops" v-if="nowPopIndex===index && item.hasBan">
            <img class="back" src="./img/icon-back.png" @click="closePop"/>
            <span class="tit">{{item.banTit}}</span>
            <span class="top-btn" v-if="item.topBtn" @click="btnMethod(index)">{{item.topBtn}}</span>
          </div>
          <div class="account-hook" v-if="nowPopIndex===0">
              <ul class="account-list">
                <li>
                  <span class="left">手机号</span>
                  <span class="mid">13500000000</span>
                  <span class="right"><img src="./img/arrow-right.png"/></span>
                </li>
                <li>
                  <span class="left">微信账号</span>
                  <span class="mid">小鲜</span>
                  <span class="right"></span>
                </li>
                <li>
                  <span class="left">支付密码</span>
                  <span class="mid"></span>
                  <span class="right"><img src="./img/arrow-right.png"/></span>
                </li>
              </ul>
            </div>
          <div class="order-hook" v-if="nowPopIndex===1" ref="orderhook">
            <div class="order-hook-in">
              <div class="order-content-wrapper" v-if="orderStore.length">
                <div class="order-content" v-for="item,index in orderStore">
                  <div class="order-time">
                    <img class="left" src="./img/icon-arrive.png"/>
                    <span class="right">{{item.time}}</span>
                  </div>
                  <img-scroll :goods="item.goods"></img-scroll>
                  <div class="progress">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="stepBox">
                      <div class="step">
                        <img src="./img/progress-1.png"/>
                        <div class="txt">已提交</div>
                      </div>
                      <div class="step">
                        <img src="./img/progress-2.png"/>
                        <div class="txt">已支付</div>
                      </div>
                      <div class="step">
                        <img src="./img/progress-3.png"/>
                        <div class="txt">配送中</div>
                      </div>
                      <div class="step">
                        <img src="./img/progress-4_0.png"/>
                        <div class="txt">未签收</div>
                      </div>
                    </div>
                  </div>
                  <div class="pay-box">
                    <span class="finalPrice">实付:<em>￥{{item.price}}</em></span>
                  </div>
                </div>
              </div>
              <div class="order-empty" v-if="!orderStore.length">
                <div class="tipBox">
                  <img src="./img/no-order.fde7327.png"/>
                  <p>您还没有订单哦，快去首页选购吧~</p>
                </div>
              </div>
            </div>
            <div class="order-invoice-empty" v-if="isShowOrderInvoice" @click="isShowOrderInvoice=false">
              <div class="tipBox">
                <img src="./img/no-order.fde7327.png"/>
                <p>您还没可以开的发票哦~</p>
              </div>
            </div>
          </div>
          <div class="address-hook" v-if="nowPopIndex===2">
            <address-list></address-list>
          </div>
          <div class="help-hook" v-if="nowPopIndex===3" ref="helphook">
            <div class="help-hook-in">
              <div class="self-service" >
                <div class="tit">自助服务</div>
                <div class="imgBox">
                  <img src="./img/self-service.png"/>
                  <p>发票服务</p>
                </div>
              </div>
              <h1 class="question">猜你想问</h1>
              <div class="quesBox" v-for="item in questions">
                <ques-tab :ans="item.ans" :qes="item.qes"></ques-tab>
              </div>

            </div>
          </div>
          <div class="advise-hook" v-if="nowPopIndex===4">
            <div class="complete">
              <textarea placeholder="请写下您的意见或建议" class="textCont"></textarea>
              <div class="txtTip">每一条反馈小鲜都会认真对待。我们将定期选出优秀反馈意见，发送积分奖励哦~</div>
              <div class="adviseBtnBox">
                <div class="btn" @click="submitAdvise">提交</div>
              </div>
            </div>
          </div>
          <div class="message-hook" v-if="nowPopIndex===5">
            <ul class="message-list">
              <li>
                <span class="left">订单信息</span>
                <span class="mid"></span>
                <span class="right"><img src="./img/arrow-right.png"/></span>
              </li>
              <li>
                <span class="left">活动信息</span>
                <span class="mid"></span>
                <span class="right"><img src="./img/arrow-right.png"/></span>
              </li>
            </ul>
          </div>
          <div class="about-hook" v-if="nowPopIndex===6" ref="abouthook">
            <div class="about-hook-in">
              <img src="./img/about-us-01.png"/>
              <img src="./img/about-us-01.png"/>
              <img src="./img/about-us-01.png"/>
            </div>
          </div>
          <div class="set-hook" v-if="nowPopIndex===7">
            <div class="avatar">
              <img src="./img/avatar.png"/>
            </div>
            <ul class="setList">
              <li class="setItem">
                <span class="left">昵称</span>
                <span class="right"><p class="rightP">小鲜</p></span>
              </li>
              <li class="setItem">
                <span class="left">版本</span>
                <span class="right"><img class="rightImg" src="./img/arrow-right.png"/></span>
              </li>
              <li class="setItem">
                <span class="left">清除缓存</span>
                <span class="right"><img class="rightImg" src="./img/arrow-right.png"/></span>
              </li>
              <li class="setItem">
                <span class="left">订单消息</span>
                <span class="right">
                  <div class="toggleBox">
                    <toggle :onOff="notice[0].onOff" @turnOnOff="noticeOnOffHandle(0)"></toggle>
                  </div>
                </span>
              </li>
              <li class="setItem">
                <span class="left">优惠消息</span>
                <span class="right">
                  <div class="toggleBox">
                    <toggle :onOff="notice[1].onOff" @turnOnOff="noticeOnOffHandle(1)"></toggle>
                  </div>
                </span>
              </li>
            </ul>
            <div class="logoutBtn">退出登录</div>
          </div>
        </div>
      </transition>
      <transition name="gratitude-fade">
        <div class="gratitude" v-if="isShowGratitude">感谢您的宝贵意见~</div>
      </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import ImgScroll from './comps/imgscroll'
    import AddressList from '../public/addresslist'
    import QuesTab from './comps/questab'
    import Toggle from './comps/toggle'
    export default {
      components:{
        ImgScroll,
        AddressList,
        QuesTab,
        Toggle
      },
      data(){
        return{
          signed:false,
          signTip:false,
          firstSign:true,
          assets:[
            {
              "num":0,
              "unit":"元",
              "des":"余额•储值",
              "image":"https://j-image.missfresh.cn/img_20180205201631182.gif"
            },
            {
              "num":2,
              "unit":"张",
              "des":"红包"
            },
            {
              "num":0,
              "unit":"张",
              "des":"商品券"
            },
            {
              "num":0,
              "unit":"分",
              "des":"积分兑换>"
            }
          ],
          welfares:[
            {
              "image":"https://j-image.missfresh.cn/img_20171028202643589.png?iopcmd=convert&dst=png&q=80",
              "des":"购物返现5%"
            },
            {
              "image":"https://j-image.missfresh.cn/img_20171103161358679.png?iopcmd=convert&dst=png&q=80",
              "des":"会员专享价"
            },
            {
              "image":"https://j-image.missfresh.cn/img_20171028202735028.png?iopcmd=convert&dst=png&q=80",
              "des":"1小时送达"
            },
            {
              "image":"https://j-image.missfresh.cn/img_20180105021625371.png?iopcmd=convert&dst=png&q=80",
              "des":"专属红包"
            },
            {
              "image":"https://j-image.missfresh.cn/img_20171028202909231.png?iopcmd=convert&dst=png&q=80",
              "des":"专属客服"
            },
            {
              "image":"https://j-image.missfresh.cn/img_20180105021607945.png?iopcmd=convert&dst=png&q=80",
              "des":"敬请期待"
            }
          ],
          isShowSignMask:false,
          nowPopIndex:1,
          pops:[
            {
              "banTit":"账户与安全",
              "id":0,
              "hasBan":true
            },
            {
              "banTit":"我的订单",
              "id":1,
              "hasBan":true,
              "topBtn":"开发票"
            },
            {
              "banTit":"我的地址",
              "id":2,
              "hasBan":true
            },
            {
              "banTit":"客服与帮助",
              "id":3,
              "hasBan":true
            },
            {
              "banTit":"意见反馈",
              "id":4,
              "hasBan":true
            },
            {
              "banTit":"消息中心",
              "id":5,
              "hasBan":true
            },
            {
              "banTit":"关于我们",
              "id":6,
              "hasBan":true
            },
            {
              "banTit":"设置",
              "id":7,
              "hasBan":true
            }
          ],
          isShowPop:false,
          isShowOrderInvoice:false,
          questions:[
            {
              "qes":"1、如何催单",
              "ans":["● 订单状态为“待发货”时，进入APP【我的】--【我的订单】--【查看详情】--【催单】", "● 订单状态为“配送中”时，进入APP【我的】--【我的订单】--【查看详情】--联系配送员或快递承运商客服。"]
            },
            {
              "qes":"2、商品不想要了怎么退款？",
              "ans":[
                      "● 生鲜商品具有新鲜度、易腐性等特点限制，目前不支持无理由退换货；",
                      "● 订单状态为“已支付”时，可以申请取消订单，退款金额和使用的优惠券将在1-5个工作日内原路返回到原支付账户中；",
                      "● 订单状态为“配送中”时，无法取消订单；进入APP【我的】--【我的订单】--【查看详情】--联系配送员拒收。",
                      "● 若您收到的商品有问题，请你在签收后48小时内即时拍照留证并联系每日优鲜客服反馈处理；或者进入APP【我的】--【我的订单】--【查看详情】--【申请售后退款】--来进行处理"
                    ]
            },
            {
              "qes":"3、修改收货信息",
              "ans":["● 目前暂不支持修改订单信息，配送员会按照订单上的预留信息进行配送，如需修改收货信息，建议您参考第2条申请退款，重新下单购买。"]
            },
            {
              "qes":"4、红包不可用原因",
              "ans":[
                      "● 部分商品（低价商品、带有不可使用红包标识）不可使用红包" ,
                      "● 红包需购物车中可用红包商品实际支付满使用限额"
                    ]
            },
            {
              "qes":"5、商品券怎么使用",
              "ans":[
                      "● APP/微信商城点击【我的】--【商品券】查看商品券",
                      "● 同一笔订单只可以使用一张商品券,.商品券+会员价+优惠券可以一起使用，只需将商品券添加对应商品在购物车即可",
                      "● 在购物车“去结算”前，商品券会自动出现在“商品券”抵扣区域，结算时会扣除该实物商品金额；如未自动出现在“商品券”抵扣区域且显示“有可用商品券”，可手动点击选择“商品券”进行抵扣"
                    ]
            },
            {
              "qes":"6、如何开发票",
              "ans":[
                      "● APP/微信商城点击【我的】--【我的订单】--【开发票】自主申请开具发票",
                      "● 自主开具发票分为：纸质发票和电子发票"
                    ]
            },
            {
              "qes":"7、没申请退款为什么收到退款短信",
              "ans":[
                     "● 您订单中所购买的商品，有商品未达到出库标准，为保证其他商品按时配送，系统为您操作缺品出库。"
                    ]
            },
            {
              "qes":"8、企业订购",
              "ans":[
                      "● 如您需要企业订购商品或团购储值卡，请您拨打：400-991-1977转接8号可订购，也可以添加我们官方微信：meiriyouxian-qy"
                    ]
            }
          ],
          isShowGratitude:false,
          notice:[
            {
              "onOff":false
            },
            {
              "onOff":false
            }
          ]
        }
      },
      mounted(){
        this._initMineScroll();
        this._initWelfareScroll();
        if(this.openMinePopIndex===1){
          this.openPop(1);
        }
      },
      computed:{
        orderStore(){
          return this.$store.state.orderStore;
        },
        openMinePopIndex(){
          return this.$store.state.openMinePopIndex;
        }
      },
      methods:{
        _initWelfareScroll(){
          this.$refs.welfare.style.width=450+"px";
          this.$nextTick(()=>{
            if(!this.welfarescroll){
              this.welfarescroll=new BScroll(this.$refs.welfarebox,{
                scrollX:true,
                eventPassthrough:"vertical"
              });
            }else{
              this.welfarescroll.refresh();
            }
          })
        },
        _initMineScroll(){
          this.$nextTick(()=>{
            if(!this.minescroll){
              this.minescroll=new BScroll(this.$refs.minewrap,{
                click:true
              });
            }else{
              this.minescroll.refresh();
            }
          })
        },
        _initOrderScroll(){
          this.$nextTick(()=>{
            this.orderscroll=new BScroll(this.$refs.orderhook,{
              click:true
            });
          })
        },
        _initHelpScroll(){
          this.$nextTick(()=>{
            this.helpscroll=new BScroll(this.$refs.helphook,{
              click:true
            });
          })
        },
        _initAboutScroll(){
          this.$nextTick(()=>{
            this.aboutscroll=new BScroll(this.$refs.abouthook,{
              click:true
            });
          })
        },
        openSignMask(){
          this.isShowSignMask=true;
          let that=this;
          setTimeout(function(){
            that.signTip=true;
            setTimeout(function(){
              that.signTip=false;
              that.signed=true;
            },2000);
          },1000);

        },
        closeSignMask(){
          this.isShowSignMask=false;
        },
        openPop(index){
          this.$store.commit("openMineOrder",-1);
          this.isShowPop=true;
          this.nowPopIndex=index;
          var that=this;
          if(index===1){
            this._initOrderScroll();
          }
          if(index===3){
            this._initHelpScroll();
          }
          if(index===6){
            this._initAboutScroll();
          }
        },
        closePop(){
          this.isShowPop=false;
          this.nowPopIndex=-1
        },
        btnMethod(index){
          if(index===1){
            this.isShowOrderInvoice=true;
          }
        },
        submitAdvise(){
          let ad=document.querySelectorAll(".textCont")[0].value;
          var that=this
          if(ad!==""){
            this.isShowPop=false;
            this.nowPopIndex=-1;
            setTimeout(function(){
              that.isShowGratitude=true;
              setTimeout(function(){
                that.isShowGratitude=false;
              },2500)
            },150)
          }
        },
        noticeOnOffHandle(index){
          this.notice[index].onOff=!this.notice[index].onOff;
        },
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .mine
    width:100%
    font-family:"-apple-system", "Helvetica Neue", Roboto, "Segoe UI", sans-serif
    .mine-wrapper
      z-index:0
      position:absolute
      top:0
      left: 0
      right: 0
      bottom:49px
      width: 100%
      background:#fff
      overflow:hidden
      .mine-content
        width: 100%
        tetx-align:center
        .topBox
          width:100%
          padding-bottom:15px
          background:url('./img/banImg.jpg') 0% 50% no-repeat;
          background-size:100% auto
          .sign
            width: 92%
            margin:0 auto
            padding-top:8px
            text-align:right
            p
              position: relative
              display: inline-block
              min-width: 50px
              height: 30px
              font-size:14px
              line-height: 30px
              text-align: center
              color:#fff
              margin-top: 5px
              i
                position:absolute
                top:6px
                right:0px
                width:6px
                height:6px
                -webkit-border-radius: 50%
                -moz-border-radius: 50%
                border-radius: 50%
                background:#ff4891
          .user
            width: 92%
            margin:15px auto 0px
            text-align:left
            .avatar
              display:inline-block
              width: 74px
              height: 74px
              border-radius:50%
            .nameBox
              display:inline-block
              margin-left: 14px
              font-size:0
              vertical-align:top
              padding-top:29px
              .name
                display: inline-block
                max-width: 100px
                font-size: 16px
                color: #fff
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                vertical-align:top
              .level
                margin-left: 6px
                width: 50px
                height: 15px
                vertical-align:top
          .expired
            width:92%
            margin:0 auto
            text-align:right
            color:#fff
            font-size:12px
        .asset
          display:flex
          flex-direction:row
          width: 100%
          margin:12px auto
          height: 62px
          .asset-item
            flex:1
            list-style:none
            text-align:center
            height: 42px
            padding:10px 0
            .top
              width: 100%
              text-align:center
              line-height:22px
              font-size: 18px
              color:#4d4d4d
              span
                font-size:12px
            .bot
              position:relative
              width: 100%
              text-align:center
              line-height:20px
              font-size: 12px
              color:#4d4d4d
              img
                position:absolute
                top: 0
                right:-4px
                width: 24px
                height: 12px
        .vipContent
          width: 92%
          margin:15px auto 0
          .tit
            position:relative
            width:100%
            text-align:left
            font-size: 20px
            line-height: 30px
            color:#474245
            span
              position:absolute
              top: 0
              right:0
              font-size:12px
              line-height: 30px
              color:#969696
              img
                width: 12px
                height: 12px
                vertical-align:top
                padding-top:9px
                padding-left:2px
          .subtit
            width:100%
            font-size: 12px
            color: #969696
            line-height: 18px
            text-align:left
            span
              color:#ff4891
          .welfareBox
            width:100%
            margin:20px auto 5px
            overflow:hidden
            .welfare
              display:block
              height:70px
              text-align:left
              white-space:nowrap
              .welfare-item
                display:inline-block
                list-style:none
                width:75px
                height:70px
                text-align:center
                img
                  width:28px
                  height: 28px
                  margin:0 auto
                  padding-bottom:7px
                .des
                  width:100%
                  text-align:center
                  font-size: 12px
                  color:#474245
                  line-height:20px
        .imageBox
          width:92%
          margin:8px auto 30px
          img
            display:inline-block
            width:48%


        .mine-list
          width: 92%
          margin:0 auto
          .mine-item
            display:flex
            flex-direction:row
            width: 100%
            height: 60px
            border-top-1px(#f0f0f0)
            .left
              flex:1
              display: block;
              font-size: 15px;
              line-height: 60px;
              color: #262626;
              text-align:left
            .right
              width: 17px
              height: 17px
              padding:21px 0 0
              img
                width: 17px
                height:17px
    .signMask
      z-index:100
      position:fixed
      top:85px
      left:10%
      width:80%
      text-align:center
      &.diminish-enter-active
        transition:0.3s all ease-out
      &.diminish-enter
        transform:scale(2)
      &.diminish-enter-to
        transform:scale(1)
      .signIn
        width:295px
        height:453px
        margin:0 auto
        text-align:center
        background:#fff
        .todayImg
          width: 275px
          height: 395px
          margin:10px 10px 0
        .imgShadow
          width: 275px
          height: 17px
          margin:0 auto
        .tip
          position:relative
          width: 100%
          text-align:center
          font-size:0
          img
            vertical-align:top
            width: 16px
            height: 16px
            padding-top: 1px
          span
            vertical-align:top
            font-size: 14px
            color:#b8b8b8
            line-height:18px
          .already-signed
            position:absolute
            top:-120px
            left:0
            width:100%
            text-align:center
            &.sign-tip-enter-active,&.sign-tip-leave-active
              transition:0.2s opacity linear
            &.sign-tip-enter,&.sign-tip-leave-to
              opacity: 0
            &.sign-tip-enter-to,&.sign-tip-leave
              opacity:1
            .txt
              display:inline-block
              height:36px
              width:auto
              margin:0 auto
              padding:0 20px
              border-radius:4px
              text-align:center
              background:rgba(0,0,0,0.7)
              font-size: 14px
              line-height:36px
              color: #ffffff
    .signMaskBg
      z-index:80
      position:fixed
      top: 0
      left:0
      right: 0
      bottom:0
      background:rgba(0,0,0,0.7)
      &.sign-fade-enter-active
        transition:0.3s all ease-out
      &.sign-fade-leave-active
        transition:0.2s all ease-in
      &.sign-fade-enter,&.sign-fade-leave-to
        opacity:0
      &.sign-fade-enter-to,&.sign-fade-leave
        opacity:1
    .pop
      z-index:120
      display:flex
      flex-direction:column
      position:fixed
      top: 0
      bottom: 49px
      text-align:center
      width:100%
      background:#f0f0f0
      &.pop-slide-enter-active,&.pop-slide-leave-active
        transition:0.5s all linear
      &.pop-slide-enter,&.pop-slide-leave-to
        transform:translateX(100%)
      &.pop-slide-enter-to,&.pop-slide-leave
        transform:translateX(0)
      .pop-ban
        flex-direction:row
        width:92%
        padding:0 4%
        height:43px
        margin:0 auto
        font-size:0
        background:#fff
        border-bottom-1px(#ebebeb)
        box-shadow:0 0 10px rgba(0,0,0,.06)
        text-align:left
        .back
          vertical-align:top
          display:inline-block
          width:20px
          height:20px
          padding-top:11px
          padding-right:15%
        .tit
          vertical-align:top
          display:inline-block
          width:60%
          font-size: 17px
          line-height:43px
          color:#4b4b4b
          font-weight:500
          overflow:hidden
          white-space:nowrap
          text-overflow:ellipsis
          text-align:center
        .top-btn
          display:inline-block
          vertical-align:top
          width:18%
          text-align:right
          font-size: 17px
          line-height:43px
          color:#4c4440
          font-weight:500
          overflow:hidden
          white-space:nowrap
          text-overflow:ellipsis
      .account-hook
        flex:1
        width:100%
        text-align:center
        background:#fff
        .account-list
          width: 100%
          li
            list-style:none
            height: 46px
            width: 92%
            padding:0 4%
            text-align:left
            font-size:0
            border-bottom-1px(#ebebeb)
            .left
              vertical-align:top
              display:inline-block
              width: 25%
              text-align:left
              font-size:14px
              line-height:46px
              color:#444
            .mid
              vertical-align:top
              display:inline-block
              width: 65%
              text-align:right
              font-size: 14px
              line-height: 46px
              color:#aaa
            .right
              vertical-align:top
              display:inline-block
              width: 10%
              text-align:right
              img
                width: 16px
                height:16px
                padding-top:14px
      .order-hook
        flex:1
        width:100%
        overflow:hidden
        .order-hook-in
          width:100%
          .order-content-wrapper
            width:100%
            .order-content
              width:100%
              margin:7px auto 0
              background:#fff
              .order-time
                display:flex
                width: 92%
                margin:0 auto
                text-align:left
                font-size:0
                border-bottom-1px(#ebebeb)
                .left
                  vertical-align:top
                  width: 55px
                  height:14px
                  padding-top:15px
                .right
                  vertical-align:top
                  flex:1
                  text-align:right
                  font-size: 12px
                  color:#969696
                  line-height:44px
              .progress
                position:relative
                width: 92%
                height:47px
                margin:14px auto 0
                padding-bottom:14px
                text-align:left
                border-bottom-1px(#ebebeb)
                .line1
                  display:inline-block
                  width:134px
                  height:1px
                  margin-left:17px
                  border-bottom:1px solid #f6818a
                .line2
                  display:inline-block
                  width:46px
                  height:1px
                  border-bottom:1px solid #ddd
                .stepBox
                  position:absolute
                  top: 0
                  left:0
                  .step
                    display:inline-block
                    width: 54px
                    height: 47px
                    text-align:center
                    font-size:0
                    img
                      display:inline-block
                      width: 22px
                      height:22px
                      padding:0 16px
                    .txt
                      width: 100%
                      text-align:center
                      font-size: 12px
                      color:#474346
                      margin-top:5px
              .pay-box
                width: 92%
                margin:0 auto
                height: 50px
                text-align:left
                .finalPrice
                  font-size: 14px
                  color:#474346
                  line-height: 50px
                  em
                    font-style:normal
                    font-weight:600
          .order-empty
            width:100%
            padding-bottom:78%
            background:#fff
            .tipBox
              width:100%
              padding-top:180px
              text-align:center
              img
                width:91px
                height:91px
                margin:0 auto 15px
              p
                width:100%
                text-align:center
                font-size:14px
                line-height:21px
                color:#969696
        .order-invoice-empty
          position:absolute
          top:0
          left:0
          bottom:0
          width:100%
          height:100%
          background:#fff
          .tipBox
            width:100%
            padding-top:220px
            text-align:center
            img
              width:91px
              height:91px
              margin:0 auto 15px
            p
              width:100%
              text-align:center
              font-size:14px
              line-height:21px
              color:#969696
      .help-hook
        width:100%
        background:#fff
        overflow:hidden
        .help-hook-in
          width:100%
          .self-service
            width:92%
            margin:20px auto 40px
            text-align:left
            .tit
              height: 34px
              line-height: 34px
              font-size: 20px
              color:#000
            .imgBox
              width:60px
              text-align:center
              margin:14px 0
              img
                width:36px
                height:36px
                margin:0 auto 10px
              p
                font-size:14px
                color:#000
          .question
            width:92%
            margin:0 auto 5px
            text-align:left
            height: 34px
            line-height: 34px
            font-size: 20px
            color:#000
          .quesBox
            width:100%
            margin:0 auto
      .advise-hook
        width:100%
        margin:15px auto
        textarea
          width:86%
          margin:0 auto
          padding: 10px
          border: 1px solid #e6e6e6
          color: #262626
          background: #f5f5f5
          min-height: 130px
          border-radius: 4px
          margin-bottom: 6px
          resize:none
          outline:none
          font-family:"-apple-system", "Helvetica Neue", Roboto, "Segoe UI", sans-serif
          &::input-placeholder
            font-family:-apple-system
            font-size:14px
            color:#aeaeae
          &::-webkit-input-placeholder
            font-family:-apple-system
            font-size:14px
            color:#aeaeae
        .txtTip
          width:90%
          margin:0 auto
          line-height:20px
          font-size:12px
          text-align:justify
          text-justify:inter-ideograph
          color:#000
        .adviseBtnBox
          width:92%
          margin:20px auto 0
          .btn
            width:100%
            margin-top: 20px
            height: 44px
            font-size: 16px
            line-height: 44px
            text-align: center
            color: #fff
            background:#ff4891

      .message-hook
        flex:1
        width:100%
        text-align:center
        background:#fff
        .message-list
          width: 100%
          li
            list-style:none
            height: 46px
            width: 92%
            padding:0 4%
            text-align:left
            font-size:0
            border-bottom-1px(#ebebeb)
            .left
              vertical-align:top
              display:inline-block
              width: 25%
              text-align:left
              font-size:14px
              line-height:46px
              color:#444
            .mid
              vertical-align:top
              display:inline-block
              width: 65%
              text-align:right
              font-size: 14px
              line-height: 46px
              color:#aaa
            .right
              vertical-align:top
              display:inline-block
              width: 10%
              text-align:right
              img
                width: 16px
                height:16px
                padding-top:14px
      .about-hook
        width:100%
        overflow:hidden
        .about-hook-in
          width:100%
          img
            display:block
            width:100%
            margin-bottom:20px
            &.last-of-type
              margin-bottom:0
      .set-hook
        flex:1
        width:100%
        background:#fff
        .avatar
          width:92%
          margin:0 auto
          padding:10px 0
          text-align:left
          border-bottom-1px(#ebebeb)
          img
            width:48px
            height:48px
        .setList
          width:92%
          margin:0 auto
          .setItem
            display:flex
            flex-direction:row
            width:100%
            height:50px
            text-align:left
            border-bottom-1px(#ebebeb)
            .left
              flex:1
              font-size:13px
              color:#695e6b
              line-height:50px
            .right
              display:relative
              width:40%
              text-align:right
              .rightP
                font-size:13px
                color:#695e6b
                line-height:50px
                text-align:right
                padding-right:20px
              .rightImg
                display:inline-block
                width: 16px
                height:16px
                text-align:right
                padding-top:14px
              .toggleBox
                position:absolute
                top:13px
                right:0
        .logoutBtn
          width:92%
          margin:54px auto 0
          background:#FC6D41
          height:47px
          text-align:center
          font-size:16px
          color:#fff
          line-height:47px
    .gratitude
      z-index:100
      position:fixed
      left:30%
      bottom:40%
      padding:0 15px
      font-size:14px
      color:#fff
      line-height:36px
      border-radius:6px
      text-align:center
      background:rgba(0,0,0,0.6)
      &.gratitude-fade-enter-active
        transition:0.5s all ease-out
      &.gratitude-fade-leave-active
        transition:0.2s all ease-in
      &.gratitude-fade-enter,&.gratitude-fade-leave-to
        opacity:0
      &.gratitude-fade-enter-to,&.gratitude-fade-leave
        opacity:1
</style>
