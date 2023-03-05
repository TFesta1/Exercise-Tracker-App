import { computed, reactive } from 'vue'
import * as Request from '@/requests'
// Import router from index.ts
import router from '@/router/index'



// import { router } from '@/router'


// Update this whenever you add new functions so that you can export a specified type
// export type UserStore = {
//     state: {
//         name: string,
//         username: string,
//         error: string,
//     },
//     getters: {
//         isLoggedIn: boolean,
//     },
//     actions: {
//         getUser: () => Promise<void>,
//         login: (username: string, password: string) => Promise<boolean>,
//         logout: () => Promise<void>,
//     },
// }




const state = reactive({
    name: '',
    username: '',

    error: '',
})

const getters = reactive({
    isLoggedIn: computed(() => state.username !== '')
})

const actions = {
    async getUser() {
        // Checks if a user is logged in
        const user = await Request.getUsers()
        if (user == null) return;
        state.name = user.name
        state.username = user.username

    },
    async login(username: string, password: string) {
        const user = await Request.login(username, password)
        if (user == null) {
            state.error = 'Invalid username or password'
            return;
        }
        // If we find a user, update the state
        state.name = user.name
        state.username = user.username
        state.error = ''

        // Redirect to our homepage
        router.push('/')
        
        return true
    },
    // Switch this with sessions or JWT tokens later (or clear cookies)
    async logout() {
        state.name = ''
        state.username = ''
        router.push('/login')
    },
    async getUserName()
    {
        return state.username
    }
}

export default { state, getters, ...actions }