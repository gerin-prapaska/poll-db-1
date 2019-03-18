const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../poll.db')

//find All Politician
const dynamicFindAll = (tablename, option) =>  {
    let query = `SELECT * FROM ${tablename}`
    let [field, value] = []
    if (option) {
       [field, value] = option
       query += ` WHERE ${field} = ?`
    }
    db.all(query, null || value, (err, datas) => { 
        (err) ? console.log(`failed to fetch data, ${err}`) : console.log(datas)
      })
}

const findOne = (tablename, field, value) => {
    let query = `SELECT * FROM ${tablename} WHERE ${field} = ?`
    db.get(query, value, (err, data) => {
        (err) ? console.log(err) : console.log(data)
    })
}

dynamicFindAll('Politicians', ['party', 'R'])

module.exports = { dynamicFindAll, findOne }

// dynamicFindAll('Politicians')
// dynamicFindAll('Politicians', ['location','LA'])

// dynamicFindAll('Voters')
// dynamicFindAll('Votes')

// findOne('Politicians', 'id', 1)