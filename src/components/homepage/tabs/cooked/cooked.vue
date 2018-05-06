<template>
  <div class="cooked" ref="cookedhook">
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
            src:require("../../../public/img/cooked-slide.jpg"),
            href:"#"
          }
        ],
        datanum:10
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.cookedhook.offsetHeight);
      })
    }
  }
</script>
