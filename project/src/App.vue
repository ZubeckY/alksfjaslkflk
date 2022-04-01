<template>
  <div class="container border rounded bacgrey">
    <div class="row w-100 justify-content-center" style="margin: 30px 0">
      <!-- Вынести -->
      <div class="col-2 margins border rounded">
        <div class="search">
          <div class="mb-3">
            <label for="exampleInputSearch1" class="form-label">Поиск</label>
            <input type="search" class="form-control" id="exampleInputSearch1">
          </div>

          <div class="mb-3">
          <!-- Вынести (Как формСёрч) -->
            <form v-on:submit.prevent="addNewContact">
              <!-- Форма создания нового контакта -->
              <div>
                <h4>Прибавить человека</h4>
              </div>
              <!-- Тоже Вынести (Как инпутГроуп) -->
              <div class="mb-3">
                <label for="new-surname">Фамилия</label>
                <input
                  v-model="surname"
                  type="text"
                  minlength="3"
                  id="new-surname"
                  placeholder="Иванов"
                />
              </div>
              <div class="mb-3">
                <label for="new-name">Имя</label>
                <input
                  v-model="name"
                  type="text"
                  minlength="2"
                  id="new-name"
                  placeholder="Иван"
                />
              </div>
              <div class="mb-3">
                <label for="new-patronymic">Отчество</label>
                <input
                  v-model="patronymic"
                  type="text"
                  minlength="3"
                  id="new-patronymic"
                  placeholder="Иванович"
                />
              </div>
              <div class="mb-3">
                <label for="new-number">Телефон</label>
                <input
                  v-model="phone"
                  id="new-number"
                  minlength="11"
                  type="number"
                  placeholder="+7 888 999 55 22"
                />
              </div>
              <button>Добавить</button>
            </form>
          </div>
        </div>
      </div>  <!-- col-2 margins... -->
      <!-- Тоже Вынести (Контактс ) -->
      <div class="cont-wrapper margins col-9 border rounded">
        <div class="contact">
          <span class="contact-header row">
            <span class="col-1 contact-header-cell">ID</span>
            <span class="col-2 contact-header-cell">Фамилия</span>
            <span class="col-2 contact-header-cell">Имя</span>
            <span class="col-2 contact-header-cell">Отчество</span>
            <span class="col-2 contact-header-cell">Телефон</span>
          </span>
          <ul class="contact-body contact-list">
            <ContactItem 
                v-for="(contact, index) in contactsPaginList"
                :id="contact.id"
                :surname="contact.surname"
                :name="contact.name"
                :patronymic="contact.patronymic"
                :phone="contact.phone"
                @edit="this.getEditElem (index)" 
                @remove="this.removeFunc (index)"
            />
            
          </ul>
        </div>
      </div>  <!-- cont-wrapper -->
      <!-- Вынести (КонтактПагин) -->
      <div class="contact-pagination d-flex justify-content-center" v-if="contacts.length > 10">
        <nav>
          <ul class="pagination pagination-sm d-flex pagination-container">
            <PaginItem 
              v-for="(pag, index ) in pagination"
              :el="pag.el"
              @showPaginList="this.showPaginElems (index);"
            />
          </ul>
        </nav>
      </div>  <!-- contact-pagination -->
    </div>  <!-- row w-100 -->
  </div>  <!-- container -->
