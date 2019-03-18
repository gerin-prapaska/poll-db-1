const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');
const args = process.argv.slice(2)
const dataArgs = args.slice(2)

let createData = function (table, arrArgs) {
    if (table === "politicians") {
        db.serialize(function () {
            let statement = db.prepare(`INSERT INTO politicians VALUES(null,?,?,?,?)`)
            statement.run(arrArgs)
            statement.finalize(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`data berhasil berhasil di tambahkan`)
                }
            })
        })
    } else if (table === "voters") {
        db.serialize(function () {
            let statement = db.prepare(`INSERT INTO voters VALUES(null,?,?,?,?)`)
            statement.run(arrArgs)
            statement.finalize(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`data berhasil dimasukan ke database`)
                }
            })
        })
    } else {
        db.serialize(function () {
            let statement = db.prepare(`INSERT INTO votes VALUES(null,?,?)`)
            statement.run(arrArgs)
            statement.finalize(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`data berhasil dimasukan ke database`)
                }
            })
        })
    }
}

// id =  arrArgs[0]
let updateData = function (table, arrArgs) {
    // console.log(table, arrArgs)

    if (table === "politicians") {
        let statement = `UPDATE politicians 
       SET name = '${arrArgs[1]}',
           party ='${arrArgs[2]}',
           location ='${arrArgs[3]}',
           grade_current = '${arrArgs[4]}'
           WHERE id = '${arrArgs[0]}'`;

        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di update")
            }
        })
    } else if (table === "voters") {
        let statement = `UPDATE voters 
        SET first_name = '${arrArgs[1]}',
            last_name ='${arrArgs[2]}',
            gender ='${arrArgs[3]}',
            age = '${arrArgs[4]}'
            WHERE id = '${arrArgs[0]}'`;

        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di update")
            }
        })
    } else {
        let statement = `UPDATE votes
        SET voterId = '${arrArgs[1]}',
        politicianId ='${arrArgs[2]}',
            WHERE id = '${arrArgs[0]}'`;

        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di update")
            }
        })
    }
}

let deleteData = function(table, arrArgs){
    if (table === "politicians") {
        const statement = `DELETE FROM politicians WHERE id = '${arrArgs[0]}'`
        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di Hapus")
            }
        })
    } else if (table === "voters") {
        const statement = `DELETE FROM voters WHERE id = '${arrArgs[0]}'`
        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di Hapus")
            }
        })
    } else {
        const statement = `DELETE FROM votes WHERE id = '${arrArgs[0]}'`
        db.run(statement, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("data berhasil di Hapus")
            }
        })
    }
} 


switch (args[0]) {
    case "create":
        createData(args[1], dataArgs)
        break;
    case "update":
        updateData(args[1], dataArgs)
        break;
    case "delete":
        deleteData(args[1], dataArgs)
    break;
    default:
        break;
}