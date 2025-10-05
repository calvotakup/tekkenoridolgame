const questions = [
  {
    src: "assets/song1.mp3",
    options: ["Idol Game", "Tekken"],
    answer: "Idol Game",
    video: "https://imgur.com/a/arVldTz",
    details:
      "🎶 The song is Next Life from The Idolm@ster. Composed by Akitaka Tohyama, better known as AJURIKA, and released in 2009. The song is often compared to Karma (Electric Fountain) from Tekken 6 since both have the same composer and was released a few years apart",
  },
  {
    src: "assets/song2.mp3",
    options: ["Tekken", "Idol Game"],
    answer: "Idol Game",
    video: "assets/video2.mp4",
    details:
      '🔥 "Neo Beautiful Pain" is a song from The Idolm@ster: Cinderella Girls Starlight Stage. Performed by Nao Kamiya (VA. Eriko Matsui) and also composed by Ajurika. ',
  },
  {
    src: "assets/song3.mp3",
    options: ["Tekken", "Idol Game"],
    answer: "Tekken",
    video: "assets/video3.mp4",
    details: '🎤 "xxx" placeholder.',
  },
  {
    src: "assets/song4.mp3",
    options: ["Wrong Guess 4", "Song Title 4"],
    answer: "Idol Game",
    video: "assets/video4.mp4",
    details: '🏆 "xxx" placeholder',
  },
  {
    src: "assets/song5.mp3",
    options: ["Song Title 5", "Wrong Guess 5"],
    answer: "Tekken",
    video: "assets/video5.mp4",
    details: '💿 "xxx" placeholder.',
  },
];

let current = 0;
let score = 0;

const audio = document.getElementById("audio");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreboard = document.getElementById("scoreboard");

function loadQuestion() {
  const q = questions[current];
  audio.src = q.src;
  feedback.textContent = "";
  nextBtn.style.display = "none";
  optionsDiv.innerHTML = "";
  document.getElementById("video").style.display = "none";
  document.getElementById("details").style.display = "none";
  document.getElementById("video").src = "";
  document.getElementById("details").textContent = "";

  shuffleArray(q.options).forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => handleAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(selected) {
  const q = questions[current];
  const correct = q.answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.borderColor = "lime";
    } else if (btn.textContent === selected) {
      btn.style.borderColor = "red";
    }
  });

  feedback.textContent = selected === correct ? "✅ Correct!" : "❌ Wrong!";

  // Mostrar video e pequena trivia sobre a musica
  const video = document.getElementById("video");
  const details = document.getElementById("details");
  video.src = q.video;
  video.style.display = "block";
  details.textContent = q.details;
  details.style.display = "block";

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  optionsDiv.innerHTML = "";
  audio.style.display = "none";
  feedback.textContent = "";
  nextBtn.style.display = "none";
  scoreboard.innerHTML = `<h2>🎉 Game Over!</h2><p>Your score: ${score}/${questions.length}</p>`;
}

// Shuffle as perguntas
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

nextBtn.onclick = nextQuestion;

// Start the game
loadQuestion();
