import { reactive } from "vue";
import * as myFetch from "./myFetch";



// the user is null at first, but then it will be a User object
// the user is null at first, but then it will be a User object
const session = reactive({
    user: null as User | null,
    isLoading: false,
    messages: [] as {
        msg: string,
        type: "success" | "error" | "warning" | "info"
    }[] 
});

// ? makes things optional in typescript
interface User {
    id?: number;
    name: string;
    email?: string;
    photo?: string;
    token?: string;
}

export function api(url: string){
    session.isLoading = true;
    return myFetch.api(url)
        .then(data => {
            // handle successful response
            session.isLoading = false;
            return data;
        })
        .catch(err => {
            // handle error response
            console.error(err);
            session.messages.push({
                msg: err.message ?? JSON.stringify(err),
                type: "error"
            });
            session.isLoading = false;
            throw err;
        });
}

export function postApi(url: string, data: any){
    session.isLoading = true;
    return myFetch.post(url, data)
        .then(data => {
            // handle successful response
            session.isLoading = false;
            return data;
        })
        .catch(err => {
            // handle error response
            console.error(err);
            session.messages.push({
                msg: err.message ?? JSON.stringify(err),
                type: "error"
            });
            session.isLoading = false;
            throw err;
        });
}

export function useSession() {
    return session;
}

export function login() {
    session.user = {
        name: "John Doe",
    };
}