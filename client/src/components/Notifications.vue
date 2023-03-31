<script setup lang="ts">
    import { ref } from 'vue';
    import { useSession, deleteMessage } from '@/model/session';
    const session = useSession();
    const isActive = ref(false);
</script>

<template>
    <div class="notifications">
        <button class="button is-primary" @click="isActive = !isActive">
            <span class="icon">
                <i class="fas fa-bell fa-lg " :class="{'fa-beat-fade' : session.isLoading}"></i>
            </span>
        </button>
        <div class="notification-list" v-show="isActive">
            <div v-for="msg, i in session.messages" :class="`notification is-light is-${msg.type}`">
                <button class="delete fas fa-times" @click="deleteMessage(i)"></button>
                {{ msg.msg }}
            </div>
        </div>
    </div>
</template>


<style scoped>
    .notifications {
        position: relative;
        z-index: 99999999;
    }
    .notification-list {
        position: absolute;
        margin-top: 5px;
        right: 1px;
        top: 90px;
        width: 300px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        min-height: 300px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        z-index: 99999999;

    }
    .notification-list .notification {
        margin: 5px;
        z-index: 99999999;

    }
</style>