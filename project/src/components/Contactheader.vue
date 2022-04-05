<template>
    <span class="contact-header row">
        <span class="col-1 contact-header-cell">ID</span>
        <span class="col-2 contact-header-cell">Фамилия</span>
        <span class="col-2 contact-header-cell">Имя</span>
        <span class="col-2 contact-header-cell">Отчество</span>
        <span class="col-2 contact-header-cell">Телефон</span>
    </span>
</template>
<style>
/* contact-header */
.contact-header {
    margin: 20px 0 10px 40px; padding-bottom: 10px; border-bottom: 2px solid #333;
}
.contact-header-cell {
    margin: 0 9px; border-right: 2px solid #333;
}
/* contact-pagination */
.contact-pagination {
    position: absolute; left: 90px; right: 0; bottom: 240px;
}
</style>