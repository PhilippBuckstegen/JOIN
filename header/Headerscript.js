document.addEventListener('DOMContentLoaded', () => {
    fetch('/header/header.html')  
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        loadHeader();
      })
      .catch(error => console.error('Error loading header:', error));
  });
  
  function loadHeader() {
    const headerHTML = `
      <header>
          <div class="header-wrap">
              <div class="header-logo-mobile">
                  <img src="../header/img_header/logo_header.svg" alt="Logo_Header">
              </div>
              <p>Kanban Project Management Tool</p>
              <div class="align-this">
                  <img src="../header/img_header/help.svg" alt="" />
                  <div class="container">
                      <img class="ellipse-style" src="../header/img_header/Ellipse_3.svg" alt="">
                      <span id="user-logged-in" class="span-size">SM</span>
                  </div>
              </div>
          </div>
      </header>
    `;
  
    document.getElementById('header-placeholder').innerHTML = headerHTML;
  }
  