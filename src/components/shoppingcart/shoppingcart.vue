<template>
  <div class="shoppingCart">
    <div class="full" v-if="selectGoodsData.length>0">
      <div class="cartBan">
        <div class="banCenter">
          <span class="tip">小提示</span>
          <span class="tip_cont">开通会员卡，本单可返{{refund}}元</span>
        </div>
      </div>
      <div class="content-wrapper" ref="shopcart">
        <div class="content">
          <div class="locat">
            <img src="./img/icon-position.png">
            <span>{{currentCityOrLocation}}</span>
            <i class="icon-arrow_down"></i>
          </div>
          <div class="gooListNav">
              <img @click="checkedAll($event)" v-if="allChecked" src="./img/icon-checked.png"/>
              <img @click="checkedAll($event)" v-if="!allChecked" src="./img/icon-unchecked.png"/>
              <span class="delivery-time">次日达</span>
              <span class="freight" v-if="!finalFreight">免运费</span>
              <span class="freight" v-else>实付满69元包邮，还差{{supplement}}元,去凑单<router-link to="/home"><i class="icon-keyboard_arrow_right"></i></router-link></span>
            </div>
          <div class="goodList">
            <ul>
              <li v-for="good in selectGoodsData">
                <div class="li-inner">
                  <div class="checkBox">
                    <img @click="checking(good)"  v-if="good.checked" src="./img/icon-checked.png"/>
                    <img @click="checking(good)"  v-if="!good.checked" src="./img/icon-unchecked.png"/>
                  </div>
                  <div class="imgBox">
                    <img class="image" :src="good.image"/>
                    <img class="tag" :src="good.promote_tag" v-if="good.promote_tag"/>
                  </div>
                  <div class="infoBox">
                    <div class="tit">{{good.name}}</div>
                    <div class="promotion" v-if="good.promotion_tag">{{good.promotion_tag}}</div>
                    <div class="promotion-space" v-else></div>
                    <div class="vip_price" v-if="good.vip_price">￥{{good.vip_price/100}}<img src="../public/img/vip.png"/></div>
                    <div class="price">￥{{good.price/100}}</div>
                    <div class="counting-wrapper">
                      <counting :good="good"></counting>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="priceBox">
            <div class="totalPrice">
              <span class="left">商品总价</span>
              <span class="right">￥{{finalPrice/100}}</span>
            </div>
            <div class="freight">
              <div class="pay clearfix">
                <span class="left">商品实付</span>
                <span class="right">￥{{finalPrice/100}}</span>
              </div>
              <div class="deliveryPrice  clearfix">
                <span class="left">运费</span>
                <span class="left tip">实付满69元包邮</span>
                <span class="right">￥{{finalFreight}}</span>
              </div>
            </div>
            <div class="sum">
              <span>合计<i>￥{{finalPrice/100+finalFreight}}</i></span>
            </div>
          </div>
          <vip></vip>
        </div>
      </div>
      <div class="cartBottom">
        <div class="bottom-inner">
          <div class="left">
            <img @click="checkedAll($event)" v-if="allChecked" src="./img/icon-checked.png"/>
            <img @click="checkedAll($event)" v-if="!allChecked" src="./img/icon-unchecked.png"/>
            <span class="all">全选</span>
            <span class="total">合计<em class="total_price">￥{{finalPrice/100+finalFreight+vipCost}}</em><br/>
              <em class="freight" v-if="!finalFreight">免邮</em>
              <em class="freight" v-if="finalFreight">运费￥10</em>
              <em class="freight" v-if="vipCost">,包含会员卡费用{{vipCost}}元</em>
            </span>
          </div>
          <div class="right" @click="confirmOrderOnHandle">去结算<img src="./img/icon-arrow-right.png"/></div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="selectGoodsData.length===0">
      <div class="emptyImg">
        <img src="./img/icon-empty.png"/>
      </div>
      <div class="emptyTxt">您还没有添加任何商品</div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import Counting from '../public/counting'
    import Vip from '../public/vip'
    export default {
      components:{
        Counting,
        Vip
      },
      data(){
        return{
          checkState:true
        }
      },
      mounted(){
        if(this.bsOnOff){  //没有商品时不执行BS，否则会因为没有相应的DOM节点而报错
          this._initCartScroll();
        }else{
          return
        }
        this.selectGoodsData.forEach((item)=>{ //为购物车中商品添加checked和checkOption属性
          Vue.set(item,"checked",true);
        })
      },
      watch:{
        "finalCheckedData":function(){
          this.$store.commit("finalCheckedDataHandle",this.finalCheckedData);
        }
      },
      computed:{
        selectGoodsData(){
          return this.$store.getters.selectGoodsData;
        },
        currentGood(){
          return this.$store.getters.currentGood;
        },
        bsOnOff(){
          if(this.selectGoodsData.length>0){
            return true
          }else{
            return false
          }
        },
        finalCheckedData(){
          let finalCheckedData=[];
          this.selectGoodsData.forEach((item)=>{
            if(item.checked){
              finalCheckedData.push(item);
            }
          });
          return finalCheckedData;
        },
        // finalCheckedData(){
        //   return this.$store.getters.finalCheckedData;
        // },
        finalPrice(){
          return this.$store.getters.finalPrice;
        },
        finalFreight(){
          return this.$store.getters.finalFreight;
        },
        refund(){
          return this.$store.getters.refund;
        },
        vipCost(){
          return this.$store.getters.vipCost;
        },
        supplement(){
          return Math.round((69-this.finalPrice/100)*10)/10
        },
        allChecked(){
          return this.$store.state.allChecked;
        },
        currentCityOrLocation(){
          if(this.$store.state.currentLocation.name && this.$store.state.currentLocation.name!==undefined){
            return this.$store.state.currentLocation.name
          }else{
            return this.$store.state.currentCity;
          }
        }

      },
      methods:{
        _initCartScroll(){
          this.$nextTick(()=>{
           if(!this.cartscroll){
              this.cartscroll=new BScroll(this.$refs.shopcart,{
                click:true
              })
            }else{
              this.cartscroll.refresh();
            }
          })
        },
        checking(good){
          good.checked=!good.checked;
          this.$store.commit("changeAllCheckedHandle",this.selectGoodsData);
        },
        checkedAll(){
          this.$store.commit("checkAllHandle",this.selectGoodsData);
        },
        confirmOrderOnHandle(){
          this.$store.commit("confirmOrderOn")
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .shoppingCart
    position:fixed
    top:0
    bottom:49px
    width:100%
    background:#f0f0f0
    .full
      position:relative
      height:100%
      .cartBan
        z-index:100
        pdisplay:flex
        position:fixed
        top:0
        left:0
        width:100%
        height:34px
        background:#fff9e2
        border-bottom:1px solid #ddd
        .banCenter
          flex:1
          margin:7px 15px 24px
          .tip
            padding:2px
            background:#ff4891
            border-radius:3px
            line-height:16px
            color:#fff
            font-size:12px
          .tip_cont
            font-size:12px
            line-height:16px
            color:#4b4b4b
      .content-wrapper
        position:absolute
        top:34px
        bottom:49px
        width:100%
        overflow:hidden
        //margin-top:34px
        .content
          width:100%
          .locat
            width:100%
            background:#fff
            text-align:center
            height:44px
            font-size:0
            margin-bottom:10px
            img
              vertical-align:top
              width:22px
              height:22px
              padding-right:5px
              padding-top:11px
            span
              vertical-align:top
              font-size:16px
              line-height:44px
              color:#262626
            i
              display:inline-block
              vertical-align:top
              width:16px
              height:15px
              font-size:15px
              padding-top:17px
              color:#6b6b6b
          .gooListNav
            width:100%
            height:44px
            background:#fff
            border-bottom-1px(#e5e5e5)
            font-size:0
            img
              vertical-align:top
              display:inline-block
              float:left
              width:22px
              height:22px
              padding:11px 10px 0
              margin-left:5px
            .delivery-time
              font-size:14px
              color:#262626
              float:left
              line-height:44px
            .freight
              vertical-align:top
              float:right
              font-size:12px
              color:#ff4891
              line-height:44px
              margin-right:15px
              i
                color:#999
                display:inline-block
                vertical-align:middle
                font-style:normal
                font-size:18px
                line-height:44px
          .goodList
            ul
              width:100%
              margin:0 auto
              margin-bottom:10px
              background:#fff
              li
                width:100%
                padding-top:21px
                margin:0 auto 0
                border-bottom-1px(#e5e5e5)
                .li-inner
                  display:flex
                  flex-direction:row
                  width:92%
                  margin:0 auto
                  text-align:left
                  padding-bottom:26px
                  .checkBox
                    height:22px
                    width:22px
                    margin-right:14px
                    padding-top:26px
                    img
                      width:22px
                      height:22px
                  .imgBox
                    position:relative
                    width:70px
                    height:74px
                    margin-right:13px
                    .image
                      width:70px
                      height:74px
                    .tag
                      position:absolute
                      top:-10px
                      left:-10px
                      width:25px
                      height:32px
                  .infoBox
                    display:inline-block
                    position:relative
                    flex:1
                    overflow:hidden
                    .tit
                      display:inline-block
                      width:100%
                      font-size:14px
                      color:#474245
                      line-height:20px
                      overflow:hidden
                      text-overflow:ellipsis
                      white-space:nowrap
                    .promotion
                      display:inline-block
                      padding:1px
                      font-size:12px
                      line-height:10px
                      color:rgb(245, 159, 193)
                      border:1px solid rgb(245, 159, 193)
                      border-radius:2px
                      margin-bottom:4px
                    .promotion-space
                      display:inline-block
                      height:12px
                      margin-bottom:0px
                    .vip_price
                      font-size:12px
                      line-height:12px
                      color:rgb(150, 150, 150)
                      img
                        width:30px
                        height:10px
                        padding:4px 0 0 3px
                    .price
                      font-size:15px
                      line-height:20px
                      color:rgb(255, 72, 145)
                    .counting-wrapper
                      position:absolute
                      right:0
                      bottom:10px
                      .counting
                        z-index:10
                        .hasCount
                          font-size:0
                          .decrease,.increase
                            display:inline-block
                            vertical-align:top
                            padding:4px
                            font-size:22px
                            color:#ddd
                            font-family
                            font-weight:200
                          .num
                            display:inline-block
                            vertical-align:top
                            padding-top:5px
                            width:25px
                            font-size:14px
                            line-height:22px
                            color:#777
                            text-align:center
          .priceBox
            width:100%
            margin-bottom:10px
            background:#fff
            .totalPrice
              width:92%
              padding:10px 4%
              height:44px
              border-bottom-1px(#e5e5e5)
              span
                font-size:14px
                line-height:44px
                color:rgb(38, 38, 38)
                &.left
                  float:left
                &.right
                  float:right
            .freight
              width:92%
              padding:15px 4% 15px
              border-bottom-1px(#e5e5e5)
              .pay
                width:100%
                font-size:0
                span
                  font-size:14px
                  line-height:25px
                  color:rgb(38, 38, 38)
                  &.left
                    float:left
                  &.right
                    float:right
              .deliveryPrice
                width:100%
                font-size:0
                span
                  font-size:14px
                  line-height:20px
                  color:rgb(38, 38, 38)
                  &.tip
                    font-size:12px
                    color:#969696
                    margin-left:6px
                  &.left
                    float:left
                  &.right
                    float:right
            .sum
              width:92%
              padding:20px 4% 15px
              text-align:right
              span
                font-size:14px
                lin-height:20px
                i
                  font-style:normal
                  color:#ff4891
      .cartBottom
        position:fixed
        left:0
        right:0
        bottom:49px
        width:100%
        height:49px
        background:#fff
        box-shadow:0 0 10px rgba(0,0,0,.06)
        .bottom-inner
          display:flex
          flex-direction:raw
          width:100%
          margin:0 auto
          font-size:0
          .left
            flex:1
            margin-left:4%
            img
              vertical-align:top
              width:22px
              height:22px
              padding-top:14px
            .all
              vertical-align:top
              font-size:14px
              color:#262626
              line-height:49px
              margin:0 8px 0 1px
            .total
              vertical-align:top
              padding-top:10px
              display:inline-block
              height:30px
              font-size:14px
              line-height:15px
              text-align:left
              .total_price
                padding-left:2px
                font-style:normal
                color:#ff4891
              .freight
                font-style:normal
                font-size:12px
                line-height:13px
                color:rgb(150, 150, 150)
          .right
            width:124px
            height:49px
            text-align:center
            background:#ff4891
            font-size:18px
            color:#fff
            font-weight:200
            line-height:49px
            img
              width:7px
              height:8px
              padding:18px 0 0 5px
    .empty
      position:fixed
      top:0
      bottom:0
      left:0
      right:0
      width:100%
      height:100%
      background:#f0f0f0
      text-align:center
      .emptyImg
        display:inline-block
        width:90px
        height:90px
        margin:0 auto
        padding-top:180px
        img
          width:90px
          height:90px
      .emptyTxt
        padding-top:20px
        width:100%
        text-align:center
        font-size:15px
        color:#7f7f7f
</style>
