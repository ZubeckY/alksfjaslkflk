<template>
    <select v-model="modelValue" @change="changeOption" class="select">
        <option class="select-item" disabled value="">Выбрать:</option>
        <option class="select-item" 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>
<script>
export default {
    name: 'custom-select',
    props: {
        modelValue: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption (event) {
            this.$emit ('update:modelValue', event.target.value)
        }
    },
}
</script>
<style lang="less">
.select {
    position: relative;width:100%;height:50px;margin:5px;margin-bottom:12px;padding: 0 4px;outline: none;border:2px solid turquoise;border-radius:3px;-moz-appearance: none;-webkit-appearance: none;
}
</style>