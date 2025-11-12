const questions = [
  {
    src: "assets/song1.mp3",
    options: ["Idol Game", "Tekken"],
    answer: "Idol Game",
    video: "assets/video1.mp4",
    details:
      "🎶 The song is Next Life from The Idolm@ster. Composed by Akitaka Tohyama, better known as AJURIKA, and released in 2009. The song is often compared to Karma (Electric Fountain) from Tekken 6 (2007) since both have the same composer.",
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
    details:
      "🎤 This is a song from Pachi-Slot Tekken composed by Rio Hamamoto. While this song sounds a lot idol-ish he only worked on a few songs for The Idolm@ster series. ",
  },
  {
    src: "assets/song4.mp3",
    options: ["Tekken", "Idol Game"],
    answer: "Idol Game",
    video: "assets/video4.mp4",
    details:
      "🏆 This is a remix of a song composed by Taku Inoue for the game Idolm@ster Starlit Season. This remix was made by Mifumei, the main composer for Tekken 8. ",
  },
  {
    src: "assets/song5.mp3",
    options: ["Tekken", "Idol Game"],
    answer: "Tekken",
    video: "assets/video5.mp4",
    details:
      "💿 This song is from the Tekken Pachi-Slot and was composed by Mifumei.",
  },
];

let current = 0;
let score = 0;

const audio = document.getElementById("audio");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreboard = document.getElementById("scoreboard");

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Randomiza as perguntas
const shuffledQuestions = shuffleArray([...questions]);

function loadQuestion() {
  const q = shuffledQuestions[current];
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
  const q = shuffledQuestions[current];
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
  if (current < shuffledQuestions.length) {
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
  scoreboard.innerHTML = `<h2>🎉 Game Over!</h2><p>Thank you for playing</p>`;
}

// Shuffle as perguntas
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

nextBtn.onclick = nextQuestion;

// Start the game
loadQuestion();
