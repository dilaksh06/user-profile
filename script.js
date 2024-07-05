document.addEventListener('DOMContentLoaded', () => {
    const moreUsersBtn = document.getElementById('more-users-btn');
    const profilesContainer = document.getElementById('profiles-container');
    const usersTableBody = document.querySelector('#users-table tbody');

    async function fetchUsers() {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Fetching users failed:', error);
            return [];
        }
    }

    function clearPreviousProfiles() {
        profilesContainer.innerHTML = '';
        usersTableBody.innerHTML = '';
    }

    function createProfileCard(user) {
        const card = document.createElement('div');
        card.className = 'profile-card';

        const img = document.createElement('img');
        img.src = user.picture.thumbnail;
        img.alt = `${user.name.first} ${user.name.last}`;

        const name = document.createElement('p');
        name.textContent = `${user.name.first} ${user.name.last}`;

        const email = document.createElement('p');
        email.textContent = user.email;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(email);

        profilesContainer.appendChild(card);
    }

    function addUserToTable(user) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = `${user.name.first} ${user.name.last}`;

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        row.appendChild(nameCell);
        row.appendChild(emailCell);

        usersTableBody.appendChild(row);
    }

    async function updateProfiles() {
        clearPreviousProfiles();
        const users = await fetchUsers();
        users.forEach((user) => {
            createProfileCard(user);
            addUserToTable(user);
        });
    }

    moreUsersBtn.addEventListener('click', updateProfiles);

    // Initial load
    updateProfiles();
});
