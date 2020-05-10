import React from 'react'
import { Auth, Hub } from 'aws-amplify';
import {getCurrentUser} from '../amplify'

export default class Callback extends React.Component {
    constructor() {
        super()
        this.state = {}

        Hub.listen('auth', (data) => {
            const { payload } = data;
            debugger
            this.setState({ user })
            //this.onAuthEvent(payload);           
            console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
        })
    }


    componentDidMount() {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    this.setState({ user: data });
                    break;
                case "signOut":
                    this.setState({ user: null });
                    break;
                case "customOAuthState":
                    this.setState({ customState: data });
            }
        });

        getCurrentUser()
            .then(user => {
                this.setState({ user })
                console.log('user logged in', user)
            })
            .catch(() => console.log("Not signed in"));
    }

    componentWillMount() {

    }

    onAuthEvent(payload) {
        // ... your implementation
    }

    render() {
        return (
            <div>
                <div>User: {this.state.user?.username}</div>
            </div>
        )
    }

}