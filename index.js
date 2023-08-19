import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js"
import {
    getAuth,
    createUserWithEmailAndPassword
    , onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";;



const firebaseConfig = {
    apiKey: "AIzaSyAPYxcGulBhpECXIk2oy8FtemwxrV4BZas",
    authDomain: "blog-web-f8de6.firebaseapp.com",
    projectId: "blog-web-f8de6",
    storageBucket: "blog-web-f8de6.appspot.com",
    messagingSenderId: "230095054668",
    appId: "1:230095054668:web:8f1c35eb89c0ab892751e9",
    measurementId: "G-ZW2L5WPEXE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


const signup_btn = document.getElementById('signup')
const login_btn = document.getElementById('login')
const signup_container = document.getElementById('signup_container');
const login_container = document.getElementById('login_container')
const content_container = document.getElementById('content_container')
const login_form = document.getElementById("login-form")
const signup_form = document.getElementById("signup-form")
const logout = document.getElementById("logout")
const upload = document.getElementById("upload")
content_container

signup_btn.addEventListener("click", check_signup_btn)
login_btn.addEventListener("click", check_login_btn)
login_form.addEventListener('submit', login)
signup_form.addEventListener('submit', signup)
logout.addEventListener("click", signout)
upload.addEventListener('click', upLoad)

function check_signup_btn() {
    login_container.style.display = 'none'
    content_container.style = 'none'
    signup_container.style.display = 'block'
}
function check_login_btn() {
    signup_container.style.display = 'none'
    login_container.style.display = 'block'
    content_container.style = 'none'
}


function signup(event) {
     event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

};

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('User uid-->', uid)

        signup_container.style.display = 'none'
        content_container.style.display = 'block'
        // getPosts()
        // const info = await getUserInfo(uid)
        // welcome.innerHTML = `Welcome ${info.name}`
        // ...
    } else {
        console.log('User is not logged in')

        signup_container.style.display = 'block'
        content_container.style.display = 'none'

    }
});

function login(event) {
    event.preventDefault()
    const email = document.getElementById('login_email').value
    const password = document.getElementById('login_password').value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
function signout() {
    signOut(auth).then(() => {
      // Sign-out successful
      console.log('signout')
    }).catch((error) => {
      // An error happened.
    });
    
}
function upLoad() {
    let image= document.getElementById('image').files[0]
    let post= document.getElementById('post').value
    let imageName = image.name;
    let storageRef = firebase.storage().ref('images/'+imageName)
    let uploadTask = storageRef.put('image')
    uploadTask.on('state_changed', function(snapshot){
        let progress = (snapshot.bytestransferred/snapshot.totalbytes)*100
        console.log("upload is"+progress+"done")
    }
   , function (error){})
}