<template>
    <form class="form" @submit.prevent>
        <h4 class="form-title">Создание контакта</h4>
        <div class="form-container">
            <custom-input 
                placeholder="Имя" 
                v-model="contact.name"
            />
            <custom-input 
                placeholder="Фамилия" 
                v-model="contact.surname"
            />
            <custom-input 
                placeholder="Отчество" 
                v-model="contact.patronymic"
            />
            <custom-input 
                placeholder="Телефон" 
                v-model="contact.phone"
            />
            <custom-button @click="createContact">Добавить</custom-button>
        </div>
    </form>
</template>
<script>
export default {
    data() {
        return {
            contact: {
                name: '',
                surname: '',
                patronymic: '',
                phone: '',
            }
        }
    },
    methods: {
        createContact () {
            this.$emit ('create', this.contact)
            this.clearModels ();
        },
        clearModels () {
            this.contact = {
                name: '',
                surname: '',
                patronymic: '',
                phone: '',
                }
            }
        },
    }
</script>
<style lang="less">

.form {
  &-title{
    margin: 10px;text-align: center;
  }
  &-container {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    justify-content: center;
    flex-direction: column;
  }
}
</style>