/**
 * Created by Administrator on 2017/7/12 0012.
 */
new Vue({
    el:'.address',
    data:{
      addressList:[],
        limit:3,
        nowIndex:-1,
        setMethod:1
    },
    mounted:function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    computed:{
     filterAddress:function () {
         return this.addressList.slice(0,this.limit);
     }
    },
    methods:{
        cartView:function () {
            var _this=this;
         this.$http.get("data/address.json").then(function (res) {
             if(res.data.status===0){
             _this.addressList=res.data.result;
             }
         })
        },
        setDefault:function (ID) {
        this.addressList.forEach(function (value) {
            if(value.addressId===ID){
               value.isDefault=true
            }else{
                value.isDefault=false
            }
        })
        },
        a:function (item) {
            var index=this.addressList.indexOf(item);
            this.addressList.splice(index,1)
        }
    }});