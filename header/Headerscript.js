document.addEventListener('DOMContentLoaded', () => {
    fetch('../header/header.html')  
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        loadHeader();
      })
      .catch(error => console.error('Error loading header:', error));
  });
  
  function loadHeader() {
    const headerHTML = `
      <header class="header-headerstyle">
          <div class="header-wrap">
              <div class="header-logo-mobile">
                  <img src="../header/img_header/logo_header.svg" alt="Logo_Header">
              </div>
              <p class="p-header">Kanban Project Management Tool</p>
              <div class="align-this">
                  <img src="../header/img_header/help.svg" alt="" />
                  <div onclick="toggleMenu()" class="container">
                      <img class="ellipse-style" src="../header/img_header/Ellipse_3.svg" alt="">
                      <span id="user-logged-in" class="span-size"></span>
                  </div>
                  <div id="slideInLogout" class="slide-in-logout d-none-logout slide-in-animation">
                    <span class="p-slide-in-logout">Help</span>
                    <span class="p-slide-in-logout">Legal Notice</span>
                    <span class="p-slide-in-logout">Privacy Policy</span>
                    <span id="logOut" class="p-slide-in-logout">Log out</span>
                  </div>
              </div>
          </div>
      </header>
    `;
  
    document.getElementById('header-placeholder').innerHTML = headerHTML;
  }
  
  const toggleMenu = () => {
    const menu = document.getElementById('slideInLogout');
    menu.classList.toggle('d-none-logout');
}