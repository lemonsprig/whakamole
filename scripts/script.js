const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector(".button");
const textScore = document.querySelector(".score");


let isPlaying = true;
let lastHole;
let score = 0;

function randomTime(min, max) {
    return (Math.round(Math.random() * (max - min) + min))
}

function randomHole(holes) {
    const idx =  Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popUp() {
    const hole = randomHole(holes);
    const time = randomTime(500,1000);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up")
        if(isPlaying) {
            popUp();
        }   
    }, time);
}

function bash(e) {
    if(!e.isTrusted) return;
    //this.classList.add("splat");
    this.parentNode.classList.remove('up');
    score ++
    textScore.textContent = score;
    const splatNode = document.createElement("div");
    splatNode.classList.add("splat")
    this.parentNode.appendChild(splatNode);
}

function startGame() {
    isPlaying = true;
    score = 0;
    textScore.textContent = score;
    setTimeout(() => isPlaying = false, 10000)
    popUp();
}

function removeSplat(e) {
    //this.classList.remove("splat");
    splatNode = this.parentNode.querySelector(".splat");
    console.log(splatNode);
    if(splatNode) {
        this.parentNode.removeChild(splatNode);
    }
}

moles.forEach(mole => mole.addEventListener('click', bash));

moles.forEach(mole => mole.addEventListener('transitionend', removeSplat));

startButton.addEventListener('click', startGame);










