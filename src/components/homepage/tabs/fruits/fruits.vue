<template>
  <div class="fruit" ref="fruithook">
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
              src:require("../../../public/img/fruit-slide1.jpg"),
              href:"#"
            },
            {
              src:require("../../../public/img/fruit-slide2.gif"),
              href:"#"
            },
            {
              src:require("../../../public/img/fruit-slide3.jpg"),
              href:"#"
            },
            {
              src:require("../../../public/img/fruit-slide4.png"),
              href:"#"
            }
          ],
          datanum:2
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.$store.commit("storedBsHeight",this.$refs.fruithook.offsetHeight);
        })
      }
    }
</script>

<style lang="stylus">

</style>
