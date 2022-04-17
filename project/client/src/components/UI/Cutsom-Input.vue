<template>
    <input class="custom-input" type="text" @input="updateInput" :value="modelValue">
</template>
<script>
export default {
    name: 'custom-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput (event) {
            this.$emit ('update:modelValue', event.target.value)
        }
    },
}
</script>
<style lang="less">
.custom-input {
    color: cornflowerblue; outline: none; background: none; border: 2px solid turquoise; border-radius: 5px; transition: .3s;
    display: flex; align-items: center; justify-content: center; min-width: 60px; height: 50px; margin: 15px 5px; padding: 0 10px; font-size: 13px;
    &:active { box-shadow: 0 0 10px 2px turquoise; transition: .3s;}
    &:focus { background: rgba(64, 224, 208,.1); transition: .3s;}
    &::placeholder{ color: turquoise;}
}
</style>