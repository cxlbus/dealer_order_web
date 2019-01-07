<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <div class="grid-content bg-purple">
                        <el-menu
                            :default-active="onRoutes"
                            :class="{'sidebar-el-menu':true,'self_heng':!this.$store.state.base.is_mobile}"
                            :mode="this.$store.state.base.is_mobile?'horizontal':'vertical'"
                            router
                        >
                            <el-menu-item index="base">{{$t('label_basic_information')}}</el-menu-item>
                            <el-menu-item index="safe">{{$t('label_commercial_information')}}</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>

                <el-col :span="18" :xs="24" :class="{'self_margin_top':this.$store.state.base.is_mobile}">
                    <div class="line">
                        <transition mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>


    export default {
        data() {
            return {
                activeIndex: 'base',
            };
        },
        components: {},
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {

        },
        methods: {}
    }
</script>
<style scoped>
    .self_heng {
        height: 400px;
        margin-bottom: 20px
    }

    .self_margin_top {
        margin-top: 10px;
    }
</style>
