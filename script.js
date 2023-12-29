

const buttons = (document.querySelector(".buttons")).querySelectorAll("button");

const display = document.querySelector(".display");
    const botLine = display.querySelector(".bot");
    const midLine = display.querySelector(".mid");
    const topLine = display.querySelector(".top");

let savedValue = ""
let operator = "";
let displayValue = "0";


// obvious
function clearDisplay(){
    savedValue = ""
    operator = "";
    displayValue = "0";

    topLine.textContent = "";
    midLine.textContent = "";
    botLine.textContent = "";
}   

//also obvious
function removeLastEntry(){
    if (botLine.textContent == ""){ 
        operator = "";
        midLine.textContent = "";
    }else{
        displayValue = "0";
        botLine.textContent = "";
    }  
}
// clear display and fill bot line  and displayValue with the answer.
function calculate(){

    let answer = 0;
    
    switch (true){
        case operator == "+"|| operator == "" :

            answer = parseFloat("0" + savedValue) + parseFloat("0" + displayValue);
            
        break;
        case operator == "x" :
            answer = parseFloat(savedValue) * parseFloat(displayValue);
        break;
        case operator == "-" :
            answer = parseFloat(savedValue) - parseFloat(displayValue);
        break;
        case operator == "/" :
            if (parseFloat(displayValue) == 0){
                answer = "lol";               
            }else {
                answer = parseFloat(savedValue) / parseFloat(displayValue);
            }         
        break;
    }
    clearDisplay()
    if (answer == "lol"){
        displayValue = 0;
        botLine.textContent = answer;
    }else {
        displayValue = answer
        botLine.textContent = answer;
    }
    

}

//request calculation and moves numbers around on the display 
//depending on the button pressed
function actualise(buttonText, isOperator){
    if (isOperator){
        switch(true){

            case buttonText == "ac" :
                clearDisplay();
            break;

            case buttonText == "ce" :
                removeLastEntry();
            break;

            case buttonText === "=" :
                calculate();
            break;

            //if user tries to operate on top of an unresolved operation
            // => resolve it and move the result to topscreen
            case savedValue != "" : 
                calculate();
                savedValue = displayValue;
                displayValue = "0";
                botLine.textContent = ""
                topLine.textContent = savedValue
                operator = buttonText;
                midLine.textContent = operator
            break;

            //move the bottom line on top, and add the operator in the middle
            case true :
                savedValue = displayValue;
                displayValue = "0";
                botLine.textContent = ""
                topLine.textContent = savedValue
                operator = buttonText;
                midLine.textContent = operator
            break;
        }
        
    }else{
        
        if (!(buttonText == "." && displayValue.includes(".")) ){// prevent multiple "."
            botLine.textContent += buttonText;
            displayValue += buttonText;
        }
    }
    
}


function init() {
    topLine.textContent = savedValue;
    midLine.textContent = operator;
    botLine.textContent = displayValue;

    buttons.forEach(button => {
        button.addEventListener("click", function() {           
            actualise(button.textContent, button.classList.contains("op"));       
        });
    });
}

init();