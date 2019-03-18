const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')
const cmd = process.argv.slice(2)

switch (cmd[0]) {
    case 'create':
        if (cmd[1] === 'politicians'){
            db.run(`INSERT INTO ${cmd[1]} (name, party, location, grade_current) VALUES ('${cmd[2]}', '${cmd[3]}', '${cmd[4]}', '${cmd[5]}')`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('create successful')
                }
            });
        }else if (cmd[1] === 'voters'){
            db.run(`INSERT INTO ${cmd[1]} (first_name, last_name, gender, age) VALUES ('${cmd[2]}', '${cmd[3]}', '${cmd[4]}', '${cmd[5]}')`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('create successful')
                }
            });
        }else if (cmd[1] === 'votes'){
            db.run(`INSERT INTO ${cmd[1]} (voterId,politicianId) VALUES ('${cmd[2]}', '${cmd[3]}')`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('create successful')
                }
            });
        }
        break;
    case 'update':
        if (cmd[1] === 'politicians'){
            db.run(`UPDATE ${cmd[1]} 
                SET name = '${cmd[3]}',
                    party = '${cmd[4]}',
                    location = '${cmd[5]}',
                    grade_current = '${cmd[6]}' 
                WHERE id = '${cmd[2]}'`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('update successful')
                }
            });
        }else if (cmd[1] === 'voters'){
            db.run(`UPDATE ${cmd[1]} 
                SET first_name = '${cmd[3]}',
                    last_name = '${cmd[4]}',
                    gender = '${cmd[5]}',
                    age = '${cmd[6]}' 
                WHERE id = '${cmd[2]}'`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('update successful')
                }
            });
        }else if (cmd[1] === 'votes'){
            db.run(`UPDATE ${cmd[1]} 
                SET voterId = '${cmd[3]}',
                    politicianId = '${cmd[4]}', 
                WHERE id = '${cmd[2]}'`, (err)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log('update successful')
                }
            });
        }
        break;
    case 'delete':
        db.run(`DELETE FROM ${cmd[1]} WHERE id = '${cmd[2]}'`, (err)=>{
            if (err){
                console.log(err)
            }else {
                console.log(`${cmd[1]} id ${cmd[2]} has been deleted.`)
            }
        })
        break;
        

    default:
        break;
}