export type User = { name: string; username: string }
export type UserList = Array<User & { password: string }>


// Replace this with a DB with sessions or JWT tokens later
export async function login(username: string, password: string){
    // fetch req to json file
    const request = await fetch("/users.json")
    const userJson: UserList = await request.json()
    // find user
    return userJson.find(user => user.username === username && user.password === password)
}

export async function getUsers(){
    // If a user is currently logged in
    const request = await fetch("/current.json")
    const user: User = await request.json()
    return user
}