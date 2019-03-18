const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const command = process.argv.slice(2);
const queryPolitician = `
    INSERT INTO politicians (name,party,location,grade_current)
    VALUES ('${command[1]}','${command[2]}','${command[3]}','${command[4]}')
`
const queryVoter = `
    INSERT INTO voters (first_name , last_name, gender, age)
    VALUES ('${command[1]}','${command[2]}','${command[3]}','${command[4]}')
`

switch(command[0]){
    case`politicians`:
        db.run(queryPolitician, function(err){
            if(err)console.log(err);
            else console.log(`Insert data politicians berhasil!`);          
        })
        break;
    case`voters`:
        db.run(queryVoter, function(err){
            if(err)console.log(err);
            else console.log(`Insert data voters berhasil!`);          
        })
        break;
}