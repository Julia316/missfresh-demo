<template>
<div class="imgscroll">
  <div class="good-list" ref="hook">
    <div class="imgBox-wrapper" ref="hookin">
      <div class="imgBox" v-for="good in goods"><img :src="good.image"/></div>
    </div>
  </div>
</div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
      props:{
        goods:{
          type:Array
        }
      },
      mounted(){
        this._initOrderImgScroll();
      },
      methods:{
        _initOrderImgScroll(){
          this.$nextTick(()=>{
            this.$refs.hookin.style.width=(66*this.goods.length)+"px";
            if(!this.imgscroll){
              this.imgscroll=new BScroll(this.$refs.hook,{
                scrollX:true,
                eventPassthrough:"vertical"
              });
            }else{
              this.imgscroll.refresh();
            }
          })
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../../common/styl/mixin.styl'
  .imgscroll
    width:100%
    .good-list
      width: 92%
      height:60px
      margin:0 auto
      padding:16px 0
      overflow:hidden
      border-bottom-1px(#ebebeb)
      .imgBox-wrapper
        display:block
        height: 100%
        text-align:left
        white-space:nowrap
        font-size:0
        .imgBox
          display:inline-block
          width: 58px
          height: 58px
          border:1px solid #e6e6e6
          -webkit-border-radius: 4px
          -moz-border-radius: 4px
          border-radius: 4px
          margin-right:6px
          text-align:center
          img
            width: 54px
            height: 54px
            margin:2px auto 0
</style>
