<template>
  <div class="lightmeal" ref="lighthook">
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
            src:require("../../../public/img/light-slide1.jpg"),
            href:"#"
          },
          {
            src:require("../../../public/img/light-slide2.jpg"),
            href:"#"
          }
        ],
        datanum:13
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.lighthook.offsetHeight);
      })
    }
  }
</script>
