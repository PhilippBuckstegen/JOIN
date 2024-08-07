document.addEventListener('DOMContentLoaded', () => {
  fetch('../sidebar/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.side-wrap').innerHTML = data;
      addEventListeners(); 
      highlightSelectedButton(); 
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

        
          localStorage.setItem('selectedButton', button.id);

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });
  }

  function highlightSelectedButton() {
    const selectedButtonId = localStorage.getItem('selectedButton');
    if (selectedButtonId) {
      const selectedButton = document.getElementById(selectedButtonId);
      if (selectedButton) {
        selectedButton.classList.add('selected');
      }
    }
  }
});
