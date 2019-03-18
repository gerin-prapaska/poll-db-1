const sqlite3 = require ('sqlite3')
const db = new sqlite3.Database('poll-db.db')

let query1 = `select  Politicians.name, Politicians.location, Politicians.grade_current, count(*) as 'totalVotes' from Politicians
join Votes on Politicians.id = Votes.politicianId
where Politicians.grade_current < 9
group by Politicians.id
order by Politicians.grade_current asc`
db.each(query1, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query2 = `select * from Votes
join Voters on Votes.voterId = Voters.id
join (select Politicians.id as 'politicianId', count(*) as 'totalVotes', Politicians.name as 'politiciansName' from Politicians
join Votes on Votes.politicianId = Politicians.id
join Voters on Voters.id = Votes.voterId
group by Politicians.id
order by totalVotes desc
limit 3) as 'subquery'
on Votes.politicianId = subquery.politicianId
order by totalVotes desc`
db.each(query2, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})

let query3 = `select Voters.first_name || " " || Voters.last_name as 'nama', Voters.gender, Voters.age, count(*) as 'totalV' from Votes
join Voters on Votes.voterId = Voters.id
group by nama
having count(*)  > 1
order by count(*) desc`
db.each(query2, [], function (err, data) {
    if (err) console.log(err)
    else {
       console.table(data)
    }
})