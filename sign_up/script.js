const checkboxPrivacyPolicy = document.getElementById("checkboxPrivacyPolicy");

document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("signUpBtn");

  // Event listener für den  sign-up button
  signUpButton.addEventListener("click", function () {
    const targetUrl = signUpButton.getAttribute("data-target");
    window.location.href = targetUrl;
  });
});

checkboxPrivacyPolicy.addEventListener("click", acceptPrivacyPolicy);

function acceptPrivacyPolicy() {
  if (!checkboxPrivacyPolicy.classList.contains("checkboxChecked")) {
    checkboxPrivacyPolicy.classList.remove("checkboxUnchecked");
    checkboxPrivacyPolicy.classList.add("checkboxChecked");
    return 1;
  } else {
    checkboxPrivacyPolicy.classList.remove("checkboxChecked");
    checkboxPrivacyPolicy.classList.add("checkboxUnchecked");
    return 0;
  }
}
