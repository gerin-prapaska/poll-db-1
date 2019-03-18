const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function create(tableName, data) {
    let keys = Object.keys(data)
    let values = Object.values(data)
    let query = `INSERT INTO ${tableName} (${keys.join(',')})
                 VALUES(${keys.map(() => '?').join(',')})`
    db.run(query, values, function (err) { (err) ? console.log(err.message) : console.log(`ADDED NEW DATA TO ${tableName}`) })
}

//CREATE POLITICIAN
create('politicians', {
    name: 'Reyhan Huditama',
    party: 'Golkar',
    location: 'JKT',
    grade_current: 10.50
})

//CREATE VOTER
create('voters', {
    first_name: 'Martin',
    last_name: 'Suhendra',
    gender: 'Male',
    age: 32
})

//CREATE VOTE
create('votes', {
    voterId: 151,
    politicianId: 21
})