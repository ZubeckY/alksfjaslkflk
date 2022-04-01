<template>
    <li class="page-item"><button class="page-link" @click="$emit('showPaginList')">{{ el }}</button></li>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props: [ 'el'],
        emits: ['showPaginList'],
    }
</script>
<style>

</style>