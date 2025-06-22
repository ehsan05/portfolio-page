
function rollDice(){
    const numOfDice = parseInt(document.getElementById("textBox").value);
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    diceResult.textContent = "";
    diceImages.innerHTML = "";

    if(numOfDice > 6 | numOfDice < 1){
        diceResult.textContent = "Please enter a number between 1 and 6";
        diceImages.innerHTML = ''
        return
    }

    for(let i = 0; i < numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        

        const img = document.createElement("img");
        img.src = `images/${value}.png`;
        img.alt = `images/${value}`;
        img.classList.add("dice-roll-animation");
        diceImages.appendChild(img);
    }


    diceResult.textContent = `dice: ${values.join(", ")}`;

}