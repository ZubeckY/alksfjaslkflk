<template>
  <PageContact class="page-info-conctact"
    v-show="visibleContactWindow"
    :name="this.name || '' "
    :phone="this.phone || '' "
    :surname="this.surname || '' "
    :patronymic="this.patronymic || '' "

    @remove="this.removeFunc (index)"
    @close="this.closeContact ()"
  />

  <div class="container border rounded bacgrey">
      <div class="row w-100 justify-content-center" style="margin: 30px 0">
        <div class="col-2 margins border rounded">
          <div class="search">    
          <!--  -->
            <div class="mb-3">
              <label for="exampleInputSearch1" class="form-label"><strong>Поиск</strong></label>
              <input type="input" 
                class="form-control" 
                id="exampleInputSearch1" 
                @keyup="SearchElem"
                v-model="SearchInput"
                >
            </div>
          <!--  -->
            <div class="mb-3">
              <form v-on:submit.prevent="addNewContact">
                <!-- Форма создания нового контакта -->
                <div style="margin-bottom: 10px">
                  <span><strong>Прибавить человека</strong></span>
                </div>
                <!-- Тоже Вынести (Как инпутГроуп) -->
                <div class="mb-3">
                  <label for="new-surname">Фамилия</label>
                  <input
                    type="text"
                    minlength="3"
                    v-model="surname"
                    id="new-surname"
                    class="form-control"
                    placeholder="Иванов"
                    />
                </div>
                <div class="mb-3">
                  <label for="new-name">Имя</label>
                  <input
                    type="text"
                    minlength="2"
                    v-model="name"
                    id="new-name"
                    class="form-control"
                    placeholder="Иван"
                    />
                </div>
                <div class="mb-3">
                  <label for="new-patronymic">Отчество</label>
                  <input
                    type="text"
                    minlength="3"
                    v-model="patronymic"
                    id="new-patronymic"
                    class="form-control"
                    placeholder="Иванович"
                    />
                </div>
                <div class="mb-3">
                  <label for="new-number">Телефон</label>
                  <input
                    type="number"
                    minlength="11"
                    v-model="phone"
                    id="new-number"
                    class="form-control"
                    placeholder="+7 888 999 55 22"
                    />
                </div>
                <div class="mb-3">
                  <button class="btn btn-success w-100">Добавить</button>
                </div>
              </form>
            </div>
          </div>
        </div>  <!-- col-2 margins... -->

        <div class="cont-wrapper margins col-9 border rounded">
          <div class="contact">
            <!--  -->
            <ContactHeader />
            <!--  -->
            <ul class="contact-body contact-list">
              <ContactItem 
                v-for="(contact, index) in contactsPaginList"
                :id="contact.id"
                :surname="contact.surname"
                :name="contact.name"
                :patronymic="contact.patronymic"
                :phone="contact.phone"
                @edit="this.getEditElem (index)" 
                @more="this.showContact (index)"
                @remove="this.removeFunc (index)"
              />
            </ul>
          </div>
        </div>  <!-- cont-wrapper -->

        <div class="contact-pagination d-flex justify-content-center" v-if="contacts.length > 10">
          <nav>
            <ul class="pagination pagination-sm d-flex pagination-container">
              <PaginItem 
                v-for="(pag, index) in pagination"
                :el="pag.el"
                @showPaginList="this.showPaginElems (index);"
              />
            </ul>
          </nav>
      </div>  <!-- contact-pagination -->

    </div>  <!-- row w-100 -->


    <div class="editContact rounded">
      <div class="editContact-wrapper border rounded">
        <form v-on:submit.prevent="editThisContact">
          <!-- Форма создания нового контакта -->
          <div>
            <h6>Редактировать</h6>
          </div>
          <!-- Тоже Вынести (Как инпутГроуп) -->
          <div class="mb-3">
            <label for="ed-surname">Фамилия</label>
            <input
              type="text"
              minlength="3"
              v-model="editSurName"
              id="ed-surname"
              class="form-control"
              placeholder="Иванов"
              />
          </div>
          <div class="mb-3">
            <label for="new-name">Имя</label>
            <input
              type="text"
              minlength="2"
              v-model="editName"
              class="form-control"
              placeholder="Иван"
              />
          </div>
          <div class="mb-3">
            <label for="ed-patronymic">Отчество</label>
            <input
              type="text"
              minlength="3"
              v-model="editPatronymic"
              id="ed-patronymic"
              class="form-control"
              placeholder="Иванович"
              />
          </div>
          <div class="mb-3">
            <label for="ed-number">Телефон</label>
            <input
              type="text"
              minlength="11"
              v-model="editPhone"
              id="ed-number"
              class="form-control"
              placeholder="+7 888 999 55 22"
              />
          </div>
          <div class="button-group">
            <button class="btn btn-secondary">Редактировать</button>
            <button class="btn btn-danger" @click="$emit('CloseEditWindow')">Отмена</button>
          </div>
        </form>
      </div>  <!-- editContact-wrapper -->
    </div>  <!-- editContact -->

  </div>  <!-- container -->

