import { auth } from "../services/firebase";

export function signup(email, password, remember){
    let usr = auth().createUserWithEmailAndPassword(email, password);
    return usr;
}

export async function signin(email, password, remember){
    let usr =  auth().signInWithEmailAndPassword(email, password);
    return usr;

}

export function signInWithGoogle(remember){
    const provider = new auth.GoogleAuthProvider();
    let usr = auth().signInWithPopup(provider);
    return usr;
}

export function signInWithGithub(remember){
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}

export function signInWithFacebook(remember){
    const provider = new auth.FacebookAuthProvider();

    return auth().signInWithPopup(provider);
}

async function sessionPersistence (remember){
    try {
        if (remember === true) {
            await auth().setPersistence(auth().Auth.Persistence.LOCAL);
        } else {
            await auth().setPersistence(auth().Auth.Persistence.SESSION);
        }
    } catch (error) {
        console.log(error);
    }

}