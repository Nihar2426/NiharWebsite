document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        alert('No account found with this email.');
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
        alert('Login successful!');
        window.location.href = 'index.html'; 
    } else {
        alert('Incorrect password!');
    }
});
