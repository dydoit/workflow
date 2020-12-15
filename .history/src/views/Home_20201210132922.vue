<template>
    <div class="wrapper">
        <Nav></Nav>
        <div class="container">
            <Aside></Aside>
            <div class="content-wrap">
                 <BreadCrumb class="breadcrumb-container" />
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import Aside from '@/components/layout/aside/Aside.vue'
import BreadCrumb from "./breadcrumb";
import Nav from '@/components/layout/Nav.vue'
    export default {
        components: {
            Aside,
            Nav
        },
    }
</script>

<style lang="stylus" scoped>
.wrapper
    width 100%
    height 100%
    overflow hidden
    display flex
.container
    display flex
    flex 1
    overflow hidden
    flex-direction column
    .content-wrap
        flex 1
        padding 15px
        overflow auto
</style>