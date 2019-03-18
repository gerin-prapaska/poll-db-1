const db    = require('./setup');
const args  = process.argv.slice(2);
const INSERT_POLITICIANS = `INSERT INTO politicians (id, name, party, location, grade_current)
               VALUES (null, '${args[1]}', '${args[2]}', '${args[3]}', '${args[4]}')`;
const INSERT_VOTERS = `INSERT INTO voters (id, first_name, last_name, gender, age)
               VALUES (null, '${args[1]}', '${args[2]}', '${args[3]}', '${Number(args[4])}')`;
const INSERT_VOTES = `INSERT INTO votes (id, voterId, politicianId)
               VALUES (null, '${Number(args[1])}', '${Number(args[2])}')`;


switch(args[0]) {
  case "politicians":
    db.run(INSERT_POLITICIANS, function (err) {
      if (err) throw err;
      console.log('Successfully created a new row!');
    });
    break;
  case "voters":
    db.run(INSERT_VOTERS, function (err) {
      if (err) throw err;
      console.log('Successfully created a new row!');
    });
    break;
  case "votes":
    db.run(INSERT_VOTES, function (err) {
      if (err) throw err;
      console.log('Successfully created a new row!');
    });
    break;
  default:
    console.log(`Command not found`);
    break;
}
