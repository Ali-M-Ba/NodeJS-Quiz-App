document.addEventListener('DOMContentLoaded', function() {
  let currentQuestion = 0;

  function showQuestion(index) {
    const fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(fieldset => fieldset.style.display = 'none'); // Hide all questions
    fieldsets[index].style.display = 'block'; // Show the current question
  }

  function validateQuestion(index) {
    const selectedAnswer = document.querySelector(`input[name="answer_${index}"]:checked`);
    const warningElement = document.getElementById(`warning_${index}`);
    
    if (!selectedAnswer) {
      warningElement.textContent = 'Please select an answer before proceeding.';
      warningElement.style.color = "yellow";
      warningElement.style.marginBottom = "10px 0px";
      return false;
    } else {
      warningElement.textContent = ''; // Clear any previous warning
      return true;
    }
  }

  // Handle the next button click
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('next-btn')) {
      if (validateQuestion(currentQuestion)) {
        currentQuestion++;
        showQuestion(currentQuestion);
      }
    }
  });

  // Handle the submit button click
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('submit-btn')) {
      if (!validateQuestion(currentQuestion)) {
        event.preventDefault();  // Prevent form submission if validation fails
      }
    }
  });

  // Handle the back button click
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('back-btn')) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  // Initially show the first question
  showQuestion(currentQuestion);
});
