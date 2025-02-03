$(document).ready(function () {
  let currentStep = 1;
  const totalSteps = $(".step").length;
  const progressBar = $(".progress-bar");

  // Function to show current step and update progress bar
  function showStep(step) {
      $(".step").removeClass("step-active");
      $("#step" + step).addClass("step-active");
      updateProgressBar(step);
  }

  // Function to update progress bar
  function updateProgressBar(step) {
      let progress = (step - 1) / (totalSteps - 1) * 100;
      progressBar.css("width", progress + "%");
  }

  // Validate input fields
  function validateInput(input) {
      const value = input.val().trim();
      let isValid = true;

      // Hide invalid feedback initially
      input.removeClass("is-invalid");
      input.next(".invalid-feedback").hide();

      // Name validation: At least 2 characters
      if (input.is("#name") && value.length < 2) {
          input.addClass("is-invalid");
          input.next(".invalid-feedback").text("Name must be at least 2 characters long.").show();
          isValid = false;
      }

      // Email validation
      if (input.is("#email") && value && !/\S+@\S+\.\S+/.test(value)) {
          input.addClass("is-invalid");
          input.next(".invalid-feedback").text("Please enter a valid email address.").show();
          isValid = false;
      }

      // Phone validation
      if (input.is("#phone") && value && !/^\d{10}$/.test(value)) {
          input.addClass("is-invalid");
          input.next(".invalid-feedback").text("Please enter a valid phone number (10 digits).").show();
          isValid = false;
      }

      // Confirm password validation
      if (input.is("#confirmPassword") && value !== $("#password").val()) {
          input.addClass("is-invalid");
          input.next(".invalid-feedback").text("Passwords do not match.").show();
          isValid = false;
      }

      return isValid;
  }

  // Next button click handler
  $(".next-btn").click(function () {
      const currentForm = $(this).closest(".step");
      const inputFields = currentForm.find("input");

      let formValid = true;
      inputFields.each(function () {
          if (!validateInput($(this))) {
              formValid = false;
          }
      });

      if (formValid) {
          currentStep++;
          showStep(currentStep);
      }
  });

  // Previous button click handler
  $(".prev-btn").click(function () {
      currentStep--;
      showStep(currentStep);
  });

  // Initialize the first step
  showStep(currentStep);
});