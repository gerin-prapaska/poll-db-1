const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const readline = require('readline')
const table = require('cli-table')
// const faker = require('faker')
const db = new sqlite3.Database('poll.db');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// console.log(faker.name.firstName());
db.on('error', err => View.inform(err))
class View {
    static error(err) {
        console.log(err)
    }
    static inform(info) {
        console.log(info)
    }
    static list(result) {
        console.log(result)
    }
    static tableResult(result) {
        // console.log(result);
        console.table(result)
    }
}
class Model {
    // constructor(data) {
    //     this.initAndSeed()
    // }
    static error(err) {
        View.inform(err)
        return this;
    }
    static get dbModel() {
        return {
            politicians: ['name', 'party', 'location', 'grade_current'],
            voters: ['first_name', 'last_name', 'gender', 'age'],
            votes: ['voterId', 'politicianId']
        }
    }


    static initAndSeed(parameters) {
        db.serialize(function () {
            db.run(`PRAGMA foregin_key = on`);
            db.run(`DROP TABLE politicians; DROP TABLE votes,DROP TABLE voters;`);

            db.run(`CREATE TABLE IF NOT EXISTS politicians (id INTEGER PRIMARY KEY, name TEXT NOT NULL,  party TEXT NOT NULL, location TEXT, grade_current REAL)`);
            db.run(`CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, gender TEXT NOT NULL, age INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY, 
                voterId INTEGER references voters(id) ON DELETE CASCADE, 
                politicianId INTEGER REFERENCES politicians(id) ON DELETE CASCADE)`);


            let stmt = db.prepare(`insert into politicians(name,party,location,grade_current) values (?,?,?,?) `)
            let data = fs.readFileSync(`./politicians.csv`, `utf8`).split('\n').slice(1).map(txt => txt.split(','))
            // console.log(data);
            data.forEach(item => {
                stmt.run(item[0], item[1], item[2], parseFloat(item[3]))
            });
            // stmt.finalize();

            //voters
            stmt = db.prepare(`insert into voters(first_name,last_name,gender,age) values (?,?,?,?) `)
            data = fs.readFileSync(`./voters.csv`, `utf8`).split('\n').slice(1).map(txt => txt.split(','))


            data.forEach(item => {
                stmt.run(item[0], item[1], item[2], parseInt(item[3]))
            });
            stmt = db.prepare(`insert into votes (voterId,politicianId) values (?,?) `)
            data = fs.readFileSync(`./votes.csv`, `utf8`).split('\n').slice(1).map(txt => txt.split(','))

            data.forEach(item => {
                stmt.run(item[0], item[1])
            });
            stmt.finalize();
        });

        parameters.cb();
    }
    static runQuery(parameters) {
        let sql = parameters.param.join(' ')
        console.log(sql);
        db.all(sql, function (err, rows) {
            if (err) parameters.cb(undefined, undefined, err)
            else parameters.cb('~: ', View.tableResult, rows)
        })
    }

    static insert(parameters) {
        let tTableName = parameters.param[0]
        console.log(parameters)
        let tableName = Model.dbModel[tTableName] || false
        // debugger;
        let inputArray = tableName && parameters.param.slice(1).length == Model.dbModel[tTableName].length && parameters.param.slice(1)
        console.log(inputArray, tableName)
        if (tableName && inputArray) {
            tableName = tTableName;
            let stmtx;
            switch (tableName) {
                case 'politicians':
                    stmtx = `insert into politicians(name,party,location,grade_current) values (?,?,?,?)`
                    db.run(stmtx, inputArray, Model.dataManipulationHandler)
                    break;
                case 'voters':
                    stmtx = `insert into voters(first_name,last_name,gender,age) values (?,?,?,?) `
                    db.run(stmtx, inputArray, Model.dataManipulationHandler)
                    break;
                case 'votes':
                    stmtx = `insert into votes (voterId,politicianId) values (?,?) `
                    db.run(stmtx, inputArray, Model.dataManipulationHandler)
                    break;
            }
        } else {
            parameters.cb(undefined, undefined,
                `check your tablename or input, syntax:
                insert <table name> <column 1 new data> ......
            `);
        }
    }