</template>
<script>
  import ContactItem from '@/components/ContactItem.vue'
  import PaginItem from '@/components/Paginitem.vue'

  export default {
    components: {
      ContactItem, PaginItem
    },
    data () {
      return {
        // Модели добавления
        surname: '',                                                          // Фамилия
        name: '',                                                             // Имя
        patronymic: '',                                                       // Отчество
        phone: '',                                                            // Телефон
        // 
        currentPage: 0,
        // 
        contacts: [],                                                         // Массив с контактами
        contactsPaginList: [],                                                // Массив с контактами для пагинации
        nextContactId: 1,                                                     // ID Контакта
        pagination: [],                                                       // Массив с пагинацией
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
      createContacts () {
        // Создание контактов (для массовости)
        let counter = 100;                                                    // счётчик, количество контактов default
        const Contacts = this.contacts;                                       // получем контакты
        const ContactId = this.nextContactId + counter;                       // получаем контактID и сразу же увелив. на 1
        this.nextContactId = ContactId;                                       // отправляем обратно
        // Перебираем сарай
        for (let i = 0; i < counter; i++) {
          const s = String(Math.random()*10).split('.')[0];                   // Счётчик для имён, фамилий и тд
          const number = String(Math.random()*10000000000).split('.')[0];     // Генерация номеров ()
          const element = {
            id: i+1,                                                          // Т.К. отчёт от нуля, делаю + 1
            name: this.names[s],                                              // Имя
            surname: this.surnames[s],                                        // Фамилия
            patronymic: this.patronymics[s],                                  // Отчество
            phone: '+7' + number,                                             // Телефон
          }
          Contacts.push (element)      
        };
        // Плавно перетекаем ко второму сараю
        this.contactsPaginList = JSON.parse(JSON.stringify (Contacts))        // Убираю ссылочную зависимость
        const contactPaginList = this.contactsPaginList;                      // Сарай 1 = Сарай 2
        if (Contacts.length > 10) {                                  
          // Если сарай 2 больше 10, кастрируем до нужного значения
          contactPaginList.splice (10)
        }
      },
      showPaginElems (index) {
        const i = index + 1;                                                  // Получаем кликнутый элемент
        // Вспомагательные переменные (для диапазона)
        const end = i * 10;                                                   // Кноец                          
        const begin = end - 10;                                               // Начал
        this.currentPage = index;                                             // Для глобального получения номера пагинации
        // 
        const Contacts = this.contacts;                                       // Получу контакты
        this.contactsPaginList = JSON.parse(JSON.stringify (Contacts))        // Убираю ссылочную зависимость
        const contactPaginList = this.contactsPaginList;                      // Сарай 1 = Сарай 2
        // 
        contactPaginList.length = 0
        // Перебираем второй сарай
        for (index in Contacts) {
          const elem = Contacts [index]
          if (index >= begin && index < end) {
            contactPaginList.push (elem)
          }
        }
      },
      createPagination () {
        // Пагинация
        const numberСells = (this.contacts.length / 10)                       // Количество страниц
        const pagin = this.pagination;                                        // Массив "Пагинация"
        pagin.length = 0;
        if (numberСells >= 1) {                                               // Чтоб функция не работала впустую, делаю проверку на 1+ страницу
          const CheckIntegrity = Number.isInteger (numberСells)               // Проверка на целое число
          // Если число целое, отрисовывается то количество, не целое, приводим к целому, и так же отрисовываю
          CheckIntegrity ? CreatePagItems (numberСells) : CreatePagItemsPlus1 (numberСells);
        }
        function CreatePagItems (numberСells) {
          // Отрисовка страниц
          for (let i = 0; i < numberСells; i++) {
            const paginItem = {
              el: i + 1                                                       // Номер страницы
            }
            pagin.push (paginItem);
          }
        }
        function CreatePagItemsPlus1 (numberСells) {
          // Отрисовка на одну больше страниц
          const newNumberCells = Number(String(numberСells).split('.')[0])+1;
          for (let i = 0; i < newNumberCells; i++) {
            const paginItem = {
              el: i + 1                                                       // Номер страницы
            }
            pagin.push (paginItem);
          }
        } 
      },

      removeFunc (index) {
        // Функция удаления
        const ID = index                                                      // Кликнутый Элемент 
        const numberPagePag = this.currentPage;                               // Получаем текущий номер страницы
        // Работает по следующей логике, т.к. список отрисовывается по 10 страниц, на него и ориентируется Индекс, к примеру если у элемента номер 97, а в списке
        // он 8, то его будет идентифицировать как 8, а не 97, и чтобы идентифицировать его как 97, получаю номер страницы, и делаю костыль, который получает
        // номер этого элемента
        const ED = Number (String(numberPagePag)+String(index))               // Воть
        this.contacts.splice(ED, 1)                                           // Удаляем 
        this.contactsPaginList = this.contacts;
        this.createPagination ();                                             // Обновляем пагинацию
        this.showPaginElems (numberPagePag);                                  // Пока кидает на 1 страницу
      },

      addNewContact () {
        // Создание нового контакта
        const Contacts = this.contacts;                                       // получем контакты
        let ContactId = this.nextContactId;                                   // получаем контактID
        this.createPagination ()
        const element = {                                                     // Всё по старой схеме
          id: ContactId,                                                      // id
          name: this.name,                                                    // Имя
          surname: this.surname,                                              // Фамилия
          patronymic: this.patronymic,                                        // Отчество
          phone: this.phone,                                                  // Телефон
        }
        Contacts.push (element)
        this.nextContactId++;                                                 // По старой увеличиваю счётчик на 1
        // Отчищаю инпуты
        this.name = '';
        this.surname = '';
        this.patronymic = '';
        this.phone = '';
      },
      getEditElem (index) {
        // ДОДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Редактирование элемента
        const ID = index                                                      // Кликнутый Элемент 
        const numberPagePag = this.currentPage;                               // Получаем текущий номер страницы
        const ED = Number (String(numberPagePag)+String(ID))                  // Та же логика

        console.log (this.contacts [ED])                                      // Элемент
      }
    },
    // 
    mounted() {
      this.createContacts ();                                                 // Отрисовываем сначала контакты
      this.createPagination ();                                               // Затем по ней же отрисовываем пагинацию
    },
  } // exports
</script>
<style>
/* Контакты */
.cont-wrapper {
  position: relative; min-height: 680px;
}
/* contact-header */
.contact-header {
  margin: 20px 0 10px 40px; padding-bottom: 10px; border-bottom: 2px solid #333;
}
.contact-header-cell {
  margin: 0 9px; border-right: 2px solid #333;
}
/* contact-body */
.contact-list {
  list-style: none;
}
/* contact-pagination */
.contact-pagination {
  position: absolute; left: 90px; right: 0; bottom: 210px;
}
/* display: flex; flex-direction: row; */
</style>