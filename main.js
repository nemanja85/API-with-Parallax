//@ts-check
/**
 * @typedef User
 *
 * @property id {number}
 * @property first_name {string}
 * @property last_name {string}
 * @property email {string}
 */

document.addEventListener('DOMContentLoaded', async () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 170) {
      const usersDiv = document.querySelectorAll('.items');
      for (let i = 0; i < usersDiv.length; i++) {
        usersDiv[i].classList.add('animate__animated', 'animate__fadeIn');
        usersDiv[i].classList.remove('invisible');
      }
    }
  });

  // define function to fetch users
  async function getUsers(perPage = 9) {
    const apiUrl = `https://reqres.in/api/users?per_page=${perPage}`;

    const response = await fetch(apiUrl);
    return (await response.json()).data;
  }

  /**
   *
   * @param {User} user
   * @param {number} delay
   *
   * @returns {string}
   */
  function UserCard(user, delay) {
    return `<div class="col-md-12 col-lg-4 mt-5 items invisible" style="animation-delay: ${delay}ms;">
        <h3 class="pb-3">User Nr. ${user.id}</h3>
        <div class="card">
          <div class="card-body">
            <p><span>First Name</span>: ${user.first_name}</p>
            <p><span>Last Name</span>: ${user.last_name}</p>
            <p><span>Email</span>: ${user.email}</p>
          </div>
        </div>
      </div>`;
  }

  let users = await getUsers();
  // Cashing data
  sessionStorage.setItem('users', JSON.stringify(users));

  const usersContainer = document.getElementById('usersContainer');

  let output = '';
  let delay = 1000;
  for (let index = 0; index < users.length; index++) {
    let user = users[index];

    delay += 400;
    output += UserCard(user, delay);
  }

  usersContainer.innerHTML = output;
});
