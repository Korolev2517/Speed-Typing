const FISH_TEXT = 'https://fish-text.ru/get?';
const textContent = document.querySelector('.text-content');
const inputText = document.querySelector('.input-text');


inputText.addEventListener('input', () => {
  let correct = true; // переменная для проверки, все ли символы в поле ввода совпадают с текстом в textContent
  const textContentArray = textContent.querySelectorAll('span');
  const inputTextArray = inputText.value.split('');
  textContentArray.forEach((element, index) => {
    let newElement = inputTextArray[index]; // в переменную помещаем символ из массива inputTextArray, который соответвует текущему индексу в textContentArray
    console.log(newElement)
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
    }
  })
  if (correct) getNextRandomText()
})

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
}
getNextRandomText()