<template>
  <div class="hotsale" ref="routehook">
    <div class="banImg">
      <img src="./img/fruit-slide2.gif"/>
    </div>
    <ul class="quality">
      <li class="quality-item"><img src="./img/icon-quality-well.png"/><p>优鲜严选</p></li>
      <li class="quality-item"><img src="./img/icon-quality-safe.png"/><p>安心检测</p></li>
      <li class="quality-item"><img src="./img/icon-quality-payfor.png"/><p>赔付保障</p></li>
    </ul>
    <div class="red-packet">
      <div class="packet clearfix">
        <div class="left">
          <img src="./img/red-1.png"/>
        </div>
        <div class="right">
          <img class="rg-top" src="./img/red-2.png"/>
          <div class="rg-bottom">
            <img src="./img/red-3.png"/>
            <img src="./img/red-4.png"/>
          </div>
        </div>
      </div>
    </div>
    <goods-wrap :datanum="datanum"></goods-wrap>
    </div>

</template>

<script>
  import GoodsWrap from '../../../public/goodswrap.vue'
  export default {
    components:{
      GoodsWrap
    },
    data(){
      return{
        datanum:0
      }
    },
    computed:{
      goodsData(){
        return this.$store.state.goodsData;
      }
    },
    watch:{
      "goodsData": function () {
        this.$nextTick(() => {
          this.$store.commit("storedBsHeight", this.$refs.routehook.offsetHeight + 160);
        })
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.routehook.offsetHeight);
      })
    }
  }
</script>

<style lang="stylus">
  @import '../../../../common/styl/mixin.styl'
  .hotsale
    text-align:center
    //min-height:1193px //delete
    .banImg
      width: 100%
      margin-bottom:14px
      img
        display:inline-block
        width:100%
    .quality
      display:flex
      width:100%
      margin-bottom:16px
      .quality-item
        display:inline-block
        flex: 1
        font-size:0
        img
          display:inline-block
          vertical-align: top
          width: 16px
          height:16px
          padding-right:3px

        p
          display:inline-block
          vertical-align: top
          font-size: 12px
          line-height:16px
          color:#4d4d4d
    .red-packet
      width: 96%
      margin:0 auto
      padding-bottom:14px
      border-bottom-1px(#e6e6e6)
      .packet
        width: 100%
      .left
        float:left
        width:53.7%
        img
          width:100%
      .right
        float:left
        width: 44.3%
        margin-left:2%
        .rg-top
          display:inline-block
          width: 100%
          margin-bottom:6px
        .rg-bottom
          width: 100%
          &:first-child
            padding-right:4%
          img
            width:46%
</style>
