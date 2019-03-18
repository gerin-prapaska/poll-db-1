const setup = require("./setup.js");
const seedData = require("./seed-data.js");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./poll.db");
let command = process.argv.slice(2);

//setup();
//seedData();
if(command.length != 0){
    switch(command[0]){
        case "insert":{
            if(command[1]==="politicians"){
                createPolitician(command[2],command[3],command[4],command[5])
            }else if(command[1]==="voters"){
                createVoter(command[2],command[3],command[4],command[5])
            }else if(command[1]==="votes"){
                createVote(command[2],command[3])
            }else{
                console.log("Invalid table name")
            }
            break;
        }
        case "update":{
            updateData(command[1],command[2],command[3],command[4]);
            break;
        }
        case "delete":{
            deleteData(command[1],command[2]);
            break;
        }
        default:
            console.log("Invalid command")
    }
}else{

    db.serialize(function(){
        let query1=
        `SELECT name,party,grade_current FROM politicians
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`;
    
        let query2 = 
        `
        SELECT count(*) as 'totalVote', politicians.name from votes join politicians on 
        votes.politician_id = politicians.id 
        where politician_id = (
        select id from politicians where 
        politicians.name = 'Olympia Snowe')
        `;
        let query3 = 
        `SELECT politicians.name, count(*) as 'totalVote' from votes join politicians on 
        votes.politician_id = politicians.id 
        where politician_id in (
        select id from politicians where 
        politicians.name like '%adam%')
        group by politicians.name`;
        let query4 = 
        `SELECT count(*) as 'totalVote', politicians.name, politicians.party, politicians.location
        from votes join politicians on 
        votes.politician_id = politicians.id
        group by politicians.name
        order by 1 desc
        limit 3`;
        let query5 = `select first_name, last_name, gender, age from votes
        join voters on voters.id = votes.voter_id
        where votes.politician_id = (
        select id from politicians 
        where politicians.name = "Olympia Snowe");`
    
        let queries = [query1,query2,query3,query4,query5]
        for(let i = 0; i< queries.length;i++){
                db.all(queries[i],function(err,row){
                console.log(`===Soal ${i+1}===`)
                if(err) {console.log(err)}
                else{
                    console.log(row);
                }
            })        
        }
    })
}
//release 3


function createPolitician(name, party, location, grade_current){
    let query = 
    `INSERT INTO politicians (name, party, location, grade_current)
    VALUES ('${name}','${party}','${location}',${grade_current})`
    db.run(query,function(err){
        if(err) console.log(err);
        else{
            console.log("Successfully add data to politicians table")
        }
    })
}

function createVoter(firstName, lastName, gender, age){
    let query = 
    `INSERT INTO voters (first_name, last_name, gender, age)
    VALUES ('${firstName}','${lastName}','${gender}',${age});`
    db.run(query,function(err){
        if(err) console.log(err);
        else{
            console.log("Successfully add data to voters table")
        }
    })
}

function createVote(voterId, politicianId){
    let query = 
    `INSERT INTO votes (voter_id,politician_id)
    VALUES (${voterId},${politicianId})`
    db.run(query,function(err){
        if(err) console.log(err);
        else{
            console.log("Successfully add data to votes table")
        }
    })
}

function updateData(tableName,columnName,value,id)
{
    let query = 
    `UPDATE ${tableName}
    SET ${columnName} = ${value}
    WHERE id = ${id}
    `
    db.run(query,function(err){
        if(err) console.log(err);
        else{
            console.log("Successfully update data with id "+id)
        }
    })
}

function deleteData(tableName,id)
{
    let query = 
    `DELETE FROM ${tableName}
    WHERE id = ${id}
    `
    db.run(query,function(err){
        if(err) console.log(err);
        else{
            console.log("Successfully delete data with id "+id)
        }
    })
}