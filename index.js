const db    = require('./setup.js');

function insertPolitician(name , party , location, grade_current){
db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ('${name}', '${party}', '${location}', ${grade_current})`, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('politisi baru masuuk')
    }
})
}

function insertVoters(firstName, lastName, gender, age){
    db.run(`INSERT INTO voters (first_name,last_name,gender,age) 
    VALUES (?, ?, ?, ?)`, [firstName, lastName, gender, age], function(err){
        if(err){
            console.log(err)
        }else {
            console.log('voters masuuk')
        }
    })

}
function updateVoters(id, firstName , lastName, gender, age){
    db.run(`UPDATE voters SET first_name = '${firstName}', last_name = '${lastName}', gender = '${gender}', age = '${age}' WHERE id = '${id}' AND id > 150`, function(err){
        if(err){
            console.log(err)
        }else {
            console.log('voters update')
        }
    })
}

function updatePoliticians(id, name , party, location, grade_current){
    db.run(`UPDATE politicians SET name = '${name}', party = '${party}', location = '${location}', grade_current = '${grade_current}' WHERE id = '${id}' AND id > 20`, function(err){
        if(err){
            console.log(err)
        }else {
            console.log('politicians update')
        }
    })
}

function deleteVoters(id){
    db.run(`DELETE FROM voters WHERE id = ${id} AND id > 150`, function(err) {
        if(err){
            console.log(err)
        }else{
            console.log('voters deleted')
        }
    })

}

function deletePoliticians(id){
    db.run(`DELETE FROM politicians WHERE id = ${id} AND id > 20`, function(err) {
        if(err){
            console.log(err)
        }else{
            console.log('politicians deleted')
        }
    })

}

function case1(){
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party= 'R' AND grade_current BETWEEN 9 AND 11;`, function(err, getRandRange){
        console.log(getRandRange)
    })
}

function case2(){
    db.all(`SELECT count(votes.id_politicians) AS 'totalVote', politicians.name FROM votes JOIN politicians ON votes.id_politicians = politicians.id WHERE politicians.name='Olympia Snowe'`, function(err, getSnow){
        console.log(getSnow)
    })
}

function case3(){
    db.all(`SELECT politicians.name, count(votes.id_politicians) AS 'totalVote' FROM votes JOIN politicians ON votes.id_politicians = politicians.id WHERE politicians.name LIKE 'adam %'  GROUP BY politicians.name`, function(err, getAdam){
        console.log(getAdam)

    })
}

function case4(){
    db.all(`SELECT count(votes.id_politicians) AS 'totalVote', politicians.name, politicians.party, politicians.location FROM votes JOIN politicians ON votes.id_politicians = politicians.id GROUP BY politicians.name  ORDER BY count(votes.id_politicians) DESC LIMIT 3`, function(err, get3Polticians){
        console.log(get3Polticians)
    })
}

function case5(){
    db.all(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM voters JOIN votes ON voters.id = votes.id_voters WHERE votes.id_politicians = 17`, function(err, getVoteSnow){
        console.log(getVoteSnow)
    })
}




// insertVoters('helga', 'S', 'male', 19)
// insertPolitician('bambang', 'R', 'LA', 11.5)
// updateVoters(151, 'sri', 'hartati', 'female', 45)
// updatePoliticians(21, 'heru', 'R', 'IL', 12,5)
// deleteVoters(152)
// deletePoliticians(21)
case5()