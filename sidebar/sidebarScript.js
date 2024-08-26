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

          // Ausgewählten Button in localStorage speichern
          localStorage.setItem('selectedButton', button.id);

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });

    // Event-Listener für die Elemente im Hauptbereich hinzufügen
    const contentLinks = document.querySelectorAll('.sum-content-categories, .sum-content-boardtasks, .sum-content-deadlines');

    contentLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const targetPage = link.getAttribute('data-target');
        const correspondingButton = document.querySelector(`.button-sidebar[data-target='${targetPage}']`);
        
        if (correspondingButton) {
          buttons.forEach(btn => btn.classList.remove('selected'));
          correspondingButton.classList.add('selected');
          localStorage.setItem('selectedButton', correspondingButton.id);

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });
  }

  function addEventListeners() {
    const buttons = document.querySelectorAll('.button-sidebar, .police-button');

    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault(); 
        const targetPage = button.getAttribute('data-target');
        if (targetPage) {
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');

          // Ausgewählten Button in localStorage speichern
          localStorage.setItem('selectedButton', button.id);

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });

    // Event-Listener für die Elemente im Hauptbereich hinzufügen
    const contentLinks = document.querySelectorAll('.guest-button, .login-signup-button');

    contentLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const targetPage = link.getAttribute('data-target');
        const correspondingButton = document.querySelector(`.button-sidebar[data-target='${targetPage}']`);
        
        if (correspondingButton) {
          buttons.forEach(btn => btn.classList.remove('selected'));
          correspondingButton.classList.add('selected');
          localStorage.setItem('selectedButton', correspondingButton.id);

          setTimeout(() => {
            window.location.href = targetPage;
          }, 100);
        }
      });
    });
  }

  function highlightSelectedButton() {
    const currentPath = window.location.pathname;
    const buttons = document.querySelectorAll('.button-sidebar, .police-button, .login-signup-button');

    buttons.forEach(button => {
      const targetPage = button.getAttribute('data-target');

      // Überprüfen, ob der aktuelle Pfad dem data-target entspricht
      if (currentPath.endsWith(targetPage)) {
        button.classList.add('selected');
        console.log('Selected button:', button);
        
        // Ausgewählten Button in localStorage speichern
        localStorage.setItem('selectedButton', button.id);
      } else {
        button.classList.remove('selected');
      }
    });

    const selectedButtonId = localStorage.getItem('selectedButton');
    if (selectedButtonId) {
      const selectedButton = document.getElementById(selectedButtonId);
      if (selectedButton && !selectedButton.classList.contains('selected')) {
        selectedButton.classList.add('selected');
      }
    }
  }
});
