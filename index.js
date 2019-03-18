const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db')

let args = process.argv.slice(2)
let values = ''
let location = ''
let query = ``
let notification = ``

switch (args[1]) {
    case "voter":
        location = 'voters'
        values = `(null, '${args[3]}', '${args[4]}', '${args[5]}', '${args[5]}')`
        break;

    case "politician":
        location = 'politicians'
        values = `(null, '${args[3]}', '${args[4]}', '${args[5]}', '${args[5]}')`
        break;

    case "vote":
        location = 'votes'
        values = `(null, ${args[3], args[4]})`
        break;

    default:
        console.log('list of commands:')
        console.log(` node index insert <table_name> [data]
 node index update <table_name> <id> [data]
 node index delete <table_name> <id>

 Available <table_name> in the database--> voter, vote and politician

 voter data = first name, last name, gender, age
 politician data = name, party, location, grade current`)
        break;
}

switch (args[0]) {
    case "insert":
        switch (args[1]) {
            case "voter":
                location = 'voters'
                values = `(null, '${args[2]}', '${args[3]}', '${args[4]}', '${args[5]}')`
                break;
        
            case "politician":
                location = 'politicians'
                values = `(null, '${args[2]}', '${args[3]}', '${args[4]}', '${args[5]}')`
                break;
        
            case "vote":
                location = 'votes'
                values = `(null, ${args[2], args[3]})`
                break;
        }
        query = `INSERT INTO ${location}  VALUES ${values}`
        notification = `Data name:${args[2]} is successfully inserted!`
        runQuery();
        break;

    case "update":
        switch (args[1]) {
            case "voter":
                location = 'voters'
                values = ` SET firstName ='${args[3]}',
                            lastName ='${args[4]}',
                            gender ='${args[5]}',
                            age = '${args[6]}'`
                break;
        
            case "politician":
                location = 'politicians'
                values = ` SET name ='${args[3]}',
                            party ='${args[4]}',
                            location ='${args[5]}',
                            gradeCurrent = '${args[6]}'`
                break;
        
            case "vote":
                location = 'votes'
                values = `(null, ${args[2], args[3]})`
                break;
        }
        query = `UPDATE ${location} ${values}
                WHERE id=${args[2]}`;
        notification = `Data id ${args[2]} is successfully updated!`
        runQuery()
        break;
    
    case "delete":
        query = `DELETE FROM ${location} WHERE id = ${args[2]}`;
        notification = `Data at id ${args[2]} is successfully deleted!`
        runQuery();
        break;
}

function runQuery () {
    db.run(query, function (err) {
        if (err) throw err;
        console.log(`${notification}`)
    })
}
