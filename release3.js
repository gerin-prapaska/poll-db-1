let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db')

db.all(`SELECT name,party,grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err,data) => {
    if (err){
        console.log(err)
    }else {
        console.log(data)
    }
})

db.all(`SELECT COUNT (*) AS totalVote, politicians.name FROM votes JOIN politicians ON politicians.id = votes.politicianId WHERE politicianId = 17`, (err,data) =>{
    if (err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//hitung jumlah vote untuk pilician yang namanya mengandung kata Adam . output :
//[{name adam kinzinger ,total vote :6
// ....
// ...}]

db.all(`SELECT name, COUNT (*) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicians.name HAVING politicians.name LIKE 'Adam %'`,(err,data) =>{
    if (err){
        console.log(err)
    }else {
        console.log(data)
    }
})


//tampilkan 3 politician beserta nama partai dan lokasi pilutican tersbut, uang memiliki suara terbanyak
// totalvote name party location

db.all(`SELECT COUNT (*) AS totalVote, name, party, location FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3`, (err,data) =>{
    if (err){
        console.log(err)
    }else{
        console.log(data)
    }
})

// tamplikan siapa yang melakukan voting ke politician yang bernama olympia snowe
// output firstname aaliyah lasname langwoerh gender age

db.all(`SELECT first_name, last_name, gender, age FROM voters JOIN votes ON votes.voterId = voters.id WHERE politicianId = 17`, (err,data) =>{
    if (err){
        console.log(err)
    }else{console.log(data)}
})