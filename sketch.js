let radio;
let submitButton;
let questionData = []; // 儲存題目資料
let currentQuestionIndex = 0; // 當前題目索引
let correctCount = 0; // 答對題數
let incorrectCount = 0; // 答錯題數

function preload() {
  // 使用 PapaParse 讀取 CSV 檔案
  questionData = loadTable("questions.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fefae0");

  // 顯示第一題
  displayQuestion();
}

function displayQuestion() {
  // 清除畫布，避免重疊
  clear();
  background("#fefae0");

  // 取得當前題目資料
  let question = questionData.getString(currentQuestionIndex, "question");
  let options = [
    questionData.getString(currentQuestionIndex, "option1"),
    questionData.getString(currentQuestionIndex, "option2"),
    questionData.getString(currentQuestionIndex, "option3"),
    questionData.getString(currentQuestionIndex, "option4"),
  ];

  // 顯示題目
  textSize(24);
  textAlign(CENTER, CENTER);
  text(question, width / 2, height / 2 - 150);

  // 建立選項
  radio = createRadio();
  radio.position(width / 2 - 200, height / 2 - 50);
  radio.style('width', '400px');
  radio.style('font-size', '30px');
  radio.style('display', 'flex');
  radio.style('justify-content', 'center');
  for (let option of options) {
    radio.option(option);
  }

  // 建立送出按鈕
  submitButton = createButton("送出");
  submitButton.position(width / 2 - 30, height / 2 + 50);
  submitButton.style('font-size', '20px');
  submitButton.mousePressed(checkAnswer);
}

function checkAnswer() {
  let selected = radio.value();
  let correctAnswer = questionData.getString(currentQuestionIndex, "correct");

  if (selected === correctAnswer) {
    correctCount++;
    alert("答對了！");
  } else {
    incorrectCount++;
    alert("答錯了！");
  }

  // 移除當前題目和選項
  if (radio) {
    radio.remove();
    radio = null; // 確保 radio 被完全移除
  }
  if (submitButton) {
    submitButton.remove();
    submitButton = null; // 確保 submitButton 被完全移除
  }

  // 清除畫布
  clear();
  background("#fefae0");

  // 延遲顯示下一題
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionData.getRowCount()) {
      clear(); // 再次清空畫布，確保畫面乾淨
      displayQuestion();
    } else {
      clear(); // 清空畫布後顯示結果
      displayResult();
    }
  }, 500); // 延遲 0.5 秒
}

function displayResult() {
  // 清除畫布，顯示結果
  clear();
  background("#fefae0");
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`測驗結束！`, width / 2, height / 2 - 50);
  text(`答對題數：${correctCount}`, width / 2, height / 2);
  text(`答錯題數：${incorrectCount}`, width / 2, height / 2 + 50);
}