document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
  
    // Event listener für den  sign-up button
    signUpButton.addEventListener('click', function() {
      const targetUrl = signUpButton.getAttribute('data-target');
      window.location.href = targetUrl;
    });
  });