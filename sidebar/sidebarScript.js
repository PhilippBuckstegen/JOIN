document.addEventListener('DOMContentLoaded', () => {
   
    fetch('../sidebar/sidebar.html')
      .then(response => response.text())
      .then(data => {
        document.querySelector('.side-wrap').innerHTML = data;
        addEventListeners();
      })
      .catch(error => console.error('Error loading sidebar:', error));
    
   
    function addEventListeners() {
      const buttons = document.querySelectorAll('.button-sidebar, .police-button');
    
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetPage = button.getAttribute('data-target');
          if (targetPage) {
            window.location.href = targetPage;
          }
        });
      });
    }
  });