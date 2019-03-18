const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll.db',
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the in-memory poll.db database.");
    }
);
const fs = require('fs')

fs.readFile('politicians.csv', 'utf8',
    (err, data) => {
        console.log('seeding politicians in progress...');
        if (err) {
            console.log(err.message);
        } else {
            db.serialize(() => {
                const politicians = data.toString().split('\n').slice(1).map(el => el.split(','));
                let stmt = db.prepare("INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)");
                politicians.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]));
                stmt.finalize();
            })
            fs.readFile('voters.csv', 'utf8',
                (err, data) => {
                    console.log('seeding voters in progress...');
                    if (err) {
                        console.log(err.message);
                    } else {
                        db.serialize(() => {
                            const voters = data.toString().split('\n').slice(1).map(el => el.split(','));
                            let stmt = db.prepare("INSERT INTO Voters VALUES (null, ?, ?, ?, ?)");
                            voters.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]));
                            stmt.finalize();
                        })
                        fs.readFile('votes.csv', 'utf8',
                            (err, data) => {
                                console.log('seeding votes in progress...');
                                if (err) {
                                    console.log(err.message);
                                } else {
                                    db.serialize(() => {
                                        const votes = data.toString().split('\n').slice(1).map(el => el.split(','));
                                        let stmt = db.prepare("INSERT INTO Votes VALUES (null, ?, ?)");
                                        votes.forEach(pol => stmt.run(pol[0], pol[1]));
                                        stmt.finalize();
                                    })
                                    db.close(
                                        (err) => {
                                            if (err) {
                                                console.log(err.message);
                                            } else {
                                                console.log('seeding politicians succed!');
                                                console.log('seeding voters succed!');
                                                console.log('seeding votes succed!');
                                                console.log("Close the database connection.");
                                            }
                                        }
                                    );
                                }
                            }
                        )
                    }
                }
            )
        }
    }
)

/*
fs.readFile('./politicians.csv', 'utf-8',
    (err, dataPoliticians) => {
        if (err) {
            console.log(err);
        }
        else {
            dataPoliticians = dataPoliticians.split('\n')
            db.serialize(() => {
                for (let i = 1; i < dataPoliticians.length; i++) {
                    let qInsertPoliticians = `INSERT INTO Politicians (name, party, location, grade_current)
                VALUES("${dataPoliticians[i].split(',')[0]}", "${dataPoliticians[i].split(',')[1]}", "${dataPoliticians[i].split(',')[2]}", ${dataPoliticians[i].split(',')[3]})`;
                    db.run(qInsertPoliticians);
                }

            })
        }
    })


fs.readFile('./voters.csv', 'utf-8',
    (err, dataVoters) => {
        if (err) {
            console.log(err);
        }
        else {
            dataVoters = dataVoters.split('\n')
            db.serialize(() => {
                for (let i = 1; i < dataVoters.length; i++) {
                    let qInsertVoters = `INSERT INTO Voters (first_name, last_name, gender, age)
                VALUES("${dataVoters[i].split(',')[0]}", "${dataVoters[i].split(',')[1]}", "${dataVoters[i].split(',')[2]}", ${dataVoters[i].split(',')[3]})`;
                    db.run(qInsertVoters);
                }

            })
        }
    })

fs.readFile('./votes.csv', 'utf-8',
    (err, dataVotes) => {
        if (err) {
            console.log(err);
        }
        else {
            dataVotes = dataVotes.split('\n')
            db.serialize(() => {
                for (let i = 1; i < dataVotes.length; i++) {
                    let qInsertVotes = `INSERT INTO Votes (voter_id, politician_id)
                VALUES(${dataVotes[i].split(',')[0]}, ${dataVotes[i].split(',')[1]})`;
                    db.run(qInsertVotes);
                }

            })
        }
    })
*/
/*
====
SYNC
====

const politicians = fs.readFileSync('politicians.csv', 'utf8').toString().split('\n').slice(1).map(el => el.split(','))
db.serialize(() => {
    let stmt = db.prepare("INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)");
    politicians.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]))
    stmt.finalize();
    console.log('seeding politicians succed!');
})

const voters = fs.readFileSync('voters.csv', 'utf8').toString().split('\n').slice(1).map(el => el.split(','));
db.serialize(() => {
    let stmt = db.prepare("INSERT INTO Voters VALUES (null, ?, ?, ?, ?)");
    voters.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]));
    stmt.finalize();
    console.log('seeding voters succed!');
})

const votes = fs.readFileSync('votes.csv', 'utf8').split('\n').slice(1).map(el => el.split(','));
db.serialize(() => {
    let stmt = db.prepare("INSERT INTO Votes VALUES (null, ?, ?)");
    votes.forEach(pol => stmt.run(pol[0], pol[1]));
    stmt.finalize();
    console.log('seeding votes succed!');
})
*/


/*
=====
ASYNC
=====

fs.readFile('politicians.csv', 'utf8',
    (err, data) => {
        console.log('seeding politicians in progress...');
        if (err) {
            console.log(err.message);
        } else {
            db.serialize(() => {
                const politicians = data.toString().split('\n').slice(1).map(el => el.split(','));
                let stmt = db.prepare("INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)");
                politicians.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]));
                stmt.finalize();
                console.log('seeding politicians succed!');
            })
            fs.readFile('voters.csv', 'utf8',
                (err, data) => {
                    console.log('seeding voters in progress...');
                    if (err) {
                        console.log(err.message);
                    } else {
                        db.serialize(() => {
                            const voters = data.toString().split('\n').slice(1).map(el => el.split(','));
                            let stmt = db.prepare("INSERT INTO Voters VALUES (null, ?, ?, ?, ?)");
                            voters.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]));
                            stmt.finalize();
                            console.log('seeding voters succed!');
                        })
                        fs.readFile('votes.csv', 'utf8',
                            (err, data) => {
                                console.log('seeding votes in progress...');
                                if (err) {
                                    console.log(err.message);
                                } else {
                                    db.serialize(() => {
                                        const votes = data.toString().split('\n').slice(1).map(el => el.split(','));
                                        let stmt = db.prepare("INSERT INTO Votes VALUES (null, ?, ?)");
                                        votes.forEach(pol => stmt.run(pol[0], pol[1]));
                                        stmt.finalize();
                                        console.log('seeding votes succed!');
                                    })
                                    db.close();
                                }
                            }
                        )
                    }
                }
            )
        }
    }
)
*/



/*

// const politicians = fs.readFileSync('politicians.csv', 'utf8').toString().split('\n').slice(1).map(el => el.split(','));
// // console.log(politicians)

// let stmt = db.prepare("INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)");
// politicians.forEach(pol => stmt.run(pol[0], pol[1], pol[2], pol[3]))
// stmt.finalize();

let placeHolder = [];
let temp = politicians.slice(1).map((el => el.split(',')));
temp.forEach(el =>placeHolder.push(`(${el[0].split(' ')[0]},${el[0].split(' ')[1]}${el[1]},${el[2]},${el[3]})`))
console.log(placeHolder)
OUTPUT:
[ '(Aaron,SchockR,IL,11.5362423)',
  '(Adam,KinzingerR,IL,8.995621754)',
  '(Adam,SchiffD,LA,13.0347375)',
  ...]
*/

