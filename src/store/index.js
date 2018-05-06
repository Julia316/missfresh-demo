import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
   state:{
     goodsData:[],
     catalogData:{},
     finalData:[], //确认订单时的数据
     bsHeight:0,
     totalCount:0, //购物车商品数
     balls:[
      {
        show:false
      },
      {
        show:false
      },
      {
        show:false
      },
      {
        show:false
      },
      {
        show:false
      }
    ],
     dropBalls:[],
     targetLeft:0,
     targetTop:0,
     ballOnOff:true,
     currentGood:{},
     detailShow:false,
     nowGoodDetail:{},
     vipClass:[
       {
         "id":0,
         "des":"月度",
         "cost":4,
         "check":true
       },
       {
         "id":1,
         "des":"季度",
         "cost":18,
         "check":false
       },
       {
         "id":2,
         "des":"年度",
         "cost":30,
         "check":false
       },
       {
         "id":3,
         "des":"月度",
         "cost":0,
         "check":false
       }

     ],
     nowVipClass:{
       "id":0,
       "des":"月度",
       "cost":4,
       "check":false
     },
     allChecked:true, //购物车是否全选
     confirmOrder:false,
     locationOnOff:false,
     receiver:{
       "name": "",
       "phone": "",
       "add": "",
       "addName":"",
       "addNum":"",
       "type":"住宅",
       "check":false
     },//收货地址
     receiverStore:[],//收货地址列表
     editReceiverOnOff:false,
     currentLocation:{},
     currentCity:"上海-上海市",
     isShowAddBox:true,
     isShowAddStore:false,
     isShowNewAdd:false,
     newAddInfo:{
       "tit":"新增收货地址",
       "dele":false,
       "nowIndex":0
     },
     defaultPay:0,
     orderStore:[],
     openMinePopIndex:-1
   },
   mutations: {
     getGoodsData(state,params){
       state.goodsData=params;
     },
     getCatalogData(state,params){
       state.catalogData=params;
     },
     storedBsHeight(state, params) {
       state.bsHeight = params; //让state里bsHeight的值等于tab子组件动态传进来的高度
       //console.log("vuex里BS高度"+state.bsHeight)
     },
     addBall(state,target){
       state.targetLeft=target.getBoundingClientRect().left;
       state.targetTop=target.getBoundingClientRect().top;
       for(let i=0;i<state.balls.length;i++){
         let ball=state.balls[i];
         if(!ball.show){
           ball.show=true;
           state.dropBalls.push(ball);
           return;
         }
       }
     },
     currentGood(state,data){
        state.currentGood=data;
     },
     showDetail(state,data){
       state.detailShow=true;
       state.nowGoodDetail=data;
     },
     closeDetail(state){
       state.detailShow=false;
     },
     ballOn(state){
       state.ballOnOff=true;
     },
     ballOff(state){
       state.ballOnOff=false;
     },
     finalCheckedDataHandle(state,params){
       state.finalData=params;
       state.finalData.forEach((item)=>{ //revised
         item.check=true;
       })
     },
     vipClassHandle(state,params){
       state.vipClass.forEach((item)=>{
         if(item.id!==params){
           item.check=false
         }else{
           item.check=!item.check;
         }
       })
       if(state.vipClass[params].check){
         state.nowVipClass=state.vipClass[params]
       }else{
         state.nowVipClass=state.vipClass[3]
       }
     },
     checkAllHandle(state,params){
       state.allChecked=!state.allChecked;
       if(state.allChecked){
         params.forEach((item)=>{
           item.checked=true
         })
       }else{
         params.forEach((item)=>{
           item.checked=false
         })
       }

     },
     changeAllCheckedHandle(state,params){ //检测是否有商品没被选中，改变全选按钮的状态
       let i=0;
       params.forEach((item)=>{
         if(!item.checked){
           state.allChecked=false
         }else{
           i++
         }
         if(i===params.length){
           state.allChecked=true
         }
       })
     },
     confirmOrderOn(state){
       state.confirmOrder=true;
     },
     confirmOrderOff(state){
       state.confirmOrder=false;
     },
     locationOn(state){
       state.locationOnOff=true;
     },
     locationOff(state){
       state.locationOnOff=false;
     },
     currentCityHandle(state,params){
       state.currentCity=params;
     },
     currentLocationHandle(state,params){
       state.currentLocation=params;
       state.receiver.addName=params.name; //receiver里的地址名称
       state.receiver.add=params.add; //receiver里的具体地址
     },
     changCurrentCity(state){
       if(state.currentLocation.name.indexOf("市")!==-1 && state.currentLocation.name.length<6){
         state.currentCity=state.currentLocation.name
       }
       console.log(state.currentCity)
     },
     receiverTypeHandle(state,params){
       state.receiver.type=params;
     },
     editReceiver(state,index){
       let copyReceiver2={};//对象深拷贝
       copyReceiver2=JSON.parse(JSON.stringify(state.receiverStore[index]));
       state.receiver=copyReceiver2;

       //改变newAddInfo里的值
       state.newAddInfo.nowIndex=index;
       state.newAddInfo.dele=true;
       state.newAddInfo.tit="编辑收货地址";
     },
     editReceiverOn(state){
       state.editReceiverOnOff=true;
     },
     editReceiverOff(state){
       state.editReceiverOnOff=false;
     },
     deleteReceiver(state){  //删除地址
       state.isShowNewAdd=false;
       state.receiverStore.splice(state.newAddInfo.nowIndex,1);
       if(!state.receiverStore.length){ //receiverStore里没有数据时，确认页的地址为空表格
         state.isShowAddBox=true;
       }
       state.receiver.name=state.receiver.phone=state.receiver.add=state.receiver.addNum=state.receiver.addName="";
     },
     chooseReceiver(state,params){
       for(let i=0;i<state.receiverStore.length;i++){
         if(i===params){
           state.receiverStore[params].check=true;
         }else{
           state.receiverStore[i].check=false;
         }
       }
     },
     notShowAddBox(state){
       state.isShowAddBox=false;
     },
     addAddStore(state){
       state.isShowNewAdd=false;
       let copyReceiver={};//对象深拷贝
       copyReceiver=JSON.parse(JSON.stringify(state.receiver));
       copyReceiver.check=false; //如果没有这句，编辑过以后，receiver的check都会变成true
       if(state.editReceiverOnOff){
         state.receiverStore.splice(state.newAddInfo.nowIndex,1,copyReceiver);
       }else{
         state.receiverStore.push(copyReceiver);
       }
       if(state.receiverStore.length===1){
         state.receiverStore[0].check=true;
       }
       state.receiver.name=state.receiver.phone=state.receiver.add=state.receiver.addNum=state.receiver.addName="";
     },
     notShowAddStore(state){
       state.isShowAddStore=false;
     },
     showAddStore(state){
       state.isShowAddStore=true;
     },
     notShowNewAdd(state){
       state.isShowNewAdd=false;
       state.receiver.name=state.receiver.phone=state.receiver.add=state.receiver.addNum=state.receiver.addName="";

     },
     showNewAdd(state){
       state.isShowNewAdd=true;
       state.showLocationButton=true;

       //改变newAddInfo的值
       state.newAddInfo.dele=false;
       state.newAddInfo.tit="新增收货地址"
     },
     changeDefaultPay(state,params){
       state.defaultPay=params;
     },
     orderStoreHandle(state,params){
       let copyParams={};//对象深拷贝
       copyParams=JSON.parse(JSON.stringify(params));
       state.orderStore.push(copyParams);
     },
     openMineOrder(state,index){ //修改mine中打开的页面
       state.openMinePopIndex=index;
     }
   },
   getters:{
      selectGoodsData(state){
        let selectData=[];
        state.goodsData.forEach((page)=>{
          page.forEach((item)=>{
            item.wares.forEach((good)=>{
              if(good.count){
                selectData.push(good);
              }
            })
          })
        });
        return selectData;
      },
      totalCount(state){
        let counts=0;
        state.goodsData.forEach((page)=>{
          page.forEach((item)=>{
            item.wares.forEach((good)=>{
              if(good.count>0){
                counts+=good.count
              }
            })
          })
        });
        return counts;
      },
      finalPrice(state){
        let prices=0;
        state.finalData.forEach((item)=>{
          prices+=item.count*item.price;
        });
        return prices;
      },
      finalFreight(state){
        let prices=0;
        state.finalData.forEach((item) => {
          prices += item.count * item.price;
        });
        if(prices>=6900){
          return 0;
        }else{
          return 10;
        }
     },
      finalCount(state){
        let counts=0;
        state.finalData.forEach((item)=>{
          counts+=item.count
        });
        return counts;
      },
      refund(state){
        let prices=0;
        state.finalData.forEach((item)=>{
          prices+=item.count*item.price;
        });
        let refundNum=Math.round(prices/100*0.05*10)/10;
        return refundNum;
      },
      vipCost(state){
        return state.nowVipClass.cost;
      },
      defaultReceiver(state){ //选中地址
        let index=0;
        for(let i=0;i<state.receiverStore.length;i++){
          if(state.receiverStore[i].check){
            index=i;
          }
        }
        if(index===0){
          for(let j=0;j<state.receiverStore.length;j++){
            if(j===0){
              state.receiverStore[j].check=true;
            }else{
              state.receiverStore[j].check=false;
            }
          }
        }
        return index
      },
      setOrderName(state){
        for(let i=0;i<state.orderStore.length;i++){
          state.orderStore[i].name="order"+i;
          state.orderStore[i].id="orderimg"+i
        }
      }
   }
})

export default store
