const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('poll-db-1.db')
var Table = require('cli-table');
 

function task1() {
    var table = new Table({
        head: ['Name', 'Party','Current Grade']
      , colWidths: [40, 10, 20]
    });

    let query = `SELECT name, party, grade_current FROM politicians WHERE party='R' AND grade_current BETWEEN 9 AND 11`
    db.serialize(() =>{
        db.all(query, (err, datas) => {
            if(err) {
                console.log(err);
            }
            else {
                datas.forEach(element => {
                    table.push([element.name, element.party, element.grade_current])
                });

                console.log(table.toString());
            }
        })
    })
}

function task2() {
    var table = new Table({
        head: ['Total Vote', 'Name']
      , colWidths: [15, 30]
    });

    let query = `select COUNT(*) AS total_vote, politicians.name AS name FROM politicians, votes 
                ON politicians.id = votes.politician_id AND politicians.name = "Olympia Snowe"`
    db.serialize(() =>{
        db.all(query, (err, datas) => {
            if(err) {
                console.log(err);
            }
            else {
                datas.forEach(element => {
                    table.push([element.total_vote, element.name])
                });

                console.log(table.toString());
            }
        })
    })
}

function task3() {
    var table = new Table({
        head: ['Name', 'Total Vote']
      , colWidths: [25, 12]
    });

    let query = `SELECT politicians.name, COUNT(*) AS total_vote FROM politicians, votes 
                WHERE politicians.id = votes.politician_id
                AND politicians.name like '%Adam%'
                GROUP BY name`
    db.serialize(() =>{
        db.all(query, (err, datas) => {
            if(err) {
                console.log(err);
            }
            else {
                datas.forEach(element => {
                    table.push([element.name, element.total_vote])
                });

                console.log(table.toString());
            }
        })
    })
}

function task4() {
    var table = new Table({
        head: ['Total Vote', 'Name', 'Party', 'Location']
      , colWidths: [12,20,8,10]
    });

    let query = `SELECT COUNT(*) AS total_vote, name, party, location FROM politicians, votes
                WHERE politicians.id = votes.politician_id
                GROUP BY name
                ORDER BY total_vote desc
                LIMIT 3`
    db.serialize(() =>{
        db.all(query, (err, datas) => {
            if(err) {
                console.log(err);
            }
            else {
                datas.forEach(element => {
                    table.push([element.total_vote, element.name, element.party, element.location])
                });

                console.log(table.toString());
            }
        })
    })
}

function task5() {
    var table = new Table({
        head: ['First Name', 'Last Name', 'Gender', 'Age']
      , colWidths: [13,13,10,8]
    });

    let query = `SELECT first_name, last_name, gender, age FROM votes, voters
                WHERE voters.id = votes.voter_id AND 
                votes.politician_id = (SELECT id FROM politicians WHERE name = 'Olympia Snowe')`
    db.serialize(() =>{
        db.all(query, (err, datas) => {
            if(err) {
                console.log(err);
            }
            else {
                datas.forEach(element => {
                    table.push([element.first_name, element.last_name, element.gender, element.age])
                });

                console.log(table.toString());
            }
        })
    })
}

task1();
task2();
task3();
task4();
task5();

db.close((err) => {
    if(err) throw err
    else {
        console.log('DB close');
    }
})