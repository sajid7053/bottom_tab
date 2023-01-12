import { observable, action, makeAutoObservable } from 'mobx'

export default class Auth {
    constructor() {
        makeAutoObservable(this);
    }
    @observable loggedIn = false

    @observable creds = [
        {
            email: "sajid",
            password: "1234"
        }
    ]

    @action
    logIn() {
        this.loggedIn = true
        return this.loggedIn
    }

    @action
    logOut() {
        return this.loggedIn
    }
}

