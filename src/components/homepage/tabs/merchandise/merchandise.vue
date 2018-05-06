<template>
  <div class="merchandise" ref="merchandisehook">
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
            src:require("../../../public/img/snacks-slide1.gif"),
            href:"#"
          },
          {
            src:require("../../../public/img/milk-slide3.jpg"),
            href:"#"
          }
        ],
        datanum:14
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.merchandisehook.offsetHeight);
      })
    }
  }
</script>