    static update(parameters) {
        console.log(parameters)
        let tableName = Model.dbModel[parameters.param[0]] || false
        let input = tableName && parameters.param.slice(1).length == Model.dbModel[parameters.param[0]].length+1 && parameters.param.slice(1)
        console.log(input)
        if (tableName && input) {
            tableName = parameters.param[0]
            let stmtx;
            
            switch (tableName) {
                case 'politicians':
                    stmtx = `update politicians set name = ?, party =?, location=?, grade_current = ? where id = ?`
                    db.run(stmtx, [input[1],input[2],input[3],input[0]], Model.dataManipulationHandler)
                    break;
                case 'voters':
                    stmtx = `update voters set first_name = ?, last_name = ?, gender=?, age = ? where id = ?`
                    db.run(stmtx, [input[1],input[2],input[3],input[0]], Model.dataManipulationHandler)
                    break;
                case 'votes':
                    stmtx = `update votes set voterId = ?, politiciansId=? where id = ?`
                    db.run(stmtx, [input[1],input[2],input[0]], Model.dataManipulationHandler)
                    break;
            }
        } else {
            Model.wayHome(undefined, undefined,
                `check your tablename or input, syntax: 
                update <table name> <id> <new values> <new values> <new values>... 
                `);
        }
    }

    static deleteRow(parameters) {

        let tableName = Model.dbModel[parameters.param[0]] || false
        let input = tableName && parameters.param.slice(1).length == 1 && parameters.param.slice(1)

        if (tableName && input) {
            tableName = parameters.param[0]
            let stmtx;
                switch (tableName) {
                case 'politicians':
                    stmtx = `delete from politicians  where id = ?`
                    db.run(stmtx, input, Model.dataManipulationHandler)
                    break;
                case 'voters':
                    stmtx = `delete from voters  where id = ?`
                    db.run(stmtx, input, Model.dataManipulationHandler)
                    break;
                case 'votes':
                    stmtx =`delete from votes  where id = ?`
                    db.run(stmtx, input, Model.dataManipulationHandler)
                    break;
            }
        } else {
            Model.wayHome(undefined, undefined,
                `check your tablename or input, syntax:
                delete <table name> <id>.....
                `);
        }
    }
    static get wayHome() {
        return Control.route
    }
    static dataManipulationHandler(err) {
        if (err) Model.wayHome(undefined, undefined, err)
        else Model.wayHome('~: ', undefined, `new index ${this.lastId}, ${this.changes} row(s) affected`)
    }
    // static simpleViewHandler(err, rows, parameters) {
    static specialCase(parameters){
        let queries= {
            1:`select * from politicians where grade_current BETWEEN 9 and 11 and party like 'R'`,
            2:`select count(*), politicians.name from politicians join votes on politicians.id == votes.politicianId group by politicians.name having name = 'Olympia Snowe'`,
            3:`select politicians.name,  count(*) from politicians join votes on politicians.id == votes.politicianId group by politicians.name having name like 'Adam %'`,
            4:`select count(*) as totalvote, politicians.name, politicians.party,politicians.location  from politicians join votes on politicians.id == votes.politicianId group by politicians.name ORDER by	totalVote desc limit 3`,
            5:`SELECT voters.first_name, voters.last_name,voters.gender,voters.age, votes.politicianId from voters join votes on voters.id = votes.voterId where votes.politicianId = (select id from politicians where politicians.name like 'Olympia Snowe')`
        }
        let whatToRun = parameters.param[0] || 0
        if(!whatToRun) parameters.cb(undefined,undefined,'wrong number, only 1-5')
        db.all(queries[whatToRun], function (err, rows) {
            if (err) parameters.cb(undefined, undefined, err)
            else parameters.cb('~: ', View.tableResult, rows)
        })
    }

}



//also the controller


class Control {
    static get router() {
        return {
            insert: Model.insert,
            update: Model.update,
            delete: Model.deleteRow,
            view: Model.view,
            seed: Model.initAndSeed,
            run: Model.runQuery,
            special:Model.specialCase
        }
    }


    static route(question = '~:', viewer = View.inform, data = 'welcome to the poll') {
        viewer(data);
        rl.question(question, input => {
            let parameters = input.split(' ');
            let command = parameters[0];
            parameters = {
                cb: Control.route,
                param: parameters.slice(1)
                    // .map(x => x.toLowerCase())
            };

            if (!command) Control.route(undefined, undefined, '');
            else if (command == 'exit') db.close(), rl.close();
            else if (!Control.router[command]) Control.route('please type valid command: ');
            else {
                Control.router[command](parameters);
            }
        })
    }
}


Control.route();