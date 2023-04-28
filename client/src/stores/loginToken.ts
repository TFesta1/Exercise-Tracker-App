import { reactive, computed, inject } from 'vue'
import type UserStore from '@/stores/user'
import { api } from '@/model/session'



export type Token = {
    token: string;
}

export type LoginTokenStore = {
    state: {
        token: string,
    },
    getters: {
        getToken: string,
    },
    actions: {
        loginRetrieveToken: () => Promise<void>,
    },
}

const state = reactive({
    token: '',
})

const getters = reactive({
    getToken: computed(() => state.token)
})

const actions: LoginTokenStore['actions'] = {
    async loginRetrieveToken() {
        const response = await api("users/login", {
            "email": "john@doe.com",
            "password": "123456"
        })

        state.token = response.data.token;
        // console.log(state.token)
    },
}
        

export default { state, getters, ...actions }