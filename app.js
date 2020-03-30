const sha256 = require('js-sha256');
const prompt = require('prompt-sync')();
const https = require('https');
const chalk = require('chalk');


const SIDES = ["heads", "tails"];
const SALT = Math.floor(Math.random() * 300000000);
const RND = Math.floor(Math.random() * 2); 
const f = `${SIDES[RND]}${SALT}`;

let hash = sha256(f);
console.log("\n----------------------------------------\n" + chalk.magentaBright(hash) + "\n----------------------------------------\n^ this is the hash. You can verify with the hash value in the end.");
console.log(`${chalk.yellowBright("Heads")} or ${chalk.blueBright("tails")}?`);
const userAnswer = prompt('Answer: ');

if(userAnswer == SIDES[RND]) {
  console.log(`${chalk.greenBright("Correct!")} You guessed correctly with ${SIDES[RND]}. The hashed value is ${chalk.underline(f)}`);
} else {
  console.log(`${chalk.redBright("Wrong!")} The correct answer was ${SIDES[RND]}. The hashed value is ${chalk.underline(f)}`);
}

console.log(`\n\nSent GET request to https://api.hashify.net/hash/sha256/hex?value=${f} to verify...`);
https.get(`https://api.hashify.net/hash/sha256/hex?value=${f}`, (resp) => {

  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});