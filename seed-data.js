const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1).map(x => x.split(','))
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1).map(x => x.split(','))
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1).map(x => x.split(','))
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db')

function seeding(data, table, array, cb){
    db.serialize(function(){
        let stmt = db.prepare(`INSERT INTO ${table} (${array.join(', ')}) VALUES (${array.map(x => '?').join(',')})`)
        for (let i = 0; i < data.length; i++){
            stmt.run(data[i])
        }
        stmt.finalize(cb);
    })

}



// seeding(politicians, 'politicians', ['name', 'party', 'location', 'grade_current'], (err) =>{
//     if (err){
//         console.log('politikus gamasuk tjuy')
//     }else{
//         console.log('politicians has been seeded')
//     }
// })
// seeding(voters, 'voters', ['first_name', 'last_name', 'gender', 'age'], (err) =>{
//     if (err){
//         console.log('voters gamasuk tjuy')
//     }else{
//         console.log('voters has been seeded')
//     }
// })
// seeding(votes, 'votes', ['voterId', 'politicianId'], (err) =>{
//     if (err){
//         console.log('votes gamasuk tjuy')
//     }else {
//         console.log('all data has been seeded')
//     }
// })



