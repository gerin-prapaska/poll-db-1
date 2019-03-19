const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

//============================== TEST CASE 1==============================
// db.all(`SELECT name,party,grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`,(err,data)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log(data)
//     }
// })

// db.all(`SELECT COUNT(*) AS totalVote,name FROM Politicians JOIN Votes ON Politicians.id = Votes.politiciansId WHERE Politicians.name = 'Olympia Snowe'`,(err,data)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log(data)
//     }
// })

// db.all(`SELECT name,COUNT(*) AS totalVote FROM Politicians JOIN Votes ON Politicians.id = Votes.politiciansId WHERE Politicians.name LIKE 'Adam%' GROUP BY name`,(err,data)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log(data)
//     }
// })
// db.all(`SELECT COUNT(*) AS totalVote,name,party,location FROM Politicians JOIN Votes ON Politicians.id = Votes.politiciansId GROUP BY name ORDER BY totalVote DESC LIMIT 3 `,(err,data)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log(data)
//     }
// })
db.all(`SELECT first_name,last_name,gender,age FROM Voters 
        JOIN Votes ON Voters.id = Votes.votersId
        JOIN Politicians ON politiciansId = Politicians.id
        WHERE Politicians.name = 'Olympia Snowe'`,(err,data)=>{
    if (err) {
        console.log(err)
    }else {
        console.log(data)
    }
})