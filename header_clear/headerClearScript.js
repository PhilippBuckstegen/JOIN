/**
 * This function handles event listener for loading header
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('../header_clear/header_clear.html')  
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder-clear').innerHTML = data;
        loadHeaderClear();
      })
      .catch(error => console.error('Error loading header:', error));
});
  

/**
* This function generates HTML Code for empty header
*/
function loadHeaderClear() {
    const headerHTML = `
      <header class="header-headerstyle">
          <div class="header-wrap">
              <div class="header-logo-mobile">
                  <img src="../header/img_header/logo_header.svg" alt="Logo_Header">
              </div>
              <p class="p-header">Kanban Project Management Tool</p>
          </div>
      </header>
    `;
    document.getElementById('header-placeholder-clear').innerHTML = headerHTML;
  }