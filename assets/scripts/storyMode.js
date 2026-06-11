const storyData = [

    {
    chapter:1,
    story:"Frieren was _____ through the forest when she _____ an ancient magical crystal.",
    answers:["walking","found"],
    options:["walking","walk","found","find"],
    explanation:"'was walking' is Past Continuous and 'found' is Simple Past.",
    success:"Frieren found a crystal that once belonged to Himmel.",
    fail:"Frieren accidentally woke up a very grumpy mimic."
    },
    
    {
    chapter:2,
    story:"Fern _____ a spell while Stark _____ near the campfire.",
    answers:["practiced","was resting"],
    options:["practiced","practice","was resting","rest"],
    explanation:"Past actions happening at the same time.",
    success:"Fern improved her magic and impressed Frieren.",
    fail:"Stark fell asleep and rolled into a bush."
    },
    
    {
    chapter:3,
    story:"Frieren usually _____ ancient books before she _____ to sleep.",
    answers:["reads","goes"],
    options:["read","reads","go","goes"],
    explanation:"Simple Present is used for routines.",
    success:"Frieren learned a forgotten spell from the Hero Era.",
    fail:"The book turned into a chicken and escaped."
    },
    
    {
    chapter:4,
    story:"The party _____ a hidden cave while they _____ through the mountains.",
    answers:["found","were traveling"],
    options:["found","find","were traveling","travel"],
    explanation:"Simple Past and Past Continuous.",
    success:"Inside the cave they discovered ancient treasures.",
    fail:"The cave was full of very angry squirrels."
    },
    
    {
    chapter:5,
    story:"Tomorrow, Frieren _____ a powerful spell and _____ the village.",
    answers:["will cast","will protect"],
    options:["cast","will cast","protect","will protect"],
    explanation:"Future uses will + verb.",
    success:"The villagers celebrated Frieren's heroic deeds.",
    fail:"The spell accidentally turned chickens purple."
    },
    
    {
    chapter:6,
    story:"Fern _____ carefully when she _____ a strange magical signal.",
    answers:["was training","noticed"],
    options:["was training","trained","noticed","notice"],
    explanation:"Past Continuous interrupted by Simple Past.",
    success:"Fern discovered a hidden magical relic.",
    fail:"Fern followed a squirrel instead."
    },
    
    {
    chapter:7,
    story:"Stark _____ a giant monster when Frieren _____ to help him.",
    answers:["was fighting","arrived"],
    options:["was fighting","fought","arrived","arrive"],
    explanation:"Past Continuous + Simple Past.",
    success:"Together they defeated the monster.",
    fail:"The monster stole Stark's lunch."
    },
    
    {
    chapter:8,
    story:"While the group _____ near a lake, Frieren _____ a rare flower.",
    answers:["was resting","noticed"],
    options:["was resting","rested","noticed","notice"],
    explanation:"Past Continuous + Simple Past.",
    success:"The flower reminded Frieren of Himmel.",
    fail:"Stark tried to cook the flower."
    },
    
    {
    chapter:9,
    story:"Fern _____ a powerful spell and the sky _____ with magical light.",
    answers:["cast","glowed"],
    options:["cast","casting","glowed","glow"],
    explanation:"Two completed actions in the past.",
    success:"Everyone admired the beautiful magic.",
    fail:"A duck became the village wizard."
    },
    
    {
    chapter:10,
    story:"Frieren _____ defeat the Demon King's servant because she _____ incredibly powerful.",
    answers:["can","was"],
    options:["can","could","is","was"],
    explanation:"'can' expresses ability and 'was' refers to the past.",
    success:"The heroes saved the region and continued their journey.",
    fail:"The servant escaped riding a giant mushroom."
    }
    
    
];

let currentChapter = 0;
let xp = 0;
let lives = 3;
let storySummary = [];
let chapterHits = 0;

function loadChapter(){
 const data = storyData[currentChapter];

 document.getElementById("chapter").textContent = data.chapter;

 document.getElementById("story-area").innerHTML =
 `<h2>Chapter ${data.chapter}</h2><p>${data.story}</p>`;

 createOptions();
 updateProgress();
 updateHud();
}

function createOptions(){
 const data = storyData[currentChapter];
 const choices = document.getElementById("choices");

 choices.innerHTML = "";

 data.options.forEach(option=>{
  const button = document.createElement("button");
  button.textContent = option;
  button.onclick = ()=>checkAnswer(option);
  choices.appendChild(button);
 });
}

function checkAnswer(option){
 const data = storyData[currentChapter];
 const feedback = document.getElementById("feedback");

 if(data.answers.includes(option)){
  chapterHits++;
  xp += 10;

  feedback.innerHTML =
  `<p class="correct">Correct! ${data.explanation}</p>`;

  if(chapterHits >= data.answers.length){
   storySummary.push(data.success);
   currentChapter++;
   chapterHits = 0;
  }
 }else{
  lives--;
  xp += 2;

  feedback.innerHTML =
  `<p class="wrong">Incorrect! ${data.explanation}</p>`;

  if(lives <= 0){
   storySummary.push(data.fail);
   showGameOver();
   return;
  }
 }

 updateHud();

 setTimeout(()=>{
  if(currentChapter >= storyData.length){
   showFinalScreen();
  }else{
   loadChapter();
  }
 },1200);
}

function updateHud(){
 const xpEl = document.getElementById("xp");
 const livesEl = document.getElementById("lives");

 if(xpEl) xpEl.textContent = xp;
 if(livesEl) livesEl.textContent = lives;
}

function updateProgress(){
 const progress = ((currentChapter) / storyData.length) * 100;
 const bar = document.getElementById("progress");

 if(bar) bar.style.width = progress + "%";
}

function getRank(){
 if(xp >= 50) return "Legendary Wizard";
 if(xp >= 35) return "Master Wizard";
 if(xp >= 20) return "Apprentice Wizard";
 return "Potion Student";
}

function showFinalScreen(){
 const container = document.querySelector(".game-container");
 if(container) container.style.display = "none";

 document.getElementById("final-screen").classList.remove("hidden");

 document.getElementById("final-xp").innerHTML =
 `<h2>Final XP: ${xp}</h2>
  <h3>Rank: ${getRank()}</h3>`;

 document.getElementById("story-summary").innerHTML =
 `<ul>${storySummary.map(item=>`<li>${item}</li>`).join("")}</ul>`;
}

function showGameOver(){
 const container = document.querySelector(".game-container");
 if(container) container.style.display = "none";

 document.getElementById("final-screen").classList.remove("hidden");

 document.getElementById("final-xp").innerHTML =
 `<h2>Game Over</h2>
  <h3>XP: ${xp}</h3>`;

 document.getElementById("story-summary").innerHTML =
 `<p>Luna ran out of lives.</p>`;
}

function restartGame(){
 currentChapter = 0;
 xp = 0;
 lives = 5;
 chapterHits = 0;
 storySummary = [];

 document.getElementById("final-screen").classList.add("hidden");

 const container = document.querySelector(".game-container");
 if(container) container.style.display = "block";

 loadChapter();
}

loadChapter();
