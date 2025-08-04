// Import prompt-sync for user input
const prompt = require("prompt-sync")({ sigint: true });

// Constants for the symbols used in the game
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Define the Field class (handles the map, movement, logic)
class Field {
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  // Print the field to the console
  print() {
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }

  // Check whether the player is still within the grid
  isInBounds() {
    return (
      this.playerY >= 0 &&
      this.playerY < this.field.length &&
      this.playerX >= 0 &&
      this.playerX < this.field[0].length
    );
  }

  // The main game loop
  playGame() {
    let playing = true;

    while (playing) {
      this.print(); // Show current field

      const direction = prompt(
        "Which way? (u = up, d = down, l = left, r = right): "
      );

      // Store previous position before moving
      const prevX = this.playerX;
      const prevY = this.playerY;

      // Move player based on input
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

      // Check if the player walked off the map
      if (!this.isInBounds()) {
        console.log("🚫 Out of bounds! Game over.");
        playing = false;
        break;
      }

      // Check what the player has landed on
      const tile = this.field[this.playerY][this.playerX];

      if (tile === hole) {
        console.log("💀 You fell into a hole! Game over.");
        playing = false;
      } else if (tile === hat) {
        console.log("🎩 You found your hat! You win!");
        playing = false;
      } else {
        // Clear previous spot, move player to new one
        this.field[prevY][prevX] = fieldCharacter;
        this.field[this.playerY][this.playerX] = pathCharacter;
      }
    }
  }

  // Static method to create a randomly generated field
  static generateField(height, width, holePercentage = 0.2) {
    const field = []; // We'll build this 2D array row by row

    // Outer loop: one iteration for each row
    for (let y = 0; y < height; y++) {
      const row = []; // Start a new row

      // Inner loop: one iteration for each column in the current row
      for (let x = 0; x < width; x++) {
        const random = Math.random(); // Generate a random number between 0 and 1

        // If the number is less than the holePercentage, place a hole
        if (random < holePercentage) {
          row.push(hole);
        } else {
          // Otherwise, place a normal field character
          row.push(fieldCharacter);
        }
      }

      // After filling the row with tiles, add it to the main field array
      field.push(row);
    }

    // Set the starting position [0][0] to be the player
    field[0][0] = pathCharacter;

    // Place the hat somewhere random (but not at the starting point)
    let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width); // random column
      hatY = Math.floor(Math.random() * height); // random row
    } while (hatX === 0 && hatY === 0); // Make sure it's not the starting tile

    field[hatY][hatX] = hat; // Place the hat

    return field; // Done! Return the randomly generated field
  }
}

// Create a new game with random map
const myField = new Field(Field.generateField(5, 5, 0.2));
myField.playGame();
