#!/usr/bin/env node
let fs = require("fs");

//input
let inputArr = process.argv.slice(2);
// console.log(inputArr);

//options
let optionArr = [];
let fileArr = [];

//identify options
for(let i = 0; i < inputArr.length ; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }
}

// option check 
let isBothPresent = optionArr.includes("-n")&& optionArr.includes("-b");
if(isBothPresent){
    console.log("either enter -n or -b");
    return;
}

//existence 
for(let i =0 ; i<fileArr.length; i++){
    
    let isPresent = fs.existsSync(fileArr[i]);
    if(!isPresent){
        console.log(`file ${fileArr[i]} is not present`) ;
        return;  
     }
}


//read
let content = "";
for(let i =0 ; i<fileArr.length; i++){
    //buffer
    let bufferContent = fs.readFileSync(fileArr[i]);
    // console.log(bufferContent); //its output :- read point 4 in help.txt
    
    // to make buffer output in string
    content += bufferContent + "\r\n"; // point 6 in help.txt
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);

let isSpresent = optionArr.includes("-s"); //help point 7
if(isSpresent){
    for(let i=1 ; i<contentArr.length; i++){
       if(contentArr[i] == "" && contentArr[i-1] == ""){
           contentArr[i] =null;
       }else if(contentArr[i] == "" && contentArr[i-1] == null){
        contentArr[i] =null;
       }
    }

    let tempArr = [];
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }

     contentArr = tempArr;
}

// console.log(contentArr.join("\n"));

let isNpresent = optionArr.includes("-n");
if(isNpresent){
    for(let i=0; i<contentArr.length; i++){
        contentArr[i] = ` ${i+1} ${contentArr[i]}`;
    }
}
// console.log(contentArr.join("\n"));


let isBpresent = optionArr.includes("-b");
if(isBpresent){
    let counter = 1;
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = ` ${counter++} ${contentArr[i]}`;
        }
    }
}
console.log(contentArr.join("\n"));