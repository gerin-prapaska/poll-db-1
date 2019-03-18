const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`ghotcha, connected to the database`);
  }
});

class APP {
  static run(sql, params = [], callback) {
    db.run(sql, params, function(err) {
      if (err) {
        console.log(`something wrong with this ${sql}`);
        console.log(err, null);
        callback(err);
      } else {
        console.log("succesfully to run this statement: ", sql);
        if (!params.length) {
          callback(null);
        } else {
          callback(null, params);
        }
      }
    });
  }

  static get(sql, params = [], callback) {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.log("DB.get method can't run");
        console.log(err);
        callback(err, null);
      } else {
        console.log(`DB.GET SUCESSFULLY`);
        console.log(`sucessfully GET this ${sql}`);
        callback(null, result);
      }
    });
  }

  static all(sql, callback) {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log("DB.all method can't run");
        console.log(err);
        callback(err, null);
      } else {
        console.log(`DB.ALL SUCESSFULLY`);
        console.log(`sucessfully GET this ${sql}`);
        callback(null, rows);
      }
    });
  }

  static each(sql, params = [], callback) {
    db.each(sql, params, (err, rows) => {
      if (err) {
        console.log("DB.each method can't run");
        console.log(err);
        callback(err, null);
      } else {
        console.log(`DB.EACH SUCESSFULLY`);
        // console.log(`sucessfully GET this ${sql}`);
        callback(null, rows);
      }
    });
  }
}

module.exports = APP;
