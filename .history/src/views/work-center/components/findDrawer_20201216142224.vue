<template>
    <div>
        <el-drawer v-bind="$attrs" v-on="$listeners">
            <el-row :gutter="10">
                <el-form ref="form" :model="formData" label-width="80px">
                    <el-col :span="6"></el-col>
                </el-form>
                
            </el-row>
            
        </el-drawer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               formData:{}
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="stylus" scoped>

</style>