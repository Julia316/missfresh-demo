<template>
  <div class="fresh" ref="freshhook">
    <slide :slides="slides" :invTime="invTime"></slide>
    <goods-wrap :datanum="datanum"></goods-wrap>
  </div>

</template>

<script>
  import Slide from '../../../public/slide.vue'
  import GoodsWrap from '../../../public/goodswrap.vue'
  export default {
    components:{
      Slide,
      GoodsWrap
    },
    data(){
      return{
        invTime:5000,
        slides:[
          {
            src:require("../../../public/img/fresh-slide.jpg"),
            href:"#"
          }
        ],
        datanum:4
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.freshhook.offsetHeight);
      })
    }
  }
</script>

<style lang="stylus">

</style>
