const APP = require("./app.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db", err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`ghotcha, connected to the database`);
  }
});

class Model {
  constructor() {}
  static list(input, callback) {
    APP.each(
      `SELECT name, party, grade_current
              FROM candidate
              WHERE party = ?
              AND grade_current BETWEEN 9 and 11
              ORDER BY grade_current`,
      [input],
      (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  static update(input, callback) {
    let { table, set, valSet, where, value } = input;
    APP.run(
      `UPDATE ${table} SET ${set} = ${valSet} WHERE ${where} = ${value}`,
      (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }
    );
  }

  static delete(table, field, value, callback) {
    APP.run(`DELETE FROM ${tabel} WHERE ${field} = ${value}`, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }

  static getVote(value, callback) {
    APP.get(
      `select sum(id_candidate = (select id from candidate where name like "${value}%")) as totalVote,
    candidate.name
    from vote
    join candidate
    where candidate.id = (select id from candidate where name like "${value}%")`,
      [],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          // console.log(results);
          callback(null, result);
        }
      }
    );
  }

  static getCandidateInclude(value, callback) {
    APP.all(
      `select name, count(*) as totalVote from candidate
      join vote on vote.id_candidate = candidate.id
      where name like "${value}%" group by name`,
      (err, rows) => {
        if (err) {
          console.log(err, null);
        } else {
          callback(null, rows);
        }
      }
    );
  }
  static totalVote(limit, filterby, callback) {
    APP.all(
      ` select  count(*) as totalVote , name, party, location
      from candidate
      join vote
      on vote.id_candidate = candidate.id
      group by name
      order by totalVote ${filterby} limit ${limit};`,
      (err, rows) => {
        if (err) {
          // console.log(err);
          callback(err, null);
        } else {
          // console.log(rows);
          callback(err, rows);
        }
      }
    );
  }

  static voteCandidate(name, callback) {
    APP.all(
      ` select firstName, lastName, gender, age from voter
      join vote
      join candidate
      on voter.id = vote.id_voter
      where vote.id_candidate  = (select id from candidate where name = "Olympia Snowe")
      limit 4`,
      (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  static votereleaseTwo(callback) {
    APP.all(
      ` select totalVote,politicianName,voterName,gender
      from (select *, row_number() over(partition by politicianName) as rn
      from totalthevotes)
      where rn <= 3 order by totalVote DESC`,
      (err, rows) => {
        if (err) {
          console.log(err, null);
        } else {
          callback(null, rows);
        }
      }
    );
  }
}

class Politician extends Model {
  constructor(name, party, location, grade_current) {
    super();
    Object.assign(this, { name, party, location, grade_current });
  }

  static create(input, callback) {
    let { name, party, location, grade_current } = input;
    APP.run();
  }
}

class Voter extends Model {
  constructor(firstName, lastName, gender, age) {
    super();
    Object.assign(this, { firstName, lastName, gender, age });
  }
}

// console.log(new Voter());
// Model.votereleaseTwo();
module.exports = { Model, Politician, Voter };
