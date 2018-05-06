<template>
  <div class="snacks" ref="snackshook">
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
            src:require("../../../public/img/snacks-slide2.jpg"),
            href:"#"
          }
        ],
        datanum:7
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.snackshook.offsetHeight);
      })
    }
  }
</script>
