const sqlite3 = require('sqlite3')
const table = require('cli-table')
const db = new sqlite3.Database('poll-db-1.db')

const args = process.argv.slice(2)
switch (args[0]) {
    case 'insert':
        //insert format: node index insert tableName val1 val2 val3... similar with table's column format (except ID column)
        //example: node index insert politician "Andy Amir" D IL 11.43
        insert(args.slice(1))
        break;

    case 'update':
        //update format: node index update politician 2 name="Andy Amir" grade_current=34.121
        // table name -> politician, id -> 2, the rest are pairs of column and new values
        update(args.slice(1))
        break;

    case 'delete':
        //delete format: node index delete politician 4
        // 4 -> id of the record
        deleteData(args.slice(1))
        break;

    default:
        break;
}

function getInsertStatement(tableName, datas) {
    let result

    switch(tableName) {
        case 'politician':
            if(!datas || datas.length !== 4) {
                console.log(`table ${tableName} needs 4 parameters!`);
            }
            else {
                let name = datas[0] || null
            let party = datas[1] || null
            let location = datas[2] || null
            let grade = Number(datas[3]) || null

            result = `INSERT INTO ${tableName} VALUES (null, "${name}", "${party}", "${location}", ${grade})`
            }
        break;

        case 'voters':
            if(!datas || datas.length !== 4) {
                console.log(`table ${tableName} needs 4 parameters!`);
            }
            else {
                let fname = datas[0] || null
                let lname = datas[1] || null
                let gender = datas[2] || null
                let age = Number(datas[3]) || null

                result = `INSERT INTO ${tableName} VALUES (null, "${fname}", "${lname}", "${gender}", ${age})`
            }
            
        break;

        case 'votes':
            if(!datas || datas.length !== 2) {
                console.log(`table ${tableName} needs exactly 2 parameters!`);
            }
            else {
                let voter_id = Number(datas[0]) || null
                let politician_id = Number(datas[1]) || null

                result = `INSERT INTO ${tableName} VALUES (null, ${voter_id}, ${politician_id})`
            }

        break;

        default:
        break;
    }

    return result
}

function getUpdateStatement(tableName, id, datas) {
    let result = `UPDATE ${tableName} SET `
    datas.forEach((element, index) => {
        let column = element.split('=')[0].trim()
        let value = element.split('=')[1].trim()
        result += `${column} = "${value}"`
        if(index < datas.length - 1) {
            result += ', '
        }
    });
    

    result += ` WHERE id = ${id}`
    console.log(result);
    return result
}

function getDeleteStatement(tableName, id) {
    let result
    result = `DELETE FROM ${tableName} WHERE id=${id}`
    return result
}

function insert(datas) {
    //datas format: table_name val1 val2 ...
    let tableName = datas[0].toLowerCase()
    datas = datas.slice(1)
    let stmt = getInsertStatement(tableName, datas)
    if(stmt) {
        db.run(stmt, (err) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(`SUCESSS ==> "${stmt}"`)
            }
        })
    }
}

function update(datas) {
    //datas format: <table_name> <id_to_be_updated> col1=data1 col2=data2...
    let tableName = datas[0].toLowerCase()
    let id = Number(datas[1])
    datas = datas.slice(2)

    if(tableName === undefined || tableName === '') {
        console.log('Missing table name!');
    }
    else if(!datas || datas.length < 1) {
        console.log(`Missing column names and values.\nPlease set columns & updated data, format: col1=val1 col2=val2, for example: name="Andy Amir" grade_current=34.121\n`);
    }
    else {
        let stmt = getUpdateStatement(tableName,id, datas)
        db.run(stmt, (err) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(`SUCESSS ==> "${stmt}"`)
            }
        })
    }
}

function deleteData(datas) {
    //datas format: <table_name> <id_tobe_deleted>
    let tableName = datas[0].toLowerCase()
    let id = Number(datas[1])
    if(!id) {
        console.log(`Missing Id to be deleted!\nPlease set the ID number after table name!`);
    }
    else if(datas.slice(1).length > 1) {
        console.log(`Currently only support 1 ID deletions!`)
    }
    else {
        let stmt = getDeleteStatement(tableName, id)
        db.run(stmt, (err) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(`SUCESSS ==> "${stmt}"`)
            }
        })
    }
}