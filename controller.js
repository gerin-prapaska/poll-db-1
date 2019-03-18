const { Model, Politician, Voter } = require("./model.js");
const View = require("./view.js");

class Controller {
  static update(input) {
    let { table, val, valSet, where, value } = input;
    Model.update({ table, val, valSet, where, value }, (err, data) => {
      if (err) {
        View.err(err);
      } else {
        View.display(data);
      }
    });
  }

  static delete(table, field, value) {
    Model.delete(table, field, value, (err, data) => {
      if (err) {
        View.err(err);
      } else {
        View.display(data);
      }
    });
  }
  static getVote(value) {
    Model.getVote(value, (err, data) => {
      if (err) {
        View.err(err);
      } else {
        View.display(data);
      }
    });
  }
  static getCandidateInclude(value) {
    Model.getCandidateInclude(value, (err, rows) => {
      if (err) {
        View.err(err);
      } else {
        View.display(rows);
      }
    });
  }
  static totalVote(limit, filterby) {
    Model.totalVote(limit, filterby, (err, rows) => {
      if (err) {
        View.err(err);
      } else {
        View.display(rows);
      }
    });
  }
  static voteCandidate(name) {
    Model.voteCandidate(name, (err, rows) => {
      if (err) {
        View.err(err);
      } else {
        View.display(err);
      }
    });
  }
  static votereleaseTwo() {
    Voter.votereleaseTwo((err, rows) => {
      if (err) {
        View.err(err);
      } else {
        View.display(rows);
      }
    });
  }
}

module.exports = Controller;
