<template>
    <div>
        <div class='personal_info'>
            <div  style="margin-top: 20px;">
                <schart class="schart self_in_schart" canvasId="ring" :data="data2" type="ring" :options="options4"></schart>
            </div>

            <div  style="margin-top: 20px;">
                <div class="content-title">{{$t("label_orderDiscount")}}</div>
                <schart class="schart" canvasId="bar" :data="rebate" type="bar" ></schart>
            </div>
        </div>
    </div>
</template>

<script>

    import Schart from 'vue-schart';
    export default {
        data() {
            return {
                dealer_id: localStorage.getItem("id"),
                curtain_type: JSON.parse(localStorage.getItem('code'))['116'],
                rebet: JSON.parse(localStorage.getItem('code'))['118'],
                curtain_type1: "",
                url: '/login_after/rebate/get',//获取经销商额度
                url1: '/login_after/credit/get',//获取经销商信用
                rebate: [],
                credit: {},
                width:600,
                data2: [
                    {name:this.$t("label_have_used_limit"), value:1000},
                    {name: this.$t("label_the_remaining_amount"), value:2000},
                ],
                options4: {
                    title: this.$t('label_credit_line'),
                    bgColor: '#829daa',
                    titleColor: '#ffffff',
                    legendColor: '#ffffff',
                    colorList: ['#FF4949', '#72f6ff'],
                    radius:50,
                    innerRadius: 40,
                    height:"600px",
                }
            };
        },
        components: {
            Schart
        },
        created() {
            this.getalldealer()
            this.getcurtaintype()
        },
        methods: {
            getcurtaintype() {
                let _this = this
                let m = new Map()
                this.curtain_type.forEach((s) => {
                    m.set(s.labelcode, s)
                })
                this.curtain_type1 = m
            },
            getalldealer() {
                let _this = this

                function getrebate() {
                    return _this.$axios.post(_this.url, {"dealer_id": _this.dealer_id});
                }

                function getcredit() {
                    return _this.$axios.post(_this.url1, {"dealer_id": _this.dealer_id});
                }


                _this.$axios.all([getrebate(), getcredit()])
                    .then(_this.$axios.spread(function (rebate, credit) {
                        // 两个请求现在都执行完
                        _this.credit = credit.data.data
                        for (let i=0 ;i<rebate.data.data.length;i++){
                            let obj={}

                            if(i==rebate.data.data.length-1){
                                obj.name=_this.rebet[0].value
                                obj.value=rebate.data.data[i].rebate
                            }else {
                                for(let a=0;a<_this.curtain_type.length;a++){
                                    if(rebate.data.data[i].curtain_type==_this.curtain_type[a].labelcode){
                                        obj.name=_this.curtain_type[i].value
                                        obj.value=rebate.data.data[i].rebate
                                    }
                                }
                            }
                            _this.$set(_this.rebate, i, obj);
                        }

                    }));

            },
        }
    }
</script>
<style scoped>
    .schart {
        width: 100%;
        height: 300px;
    }
    .self_in_schart{
        width: 100%;
        height: 200px;
        line-height: 200px;
    }

</style>
