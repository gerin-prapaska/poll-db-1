const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./appVote.db')
const argv = process.argv.slice(2)
let command = argv.slice(1)

switch (argv[0]) {
    case 'insert':
        insertData(command)
        break;
    case 'update':
        updateData(command)
        break;
    case 'delete':
        deleteData(command)
        break;
    case 'release3':
        if(command[0] === '1'){
            release3no1()
        }else if(command[0] === '2'){
            release3no2()
        }else if(command[0] === '3'){
            release3no3()
        }else if(command[0] === '4'){
            release3no4()
        }else if(command[0] === '5'){
            release3no5()
        }
        break;
    default:
        break;
}

//INSERT DATA
function insertData(command){
    db.run(`INSERT INTO ${command[0]} VALUES (null, '${command[1]}', '${command[2]}', '${command[3]}', ${command[4]})`, (err)=>{
        if(err) console.log(err)
        else console.log('success insert data')
    })
}

//UPDATE DATA
function updateData(command){
    db.run(`UPDATE ${command[0]} SET ${command[2]} = ${command[3]} WHERE id=${command[1]}`, (err)=>{
        if(err) console.log(err)
        else console.log('success update data')
    })
}

//DELETE DATA
function deleteData(command){
    db.run(`DELETE FROM ${command[0]} WHERE id=${command[1]}`, (err)=>{
        if(err) console.log(err)
        else console.log('success delete data')
    })
}


//RELEASE 3 no 1
function release3no1(){
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err, data)=>{
        console.log(data)
    } )
}

//RELEASE 3 no 2
function release3no2(){
    db.all(`SELECT count(voterId) AS totalVote, politicians.name FROM votes JOIN politicians ON votes.politicianID = politicians.id WHERE politicians.name = 'Olympia Snowe'`, (err, data)=>{
        console.log(data)
    } )
}

//RELEASE 3 no 3
function release3no3(){
    db.all(`SELECT politicians.name, count(voterId) AS totalVote 
    FROM votes JOIN politicians ON votes.politicianID = politicians.id 
    WHERE politicians.name like 'Adam %' GROUP BY politicians.name`, (err, data)=>{
        console.log(data)
    } )
}

//RELEASE 3 no 4
function release3no4(){
    db.all(`SELECT count(voterId) AS totalVote, politicians.name, politicians.party, politicians.location 
    FROM votes JOIN politicians ON votes.politicianID = politicians.id 
	GROUP BY politicians.name ORDER  BY count(voterId) desc limit 3`, (err, data)=>{
        console.log(data)
    } )
}

//RELEASE 3 no 5
function release3no5(){
    db.all(`SELECT voters.firstName, voters.lastName, voters.gender, voters.age
    FROM votes JOIN politicians ON votes.politicianId = politicians.id 
	JOIN voters ON votes.voterId = voters.id
	where politicians.name = 'Olympia Snowe'`, (err, data)=>{
        console.log(data)
    } )
}
db.close()