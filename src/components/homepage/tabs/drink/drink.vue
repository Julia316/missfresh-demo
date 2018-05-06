<template>
  <div class="drink" ref="drinkhook">
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
            src:require("../../../public/img/drink-slide.jpg"),
            href:"#"
          }
        ],
        datanum:8
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.$store.commit("storedBsHeight",this.$refs.drinkhook.offsetHeight);
      })
    }
  }
</script>
