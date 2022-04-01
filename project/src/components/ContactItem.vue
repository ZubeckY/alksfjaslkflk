<template>
    <li class="contact-list-item">
        <span class="col-1 contact-list-item-cell">{{ id }}</span>
        <span class="col-2 contact-list-item-cell">{{ surname }}</span>
        <span class="col-2 contact-list-item-cell">{{ name }}</span>
        <span class="col-2 contact-list-item-cell">{{ patronymic }}</span>
        <span class="col-2 contact-list-item-cell">{{ phone }}</span>
        <span class="col-2 row">
            <div class="col-6"><button class="btn btn-secondary w-100" @click="$emit('remove')">Уд.</button></div>
            <div class="col-6"><button class="btn btn-secondary w-100" @click="$emit('edit')">Ред.</button></div>
        </span>
    </li> 
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props: [ 'id', 'surname', 'name', 'patronymic', 'phone'],
        emits: ['remove', 'edit'],
    }
</script>

<style>
.contact-list-item {
    display: flex; flex-direction: row; border-bottom: 2px solid #333; height: 40px;
}
.contact-list-item-cell {
    display: flex; min-height: 10px; margin: 0 10px; padding-right: 20px; border-right: 2px solid #333; text-align: center; align-items: center;
}
</style>