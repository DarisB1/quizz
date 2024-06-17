let quizz = "";

async function afficherFilms() {
  const reponse = await fetch(
    "https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=tv_cinema&difficulty=facile"
  );
  quizz = await reponse.json();
}

await afficherFilms();
console.log(quizz);

const body = document.querySelector("body");
const color = document.getElementById("checkbox-color");
const articles = document.querySelectorAll(".art-theme");
const h1 = document.querySelector("h1");
const span = document.querySelector("span");
const h2 = document.querySelectorAll("h2");
const hgoupP = document.querySelector(".hgroup-p");
const darkSun = document.getElementById("dark-sun");
const darkMoon = document.getElementById("dark-moon");

color.addEventListener("click", () => {
  if (color.checked === true) {
    body.style.backgroundColor = "#313e51";
    for (let i = 0; i < articles.length; i++) {
      articles[i].style.backgroundColor = "#3B4D66";
    }
    for (let i = 0; i < h2.length; i++) {
      h2[i].style.color = "#fff";
    }
    h1.style.color = "#fff";
    span.style.color = "#fff";
    hgoupP.style.color = "#ABC1E1";
    darkSun.src = "assets/images/icon-sun-light.svg";
    darkMoon.src = "assets/images/icon-moon-light.svg";
  } else {
    body.style.backgroundColor = "#f4f6fa";
    for (let i = 0; i < articles.length; i++) {
      articles[i].style.backgroundColor = "#fff";
    }
    h1.style.color = "black";
    for (let i = 0; i < h2.length; i++) {
      h2[i].style.color = "#313E51";
    }
    span.style.color = "#313E51";
    hgoupP.style.color = "#626C7F";
    darkSun.src = "assets/images/icon-sun-dark.svg";
    darkMoon.src = "assets/images/icon-moon-dark.svg";
  }
});

const div = document.createElement("div");

function string() {
  for (let i = 0; i < articles.length; i++) {
    articles[i].addEventListener("click", () => {
      let counter = 0;
      let questionCounter = 1;
      let reponseCounter = 0;

      function afficher(counter) {
        let icon;
        let title;
        switch (i) {
          case 0:
            icon = "html";
            title = "HTML";
            break;
          case 1:
            icon = "css";
            title = "CSS";
            break;
          case 2:
            icon = "js";
            title = "JAVASCRIPT";
            break;
          case 3:
            icon = "accessibility";
            title = "ACCESSIBILITY";
            break;
        }

        body.innerHTML = `
          <section class="sect-theme-js">
            <article class="art-theme-js">
              <img class="bg-img" src="assets/images/icon-${icon}.svg" alt="${icon} icon">
              <h2>${title}</h2>    
            </article>
            <div class="checkbox">
              <img id="dark-sun" src="assets/images/icon-sun-dark.svg" alt="soleil">
              <input type="checkbox" name="" id="checkbox-color">
              <img id="dark-moon" src="assets/images/icon-moon-dark.svg" alt="lune">
            </div>
          </section>
          <p>Question ${questionCounter} of 5</p>
          <p>${quizz.quizzes[counter].question}</p>
          <article class="art-input">
            <ul>
            <li>
              <input type="radio" id="badAnswer">
              <label>${quizz.quizzes[counter].badAnswers[0]}</label>        
            </li>
            <li>
              <input type="radio" id="badAnswer">
              <label>${quizz.quizzes[counter].badAnswers[1]}</label>        
            </li>
            <li>
              <input type="radio" id="answer">
              <label>${quizz.quizzes[counter].answer}</label>      
            </li>
            <li>
              <input type="radio" id="badAnswer">
              <label>${quizz.quizzes[counter].badAnswers[2]}</label>   
            </li>   
            </ul>
            <button id="submit">Submit Answer</button>
          </article>
        `;
        const answer = document.getElementById("answer");
        const badAnswers = document.getElementById("badAnswer");
        answer.addEventListener("click", ()=>{
          reponseCounter++
        })


        const sub = document.getElementById("submit");
        sub.addEventListener("click", () => {
          counter++;
          questionCounter++;
          if (counter < quizz.quizzes.length) {
            afficher(counter);
          } else {
            body.innerHTML = `
            <section class="score">
            <article class="art-theme-js">
              <img class="bg-img" src="assets/images/icon-${icon}.svg" alt="${icon} icon">
              <h2>${title}</h2>
              <div class="checkbox">
              <img id="dark-sun" src="assets/images/icon-sun-dark.svg" alt="soleil">
              <input type="checkbox" name="" id="checkbox-color">
              <img id="dark-moon" src="assets/images/icon-moon-dark.svg" alt="lune">
            </div>
              <p>Quiz completed! You scored ...</p>
              <p>${reponseCounter}out of 5</p>
              <button id="again">Play Again</button>
            </article>
          </section>
            `;
            
          }
        });
      }
        
      afficher(counter);
    });
  }
}

string();
