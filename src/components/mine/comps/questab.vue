<template>
    <div class="qestab">
        <div class="qesTit">
          <h3>{{qes}}</h3>
          <i :class="{'icon-arrow_down':!txtOnOff,'icon-arrow_up':txtOnOff}" @click="txtOnOff=!txtOnOff"></i>
        </div>
        <div class="quesCon" v-if="txtOnOff">
          <span v-for="item in ans">{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
      props:{
        qes:{
          type:String,
          default:""
        },
        ans:{
          type:Array,
          default:[]
        }
      },
      data(){
        return{
          txtOnOff:false
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../../common/styl/mixin.styl'
  .qestab
    width:100%
    margin 0 auto
    //padding:21px 0
    padding:10px 0
    border-bottom-1px(#ebebeb)
    .qesTit
      display:flex
      flex-direction:row
      width:92%
      height:38px
      margin:0 auto
      h3
        flex:1
        display:block
        text-align:left
        color:#4D4D4D
        font-size:16px
        line-height:18px
        padding:10px 0
      i
        width:16px
        height:16px
        font-size:16px
        line-height:16px
        color:#4D4D4D
        padding:10px 0
    .quesCon
      width:92%
      margin:10px auto 0
      padding:10px 0 0
      border-top-1px(#ebebeb)
      span
        display:block
        width:100%
        text-align:justify
        text-justify:inter-ideograph
        color: #4D4D4D
        line-height: 18px
        font-size: 12px

</style>
