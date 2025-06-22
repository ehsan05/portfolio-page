const inputBox = document.getElementById("input-box");
const cToF = document.getElementById("cToF");
const fToC = document.getElementById("fToC");
const result = document.getElementById("result");
let temp;


function convert(){
    
    if(cToF.checked){
        temp = Number(inputBox.value);
        temp = temp * 9 / 5 + 32;
        result.textContent = temp.toFixed(1) + "°F"
    }
    else if(fToC.checked){
        temp = Number(inputBox.value);
        temp = (temp - 32) * (5/9);
        result.textContent = temp.toFixed(1) + "°c"
    }
    else{
        result.textContent = "Select a unit"
    }
}