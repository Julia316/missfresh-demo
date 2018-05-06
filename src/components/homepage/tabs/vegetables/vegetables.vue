<template>
  <div class="vegetable" ref="vegetablehook">
    <slide :slides="slides" :invTime="invTime"></slide>
    <goods-wrap :datanum="datanum"></goods-wrap>
  </div>
</template>

<script>
   import GoodsWrap from '../../../public/goodswrap.vue'
   import Slide from '../../../public/slide.vue'
    export default {
      components:{
        Slide,
        GoodsWrap
      },
      data(){
        return{
          invTime:4000,
          slides:[
            {
              src:require("../../../public/img/vegetable-slide1.jpg"),
              href:"#"
            },
            {
              src:require("../../../public/img/fruit-slide2.gif"),
              href:"#"
            }
          ],
          datanum:3
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.$store.commit("storedBsHeight",this.$refs.vegetablehook.offsetHeight);
        })
      }
    }
</script>

<style scoped>

</style>
