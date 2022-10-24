const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector(".button");
const textScore = document.querySelector(".score");
const message = document.querySelector(".message");
const imageClass = ["etienne", "mole", "mole", "claire", "mole", "mole", "nick", "mole", "mole", "mike" ];


let isPlaying = true;
let lastHole;
let score = 0;

function randomTime(min, max) {
    return (Math.round(Math.random() * (max - min) + min))
}

function randomHole(holes) {
    const idx =  Math.floor(Math.random() * holes.length);
    console.log(idx);
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
    const image = imageClass[Math.floor(Math.random() * 10)];
    hole.children[0].className = "";
    console.log(image)
    hole.children[0].classList.add("mole", image);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up")
        if(isPlaying) {
            popUp();
        } else {
            displayMessage()
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
    message.classList.add("hidden");
    textScore.textContent = score;
    setTimeout(() => isPlaying = false, 10000)
    popUp();
}

function removeSplat(e) {
    //this.classList.remove("splat");
    splatNode = this.parentNode.querySelector(".splat");
    if(splatNode) {
        this.parentNode.removeChild(splatNode);
    }
}

function displayMessage() {
    if(score == 0) {
        message.textContent = "Wow! you didn't whack any pests. Call us now and let us transform your IT security." 
    } else if(score >0 && score <= 5) {
        message.textContent = "Not bad, you got some pests, but there are many more. Speak to us now and let us help transform your IT security" 
    } else if(score >5 && score <=10 ) {
        message.textContent = "You are giving the pests a good whacking, but its hard work. Flow Transform can help make it easier"        
    } else if(score > 10) {
        message.textContent = "Looks like you have all the visible pests under control..... but what about the hidden? get in touch and see how we can help"        
    }
    message.classList.remove("hidden");
}

moles.forEach(mole => mole.addEventListener('click', bash));

moles.forEach(mole => mole.addEventListener('transitionend', removeSplat));

startButton.addEventListener('click', startGame);










