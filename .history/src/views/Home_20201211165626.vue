<template>
    <div class="wrapper">
        <Nav></Nav>
        <div class="container">
            <Aside></Aside>
            <div class="content-wrap">
                <BreadCrumb class="breadcrumb-container" />
                <el-scrollbar class="scrollbar">
                    <router-view />
                </el-scrollbar>
               
            </div>
        </div>
    </div>
</template>

<script>
import Aside from '@/components/layout/aside/Aside.vue'
import BreadCrumb from "@/components/layout/breadcrumb";
import Nav from '@/components/layout/Nav.vue'
    export default {
        components: {
            Aside,
            BreadCrumb,
            Nav
        },
    }
</script>

<style lang="stylus" scoped>
.wrapper
    width 100%
    height 100%
    display flex
    flex-direction column
    overflow hidden
.container
    display flex
    width 1200px
    height 100%
    margin 0 auto
    overflow hidden
    .content-wrap
        flex 1
        display flex
        flex-direction column
        margin-left 20px
        padding: 0 15px
        background-color #fff
        border-radius 6px
        overflow hidden
        // .scrollbar
        //     flex 1
</style>