/**
 * Created by Administrator on 2017/7/12 0012.
 */
new Vue({
    el:'.address',
    data:{
        totalMoney:0,
        productList:[]
    },
    mounted:function () {
        this.cartView()
    },
    methods:{
        cartView:function () {
            var _this=this;
         this.$http.get("data/cartData.json").then(function (res) {
             _this.productList=res.body.result.list;
             _this.totalMoney=res.result.totalMoney;
         })
        }



    }});