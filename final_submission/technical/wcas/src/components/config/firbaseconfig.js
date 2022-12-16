import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { child, get, getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDKYUg4T2ezXOd58OUBnqtuHBaIHmMwit8",
    authDomain: "wellnessauth.firebaseapp.com",
    databaseURL: "https://wellnessauth-default-rtdb.firebaseio.com",
    projectId: "wellnessauth",
    storageBucket: "wellnessauth.appspot.com",
    messagingSenderId: "945355011115",
    appId: "1:945355011115:web:f3b89cef9fbaa3f8f6666e"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();


export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}


export const logOutFromApp = () => {
    signOut(auth);
    sessionStorage.clear();
    window.location.reload();
};

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}


export const getLoggedUserData = () => {
    let userData;
    const user = sessionStorage.getItem('userDetails')
    if (!!user) {
        userData = user;
    }
    else {
        userData = ""
    }
    return userData;
}

export const getAdvData = () => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `advertise/`))
}

export const bookAppointment = (userId, id, data) => {
    return update(ref(database, `bookAppointment/${userId}`), { [id]: data })
}
 
export const bookEmergencyAppointment = (userId, id, data) => {
    return update(ref(database, `bookEmergencyAppointment/${userId}`), { [id]: data })
}

export const getAppointmentDetails = (userId) => {
    return get(ref(database, `bookAppointment/${userId}`))
}
 
export const getEmergencyAppointmentDetails = (userId) => {
    return get(ref(database, `bookEmergencyAppointment/${userId}`))
}
