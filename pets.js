const express = require('express');
const app = express();
const fs = require('fs');
const method = process.argv[2];

var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

if (method === 'read'){
  let index = process.argv[3];
  if(index>=0){
    console.log(pets[index]);
} else if (index<0){
  console.error('Usage: node pets.js read INDEX')
  process.exit(1);
} else {
    console.log(pets);
  }
}

else if (method === 'create'){
  let age = Number(process.argv[3]);
  let kind = process.argv[4];
  let name = process.argv[5];
  if (!age || !kind || !name){
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  } else {
    let newPet = {'age': age, 'kind': kind, 'name': name};
    pets.push(newPet);
    fs.writeFile('pets.json', JSON.stringify(pets), writeErr =>{
      if (writeErr){
        throw writeErr;
      } else {
        console.log(newPet);
      }
    });
  }
}

else {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