</template>
<script>

  import PaginItem from '@/components/Paginitem.vue';
  import PageContact from '@/pages/PageContact.vue';
  import ContactItem from '@/components/ContactItem.vue';
  import ContactHeader from '@/components/Contactheader.vue';



  export default {
    components: {
      ContactItem, PaginItem, PageContact, ContactHeader,
    },
    data () {
      return {
        // Модели добавления
        phone: '',                                                            // Телефон
        name: '',                                                             // Имя
        surname: '',                                                          // Фамилия
        patronymic: '',                                                       // Отчество
        fullElem: String ( this.name + ' ' +  
          this.surname + ' ' + this.patronymic +                              // Элемент для поиска (Состоит из всех элементов, кроме id)
          ' ' + this.phone),  

        SearchInput: '',                                                      // Строка поиска
        SearchMode: false,                                                    // Фильтрация

        editName: '',
        editSurName: '',
        editPatronymic: '',
        editPhone: '',

        IdElem: 0,                                                            // 

        Counter: 100,                                                         // Количество генерации

        contacts: [],                                                         // Массив с контактами
        contactsList: [],                                                     // Массив для отображения контактов
        contactsFilterList: [],                                               // Массив для фильтрации контактов
        contactsPaginList: [],                                                // Массив для пагинации

        nextContactId: 1,                                                     // ID Контакта

        pagination: [],                                                       // Массив с пагинацией
        paginationNormal: [],                                                 // Пагинация для 
        paginationFilter: [],                                                 // Пагинация для Фильтров

        paginationCreated: false,                                             // Для создании пагинации (чтоб не дублировалась)

        visibleContactWindow: false,                                          // Открыто ли окно контакта

        paginLength: 1,                                                       // Размер пагинации
        paginCurrentPage: 0,                                                  // Номер страницы пагинации


        // Для генерации 
        names: [
          'Алексей','Александр','Владимир','Виталий','Василий',               // Список для генерации имён
          'Борис','Пётр','Иван','Игорь','Семён',
        ],
        surnames: [
          'Иванов', 'Петров', 'Сидоров', 'Попов', 'Кузнецов',                 // Список для генерации фамилий
          'Васильев','Смирнов','Михайлов','Соколов','Белоусов',
        ],
        patronymics: [
          'Дмитриевич','Борисович','Святославич','Владимирович','Сергеевич',  // Список для генерации отчеств
          'Викторович','Васильевич','Иванович','Александрович','Павлович',
        ]
      }
    },
    //
    methods: {

      initContacts () {
        let counter = this.Counter;                                           // счётчик, количество контактов default
        const Contacts = this.contacts;                                       // получем контакты
        const ContactId = this.nextContactId + counter;                       // получаем контактID и сразу же увелив. на 1
        this.nextContactId = ContactId;                                       // отправляем обратно
        // Перебираем сарай
        for (let i = 0; i < counter; i++) {
          const s = String( Math.random()*10).split('.')[0];                  // Счётчик для имён, фамилий и тд
          const number = String (Math.random()*10000000000).split('.')[0];    // Генерация номеров ()
          const element = {
            id: i + 1,                                                        // Т.К. отчёт от нуля, делаю + 1
            name: this.names[s],                                              
            surname: this.surnames[s],                                        
            patronymic: this.patronymics[s],                                  
            phone: '+7' + number,                                             
            fullElem: String (this.names[s] + ' ' +  this.surnames[s] + ' ' + this.patronymics[s] + ' ' + '+7' + number),
          }
          Contacts.push (element)      
        };
        this.createContactList ();
      },


      createContactList () {
        // Просто Выводим контакты
        const Contacts = this.contacts;
        this.contactsList = JSON.parse(JSON.stringify (Contacts));
        this.contactCreatePagination ()
      },


      contactCreatePagination () {
        // Создаём пагинацию
        this.pagination = [];
        const ContactsList = this.contactsList;
        let paginLength = ContactsList.length / 10;

        if (Number.isInteger(paginLength) == true) {this.paginLength = paginLength} 
        else { paginLength = Math.ceil (paginLength); this.paginLength = paginLength};
        
        this.contactsPaginList = ContactsList;

        if (ContactsList.length) {
          this.contactsPaginList.length = 10;
          for (let i = 0; i < paginLength; i++) {
            const el = {el: i + 1};
            this.pagination.push (el)
          }
        } 
      },


      showPaginElems (index) {
        const i = index + 1;                                                  // Получаем кликнутый элемент
        const end = i * 10;                                                   // Кноец                          
        const begin = end - 10;                                               // Начал
    
        this.paginCurrentPage = index;                                        // Для глобального получения номера пагинации
        const Contacts = this.contacts;                                       // Получу контакты

        const contactPaginList = this.contactsPaginList;
        contactPaginList.length = 0                                           // Чтоб при клике на кнопку, пагинация не дублировалась

        for (index in Contacts) {
          const elem = Contacts [index]
          if (index >= begin && index < end) {
            contactPaginList.push (elem)
          }
        }
        this.paginPageListener ();
      },


      paginPageListener () {
        const contactPaginList = this.contactsPaginList;

        if (contactPaginList.length == 0) {
          this.pagination.splice (this.paginCurrentPage, 1);
          this.paginCurrentPage -= 1;
          this.showPaginElems (this.paginCurrentPage)
        }

      },

      removeFunc (index) {
        const Index = index;
        const Page = this.paginCurrentPage

        const ID = Number (String (Page) + String (Index));
        this.contacts.splice (ID, 1);
        
        this.createContactList ();
        this.showPaginElems(Page);
      },

      
      getEditElem (index) {
        const Index = index;
        const Page = this.paginCurrentPage
        const ID = Number (String (Page) + String (Index));
        this.IdElem = ID
        this.editName = this.contacts[ID].name
        this.editPhone = this.contacts[ID].phone
        this.editSurName = this.contacts[ID].surname
        this.editPatronymic = this.contacts[ID].patronymic

      },


      editThisContact () {
        if (this.editName == '' &&
            this.editPhone == '' &&
            this.editSurName == '' &&
            this.editPatronymi == '') { 
        } else {
          const ID = this.IdElem;
          const Contacts = this.contacts;
          const Page = this.paginCurrentPage;
          
          Contacts[ID];
          
          const elem =  {
            id: this.contacts[ID].id,
            name: this.editName,
            phone: this.editPhone,
            surname: this.editSurName,
            patronymic: this.editPatronymic,
            fullElem: String (this.name + ' ' +  this.surname + ' ' + this.patronymics + ' ' + '+7' + this.phone),
          }

          Contacts[ID] = (elem)

          this.createContactList ();
          this.showPaginElems (Page);
          this.clearFields ();
        }
      },


      showContact (index) {
        const Index = index;
        const Page = this.paginCurrentPage
        const ID = Number (String (Page) + String (Index));
        this.IdElem = ID
        this.name = this.contacts[ID].name;
        this.phone = this.contacts[ID].phone;
        this.surname = this.contacts[ID].surname;
        this.patronymic = this.contacts[ID].patronymic;
        this.visibleContactWindow = !this.visibleContactWindow;
      },

      closeContact () {
        this.visibleContactWindow = !this.visibleContactWindow
        this.clearFields () 
      },


      clearFields () {
        this.name = '';
        this.phone = '';
        this.surname = '';
        this.patronymic = '';
        // 
        this.editName = '';
        this.editPhone = '';
        this.editSurName = '';
        this.editPatronymic = '';
      },


      addNewContact () {                          // Создание нового контакта
        if ( this.name == '' &&
            this.surname == '' &&
            this.patronymic == '' &&
            this.phone == '') {
          return null
        } else {
          const Contacts = this.contacts;                                       // получем контакты
          const element = {                                                     // Всё по старой схеме
            // id: ContactId,
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            phone: this.phone,
            fullElem: String (this.name + ' ' +  this.surname + ' ' + this.patronymic + ' ' + this.phone),
          }; Contacts.push (element);

          // this.nextContactId = Number(Contacts.length++);
          this.clearFields ()
        }
        this.createContactList ();
        this.showPaginElems(this.paginCurrentPage);
      },

      // Филтрация
      SearchElem () {                                                         // Сортировка/поиск элементов
        let Contacts = this.contacts;                                       
        let SearchValue = this.SearchInput;
        if (SearchValue.length >= 3) {
          this.SearchMode = true;
          function filterFull (Contacts, SearchValue) {
            return Contacts.filter(function (item, i, arr) {
                return (item.fullElem.includes(SearchValue));
            });
          };
          this.contactsFilterList = filterFull (Contacts, SearchValue);
          this.contactsList = this.contactsFilterList;
          this.contactCreatePagination ()

        } else if (SearchValue.length == 0) {
          if (this.SearchMode == true) {
            this.SearchMode = false;
            this.createContactList ()
          }
        }
      },
    },


    // 
    mounted() {
      this.initContacts ();
    },
  } // exports
</script>
<style>

.button-group {
  display: flex; margin: 0 auto; max-width: 400px; justify-content: space-between;
}
  /* contact-body */
.contact-list {
    list-style: none;
}
/* Контакты */
.cont-wrapper {
    position: relative; min-height: 680px;
}

/* editContact */
.editContact-wrapper {
  width: 100%; max-width: 500px; padding: 30px; background: #fff;
}
</style>