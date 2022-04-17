<template>
  <div class="container">
    <div class="container-items contact-actions-buttons">
      <custom-input class="w-100" v-model="searchQuery" placeholder="Поиск" />
      <custom-select class="w-100" 
        v-model="selectedSort"
        :options="sortOptions"
      />
      <custom-button class="w-100" @click="showDialog">Добавить контакт</custom-button>
    </div>
    <div class="container-items">
      <contact-list 
        :contacts="searchAndSortContacts"
        @edit="editDialog"
        @remove="removeContact"
      />
    </div>
  </div>

  <dialog-window v-model:show="dialogVisible">
    <contact-form @create="createContact" />
  </dialog-window>

  <dialog-window v-model:show="editVisible">
    <edit-form
      :contact="contact"
      @edit="editContact" />
  </dialog-window>
  
  <!-- Пока так, после сделаю чуть универсальнее -->
  <div v-show="AlertVisible">
    <alert class="alert-success" v-if="SuccessCompletion == true">Успешно!</alert>
    <alert class="alert-danger" v-else>Ошибка сервера, попробуйте снова</alert>
  </div>

</template>
<script>

import axios from 'axios'
import ContactList from '@/components/ContactList'
import ContactForm from '@/components/ContactForm'
import EditForm from '@/components/ContactEditForm'

export default {
  components: { 
    ContactList, ContactForm, EditForm,
  },
  data() {
    return {
      contacts: [],
      contact: {},

      dialogVisible: false,
      editVisible: false,

      AlertVisible: false,
      SuccessCompletion: '',

      selectedSort: '',
      searchQuery: '',

      sortOptions: [
        {value: '', name: 'По Умолчанию'},
        {value: 'name', name: 'По Имени'},
        {value: 'surname', name: 'По Фамилии'},
        {value: 'patronymic', name: 'По Отчеству'},
      ],
    }
  },
  methods: {
    // Получение контактов
    async fetchContacts () {
      try {
        let response = await axios.get ('http://localhost:8081/get-contacts')
        this.contacts = response.data;
        return this.contacts
      } catch (e) {
        this.AlertDanger ();
      }
    },
    // Добавление контакта
    async createContact (contact) {
      try {
        this.dialogVisible = !this.dialogVisible
        await axios
        .post ('http://localhost:8081/create-contact', {
          name: contact.name,
          surname: contact.surname,
          patronymic: contact.patronymic,
          phone: contact.phone
        })
        .then (response => {this.Success()})
      } catch (error) {
        this.AlertDanger ();
      }
    },
    // Редактирование контакта
    async editContact (contact) {
      try {
        this.editVisible = !this.editVisible;
        const contactEdit = contact._id;

        await axios
        .post (`http://localhost:8081/edit-contact/${contactEdit}`, {
          name: contact.name,
          phone: contact.phone,
          surname: contact.surname,
          patronymic: contact.patronymic,
        })
        .then (response => {this.Success()})
      } catch (error) {
        this.AlertDanger ();
      }
    },
    // Удаление контакта
    async removeContact (contact) {
      try {
        const contactRemoving = contact._id;
        await axios
        .delete (`http://localhost:8081/delete-contact/${contactRemoving}`)
        .then (response => {this.Success()})
      } catch (error) {
        this.AlertDanger ();
      }
    },
    // Диалоговое окно
    showDialog () {
      this.dialogVisible = !this.dialogVisible
    },
    // Диалоговое окно
    editDialog (contact) {
      this.contact = contact
      this.editVisible = !this.editVisible
    },

    Success () {
      this.fetchContacts ();
      this.AlertSuccess ();
    },

    // Успешное завершение операции
    AlertSuccess () {
      this.AlertVisible = true;
      this.SuccessCompletion = true;
      setTimeout(() => {
        this.AlertVisible = false;
        this.SuccessCompletion = '';
      }, 2000);
    },
    // Не завершение операции
    AlertDanger () {
      this.AlertVisible = true;
      this.SuccessCompletion = false;
      setTimeout(() => {
        this.AlertVisible = false;
        this.SuccessCompletion = '';
      }, 2000);
    },
  },
  mounted () {
    this.fetchContacts ();
  },
  computed: {
    selectPosts () {
      return [...this.contacts].sort ((contact1, contact2) => contact1[this.selectedSort]?.localeCompare(contact2[this.selectedSort]))
    },
    searchAndSortContacts () {
      return this.selectPosts.filter (contact => contact.name.toLowerCase().includes (this.searchQuery.toLowerCase()))
    }
  },
}
</script>

<style lang="less">
* {margin:0;padding:0;box-sizing:border-box;font-family:'Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif;}
.w-100 { width: 100%;}
.container {
  display: flex;flex-direction: row;margin:0 auto;max-width:1200px;
  &-items {
    margin: 0 20px;
  }
}
.contact-actions-buttons {
  margin: 10px 0;
}
</style>