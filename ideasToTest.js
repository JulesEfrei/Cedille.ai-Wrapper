import fetch from 'node-fetch';
import * as fs from 'fs';
import 'dotenv/config'

const KEY = process.env.API_KEY

// REQUEST FUNCTION 

async function request(what) {
    const req = await fetch("https://api-prd.cedille.ai/v1/engines/fr-boris/completions", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${KEY}`
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
            let name = "./RESULTS/" + what + ".txt"
            let content = String(what) + "\n\n" + data["choices"][0]["text"]
            console.log("Test de '", what, "'...")
            const writeStream = fs.createWriteStream(name)
            writeStream.write(content)
        }
    })
}

// READSTREAM

const read = fs.createReadStream("./input.txt")

read.on("data", (chunk) => {
    let tests = String(chunk).split("\n")
    console.log("Découpage des différents tests")
    console.log("Exécution des tests...")
    tests.forEach(e => {
        request(e)
    });
})