<template>
  <div id="app">
    <router-view></router-view>
    <div class="tab-wrapper">
      <div class="tab border-top-1px">
        <router-link tag="div" to="/home">
          <div class="tab-item item1" :class="{active:isHomePage}"><span>首页</span></div>
        </router-link>

        <router-link tag="div" to="/member">
          <div class="tab-item item2"><span>会员+</span></div>
        </router-link>

        <router-link tag="div" to="/shoppingcart">
          <div class="tab-item item3">
            <span>购物车</span>
            <i class="cartCount" v-if="totalCount">{{totalCount}}</i>
          </div>
        </router-link>

        <router-link tag="div" to="/mine">
          <div class="tab-item item4"><span>我的</span></div>
        </router-link>
      </div>
      <div class="ball-wrapper"> <!--小球动画-->
        <transition-group
          tag="ul" name="drop"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @css="false">
          <div class="ball" v-for="ball,index in balls" :key="index" v-show="ball.show">
            <div class="inner inner-hook"><img :src="currentGood.image" width="100%"/> </div>
          </div>
        </transition-group>
      </div>
    </div>
    <transition name="comfade">
      <good-detail></good-detail>
    </transition>
    <transition name="confirmfade">
      <confirm></confirm>
    </transition>
    <location></location>
    <transition name="recefade">
      <add-store></add-store>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import GoodDetail from './components/public/gooddetail.vue'
  import Confirm from './components/public/confirm'
  import Location from './components/public/location'
  import addStore from './components/public/addstore'
  export default {
    name: 'App',
    components:{
      GoodDetail,
      Confirm,
      Location,
      addStore
    },
    data(){
      return{
        isHomePage:false
      }
    },
    mounted(){
      axios.get("api/pages").then((res)=>{
        this.$store.commit("getGoodsData",res.data.data);
      });
      axios.get("api/catalog").then((res)=>{
        this.$store.commit("getCatalogData",res.data.data);
      });
    },
    computed:{
      totalCount(){
        return this.$store.getters.totalCount;
      },
      balls(){
        return this.$store.state.balls;
      },
      dropBalls(){
        return this.$store.state.dropBalls;
      },
      targetLeft(){
        return this.$store.state.targetLeft
      },
      targetTop(){
        return this.$store.state.targetTop
      },
      ballOnOff(){  //revised
        return this.$store.state.ballOnOff;
      },
      currentGood(){
        return this.$store.state.currentGood;
      }
    },
    watch:{
      "$route":{   //判断是否点击了首页的路由，如果是的话刷新BS
        handler:function(val,oldVal){
          //切换子路由时让首页高亮
          if(this.$route.path!=="/shoppingcart" && this.$route.path!=="/member" && this.$route.path!=="/mine"){
            this.isHomePage=true;
          }else{
            this.isHomePage=false;
          }
        },
        deep:true
      }
    },
    methods:{
      beforeEnter(el){
        let count=this.balls.length;
        while(count--){
          let ball=this.balls[count];
          if(ball.show){
            if(this.ballOnOff){ //revised
              //console.log("执行第一种动画");
              let x=this.targetLeft-440;
              let y=-(window.innerHeight-this.targetTop-20);
              el.style.display='';
              el.style.webkitTransform=`translate3d(${x}px,${y}px,0)`;
              el.style.transform=`translate3d(${x}px,${y}px,0)`;
              let inner=el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform=`scale(7)`;
              inner.style.transform=`scale(7)`;
            }else{
              //console.log("执行第二种动画");
              let x=this.targetLeft;
              let y=-(window.innerHeight-this.targetTop);
              el.style.display='';
              el.style.webkitTransform=`translate3d(0,-200px,0)`;
              el.style.transform=`translate3d(0,-200px,0)`;
              let inner=el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform=`scale(2)`;
              inner.style.transform=`scale(2)`;
              inner.style.opacity=`1`;
            }
          }
        }
      },
      enter(el){
        /* eslint-disable no-unused-vars*/
        let rf=el.offsetHeight;   //取高度值使浏览器重绘，使el状态在修改前display变为block，否则display:none的元素没法触发过渡
        this.$nextTick(()=>{
          //console.log("ball状态"+this.ballOnOff);
          if(this.ballOnOff){ //revised
            el.style.webkitTransform=`translate3d(0,0,0)`;
            el.style.transform=`translate3d(0,0,0)`;
            let inner=el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform=`scale(1)`;
            inner.style.transform=`scale(1)`;
          }else{
            el.style.webkitTransform=`translate3d(-210px,0,0)`;
            el.style.transform=`translate3d(-210px,0,0)`;
            let inner=el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform=`scale(0.3)`;
            inner.style.transform=`scale(0.3)`;
            inner.style.opacity=`0`;
          }
        })
      },
      afterEnter(el){
        let ball=this.dropBalls.shift();
        if(ball){
          ball.show=false;
          el.style.display="none";
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './common/styl/mixin.styl'
  #app
    .tab-wrapper
      z-inde:10
      position:fixed
      right:0
      left:0
      bottom:0
      width:100%
      height:49px
      box-shadow:0 0 10px rgba(0,0,0,.06)
      .tab
        display:flex
        width:100%
        height:44px
        padding-top:5px
        text-align:center
        background:#fff
        border-top-1px(#ddd)
        div
          display:inline-block
          flex:1
          .tab-item
            text-align:center
            &.item1
              background:url('./common/img/icon-home-g.png') 50% 0 no-repeat
              background-size:27px 27px
            &.item2
              background:url('./common/img/icon-crown-g.png') 50% 0 no-repeat
              background-size:27px 27px
            &.item3
              position:relative
              background:url('./common/img/icon-cart-g.png') 50% 0 no-repeat
              background-size:27px 27px
              .cartCount
                display:inline-block
                position:absolute
                top:-3px
                right:-10px
                width:15px
                height:15px
                font-size:10px
                line-height:15px
                color:#fff
                background:#ff4891
                border-radius:50%
                font-style:normal
            &.item4
              background:url('./common/img/icon-center-g.png') 50% 0 no-repeat
              background-size:27px 27px
            &.active
              background:url('./common/img/icon-home.png') 50% 0 no-repeat
              background-size:27px 27px
              span
                color:#ff4891
            span
              display:inline-block
              font-size:10px
              color:#262626
              padding-top:29px
          &.router-link-exact-active
            span
              color:#ff4891
            .item1
              background:url('./common/img/icon-home.png') 50% 0 no-repeat
              background-size:27px 27px
            .item2
              background:url('./common/img/icon-crown.png') 50% 0 no-repeat
              background-size:27px 27px
            .item3
              background:url('./common/img/icon-cart.png') 50% 0 no-repeat
              background-size:27px 27px
            .item4
              background:url('./common/img/icon-center.png') 50% 0 no-repeat
              background-size:27px 27px
      .ball-wrapper
        .ball
          position:fixed
          left:226px
          bottom:22px
          z-index:999
          .inner
            width:16px
            height:16px
          &.drop-enter-active
            transition:all 1s cubic-bezier(.47,.37,.13,1.02)
            //transition:all 1s cubic-bezier(.21,.98,.21,.98)
          &.drop-enter-active .inner
            transition:all 1s linear
          img
            display:inline-block
            border-radius:50%

</style>
