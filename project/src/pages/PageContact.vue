<template>
    <div class="IDContact">
        <div class="wrapper">
            <div class="ButtonClose">
                <button type="button" 
                    class="btn-close" 
                    aria-label="Close"
                    @click="$emit('close')"></button>
            </div>
            <div class="IDInfo">
                <div class="IDInfo-container border rounded">
                    <div class="IDInfo-info">
                        <span class="IDInfo-info-cell">Фамилия: {{ surname || 'Фамилия'}}</span>
                        <span class="IDInfo-info-cell">Имя: {{ name || 'Имя'}}</span>
                        <span class="IDInfo-info-cell">Отчество: {{ patronymic || 'Отчество'}}</span>
                        <span class="IDInfo-info-cell">Тел: {{ phone || '+78888888888'}}</span>
                    </div>
                    <div class="IDInfo-buttons">
                        <div class="IDInfo-buttons-container">
                            <button class="btn btn-outline-danger" @click="$emit('remove')">Удалить</button>
                            <button class="btn btn-outline-secondary " @click="$emit('edit')">Редактировать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['surname', 'name', 'patronymic', 'phone'],
        emits: ['remove', 'edit', 'close'],
        data() {
            return {
                fullElem: '',
                contactInfo: [],
                visibleContactWindow: false,
            }
        },
        methods: {
            createElement () {
                
            },
        },
    }
</script>
<style>
.ButtonClose {
    display: flex; justify-content: flex-end; padding: 30px 15px;
}
/*  */
.IDContact {
    position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000; background-color: #2226; 
}
.IDContact .wrapper {
    position: relative; top: 20%; margin: 0 auto; height: 400px; max-width: 490px; z-index: 109000; background: #fff;
}
/*  */
.IDInfo {
    min-height: 440px;
}
.IDInfo-container {
    width: 100%; max-width: 450px; margin: 0 auto; padding: 20px;
}
.IDInfo-info {
    display: flex; flex-direction: column;
}
.IDInfo-info-cell {
    font-size: 20px; font-weight: 400; margin: 4px;
}
.IDInfo-buttons {
    display: flex; width: 100%; margin-top: 30px; justify-content: center;
}
.IDInfo-buttons-container {
    display: flex; width: 100%; margin-top: 30px; max-width: 300px; justify-content: space-between;
}
</style>