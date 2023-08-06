let allImg = document.querySelectorAll("img");
let vor = document.querySelector(".vor");
let zuruck = document.querySelector(".zuruck");
let leiste = document.querySelector(".leiste");
let close = document.querySelector(".close");
let lightbox = document.querySelector(".lightbox");

let arrayImg = Array.from(allImg);
let arraySrc = [];

allImg.forEach(saveSrc);

function saveSrc(elem) {
  arraySrc.push(elem.getAttribute("src"));
}
console.log(arraySrc);

allImg.forEach(addClick);

function addClick(elem) {
  elem.addEventListener("click", fullScreen);
}

function fullScreen(e) {
  document.body.classList.add("budyFull");
  leiste.classList.add("leisteFull");
  lightbox.classList.add("lightboxFull");
  let newImg = document.createElement("img");
  newImg.classList.add("imgFull");
  let clickIndex = arrayImg.indexOf(e.currentTarget);

  newImg.setAttribute("src", arraySrc[clickIndex]);
  lightbox.appendChild(newImg);

  function setCounter() {
    let counter = clickIndex;
    function count(vorzeichen) {
      if (vorzeichen === "-") {
        counter--;
        if (counter < 0) {
          counter = allImg.length - 1;
        }
        return counter;
      } else {
        counter++;
        if (counter >= allImg.length) {
          counter = 0;
        }
        return counter;
      }
    }
    return count;
  }

  let rueckCounter = setCounter();

  close.addEventListener("click", () => {
    document.body.classList.remove("bodyfull");
    lightbox.removeChild(newImg);
    lightbox.classList.remove("lightboxFull");
    leiste.classList.remove("leisteFull");
  });

  zuruck.addEventListener("click", () => {
    let currentIndex = rueckCounter("-");
    newImg.setAttribute("src", arraySrc[currentIndex]);
  });
  vor.addEventListener("click", () => {
    let currentIndex = rueckCounter("+");
    newImg.setAttribute("src", arraySrc[currentIndex]);
  });

  newImg.addEventListener("touchstart", setStart);
  function setStart(eve1) {
    let startX = eve1.changedTouches[0].clientX;
    newImg.addEventListener("touchend", slide);

    function slide(eve2) {
      let endX = eve2.changedTouches[0].clientX;
      if (startX - endX < -20) {
        let currentIndex = rueckCounter("+");
        newImg.setAttribute("src", arraySrc[currentIndex]);
      }
      else if(startX-endX>20){
        let currentIndex=rueckCounter("-");
        newImg.setAttribute("src",arraySrc[currentIndex]);
      }

      newImg.removeEventListener("touchend", slide);
    }
  }
}
