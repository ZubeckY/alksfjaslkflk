<template>
    <div class="contact-list-item" >
        <div class="contact-list-item-col">
            <div class="contact-list-item-col-item">{{ contact.name }}</div>
            <div class="contact-list-item-col-item">{{ contact.surname }}</div>
            <div class="contact-list-item-col-item">{{ contact.patronymic }}</div>
            <div class="contact-list-item-col-item">{{ contact.phone }}</div>
        </div>
        <div class="contact-list-item-col">
            <custom-button @click="$emit ('edit', contact)">Редактировать</custom-button>
            <custom-button @click="$emit ('remove', contact)">Удалить</custom-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        contact: {
            type: Object, required: true
        }
    }
}
</script>
<style lang="less">
.contact-list {
    &-item{
        display:flex;margin:15px;max-width:800px;justify-content:space-between;border:2px solid turquoise;opacity:.3s;
        &:hover {cursor: pointer; background:rgba(172,219,212,.1);opacity:.3s;}
        &-col {
            display:flex;margin:10px;align-items:center;justify-content:center;
            &-item {
                min-width:60px;margin:0 10px;text-align:center;
            }
        }
    }
}
</style>
