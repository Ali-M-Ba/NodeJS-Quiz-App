function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function evaluateAnswers(data, answers) {
  let correct = 0;
  let incorrect = 0;
  let correctAnswers = [];
  let incorrectAnswers = [];

  for (let i = 0; i < data.length; i++) {
      if (answers['answer_' + i] === data[i]['correct_answer']) {
          correct++;
          correctAnswers.push(data[i]['correct_answer']);
      } else {
          incorrect++;
          incorrectAnswers.push(answers['answer_' + i]);
      }
  }
  return {
      correct,
      incorrect,
      correctAnswers,
      incorrectAnswers
  };
}

export { shuffleArray, evaluateAnswers };
