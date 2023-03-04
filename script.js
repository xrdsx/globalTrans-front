


const URL = 'http://localhost:8080/users';

function displayUsers() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const users = data;
      console.log(users);

      let rows = '';
      for (const user of users) {
        rows += '<tr id="' + user.id + '">' +
          '<td>' + user.username + '</td>' +
          '<td>' + user.name + '</td>' +
          '<td>' + user.email + '</td>' +
          '<td>' + user.password + '</td>' +
          '<td>' +
          
          
          '<td><button type="button" class="btn btn-danger">Delete</button></td>' +
          '</tr>';
      }
      document.querySelector("#users").innerHTML = rows;
      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll("#users button.btn-danger");
      for (const button of deleteButtons) {
        button.addEventListener("click", (event) => {
          const userId = event.target.closest("tr").id;
          deleteUser(userId);
        });
      }

      // Add event listeners to edit buttons
      const editButtons = document.querySelectorAll("#users button.edit-button");
      for (const button of editButtons) {
        button.addEventListener("click", (event) => {
          const userId = event.target.getAttribute("data-user-id");
          editUser(userId);
        });
      }

    });
}

displayUsers();



const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {
    username: username,
    name: name,
    email: email
  };

  fetch('http://localhost:8080/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    displayUsers();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});