<template>
    <div>
        <contact-item 
            v-if="contacts.length"
            v-for="contact in contacts"
            :contact="contact"
            :key="contact._id"
            class="contact-list"
            @remove="$emit('remove', contact)"
            @edit="$emit('edit', contact)"
        />
        <div class="no-elems" v-else>
            <h2 class="no-elems-title">тут пока пусто..</h2>
        </div>
    </div>
</template>
<script>

import ContactItem from './ContactItem'
export default {
    components: { ContactItem },
    props: {
        contacts: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style lang="less">
.contact-list {
    margin-top: 25px;
}
.no-elems {
    margin: 50px;
    &-title {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 30px;
    }
}
</style>