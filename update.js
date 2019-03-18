const db    = require('./setup');
const args  = process.argv.slice(2);
const UPDATE_POLITICIANS = `UPDATE politicians
                            SET name          = '${args[2]}',
                                party         = '${args[3]}',
                                location      = '${args[4]}',
                                grade_current = '${Number(args[5])}'
                            WHERE id='${args[1]}'`;
const UPDATE_VOTERS = `UPDATE voters
                      SET first_name    = '${args[2]}',
                          last_name     = '${args[3]}',
                          gender        = '${args[4]}',
                          age           = '${args[5]}'
                      WHERE id='${args[1]}'`;
const UPDATE_VOTES = `UPDATE votes
                      SET voterId      ='${args[2]}',
                          politicianId ='${args[3]}'
                      WHERE id='${args[1]}'`;

switch(args[0]) {
  case "politicians":
    db.run(UPDATE_POLITICIANS, function (err) {
      if (err) throw err;
      console.log('Successfully update a row!');
    });
    break;
  case "voters":
    db.run(UPDATE_VOTERS, function (err) {
      if (err) throw err;
      console.log('Successfully update a row!');
    });
    break;
  case "votes":
    db.run(UPDATE_VOTES, function (err) {
      if (err) throw err;
      console.log('Successfully update a row!');
    });
    break;
  default:
    console.log(`Command not found`);
    break;
}