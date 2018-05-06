<template>
  <div class="grain" ref="grainhook">
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
            src:require("../../../public/img/grain-slide1.jpg"),
            href:"#"
          },
          {
            src:require("../../../public/img/meat-slide1.jpg"),
            href:"#"
          }
        ],
        datanum:12
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.grainhook.offsetHeight);
      })
    }
  }
</script>
