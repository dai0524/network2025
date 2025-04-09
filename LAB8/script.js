// 亂數產生字串
function generateRandomString(minLength, maxLength) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 在 container div 中顯示亂數產生的字串
function displayRandomString() {
  const container = document.getElementById('container');
  const randomString = generateRandomString(0, 2);
  container.textContent = randomString;
}

// 消除第一個字元
function removeFirstCharacter() {
  const container = document.getElementById('container');
  if (container.textContent.length > 0) {
    container.textContent = container.textContent.substring(1);
  }
}

// 在字串後方新增亂數字元
function appendRandomCharacters(amount = 1) {
  const container = document.getElementById('container');
  container.textContent += generateRandomString(amount, amount + 2);
}

// 錯誤次數紀錄
let errorCount = 0;

// 初始化
window.onload = function () {
  displayRandomString();
  document.getElementById('container').focus(); // 自動 focus
};

// 事件處理
window.addEventListener('keyup', function (e) {
  const container = document.getElementById('container');
  const currentChar = container.textContent[0];

  if (e.key === 'Escape') {
    container.textContent = '';
    errorCount = 0;
  } else if (e.key === 'Backspace') {
    let str = container.textContent;
    container.textContent = str.substring(0, str.length - 1);
  } else if (e.key === currentChar) {
    // 按對：移除第一個字元，錯誤次數歸零
    removeFirstCharacter();
    errorCount = 0;
    appendRandomCharacters();
  } else {
    // 按錯：累加錯誤次數
    errorCount++;
    if (errorCount >= 3) {
      appendRandomCharacters(6); // 額外加6個亂數
      errorCount = 0; // 錯誤次數歸零
    } else {
      appendRandomCharacters(); // 原本的加法
    }
  }
});
