const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll2.db')
const args = process.argv.slice(2)

switch (args[0]){
    case 'insert':
    switch (args[1]){
        case 'politician' :
        let newData = args[2].split(',')
        db.run  (`INSERT INTO politician (name,party,lokasi,grade_current)
                  VALUES ("${newData[0]}","${newData[1]}","${newData[2]}","${newData[3]}")`)
        break;

        case 'voter' :
        let newDataVoter = args[2].split(',')
        db.run  (`INSERT INTO voters (first_name,last_name,gender,age)
                  VALUES ("${newDataVoter[0]}","${newDataVoter[1]}","${newDataVoter[2]}","${newDataVoter[3]}")`)
        break;

        case 'vote' :
        let newDataVote = args[2].split(',')
        db.run  (`INSERT INTO voter_politician (voterId,politicianId)
                  VALUES ("${newDataVote[0]}","${newDataVote[1]}")`)
        break
    }
    break;

    case 'update':
    switch (args[1]){
        case 'politician' :
        let newData = args[2].split(',')
        db.run  (`UPDATE politician
                  SET "${newData[1]}" = "${newData[2]}"
                  WHERE id = "${newData[0]}"`)
        break;

        case 'voter' :
        let newDataVoter = args[2].split(',')
        db.run  (`UPDATE voters
                  SET "${newDataVoter[1]}" = "${newDataVoter[2]}"
                  WHERE id = "${newDataVoter[0]}"`)
        break;

        case 'vote' :
        let newDataVote = args[2].split(',')
        db.run  (`UPDATE voter_politician
                  SET "${newDataVote[1]}" = "${newDataVote[2]}"
                  WHERE id = "${newDataVote[0]}"`)
        break
    }

    case 'delete':
    switch (args[1]){
        case 'politician' :
        db.run  (`DELETE FROM politician
                  WHERE id = "${args[2]}"`)
        break;

        case 'voter' :
        db.run  (`DELETE FROM voters
                  WHERE id = "${args[2]}"`)
        break;

        case 'vote' :
        db.run  (`DELETE FROM voter_politician
                  WHERE id = "${args[2]}"`)
        break
    }
}
