<template>
  <div class="slide">
    <div class="roll-wrapper">
      <a :href="slides[currentIndex].href">
        <transition-group name="slide">
          <img v-for="item,index in slides" :key="index" v-show="index===currentIndex" :src="item.src"/>
        </transition-group>
      </a>
    </div>
    <p class="roll-page">{{currentIndex+1}}/{{slides.length}}</p>
  </div>
</template>

<script>
  export default {
    props:{
      slides:{
        type:Array,
        default:[]
      },
      invTime:{
        type:Number,
        default:2000
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      _autoPlay(){
        setInterval(()=>{
          if(this.currentIndex===this.slides.length-1){
            this.currentIndex=0
          }else{
            this.currentIndex=this.currentIndex+1;
          }
        },this.invTime)
      }
    },
    mounted(){
      this._autoPlay();
    }
  }
</script>

<style lang="stylus">
  .slide
    position:relative
    display:block
    width: 100%
    height:175px
    .roll-wrapper
      width:100%
      img
        position: absolute
        top: 0
        left: 0
        right: 0
        width:100%
        display:inline-block
        &.slide-enter-active,&.slide-leave-active
          transition:1s all linear
        &.slide-enter-to,&.slide-leave
          transform:translateX(0)
        &.slide-leave-to
          transform:translateX(-100%)
        &.slide-enter
          transform:translateX(100%)
  .roll-page
      position:absolute
      display:inline-block
      right: 8px
      bottom:8px
      width:20px
      height:14px
      line-height:14px
      padding:1px 6px
      color:#fff
      font-size:12px
      border-radius:10px
      text-align:center
      background:rgba(0,0,0,.3)
      letter-spacing:1px

</style>
