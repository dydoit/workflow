<template>
    <div>
        <el-drawer v-bind="$attrs" v-on="$listeners">
            <el-button @click="$emit('update:visible', false)">取消</el-button>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        methods: {
            handleClose(done) {
                done()
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>