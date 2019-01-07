<!-- 页面模版 -->
<template>
    <div>

        <!--container-->
        <div id="allmap"
             style="
                width: 100%;
                height:200px;
                border: 1px solid gray;
                overflow:hidden;">
        </div>
        <!--container end-->
    </div>
</template>
<script>
    export default {
        data: () => ({

        }),
        created () {
        },
        mounted () {
            this.ready()
        },
        methods: {
            ready: function () {
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,12);

                function myFun(result){
                    var cityName = result.name;
                    map.setCenter(cityName);
                }
                var myCity = new BMap.LocalCity();
                myCity.get(myFun);
                // localSearch.search(this.$route.params.addr)
            }
        }
    }
</script>
<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
</style>
