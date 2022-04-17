<template>
    <div class="alert">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'alert'
}
</script>
<style lang="less">
.alert {
    position:absolute;bottom:10px;right:10px;width:500px;padding:1rem 1rem;border-radius:.25rem;border: 1px solid transparent;
    &-success {
        color:#055160;background-color:#cff4fc;border-color:#b6effb;
    }
    &-danger {
        color:#842029;background-color:#f8d7da;border-color:#f5c2c7;
    }
}
</style>