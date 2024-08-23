document.addEventListener('DOMContentLoaded', () => {
    fetch('../header_clear/header_clear.html')  
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder-clear').innerHTML = data;
        loadHeaderClear();
      })
      .catch(error => console.error('Error loading header:', error));
  });
  
  function loadHeaderClear() {
    const headerHTML = `
      <header class="header-headerstyle">
          <div class="header-wrap">
              <p class="p-header">Kanban Project Management Tool</p>
          </div>
      </header>
    `;
    document.getElementById('header-placeholder-clear').innerHTML = headerHTML;
  }
 