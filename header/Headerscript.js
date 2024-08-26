/**
 * This function handels the event listener for header 
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('../header/header.html')  
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        loadHeader();
      })
      .catch(error => console.error('Error loading header:', error));
  });
  

  /**
   * This function generates HTML Code for header
   */
  function loadHeader() {
    const headerHTML = `
      <header class="header-headerstyle">
          <div class="header-wrap">
              <div class="header-logo-mobile">
                  <img src="../header/img_header/logo_header.svg" alt="Logo_Header">
              </div>
              <p class="p-header">Kanban Project Management Tool</p>
              <div class="align-this">
                  <img onclick="window.location.href='../help/help.html'" class="help-icon" src="../header/img_header/help.svg" alt="" />
                  <div onclick="toggleMenu()" class="container">
                      <img class="ellipse-style" src="../header/img_header/Ellipse_3.svg" alt="">
                      <span id="user-logged-in" class="span-size"></span>
                  </div>
                  <div id="slideInLogout" class="slide-in-logout d-none-logout slide-in-animation">
                    <span onclick="window.location.href='../help/help.html'" class="p-slide-in-logout">Help</span>
                    <span onclick="window.location.href='../legal_notice/legal_notice.html'" class="p-slide-in-logout">Legal Notice</span>
                    <span onclick="window.location.href='../policies/privacy_policy.html'" class="p-slide-in-logout">Privacy Policy</span>
                    <span id="logOut" class="p-slide-in-logout" onclick="logOut()">Log out</span>
                  </div>
              </div>
          </div>
      </header>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHTML;
  }
  

  /**
   * This function handles the slide-in menu
   */
  const toggleMenu = () => {
    const menu = document.getElementById('slideInLogout');
    menu.classList.toggle('d-none-logout');
}