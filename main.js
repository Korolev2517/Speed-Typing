const FISH_TEXT = 'https://fish-text.ru/get?';
const textContent = document.querySelector('.text-content');
const inputText = document.querySelector('.input-text');
const time = document.querySelector('.time');
const error = document.querySelector('.error');

let previousInput = 0; // переменная в которую будет помещаться предыдущая длинна ввода

function getRandomText() {
  const type = 'sentence';
  const number = 1;
  const params = '&type=' + type + '&number=' + number;
  return fetch(FISH_TEXT + params, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => data.text)
}

async function getNextRandomText() {
  const fishText = await getRandomText()
  textContent.innerHTML = '';
  fishText.split('').forEach((element) => {
    const elementSpan = document.createElement('span');
    elementSpan.innerText = element;
    textContent.appendChild(elementSpan);
  })
  inputText.value = null;
  previousInput = 0; // сброс предыдущей длинны ввода при получении нового текста
}
getNextRandomText();

inputText.addEventListener('input', () => {
  let correct = true; // переменная для проверки, все ли символы в поле ввода совпадают с текстом в textContent
  let incorrect = false; // переменная для проверки ввода неправильнх символов
  const textContentArray = textContent.querySelectorAll('span');
  const inputTextArray = inputText.value.split('');
  textContentArray.forEach((element, index) => {
    let newElement = inputTextArray[index]; // в переменную помещаем символ из массива inputTextArray, который соответвует текущему индексу в textContentArray
    if (newElement == null) { // проверяем сущесвтует ли символ в inputTextArray для текущего индекса
      element.classList.remove('correct');
      element.classList.remove('incorrect');
      correct = false;
    }
    else if (newElement === element.innerText) {
      element.classList.add('correct');
      element.classList.remove('incorrect');
    } else {
      element.classList.remove('correct');
      element.classList.add('incorrect');
      correct = false;
      if (inputText.value.length > previousInput && inputText.value.length !== 0) {
        incorrect = true; // помечаем что был введен неправильный символ
      }
    }
  })
  if (incorrect) { // если был введен неправильный символ, то увеличиваем счетчик ошибок
    error.innerHTML++;
  }
  previousInput = inputText.value.length; // обновление значения предыдущей длинны ввода
  if (textContentArray.length == inputTextArray.length) getNextRandomText()
})

let count = 0;
let startTime = null;

function startTimer() {
  if (startTime === null) {
    startTime = new Date();
    setInterval(showCountPerMinute, 60000)
  }
}

function countCharacters() {
  inputText.addEventListener('keydown', async () => {
    startTimer();
    count++;
  })
}
function showCountPerMinute() {
  let now = new Date();
  let timeDifference = (now - startTime) / 60000;
  let countPerMinute = Math.floor(count / timeDifference);
  time.innerHTML = countPerMinute;
  count = 0;
}
countCharacters();
