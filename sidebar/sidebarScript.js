document.addEventListener('DOMContentLoaded', () => {
  fetch('../sidebar/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.side-wrap').innerHTML = data;
      addEventListeners(); // Füge Event-Listener hinzu, nachdem das HTML geladen wurde
      highlightSelectedButton(); // Markiere den ausgewählten Button
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

          // Speichern der ID des ausgewählten Buttons im localStorage
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
