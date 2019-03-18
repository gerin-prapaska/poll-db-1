const sqlite3 = require ('sqlite3')
const db = new sqlite3.Database('poll-db.db')

let query1 = `SELECT * FROM Politicians WHERE party = 'R' and grade_current between 9 and 11`
db.each(query1, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query2 = `SELECT count(*) as totalVotes, Politicians.name as name FROM Politicians 
join Votes on Votes.politicianId = Politicians.id
where Politicians.name = 'Olympia Snowe'` 
db.each(query2, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query3 = `SELECT Politicians.name, count(*) as 'totalVotes' FROM Politicians 
join votes on Votes.politicianId = Politicians.id
where Politicians.name like '%Adam%'
group by Politicians.name`
db.each(query3, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query4 = `select  count(*) as 'totalVotes', Politicians.name, Politicians.party, Politicians.location from Politicians
join Votes on Politicians.id = Votes.politicianId
group by Politicians.id
order by totalVotes desc
limit 3`
db.each(query4, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query5 = `select Voters.first_name, Voters.last_name, Voters.gender, Voters.age from Politicians
join Votes on Votes.politicianId = Politicians.id
join Voters on Voters.id = Votes.voterId
where Politicians.name = 'Olympia Snowe'
order by Politicians.name desc`
db.each(query5, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})