const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll2.db')

db.all  (`SELECT name,party,grade_current FROM politician
          WHERE grade_current < 11
            AND grade_current > 9
            AND party = "R"
          ORDER BY grade_current`
          ,function(err,data){
                if (err){console.log(err)}
                else {console.table(data)}
            })

db.all  (`SELECT COUNT(*) AS totalVote, politician.name
          FROM voter_politician
          JOIN politician
          ON politician.id = voter_politician.politicianId
          WHERE politicianId = 17`
          ,function(err,data){
              if (err){console.log(err)}
              else {console.table(data)}
          })

db.all  (`SELECT politician.name,COUNT(*) AS totalVote
          FROM politician
          JOIN voter_politician
          ON politician.id = voter_politician.politicianId
          GROUP BY politician.name
          HAVING politician.name LIKE "Adam %"`
          ,function(err,data){
              if (err){console.log(err)}
              else {console.table(data)}
          })

db.all  (`SELECT COUNT(*) AS totalVote, politician.name, politician.party, politician.lokasi
          FROM politician
          JOIN voter_politician
          ON politician.id = voter_politician.politicianId
          GROUP BY politician.name
          ORDER BY totalVote DESC
          LIMIT 3`
          ,function(err,data){
              if (err){console.log(err)}
              else{console.table(data)}
          })

db.all  (`SELECT first_name,last_name,gender,age
          FROM voters
          JOIN voter_politician
          ON voters.id = voter_politician.voterId
          WHERE politicianId = 17`
          ,function(err,data){
              if (err){console.log(err)}
              else{console.table(data)}
          })