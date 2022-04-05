<template>
    <li class="contact-list-item">
        <span class="col-10 contact-list-cell" @click="$emit('more')">
            <span class="row w-100" style="text-align: center;">
                <span class="col-1 contact-list-item-cell" style="margin-left: 20px;"> {{ id }} </span>
                <span class="col-2 contact-list-item-cell"> {{ surname }} </span>
                <span class="col-2 contact-list-item-cell"> {{ name }} </span>
                <span class="col-3 contact-list-item-cell"> {{ patronymic }} </span>
                <span class="col-2 contact-list-item-cell"> {{ phone }} </span>
            </span>
        </span>
        <span class="col-2 d-flex">
            <div class="w-100" style="margin: 0 4px;"><button class="btn btn-secondary w-100" @click="$emit('remove')">Уд.</button></div>
            <div class="w-100" style="margin: 0 4px;"><button class="btn btn-secondary w-100" @click="$emit('edit')">Ред.</button></div>
        </span>
    </li> 
</template>

<script>
    export default {
        props: [ 'id', 'surname', 'name', 'patronymic', 'phone'],
        emits: ['remove', 'edit', 'more'],
    }
</script>

<style>
.contact-list-item {
    display: flex; flex-direction: row; margin: 5px; height: 45px; border-bottom: 2px solid #333;
}
.contact-list-item-cell {
    display: flex; align-items: center; text-align: center; min-height: 10px; margin: 5px 10px; padding-right: 20px; border-right: 2px solid #333; 
}
.contact-list-cell {
    transition: .2s;
}
.contact-list-cell:hover {
    cursor: pointer; transition: .2s; background: #5555;
}
</style>