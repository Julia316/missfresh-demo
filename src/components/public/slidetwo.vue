<template>
  <div class="slide_two">
    <div class="roll-wrapper">
      <a>
        <transition-group name="slide2">
          <span class="picBox" v-for="item,index in nowGoodDetail.images" :key="index" v-show="index===currentIndex2">
            <img :src="item"/>
          </span>
        </transition-group>
      </a>
    </div>
    <p class="roll-page2">{{currentIndex2+1}}/{{nowGoodDetail.images.length}}</p>
    <img class="tag" v-if="nowGoodDetail.promote_tag" :src="nowGoodDetail.promote_tag"/>
  </div>
</template>

<script>
  export default {
    props:{
      nowGoodDetail:{
        type:Object,
        default:{}
      }
    },
    data(){
      return{
        currentIndex2:0
      }
    },
    methods:{
      _autoPlay2(){
        setInterval(()=>{
          if(this.currentIndex2===this.nowGoodDetail.images.length-1){
            this.currentIndex2=0
          }else{
            this.currentIndex2=this.currentIndex2+1;
          }
        },4000)
      }
    },
    mounted(){
      this._autoPlay2();
    }
  }
</script>

<style lang="stylus">
  .slide_two
    position:relative
    display:block
    width:100%
    height:250px
    .roll-wrapper
      width:100%
      .picBox
        display:inline-block
        position: absolute
        top: 0
        left: 0
        right: 0
        width:100%
        height:100%
        overflow:hidden
        &.slide2-enter-active,&.slide2-leave-active
          transition:0.8s all ease-in-out
        &.slide2-enter-to,&.slide2-leave
          transform:translateX(0)
        &.slide2-leave-to
          transform:translateX(-100%)
        &.slide2-enter
          transform:translateX(100%)
        img
          display:block
          margin:0 auto
          padding:0
          height: 100%
    .roll-page2
      position:absolute
      display:inline-block
      right:15px
      bottom:15px
      width:20px
      height:20px
      line-height:20px
      padding:0 4px
      color:#bbb
      font-size:14px
      text-align:center
      letter-spacing:1px
    .tag
      position:absolute
      top:10px
      left:10px
      width:34px
      height:44px


</style>
