import { computed, reactive, inject } from 'vue'
import * as Request from '@/requests'
// Import router from index.ts
import router from '@/router/index'
import { api, useSession, addMessage, useLogin } from '@/model/session'
import token from "@/stores/loginToken"

// console.log(token.getToken())

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
        // while(user.username == '')
        // {
        //     await actions.getUser()
        // }
        // If we find a user, update the state
        state.name = user.name
        state.username = user.username
        state.error = ''

        token.loginRetrieveToken()

        // console.log(response.data.token);
        // const session = useSession();
        // session.user = response.data.user;
        // if(!session.user) {
        //     addMessage("User not found", "danger");
        //     return false;
        // }
        // session.user.token = response.data.token;
        // console.log(session.user.token)
        // useLogin();


        
        

        // Redirect to our homepage
        // router.push('/statistics')
        
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
        // Wait for the state to get a username
        while(state.username == '')
        {
            await actions.getUser()
        }
        return state.username
    }
}

export default { state, getters, ...actions }