//listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log('onAuthState',user)
    //parsing to index.js
    if(user){
        db.collection('project').onSnapshot((snapshot) => {
            // console.log(snapshot.docs)
            setupProject(snapshot.docs)
            setupUI(user);
        }, err => {
            console.log(err.message)
        })
    }else{
        setupProject([])
        setupUI();
    }
})

//create new project
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('project').add({
        title:createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //close the modal and reset form 
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err)
    })

})


//회원가입 폼
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})


//로그아웃 폼   
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut()
    // .then(() => {
    //     console.log('user signed out');
    // }) 

})


//로그인 폼
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred => {
        // console.log(cred.user)
        //close login module
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})