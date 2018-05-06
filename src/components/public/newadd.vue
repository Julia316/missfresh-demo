<template>
  <div class="newAdd" v-if="isShowNewAdd">
    <div class="newAddBan">
      <div class="ban">
        <img class="icon-back" src="./img/detail-back.png" width="22" height="22" @click="notShowNewAddHandle"/>
        <span class="name">{{newAddInfo.tit}}</span>
        <span class="dele-btn" v-show="newAddInfo.dele" @click="showMask">删除</span>
      </div>
    </div>
    <address-box></address-box>
    <transition name="maskfade">
      <div class="addMask" v-if="maskShow">
      <div class="tipBox">
        <div class="tit">提示</div>
        <div class="info">确认删除此收货地址信息么！</div>
        <div class="btnBox">
          <div class="btn" @click="closeMask">取消</div>
          <div class="line"></div>
          <div class="btn" @click="deleteReceiverHandle">确认</div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  import AddressBox from '../public/addressbox.vue'
  export default {
    components:{
      AddressBox
    },
    data(){
      return{
        maskShow:false
      }
    },
    computed:{
      isShowNewAdd(){
        return this.$store.state.isShowNewAdd;
      },
      newAddInfo(){
        return this.$store.state.newAddInfo;
      }
    },
    methods:{
      notShowNewAddHandle(){
        this.$store.commit("notShowNewAdd");
      },
      deleteReceiverHandle(){
        this.$store.commit("deleteReceiver");
        this.maskShow=false;
      },
      showMask(){
        this.maskShow=true;
      },
      closeMask(){
        this.maskShow=false;
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .newAdd
    z-index:400
    width:100%
    position:fixed
    top:0
    left:0
    bottom:0
    right:0
    height:100%
    background:#f0f0f0
    &.slide-enter-active
      transition:0.5s all ease-in-out
    &.slide-enter-to
      transform:translateY(0)
    &.slide-enter
      transform:translateY(100%)
    &.slide-leave-active //disable
      transition:0.4s all ease-in-out
    &.slide-leave
      transform:translateY(0)
    &.slide-leave-to
      transform:translateY(100%)
    .newAddBan
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
        .icon-back
          vertical-align:top
          padding-top:11px
          width:22px
          height:22px
          padding-right:20px
        .name
          flex:1
          vertical-align:top
          text-align:center
          font-size:17px
          color:#000
          line-height:44px
          white-space:nowrap
          overflow:hidden
          text-overflow:ellipsis
        .dele-btn
          vertical-align:top
          width:40px
          font-size:17px
          color:#ccc
          line-height:44px
          text-align:right
    .addMask
      z-index:410
      position:fixed
      display:flex
      align-items:center
      top: 0
      left: 0
      bottom: 0
      right: 0
      background:rgba(0,0,0,0.5)
      text-align:center
      &.maskfade-enter-active,&.maskfade-leave-active
        transition:0.3s all ease-in-out
      &.maskfade-enter-to,&.maskfade-leave
        opacity:1
      &.maskfade-leave-to,&.maskfade-enter
        opacity:0
      .tipBox
        width: 250px
        height: 124px
        margin:0 auto
        background: #ffffff
        border-radius:15px
        .tit
          width: 100%
          text-align:center
          font-size: 16px
          color:#4b4b4b
          line-height: 20px
          padding:15px 0 3px
        .info
          width:90%
          padding:10px 5%
          text-align:left
          font-size: 14px
          line-height:21px
          color:#b8b8b8
          border-bottom-1px(#d1d1d1)
        .btnBox
          display:flex
          width:100%
          .btn
            flex: 1
            padding:5px 0
            text-align:center
            font-size: 15px
            color:#4b4b4b
            line-height:34px
          .line
            height: 28px
            margin-top:8px
            width:1px
            border-right:1px solid #d1d1d1



</style>
