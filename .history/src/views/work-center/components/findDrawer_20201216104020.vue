<template>
    <div>
        <el-drawer :visible.sync="drawerVisible"  :show-close="false" size="50%" >
            <el-button @click="$emit('update:visible', false)">取消</el-button>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               drawerVisible: false
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