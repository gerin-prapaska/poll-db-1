let [command, ...argv] = process.argv.slice(2);
const Controller = require("./controller.js");
// let

switch (command) {
  case "list":
    Controller.votereleaseTwo();
    break;
  default:
}
