<template>
  <div class="special" ref="specialhook">
    <div class="banImg">
      <img src="./img/pic1.jpg"/>
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
        datanum:1
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.specialhook.offsetHeight);
      })
    }
  }
</script>

<style lang="stylus">
  .banImg
    width: 100%
    margin-bottom:2px
    img
      display:inline-block
      width:100%
</style>
