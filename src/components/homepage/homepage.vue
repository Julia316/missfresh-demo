<template>
  <div class="homepage">
    <div class="top-ban">
      <div class="address">
        <img src="./img/icon-arrive.png"/>
        <span @click="locationOnHandle">{{currentCityOrLocation}}<i class="icon-arrow_down"></i></span>
      </div>
      <img class="search" src="./img/icon-search.png"/>
    </div>
    <div class="ban">
      <div class="rolltab-wrapper" ref="rollwrapper">
        <div class="rolltab" ref="roll">
          <div class="rolltab-item" v-for="item in catalogData" :class="[item.tabName]">
            <router-link tag="span" :to="'/home'+item.link">{{item.name}}</router-link>
          </div>
        </div>
      </div>
      <img class="index" src="./img/icon-index.png" @click="showCatalog">
      <transition name="fade">
        <div class="catalog-wrapper" v-show="isShowCatalog" ref="catalogwrapper">
          <div class="catalog" ref="catalog">
            <div class="banner">
              <span class="name">全部品类</span>
              <img class="close" src="./img/icon-close.png" @click="hideCatalog">
            </div>
            <div class="detail">
              <div class="detail-item" v-for="item in catalogData">
                <router-link tag="div" class="detailed" :to="'/home'+item.link">
                  <img class="detail-img" :src="item.img"/>
                  <span class="name">{{item.name}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="mask" v-show="isShowCatalog" @click="hideCatalog"></div>
    </transition>
    <div class="content" ref="content">
      <div class="route-wrapper" ref="targ"
           @touchstart="touchStart($event)"
           @touchmove="touchMove($event)"
           @touchend="touchEnd($event)"
      >
        <transition :name="transitionName">
            <router-view class="r-view"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        isShowCatalog:false,
        transitionName:"",
        touch:{
          startX:0,
          EndX:0,
          dirX:0,
          diff:0,
          currentLeft:0
        },
        currentRouteId:0,
        previousRouteId:0
      }
    },
    computed:{
      bsHeight(){
        return this.$store.state.bsHeight;
      },
      catalogData(){
        return this.$store.state.catalogData;
      },
      currentCityOrLocation(){
        if(this.$store.state.currentLocation.name &&　this.$store.state.currentLocation.name!==undefined){
          return this.$store.state.currentLocation.name
        }else{
          return this.$store.state.currentCity;
        }
      }
    },
    watch:{
      "$route":{
        handler:function(val,oldVal){
          let old=this.currentRouteId;
          this.catalogData.forEach((item)=>{
            //console.log("data里地址"+("/home"+item.link)+";路由地址"+val.path);
            if(("/home"+item.link)===val.path){
              this.currentRouteId=item.id;
              this.previousRouteId=old;
            }
          });
          if(this.currentRouteId<this.previousRouteId){
            this.transitionName="slide-back"
          };
          if(this.currentRouteId>this.previousRouteId){
            this.transitionName="slide-forward"
          };
        },
        deep:true
      },
      "catalogData":function(val,oldVal){
        this._initRoll();
      },
      "bsHeight":function(val,oldVal){
        this._initRouteScroll();
        //console.log("bsHeight改变,BS刷新")
      }
    },
    mounted(){ //切换底部路由时
      this._initRoll();
      this._initRouteScroll();
      //console.log("首页重建，刷新BS")
    },
    methods:{
      showCatalog(){
        this.isShowCatalog=true;
        this.$nextTick(()=>{ //目录弹窗滚动
          this.catalogscroll=new BScroll(this.$refs.catalogwrapper,{
            click:true
          });
        })
      },
      hideCatalog(){
        this.isShowCatalog=false;
      },
      touchStart(event){
        this.$nextTick(()=>{
          let target=event.changedTouches[0];
          this.touch.startX=target.pageX;
          this.touch.dirX=this.touch.startX-this.$refs.targ.offsetLeft;
        })
      },
      touchMove(event){
        let target=event.changedTouches[0];
        this.touch.EndX=target.pageX;
        this.touch.currentLeft=this.touch.EndX-this.touch.dirX;
        if(this.touch.currentLeft>30 || this.touch.currentLeft<-30){
          this.$refs.targ.style.left=this.touch.currentLeft+"px";
        }
      },
      touchEnd(event) {
        let target = event.changedTouches[0];
        this.touch.EndX = target.pageX;
        this.touch.diff = this.touch.EndX - this.touch.startX;
        this.$refs.targ.style.left = 0 + "px";
        if (this.touch.diff > 30 && this.currentRouteId > 0) {
          this.currentRouteId--;
          this.$router.push({path:'/home'+this.catalogData[this.currentRouteId].link});
          this.transitionName="slide-back";
        } else if (this.touch.diff < -30 && this.currentRouteId < this.catalogData.length - 1) {
          this.currentRouteId++;
          this.$router.push({path:'/home'+this.catalogData[this.currentRouteId].link});
          this.transitionName="slide-forward";
        } else {
          return false;
        }
        //better-scroll的scrollTo方法滚动到特定位置 S
        if (this.currentRouteId<= 2){
          this.tabscroll.scrollTo(0, 0);
        }else if(this.currentRouteId >=3 &&this.currentRouteId <this.catalogData.length-4){
          let items = document.querySelectorAll('.rolltab-item');
          let lens = 0;
          for (let i = 0; i < this.currentRouteId-2; i++){
            lens = lens + items[i].offsetWidth;
          }
          this.tabscroll.scrollTo(-lens, 0);
        }
        //better-scroll的scrollTo方法滚动到特定位置 E
      },
      _initRoll(){
        this.$nextTick(()=>{ //目录栏滚动
          let items=document.querySelectorAll('.rolltab-item');
          let len=0;
          for(let i=0;i<items.length;i++){
            len = len+ items[i].offsetWidth;
          }
          this.$refs.roll.style.width=len+"px";
          if(!this.tabscroll){
            this.tabscroll=new BScroll(this.$refs.rollwrapper,{
              scrollX:true,
              eventPassthrough:"vertical"
            })
          }else{
            this.tabscroll.refresh();
          }
        });
      },
      _initRouteScroll(){  //路由内容滚动
        this.$refs.targ.style.height=this.bsHeight+"px";
        this.$nextTick(()=>{
          if(!this.routescroll){
            this.routescroll=new BScroll(this.$refs.content,{
              click:true
            })
          }else{
            this.routescroll.refresh();
          }
          // console.log("首页更新")
          this.routescroll.scrollTo(0, 0);//切换路由时回到顶部
        })
      },
      locationOnHandle(){
        this.$store.commit("locationOn")
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/styl/mixin.styl'
  .homepage
    /*position: relative*/
    position:absolute
    top:0
    bottom:49px
    //bottom:0
    width:100%
    overflow:hidden
    .top-ban
      z-index:20
      position:relative
      width:100%
      height:40px
      background:#fff
      margin:0 auto
      text-align:center
      .address
        padding-top:14px
        font-size:0
        img
          display:inline-block
          height:16px
          vertical-align:top
          margin-right:6px
        span
          display:inline-block
          vertical-align:top
          font-size:14px
          color:#262626
          padding-top:2px
          max-width:70%
          overflow:hidden
          white-space:nowrap
          text-overflow:ellipsis
          .icon-arrow_down
            vertical-align:top
            font-size:10px
            color:#000
      .search
        position:absolute
        top:7px
        right:10px
        width:21px
    .ban
      position:relative
      width:100%
      height:42px
      background:#fff
      border-bottom-1px(#e6e6e6)
      .rolltab-wrapper
        width:87%
        height:42px
        white-space:nowrap
        margin-left:5px
        overflow:hidden
        .rolltab
          width:100%
          height:40px
          .rolltab-item
            display:inline-block
            &.best-tab
              background:url('./img/icon-tab-bestsellers.png') 50% 50% no-repeat;
              background-size:54px 24px
            &.special-tab
              background:url('./img/icon-tab-specials.png') 50% 50% no-repeat;
              background-size:80px 40px
            &.fresh-tab
              background:url('./img/icon-tab-fresh.png') 50% 50% no-repeat;
              background-size:50px 26px
            span
              display:inline-block
              height:40px
              margin:0 7px
              padding:0 3px
              line-height:40px
              color:rgb(38, 38, 38)
              font-size:14px
              &.router-link-exact-active
                border-bottom:2px solid #ff4891
              &.router-link-exact-active
                border-bottom:2px solid #ff4891
      .index
        position:absolute
        top:7px
        right:11px
        width:22px
        height:22px
      .catalog-wrapper
        z-index:20
        position:absolute
        top:0
        left:0
        width:100%
        min-height:170px
        max-height:410px
        overflow :hidden
        background:#fff
        &.fade-enter-active,&.fade-leave-active
          transition:0.3s all linear
        &.fade-enter,&.fade-leave-to
          opacity: 0
        &.fade-enter-to,&.fade-leave
          opacity:1
        .catalog
          width:100%
          .banner
            height:42px
            text-align:center
            margin-bottom:20px
            border-bottom-1px(#e6e6e6)
            .name
              line-height:44px
              font-size:16px
              color:#262626
              font-weight:400
            .close
              position:absolute
              top:10px
              right:11px
              width:22px
              height:22px

          .detail
            display:flex
            flex-wrap:wrap
            width:100%
            justify-content:space-between
            .detail-item
              flex:1 1 100px
              height:76px
              margin-bottom:18px
              /*border:1px solid #000*/
              text-align:center
              &:nth-child(3n+1)
                align-self:flex-start
              &:nth-child(3n+2)
                align-self:center
              &:nth-child(3n+3)
                align-self:flex-end
              .detailed
                .detail-img
                  display:block
                  width:36px
                  height:36px
                  margin:10px auto
                .name
                  width:100%
                  text-align:center
                  font-size:12px
    .mask
      z-index:10
      position:absolute
      top:0
      left:0
      right:0
      bottom:0
      width:100%
      height:100%
      background:rgba(0,0,0,0.4)
    .content
      position:absolute; //mark S
      top:82px
      bottom:0
      width:100% //mark E
      overflow:hidden //mark
      .route-wrapper
        //position:relative
        width:100%
        height:100% //mark
        .r-view
          position:absolute
          top:0
          left: 0
          width:100%
          /*height:100%*/
          &.slide-forward-leave-active,&.slide-forward-enter-active
            transition:1s all
          &.slide-forward-leave,&.slide-forward-enter-to
            transform:translate3d(0,0,0)
          &.slide-forward-leave-to
            transform:translate3d(-100%,0,0)
          &.slide-forward-enter
            transform:translate3d(100%,0,0)
          &.slide-back-leave-active,&.slide-back-enter-active
            transition:1s all
          &.slide-back-leave,&.slide-back-enter-to
            transform:translate3d(0,0,0)
          &.slide-back-leave-to
            transform:translate3d(100%,0,0)
          &.slide-back-enter
            transform:translate3d(-100%,0,0)
</style>

