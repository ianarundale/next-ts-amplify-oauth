import Amplify, { Auth } from 'aws-amplify'
import appConfig from './config/app-config'

Amplify.configure({
    Auth: {
        region: appConfig.region,
        userPoolId: appConfig.userPool,
        userPoolWebClientId: appConfig.clientId,
        oauth: {
            domain: appConfig.userPoolBaseUri.replace('https://', '').replace('http://', ''),
            scope: appConfig.tokenScopes,
            redirectSignIn: appConfig.callbackUri,
            redirectSignOut: appConfig.signoutUri,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user);
            resolve(user)
        }).catch(e => {
            reject(e)
        });
    })
}

// oAuth callback flow - https://github.com/aws-amplify/amplify-js/issues/3106
export const signIn = () => {
    Auth.federatedSignIn()
}

export const signOut = () => {
    Auth.signOut()
}

export default { getCurrentUser }