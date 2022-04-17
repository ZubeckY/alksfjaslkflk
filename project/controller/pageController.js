const { findByIdAndUpdate } = require('../models/contact');
const Contacts = require ('../models/contact');

class pageController {
    // Получение всех контактов
    async getContacts (req, res) {
        await Contacts
        .find  ()
        .then  (contacts => res.send (contacts))
        .catch (error => res.status (404))
    }
    // Получение отдельного контакта
    async getOneContact (req, res) {
        await Contacts
        .findById (req.params.id)
        .then  (contact => res.send (contact))
        .catch (error => res.status (400))
    }
    // Создание контакта (post)
    async createContactPost (req, res) {
        const {name, surname, patronymic, phone} = req.body
        const contacts = new Contacts ({name, surname, patronymic, phone})
        await contacts
        .save ()
        .then  (contacts => res.send (contacts))
        .catch (error => res.status (400))
    }
    // Удаление контакта
    async deleteContact (req, res) {
        await Contacts
        .findByIdAndDelete (req.params.id)
         .then  (contacts => res.send (contacts))
        .catch (error => res.status (400))
    }
    // Редактирование контакта (get)
    async editContactGet (req, res) {
        await Contacts
        .findById (req.params.id)
        .then  (contact => res.send (contact))
        .catch (error => res.status (400))
    }
    // Редактирование контакта (post)
    async editContactPost (req, res) {
        const {name, surname, patronymic, phone} = req.body;
        const { id } = req.params;
        await Contacts
        .findByIdAndUpdate (id, {name, surname, patronymic, phone})
        .then  (contacts => res.send (contacts))
        .catch (error => res.status (400))
    }
    // Страница ошибки
    errorPage (req, res) {
        res.send ('404').status (200)
    }
}

module.exports = new pageController ();