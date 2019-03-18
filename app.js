const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

const args = process.argv.slice(2);
const command = args[0];
const table = args[1];
const records = [...args].slice(2);

let createQuery = '';
let updateQuery = '';
let deleteQuery = '';

if(args[0] === 'create') {
  switch(args[1]){
    case 'politicians':
    createQuery = `INSERT INTO politicians (id, name, party, location, grade_current) VALUES (null, '${args[2]}', '${args[3]}', '${args[4]}', '${+args[5]}')`;
    break;
    case 'voters':
    createQuery = `INSERT INTO voters (id, first_name, last_name, gender, age) VALUES (null, '${args[2]}', '${args[3]}', '${args[4]}', '${+args[5]}')`;
    break;
    case 'votes':
    createQuery = `INSERT INTO votes (id, voterId, politicianId) VALUES (null, '${+args[2]}', '${+args[3]}')`;
    break;
    default:
    break;
  }
}

else if(args[0] === 'update'){
  switch(args[1]){
    case 'politicians':
    updateQuery = `UPDATE politicians
                    SET name     = '${args[3]}',
                    party        = '${args[4]}',
                    location     = '${args[5]}',
                    grade_current= ${+args[6]}
                    WHERE id = ${+args[2]}`;
    break;
    case 'voters':
    updateQuery = `UPDATE voters
                    SET first_name = '${args[3]}',
                    last_name      = '${args[4]}',
                    gender         = '${args[5]}',
                    age            = ${args[6]}
                    WHERE 
                    id = ${args[2]}`;
    break;
    case 'votes':
    updateQuery = `UPDATE votes
                    SET 
                    voterId       = ${+args[3]},
                    politicianId  = ${+args[4]}
                    WHERE id = ${+args[2]}`;
    break;
    default:
    break;
  }
}

else if (args[0] === 'delete'){
  switch(args[1]){
    case 'politicians':
    deleteQuery = `DELETE FROM politicians WHERE id= '${args[2]}'`;
    break;
    case 'voters':
    deleteQuery = `DELETE FROM voters WHERE id= '${args[2]}'`;
    break;
    case 'votes':
    deleteQuery = `DELETE FROM votes WHERE id= '${args[2]}'`;
    break;
    default:
    break;
  }
}

if(args[0] === 'create'){
  db.serialize(function(){
    db.run(createQuery, function(err){
      if(err) {console.log(err);}
      else {console.log('success, created', this.lastID, this.changes);}
    })
  })
} else if(args[0] === 'update') {
  db.serialize(function(){
    db.run(updateQuery, function(err){
      if(err){console.log(err);}
      else {console.log('success, updated', this.lastId, this.changes);}
    })
  })
} else if(args[0] === 'delete'){
  db.serialize(function(){
    db.run(deleteQuery, function(err){
      if(err) {console.log(err);}
      else {console.log('success, deleted', this.lastId, this.changes);}
    })
  })
} else {console.log('unknown command');}