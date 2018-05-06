<template>
  <div class="addstoreIn">
    <div class="content-wrapper">
      <div class="content">
        <ul class="liBox">
          <li class="add-item" v-for="item,index in receiverStore">
            <div class="left" @click="chooseReceiverHandle(index)">
              <div class="check-box" :class="{'checked':item.check}"></div>
            </div>
            <div class="middle">
              <div class="name">{{item.name}}</div>
              <div class="phone">{{item.phone}}</div>
              <div class="detail"><span>{{item.type}}</span>{{item.add+item.addNum}}</div>
            </div>
            <div class="right">
              <div class="edit" @click="editThisHandle(index)">编辑</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="newAddBtn" @click="showNewAddHandle">
      <p>新增收货地址</p>
    </div>
    <transition name="slide">
      <new-add></new-add>
    </transition>
  </div>
</template>

<script>
    import NewAdd from '../public/newadd.vue'
    export default {
      components:{
        NewAdd
      },
      computed:{
        receiverStore(){
          return this.$store.state.receiverStore;
        },
        newAddInfo(){
          return this.$store.state.newAddInfo;
        }
      },
      methods:{
        showNewAddHandle(){
          this.$store.commit("editReceiverOff");
          this.$store.commit("showNewAdd");
        },
        editThisHandle(index){
          this.$store.commit("editReceiverOn");
          this.$store.commit("showNewAdd");
          this.$store.commit("editReceiver",index);
        },
        chooseReceiverHandle(index){
          this.$store.commit("chooseReceiver",index)
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .addstoreIn
    width:100%
    .content-wrapper
      position:absolute
      top:43px
      bottom:49px
      width:100%
      overflow:hidden
      .content
        width:100%
        .liBox
          width: 100%
          .add-item
            display:flex
            flex-direction:row
            width: 92%
            padding:10px 4%
            margin:0 auto
            list-style:none
            background:#fff
            border-top-1px(#ddd)
            margin-bottom:9px
            .left
              display:inline-block
              width:23px
              height:71px
              padding-right:15px
              .check-box
                width:23px
                height:23px
                padding-top:24px;
                background:url(./img/icon-unchecked.png) 50% 100% no-repeat
                background-size:23px 23px
                &.checked
                  background:url(./img/icon-checked.png) 50% 100% no-repeat
                  background-size:23px 23px
            .middle
              flex:1
              overflow:hidden
              .name
                width: 100%
                padding-bottom:2px
                text-align:left
                font-size: 14px
                color:#4b4b4b
                line-height:17px
                overflow:hidden
                white-space:nowrap
                text-overflow:ellipsis
              .phone
                width:100%
                margin:5px auto 2px
                text-align:left
                font-size: 14px
                color:#666
                line-height:20px
                overflow:hidden
                white-space:nowrap
                text-overflow:ellipsis
              .detail
                display:inline-block
                width:100%
                margin:5px 0 2px
                overflow:hidden
                text-overflow:ellipsis
                white-space:nowrap
                text-align:left
                font-size: 12px
                color:#262626
                line-height:18px
                span
                  color:#ff4891
                  margin-right: 4px
            .right
              width:40px
              height:35px
              margin:18px 0
              text-align:right
              border-left:1px solid #f0f0f0
              .edit
                width:100%
                font-size:13px
                color:#969696
                line-height:35px
    .newAddBtn
      width: 100%
      position:fixed
      left: 0
      bottom: 0
      height: 49px
      background:#ff4891
      text-align:center
      p
        width: 100%
        text-align:center
        height: 49px
        font-size: 18px
        color: #ffffff
        font-weight:700
        line-height:49px
</style>
