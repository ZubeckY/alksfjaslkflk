<template>
    <div class="dialog" v-show="show" @click="hideDialog">
        <div @click.stop class="dialog-container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dialog-window',
    props: {
        show: {
            type: Boolean, default: false
        }
    },
    methods: {
        hideDialog () {
            this.$emit('update:show', false);
        }
    },
}
</script>
<style lang="less">
.dialog {
    display:flex;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0, 0, 0, .5);
    &-container {
        margin:auto;padding:10px;min-width:600px;min-height:150px;border-radius:12px;background-color:#fff;
    }
}
</style>