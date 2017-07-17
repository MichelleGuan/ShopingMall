/**
 * Created by Administrator on 2017/7/12 0012.
 */
new Vue({
    el:'.checkout',
    data:{
        totalMoney:0,
        productList:[],
        checkALLIcon:false,
        totalPrice:0,
        deleteMsg:false,
        nowProduct:''
    },
    filters:{
     format:function (value) {
         return "￥"+ value.toFixed(2)
     }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView:function () {
            var _this=this;
            this.$http.get("data/cartData.json").then(function (res) {
                _this.productList=res.data.result.list;
                _this.totalMoney=res.data.result.totalMoney;
            });
        },
        check:function() {
            this.totalPrice=0;
            this.productList.forEach((item)=>{
                if(item.checked){
                    this.totalPrice += item.productPrice * item.productQuantity;
                }
            });

            },

        change:function (item,way) {
            if(way<0){
                item.productQuantity-=1;
                if(item.productQuantity<1){item.productQuantity=1}
             }
            else{item.productQuantity+=1}
            this.check()
        },
        select:function (item) {
            if(typeof item.checked === "undefined"){
            this.$set(item,"checked",true);
            }else {
                item.checked=!item.checked;
            }
            this.check();
        },
        checkAll:function () {
            this.checkALLIcon=!this.checkALLIcon;
            if(this.checkALLIcon){
                 this.productList.forEach((item) =>{
                     if(typeof item.checked === "undefined"){
                         this.$set(item,"checked",true);
                     }else {
                         item.checked=true;
                     }
                     this.totalPrice += item.productPrice * item.productQuantity;
                 });
            }else{
                    this.productList.forEach((item)=>{
                        item.checked=false;
                        this.totalPrice -= item.productPrice * item.productQuantity;
                })
            }
        },
        delete1:function (item) {
         this.deleteMsg=true;
         this.nowProduct=item
        },
        delete2:function () {
            this.deleteMsg=false;
          var index=this.productList.indexOf(this.nowProduct);
            this.productList.splice(index,1)
        }
    }});