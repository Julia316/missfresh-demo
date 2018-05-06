<template>
  <div class="addstore" v-if="isShowAddStore">
    <div class="addressBan">
      <div class="ban">
        <img class="icon-back" src="./img/detail-back.png" width="22" height="22" @click="notShowAddStoreHandle"/>
        <span class="name">收货地址</span>
        <span class="add-btn" @click="showNewAddHandle">添加</span>
      </div>
    </div>
    <address-list></address-list>
  </div>

</template>

<script>
  import AddressList from './addresslist'
  export default {
    components:{
      AddressList
    },
    computed:{
      isShowAddStore(){
        return this.$store.state.isShowAddStore;
      }
    },
    methods:{
      notShowAddStoreHandle(){
        this.$store.commit("notShowAddStore");
      },
      showNewAddHandle(){
        this.$store.commit("editReceiverOff");
        this.$store.commit("showNewAdd");
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .addstore
    z-index:300
    position:absolute
    top:0
    left: 0
    bottom: 0
    display:inline-block
    width:100%
    height:100%
    background:#f0f0f0
    &.recefade-enter-active
      transition:0.5s all ease-in-out
    &.recefade-enter-to
      transform:translateX(0)
    &.recefade-enter
      transform:translateX(100%)
    &.recefade-leave-active //disable
      transition:0.4s all ease-in-out
    &.recefade-leave
      transform:translateX(0)
    &.recefade-leave-to
      transform:translateX(-100%)
    .addressBan
      width:100%
      height:43px
      background: #fff
      border-bottom-1px(#f5f5f5)
      box-shadow:0 0 10px rgba(0,0,0,.06)
      .ban
        display:flex
        margin:0 auto
        width:94%
        height:44px
        fon-size:0
        .icon-back,.icon-share
          vertical-align:top
          padding-top:11px
          width:22px
          height:22px
        .icon-back
          padding-right:20px
        .name
          flex:1
          vertical-align:top
          text-align:center
          font-size:17px
          color:#4b4b4b
          line-height:44px
          white-space:nowrap
          overflow:hidden
          text-overflow:ellipsis
        .add-btn
          vertical-align:top
          width:40px
          font-size:17px
          color:#4c4440
          line-height:44px
          text-align:right
</style>
