const projectList = document.querySelector('.project');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if(user){
    // accountInfo
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Logged in as ${user.email}
      </div>
      <div>${doc.data().bio}</div>`
  
      accountDetails.innerHTML = html;
    })
    //toggle UI elementse
    loggedInLinks.forEach(item => {
      item.style.display = 'block'
    });

    loggedOutLinks.forEach(item => {
      item.style.display = 'none'
    });

  }else{

    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => {
      item.style.display = 'none'
    });

    loggedOutLinks.forEach(item => {
      item.style.display = 'block'
    });


  }
}

//setup guides
const setupProject = (data) => {
  if(data.length){
  let html = '';
  data.forEach(doc => {
      const project = doc.data();
      // console.log('project:',project)
      const li = `<li>
      <div class="collapsible-header grey lighten-4">${project.title}</div>
      <div class="collapsible-body white">${project.content}</div>
    </li>`;
    html += li
  })

  projectList.innerHTML = html;
  }else{
    projectList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
  }
}


document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});