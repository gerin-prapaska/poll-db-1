const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polling.db')
const args = process.argv.slice(2)
var Table = require('cli-table')

switch (args[0]){
    case "insert":
        switch (args[1]){
            case "politicians":
                insertPoliticians()
                break;
            case "voters":
                insertVoters()
                break;
            case "votes":
                break;
            default:
                help()
                break;
        }
        break;
    case "update":
        switch (args[1]){
            case "politicians":
                updateIdPoliticians()
                break;      
            case "voters":
                updateIdVoters()
                break;
            default:
                help()
                break;
        }
        break;
    case "delete":
        deleteId()
        break;
    case "read":
        readTable()
        break;
    case "release3":
        release3()
        break;
    default:
        help()
        break;
}


function insertPoliticians(){
    const query = `INSERT INTO ${args[1]} (name,party,location,gradeCurrent)
    VALUES ('${args[2]}','${args[3]}','${args[4]}','${args[5]}')`

    db.run(query,function(err){
        if(err){
            console.log("Failed create,please cek your input")
            console.log("node insert.js <table_name> <name> <party> <location> <gradeCurrent>")

        }else{
            console.log("sukses create ")
        }
    })
}

function insertVoters(){
    const query = `INSERT INTO ${args[1]} (first_name,last_name,gender,age)
    VALUES ('${args[2]}','${args[3]}','${args[4]}','${args[5]}')`

    db.run(query,function(err){
        if(err){
            console.log("gagal create")
        }else{
            console.log("sukses create ")
        }
    })
}

function deleteId(){
    const query = `DELETE FROM ${args[1]} WHERE id = ${args[2]}`
    db.run(query,function(err){
        if(err){
            console.log("Err delete")
        }else{
            console.log("sukses delete")
        }
    })
}

function updateIdPoliticians(){
    const query = `UPDATE ${args[1]}
                    SET name = '${args[3]}',
                        party = '${args[4]}',
                        location = '${args[5]}',
                        gradeCurrent = '${args[6]}'
                WHERE id = ${args[2]}`;
    db.run(query,function(err){
        if(err){
            console.log("Err update")
        }else{
            console.log("sukses update")
        }
    })
}

function updateIdVoters(){
    const query = `UPDATE ${args[1]}
                    SET first_name = '${args[3]}',
                        last_name = '${args[4]}',
                        gender = '${args[5]}',
                        age = '${args[6]}'
                WHERE id = ${args[2]}`;
    db.run(query,function(err){
        if(err){
            console.log("Err update")
        }else{
            console.log("sukses update")
        }
    })
}

function release3(){
    db.all(`SELECT name,party,gradeCurrent FROM politicians 
            WHERE gradeCurrent BETWEEN 9 AND 11 AND party = "R"`,function(err,callback){
            if(err){
                console.log("please cek your input")
            }else{
                console.log("---------------Release-3-1----------------------------")
                console.log(callback)
            }
    })
    db.all(`SELECT COUNT(*) AS totalVote,name FROM votes
            JOIN politicians
            WHERE name = "Olympia Snowe" AND politicianId = 17`,function(err,callback){
            if(err){
                console.log("please cek your input")
            }else{
                console.log("---------------Release-3-2----------------------------")
                console.log(callback)
            }
    })
    db.all(`SELECT name, COUNT(votes.voterId) AS totalVote FROM votes
            JOIN politicians ON politicians.id = votes.politicianId
            WHERE name LIKE "Adam%" GROUP BY name`,function(err,callback){
            if(err){
                console.log("please cek your input")
            }else{
                console.log("---------------Release-3-3--------------------------")
                console.log(callback)
            }
    })
    db.all(`SELECT COUNT(voterId) AS totalVote, name, party, location FROM politicians
            JOIN votes ON politicians.id = politicianId
            GROUP BY name
            ORDER BY totalVote DESC
            LIMIT 3`,function(err,callback){
            if(err){
                console.log("please cek your input")
            }else{
                console.log("----------------Release-3-4-------------------------")
                console.log(callback)
            }
    })
    db.all(`SELECT first_name, last_name, gender, age FROM votes
            JOIN voters ON votes.voterId = voters.id
            WHERE votes.politicianId = 17`,function(err,callback){
            if(err){
                console.log("please cek your input")
            }else{
                console.log("----------------Release-3-5-------------------------")
                console.log(callback)
            }
    })
}

function help(){
    console.log("-------------------HELP------------------")
    console.log("node index.js insert <table_name> <value> <value> <value> <value>")
    console.log("node index.js update <table_name> <id>")
    console.log("node index.js delete <table_name> <id>")
    console.log("node index.js read <table_name>")
    console.log("node index.js release3")
    console.log("-----------------------------------------")
}

function readTable(){
    db.all(`SELECT * FROM ${args[1]}`,function(err,callback){
        if(err){
            console.log("please cek your input")
        }else{
            console.log(callback)
        }
    })
}
