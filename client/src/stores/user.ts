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

export type UserStore = {
    state: {
        name: string,
        username: string,
        error: string,
    },
    getters: {
        isLoggedIn: boolean,
    },
    actions: {
        getUser: () => Promise<void>,
        login: (username: string, password: string) => Promise<boolean>,
        logout: () => Promise<void>,
        getUserName: () => Promise<string>,
    },
}

const actions: UserStore['actions'] = {
    //Maybe it's getUser
    async getUser() {
        // Checks if a user is logged in
        const user = await Request.getUsers()
        if (user == null) return;

        // Don't update the state since this changes the logged in user
        // state.name = user.name
        // state.username = user.username

    },
    async login(username: string, password: string): Promise<boolean> {
        const user = await Request.login(username, password)
        if (user == null) {
            state.error = 'Invalid username or password'
            return false;
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
    async getUserName() : Promise<string>
    {
        
        return state.username
    }
}

export default { state, getters, ...actions }