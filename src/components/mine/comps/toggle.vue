<template>
    <div class="toggle" @click="turnOnOffHandle">
      <transition name="toggle-on">
        <div class="on" v-if="onOff">
          <div class="onIn">
            <div class="base"></div>
            <div class="round"></div>
          </div>
        </div>
      </transition>
      <transition name="toggle-off">
        <div class="off" v-if="!onOff">
          <div class="offIn">
            <div class="base"></div>
            <div class="round"></div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
      props:{
        onOff:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        turnOnOffHandle(){
          this.$emit("turnOnOff");
        }
      }
    }
</script>

<style lang="stylus">
.toggle
  position:relative
  width:34px
  height:19px
  padding:5px
  .on
    position:relative
    width:100%
    &.toggle-on-enter-active,&.toggle-on-enter-active .round,&.toggle-on-enter-active .base
        transition:0.5s all linear
    &.toggle-on-enter
      .base
        opacity:0
      .round
        transform:translateX(-18px)
    &.toggle-on-enter-to
      .base
        opacity:1
      .round
        transform:translateX(0)
    .onIn
      width:100%
      position:absolute
      top:0
      left:0
      .base
        width:34px
        height:15px
        border-radius:10px
        background:rgba(51,205,95,.5)
      .round
        position:absolute
        top:-4px
        right:-4px
        width:21px
        height:21px
        border-radius:50%
        background:#33cd5f
        box-shadow:0 2px 5px rgba(0,0,0,.25)
  .off
    position:relative
    width:100%
    &.toggle-off-enter-active,&.toggle-off-enter-active .base,&.toggle-off-enter-active .round
      transition:0.5s all linear
    &.toggle-off-enter
      .base
        opacity:0
      .round
        transform:translateX(18px)
    &.toggle-off-enter-to
      .base
        opacity:1
      .round
        transform:translateX(0)
    .offIn
      width:100%
      position:absolute
      top:0
      left:0
      .base
        width:34px
        height:15px
        border-radius:10px
        background:#9e9e9e
      .round
        position:absolute
        top:-4px
        left:-4px
        width:21px
        height:21px
        border-radius:50%
        background:#fff
        box-shadow:0 2px 5px rgba(0,0,0,.25)
</style>
