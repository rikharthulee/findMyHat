//importing prompt-sync for user input
const prompt = require("prompt-sync")({ sigint: true });

// Constants for the game
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Class representing the game field
class Field {
  // Initialize the field with a 2D array
  // and set the player's starting position
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  // Print the game field to the console, joining each row with a space
  print() {
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }

  // Check if the player's current position is inside the field boundaries
  isInBounds() {
    return (
      this.playerY >= 0 &&
      this.playerY < this.field.length &&
      this.playerX >= 0 &&
      this.playerX < this.field[0].length
    );
  }

  playGame() {
    let playing = true;

    while (playing) {
      this.print();

      const direction = prompt(
        "Which way? (u = up, d = down, l = left, r = right): "
      );

      // ✅ Save previous position before moving
      const prevX = this.playerX;
      const prevY = this.playerY;

      switch (direction) {
        case "u":
          this.playerY -= 1;
          break;
        case "d":
          this.playerY += 1;
          break;
        case "l":
          this.playerX -= 1;
          break;
        case "r":
          this.playerX += 1;
          break;
        default:
          console.log("Invalid input. Use u, d, l, or r.");
          continue;
      }

      if (!this.isInBounds()) {
        console.log("Out of bounds! Game over.");
        playing = false;
        break;
      }

      const tile = this.field[this.playerY][this.playerX];

      if (tile === hole) {
        console.log("You fell into a hole! 💀 Game over.");
        playing = false;
      } else if (tile === hat) {
        console.log("You found your hat! 🎩 You win!");
        playing = false;
      } else {
        // Clear old position
        this.field[prevY][prevX] = fieldCharacter;

        // Set new position
        this.field[this.playerY][this.playerX] = pathCharacter;
      }
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
