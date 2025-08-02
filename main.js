//importing prompt-sync for user input
const prompt = require("prompt-sync")({ sigint: true });

// Constants for the game
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Class representing the game field
class Field {
  constructor(field) {
    this.field = field;
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();
