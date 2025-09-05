function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export async function getQuestions(amount = 10) {
  const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
  const data = await res.json();

  return data.results.map((q) => {
    const options = [...q.incorrect_answers];
    const answerIndex = Math.floor(Math.random() * 4);
    options.splice(answerIndex, 0, q.correct_answer);

    return {
      question: decodeHTML(q.question),
      options: options.map((opt) => decodeHTML(opt)),
      ans: answerIndex + 1,
    };
  });
}