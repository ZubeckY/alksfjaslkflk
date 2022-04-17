<template>
    <button class="custom-button">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'custom-button'
}
</script>
<style lang="less">
.custom-button {
  display: flex; align-items: center; justify-content: center; min-width: 70px; height: 50px; margin: 5px; padding: 0 20px; font-size: 13px; text-transform: uppercase;
  color: cornflowerblue; outline: none; background: none; transition: .2s; border: 2px solid turquoise; border-radius: 5px;
  &:hover {cursor: pointer; transition: .2s; background: rgba(64, 224, 208, .1);}
  &:active { box-shadow: 0 0 10px 2px turquoise; transition: .3s;}
}
</style>