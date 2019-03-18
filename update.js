const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const command = process.argv.slice(2);
const queryPolitician = `
    UPDATE politicians
    SET name            ='${command[2]}',
        party           ='${command[3]}',
        location        ='${command[4]}',
        grade_current   ='${command[5]}'
    WHERE id=${command[1]}
`
const queryVoters = `
    UPDATE voters
    SET first_name  ='${command[2]}',
        last_name   ='${command[3]}',
        gender      ='${command[4]}',
        age         ='${command[5]}'
    WHERE id=${command[1]}
`   

switch(command[0]){
    case'politicians':
        db.run(queryPolitician , function(err){
            if(err)console.log(err);
            else console.log('update politicians berhasil!');
        })
        break;
    case'voters':
        db.run(queryVoters , function(err){
            if(err)console.log(err);
            else console.log('update politicians berhasil!');
        })
        break
}