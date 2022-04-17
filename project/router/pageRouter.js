const Router = require ('express');
const controller = require ('../controller/pageController');
const router = Router ();

router.get      ('/404', controller.errorPage);                             // 404
router.get      ('/get-contacts', controller.getContacts);                  // Получение контактов
router.get      ('/contact/:id', controller.getOneContact)                  // Получение одного из контактов                  
router.get      ('/edit-contact/:id', controller.editContactGet);           // Редактирование контакта (get)
router.post     ('/edit-contact/:id', controller.editContactPost);          // Редактирование контакта (post)
router.post     ('/create-contact', controller.createContactPost);          // Создание контакта (post)
router.delete   ('/delete-contact/:id', controller.deleteContact);          // Удаление

module.exports = router;