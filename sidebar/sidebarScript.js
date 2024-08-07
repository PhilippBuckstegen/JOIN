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
      button.addEventListener('click', (event) => {
        event.preventDefault(); 
        const targetPage = button.getAttribute('data-target');
        if (targetPage) {
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });

    
    const summaryButton = document.getElementById('summary-button');
    summaryButton.addEventListener('click', () => {
      console.log('Summary button clicked!');
    });
  }
});
