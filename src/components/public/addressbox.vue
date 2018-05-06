<template>
  <div class="address-box">
    <div class="address">
      <ul class="info">
        <li>
          <span class="tit">收货人</span>
          <input type="text" placeholder="收货人姓名" v-model="receiver.name"/>
        </li>
        <li>
          <span class="tit">手机号码</span>
          <input type="text" placeholder="配送员联系您的电话" v-model="receiver.phone"/>
        </li>
        <li>
          <span class="tit">收货地址</span>
          <span class="add clearfix" @click="locationOnHandle2" v-if="showLocationButton">
             <em><img src="./img/icon-address.png"/>小区/写字楼</em>
             <i class="icon-keyboard_arrow_right"></i>
          </span>
          <span class="add clearfix" v-else>
             <em class="choosedAdd">{{receiver.addName}}</em>
             <i class="icon-keyboard_arrow_right"  @click="locationOnHandle2"></i>
          </span>
        <li>
          <span class="tit">楼号门牌</span>
          <input type="text" placeholder="楼号/单元/门牌号" v-model="receiver.addNum"/>
        </li>
        <li>
          <span class="tit">地址类型</span>
          <ul class="scene">
            <li v-for="item,index in addType" :class="{active:choosedType===index}" @click="receiverType(index)">{{item.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="btnBox" @click="saveReceiver">保存收货地址</div>
    <div class="warnBox" ref="pop">{{warnTip}}</div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          addType:[{"name":"住宅"},{"name":"公司"},{"name":"学校"},{"name":"其他"}],
          choosedType:0,
          passPhone:false,
          showLocationButton:true,
          warnTip:"请选择收货地址"
        }
      },
      computed:{
        receiver(){
          return this.$store.state.receiver;
        },
        currentLocation(){
          return this.$store.state.currentLocation;
        }
      },
      methods:{
        saveReceiver(){
          let re=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
          if(re.test(this.receiver.phone)){
            this.passPhone=true;
          }else{
            this.passPhone=false;
          }
          if(this.receiver.name==="" || !this.passPhone || this.receiver.addNum==="" || this.showLocationButton){
            if(this.receiver.name===""){
              this.warnTip="请填写收货人姓名";
            }else if(!this.passPhone){
              this.warnTip="请填写正确的联系电话";
            }else if(this.showLocationButton){
              this.warnTip="请选择收货地址";
            }else{
              this.warnTip="请填写楼号/门牌";
            }
            document.querySelectorAll('.warnBox')[0].style.display="block";
            setTimeout(function(){
              document.querySelectorAll('.warnBox')[0].style.display="none";
            },3000)
          }else{
            this.$store.commit("addAddStore");
            this.$store.commit("notShowAddBox");
          }
        },
        locationOnHandle2(){
          this.$store.commit("locationOn");
          this.showLocationButton=false
        },
        receiverType(index){
          this.choosedType=index;
          this.$store.commit("receiverTypeHandle",this.addType[index].name)
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
.address-box
  display:inline-block
  position:relative
  width:100%
  .address
    width:92%
    padding:0 4%
    background:#fff
    box-shadow:0 0 10px rgba(0,0,0,.06)
    .info
      display:block
      width:100%
      li
        display:flex
        width:100%
        height:50px
        text-align:left
        border-bottom-1px(#eee)
        &:last-of-type
          border-none()
        .tit
          font-size:16px
          color:#272727
          line-height:50px
          width:107px
          text-align:left
        input
          flex:1
          height:50px
          font-size:14px
          color:#262626
          line-height:50px
          outline:none
          border:none
          &::input-placeholder
            color: #b0b0b0
            font-size:14px
            text-align:left
          &::-webkit-input-placeholder
            color: #b0b0b0
            font-size:14px
            text-align:left
        .add
          flex:1
          height:50px
          em
            float:left
            line-height:50px
            font-size:14px
            color:#ccc
            font-style:normal
            font-weight:400
            img
              width:11px
              height:13px
              vertical-align:middle
              padding-right:4px
          i
            float:right
            font-style:normal
            line-height:50px
            font-size:24px
            color:#bbb
          .choosedAdd
            float:left
            line-height:50px
            font-size:14px
            font-style:normal
            font-weight:400
            height:50px
            overflow:auto
            white-space:nowrap
            text-overflow:ellipsis
            color:#262626
            img
              width:11px
              height:13px
              vertical-align:middle
              padding-right:4px
        .scene
          flex:1
          text-align:left
          height:18px
          padding-top:16px
          li
            display:inline-block
            margin-right:10px
            text-align:center
            width:30px
            height:15px
            line-height:15px
            font-size:12px
            padding:1px 0
            color:#c5c5c5
            border:1px solid #c5c5c5
            border-radius:4px
            &.active
              color:#fff
              border:none
              padding:2px 0
              background:#ff4891
  .btnBox
    width:92%
    margin:15px auto 10px
    height:39px
    line-height:39px
    background:#ff4891
    border-radius:4px
    font-size:15px
    color:#fff
    text-align:center
  .warnBox
    display:none
    position:absolute
    bottom:-4px
    left:34%
    padding:0 6px
    height:36px
    color:#fff
    font-size:14px
    line-height:36px
    border-radius:5px
    letter-spacing:1px
    text-align:center
    background:rgba(0,0,0,0.7)
</style>
