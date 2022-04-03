import fetch from 'node-fetch'
import * as readline from "readline"


// REQUEST FUNCTION 

async function request(what) {
    const req = await fetch("https://api-prd.cedille.ai/v1/engines/fr-boris/completions", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": "Bearer <API KEY>"
        },
        "body": JSON.stringify({
            "prompt": what,
            "max_length": 300,
            "temperature": 1,
            "top_p": 0.8,
            "top_k": 50,
            "repetition_penalty": 1.1,
            "n": 1
        })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
        if(data["detail"]) {
            console.log("Error : \n", JSON.stringify(data))
        } else {
            console.log(data["choices"][0]["text"])
        }
    })
}

// READLINE

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.question("Which test would you like to perform ? ", (res) => {
    request(res)
    rl.close()
})