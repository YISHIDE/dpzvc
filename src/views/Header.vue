<template>
    <div class="Header">
        <div class="item">
        <DpHeader title="Header" :fixed="fixed"></DpHeader>
        </div>
        <div class="item">
            <DpHeader title="Header" :fixed="fixed">
                <span slot="right" @click="share">分享</span>
            </DpHeader>
        </div>
        <div class="item">
        <DpHeader title="Header" :fixed="fixed">
            <span slot="left">返回</span>
            <span slot="right" @click="share">分享</span>
        </DpHeader>
        </div>
    </div>
</template>

<script>

    export default {
        name: "dp-header",

        data(){
            return {
                fixed:false
            }
        },
        methods:{
            share(){
                this.$Modal.confirm({
                    showHead:false,
                    body:'点击了分享'
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        position: relative;
        margin-bottom: 20px;
        height: 50px;
    }
</style>