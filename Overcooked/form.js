function validateTextbox() {

    var box = document.getElementById("firstname");
    var box2 = document.getElementById("lastname");
    
     if (box.value === "") {
        box.focus();
        box.style.border = "solid 3px #ff4040";
     }else{
        box.focus();
        box.style.border = "none";
     }
     if(box2.value === ""){
        box2.focus();
        box2.style.border = "solid 3px #ff4040";
     }else{
        box2.focus();
        box2.style.border = "none";
     }
    if (box.value === ""||box2.value === "") {
        alert("The field marked in red cannot be blank");
        return false;
    }
}
/*
function validateYesorNo(){
    
    var game = document.getElementsByName("Played Game ");  
    var fun = document.getElementsByName("Like Fun ");

    if ((game[0].value !== "Yes"||game[0].value !== "No") && (game[0].value !== "Yes"||game[0].value !== "No")) {
        game.focus();
        game.style.border = "solid 3px #ff4040";
     }else{
        game.focus();
        game.style.border = "none";
     }
     if((fun[0].value !== "Yes"||fun[0].value !== "No") && (fun[0].value !== "Yes"||fun[0].value !== "No")){
        fun.focus();
        fun.style.border = "solid 3px #ff4040";
     }else{
        fun.focus();
        fun.style.border = "none";
     }
        if ((game[0].value !== "Yes"||game[0].value !== "No") && (game[0].value !== "Yes"||game[0].value !== "No")||(fun[0].value !== "Yes"||fun[0].value !== "No") && (fun[0].value !== "Yes"||fun[0].value !== "No")) {
            alert("The field marked in red cannot be blank");
            return false;
        }
}
*/
function validateDate(){
    var box = document.getElementById("date");
    if (box.value === "") {
        box.focus();
        box.style.border = "solid 3px #ff4040";
     }else{
        box.focus();
        box.style.border = "none";
     }
    if (box.value === "") {
            alert("The field marked in red cannot be blank");
            return false;
    }
    
    var boxint=Number(box.value);
    
    if (!Number.isInteger(boxint) || boxint > 12319999 || boxint < 0) {
        box.focus();
        box.style.border = "solid 3px #ff4040";
     }else{
        box.focus();
        box.style.border = "none";
     }
    if (!Number.isInteger(boxint) || boxint > 12319999 || boxint < 0) {
            alert("The field marked in red must be a date in the form MMDDYYYY");
            return false;
    }
}


function validateForm(){
    validateTextbox();
    //validateYesorNo();
    validateDate();
}