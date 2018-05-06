<template>
<div class="location" v-if="locationOnOff">
  <div class="locationBan">
    <div class="title">收货地址</div>
    <img class="back" @click="locationOffHandle" src="./img/icon-back.png"/>
  </div>
  <div class="content-wrapper">
    <div class="content">
      <div class="inputBox">
        <div class="inputIn">
          <div class="city-box">
            <span class="city-name" v-if="currentCity!==''">{{currentCity}}</span>
            <span class="city-name" v-else>请选择</span>
            <img src="./img/icon-location-arrow-right.png"/>
            <span class="line">|</span>
          </div>
          <div class="search-box">
            <i class="icon-search" @click="searchAddress"></i>
            <input type="text" v-model="search" @keyup="searchAddress" placeholder="请搜索您收货的写字楼/小区"/>
            <img class="close" src="./img/icon-location-delete.png" @click="clearSearch"/>
          </div>
        </div>
      </div>
      <div class="mapContainer" ref="mapContainer"></div> <!--map容器，无实际用途-->
      <div class="empty" v-if="searchResults.length===0">
        <div class="icon"></div>
        <div class="icon-txt" v-if="currentCity!==''">
          您所选城市在“<span>{{currentCity}}</span> ”<br/>
          请搜索该城市内您收货的写字楼、小区
        </div>
        <div class="icon-txt" v-if="currentCity===''">
          未获取到您的定位<br/>
          请手动输入地址
        </div>
      </div>
      <div class="full" id="addressList" v-if="searchResults.length" ref="address">
          <ul class="list">
            <li class="list-item" v-for="item in searchResults" @click="locationHandle(item)">
              <i class="icon-location"></i>
              <div class="detail">
                <p class="name">{{item.name}}</p>
                <p class="add">{{item.add}}</p>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
      data(){
        return{
          search:"",
          searchResults:[]
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this._getLocalCity();
        })
      },
      computed:{
        locationOnOff(){
          return this.$store.state.locationOnOff;
        },
        currentCity(){
          return this.$store.state.currentCity;
        }
      },
      methods:{
        locationOffHandle(){
          this.$store.commit("locationOff")
        },
        _getLocalCity(){
          let that=this;
          function myFun(result){
            let cityName = result.name;
            that.$store.commit("currentCityHandle",cityName)
          }
          let myCity = new BMap.LocalCity();
          myCity.get(myFun);
        },
        searchAddress(){
          let that=this;
          var map = new BMap.Map(this.$refs.mapContainer);
          let options = {
            onSearchComplete:function(results){
              if (local.getStatus() == BMAP_STATUS_SUCCESS){ // 判断状态是否正确
                let s = [];
                for (let i = 0; i < results.getCurrentNumPois(); i ++){
                  s.push({"name":results.getPoi(i).title,"add":results.getPoi(i).address});
                }
                that.searchResults=s;
              }
            }
          };
          let local = new BMap.LocalSearch(map, options);
          if(this.search!=="") {
            local.search(this.search);
          }else{
            this.searchResults=[];
          };
          if(this.searchResults.length>10){
            this._addressScroll()
          }
        },
        clearSearch(){
          this.search="";
          this.searchResults=[];
        },
        locationHandle(item){
          this.$store.commit("currentLocationHandle",item);
          this.$store.commit("changCurrentCity");
          this.$store.commit("locationOff");
          this.search="";
          this.searchResults=[];
        },
        _addressScroll(){
          this.$nextTick(() => {
            if(!this.addscroll){
              this.addscroll = new BScroll(this.$refs.address, {
                click: true
              });
            }else{
              this.addscroll.refresh();
            }

          })
        }
      }
    }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .location
    z-index:500
    width:100%
    position:fixed
    top:0
    left:0
    bottom:0
    right:0
    height:100%
    background:#f0f0f0
    .locationBan
      z-index:210
      position:relative
      width:100%
      height:44px
      background:#fff
      border-bottom-1px(#e5e5e5)
      box-shadow:0 0 10px rgba(0,0,0,.06)
      .title
        position:absolute
        top:0
        width:100%
        text-align:center
        color:#000
        font-size:17px
        line-height:44px
        font-weight:500
      .back
        position:absolute
        width:20px
        height:20px
        top:12px
        left:4%

    .content-wrapper
      z-index:200
      wdith:100%
      position:absolute
      top:44px
      left:0
      right:0
      bottom:0
      .content
        width:100%
        height:100%
        .inputBox
          width:100%
          height:30px
          background:#fff
          padding:8px 0
          border-bottom-1px(#e5e5e5)
          box-shadow:0 0 10px rgba(0,0,0,.06)
          .inputIn
            width:96%
            margin:0 auto 8px
            background:#f0f0f0
            border-radius:4px
            .city-box
              float:left
              width:25%
              text-align:center
              padding-top:4px
              .city-name
                padding-right:6px
                font-size:14px
                line-height:22px
                color:#4b4b4b
              img
                width:10px
                height:10px
              .line
                margin:0 0 0 4px
                color:#C6C6C6
                font-weight:200
                font-size:14px
                line-height:22px
            .search-box
              display:flex
              flex-direction:row
              width:75%
              text-align:left
              .icon-search
                width:10px
                height:20px
                font-size:12px
                line-height:20px
                color:#C6C6C6
                padding-top:5px
                padding-right:8px
              input
                flex:1
                height:30px
                font-size:14px
                color:#4b4b4b
                line-height:30px
                background:#f0f0f0
                outline:none
                border:none
                &::input-placeholder
                  font-size:14px
                  line-height:30px
                  color:#a7a7a7
                &::-webkit-input-placeholder
                  font-size:14px
                  line-height:30px
                  color:#a7a7a7
              .close
                width:14px
                height:14px
                padding:8px 10px
        .mapContainer
          width:0
          height:0
          visibility:none
        .empty
          width:100%
          .icon
            width:70px
            height:70px
            margin:120px auto 20px
            background:url("./img/icon-location-empty.png") 50% 50% no-repeat;
            background-size:70px 70px
          .icon-txt
            width:100%
            text-align:center
            font-size:14px
            color:#969696
            line-height:20px
            span
              color:#ffad3d

        .full
          z-index:190
          width:100%
          margin:0 auto
          color:#000
          font-size:14px
          background:#fff
          oberflow:hidden
          .list
            width:100%
            //height:100%
            .list-item
              display:flex
              flex-direction:row
              width:96%
              margin:0 auto
              height:37px
              padding:10px 2%
              font-size:0
              border-bottom-1px(#e5e5e5)
              .icon-location
                width:9px
                height:20px
                padding-top:8px
                padding-right:14px
                font-size:14px
                line-height:20px
                color:#444
              .detail
                flex:1
                pdding-right:2%
                overflow:hidden
                .name
                  font-size:14px
                  color:#4C4440
                  font-weight:700
                  line-height:16px
                  overflow:hidden
                  white-space:nowrap
                  text-overflow:ellipsis
                .add
                  padding-top:8px
                  font-size:13px
                  color:#4C4440
                  line-height:14px
                  overflow:hidden
                  white-space:nowrap
                  text-overflow:ellipsis

</style>
