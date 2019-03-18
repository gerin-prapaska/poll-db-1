const db    = require('./setup');
const args  = process.argv.slice(2);
const DELETE_POLITICIANS = `DELETE FROM politicians WHERE id=${args[1]}`;
const DELETE_VOTERS = `DELETE FROM people WHERE id=${args[1]}`;
const DELETE_VOTES = `DELETE FROM people WHERE id=${args[1]}`;

switch(args[0]) {
  case "politicians":
    db.run(DELETE_POLITICIANS, function (err) {
      if (err) throw err;
      console.log(`Successfully delete id='${args[1]}'!`);
    });
    break;
  case "voters":
    db.run(DELETE_VOTERS, function (err) {
      if (err) throw err;
      console.log(`Successfully delete id='${args[1]}'!`);
    });
    break;
  case "votes":
    db.run(DELETE_VOTES, function (err) {
      if (err) throw err;
      console.log(`Successfully delete id='${args[1]}'!`);
    });
    break;
  default:
    console.log(`Command not found`);
    break;
}