///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Functions/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Dark Mode Function
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);  // Save the new theme preference to localStorage
    const navbar = document.querySelector('.navbar');
    if (newTheme === 'dark') {
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    } else {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
    }
}

// ///////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////Event Listners//////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////

// Dark Mode Toggle 
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';  // Default to 'light' if no preference is saved
    document.documentElement.setAttribute('data-theme', savedTheme);
    const navbar = document.querySelector('.navbar');
    if (savedTheme === 'dark') {
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    } else {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});

// Paraallax Effect
document.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.hero-image, .hero-image-rental');
    parallax.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
});

// Form Validation and AJAX Messages
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('queryForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/submit-query', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status === 200) {
                    document.getElementById('flash-message').innerText = 'Query recorded successfully, someone will get back to you.';
                    document.getElementById('flash-message').style.display = 'block';
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    alert('An error occurred while submitting your query. Please try again.');
                }
            };

            xhr.send(new URLSearchParams(formData).toString());
        }

        form.classList.add('was-validated');
    });
});

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Load Animations//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

lottie.loadAnimation({
    container: document.getElementById('loginlottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/e2e96f81-e03c-45ef-847b-fd0f12c917d8/wGd4vlidly.json'
});

lottie.loadAnimation({
    container: document.getElementById('reglottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/fa7b3323-b110-4c3c-9362-f5fbbf8c249f/q9BSnMhWNS.json'
});

lottie.loadAnimation({
    container: document.getElementById('darkmode'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/77dbe4a3-f694-4566-ad87-231351b96614/SedHLevolI.json'
});

lottie.loadAnimation({
    container: document.getElementById('api'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/1aa754d5-efba-4324-9fbb-08f47aeddc7e/BaY0JPlXuC.json'
});

lottie.loadAnimation({
    container: document.getElementById('auth'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/7d3b39ab-4d45-484b-8b8c-cd3f8d08aa8f/2PuA6fhaeJ.json'
});

lottie.loadAnimation({
    container: document.getElementById('forms'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/bf3f65ff-ff88-41e4-877f-d9fc51eb234f/cHgLqjROOE.json'
});

lottie.loadAnimation({
    container: document.getElementById('maps'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/4448088f-5ff1-4940-9884-8148989d130b/svzm8wwPn9.json'
});

lottie.loadAnimation({
    container: document.getElementById('video'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/8b990a42-c72d-43b8-9a7c-f3b30a1d891a/CDhQtGVF8L.json'
});

lottie.loadAnimation({
    container: document.getElementById('logo'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/1fc1f48b-fde4-4f0d-a694-c14f2cb3bd5e/KHBBW7yfBW.json'
});