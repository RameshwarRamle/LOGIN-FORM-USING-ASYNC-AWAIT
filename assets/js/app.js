
cl = console.log;

const loginform = document.getElementById("loginform");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginbtn = document.getElementById("loginbtn");


const signupform = document.getElementById("signupform");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupRole = document.getElementById("signupRole");
const signupbtn = document.getElementById("signupbtn");
const spinner = document.getElementById("spinner");



const BASE_URL = "https://auth-git-main-iamrkjs-projects.vercel.app";

const LOGIN_URL = `${BASE_URL}/api/auth/login`;

const SIGNUP_URL = `${BASE_URL}/api/auth/register`;


function snackbar(title, icon) {
    swal.fire({
        title,
        icon,
        timer: 2000
    })
}


function togglespinner(flag) {
    if (flag) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
}

async function MAKEAPICALL(url, method, body) {
    try{
        togglespinner(true);

        let res = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            "Content-Type": "application/json"
        }

    })
    let data = await res.json()

    if (!res.ok) {
        let err = data.Error || data.message || "Something went wrong";
        throw new Error(err);
    }
    return data;

    } finally{
        togglespinner(false);
    }
    
}


async function onsignup(eve){
    eve.preventDefault();

    try{

        let obj = {
            email: signupEmail.value,
            password:signupPassword.value,
            userRole: signupRole.value
        }

        let res = await MAKEAPICALL(SIGNUP_URL, "POST", obj);
        cl(res)
        signupform.reset();
        snackbar(res.message, "success");
        

    }catch(err){
        snackbar(err.message, "error");
    }
}


async function onlogin(eve){
    eve.preventDefault();

    try{
        let obj ={
            email:loginEmail.value,
            password:loginPassword.value,
        }

        let res = await MAKEAPICALL(LOGIN_URL, "POST", obj);
        cl(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userRole", res.userRole);
        localStorage.setItem("loginSuccess", true);
        loginform.reset();
        snackbar(res.message, "success");


    }catch(err){
        snackbar(err.message, "error");
    }
}

signupform.addEventListener("submit", onsignup);
loginform.addEventListener("submit", onlogin);