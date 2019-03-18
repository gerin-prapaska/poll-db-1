// Muhammad Ramadhoni
// p1-w3 poll-db-1

const insertData = require('./fungsi').insertData;
const updateData = require('./fungsi').updateData;
const deleteData = require('./fungsi').deleteData;

let command = process.argv.slice(2);

switch (command[0]) {
  case 'insert':
    let sizeColumn = 0;
    
    if (command[1] === 'politicians' || command[1] === 'voters') {
      sizeColumn = 4;
    } else if (command[1] === 'votes') {
      sizeColumn = 2;
    }

    if (command.slice(2).length !== sizeColumn) {
      console.log(`Error INPUT! It only has ${sizeColumn} column`);
    } else {
      insertData(command[1], command.slice(2));
    }
    break;
  
  case 'update':
    updateData(command[1], command[2], command[3], command[4]);
    break;
  
  case 'delete':
    deleteData(command[1], command[2]);
    break;
  
  default:
    break;
}