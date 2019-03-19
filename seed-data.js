const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./PollDb.db')
const fs = require('fs')


   const seedPolitician = () =>{
    let Politicians =  fs.readFileSync('politicians.csv','utf8').split("\n").map(polit=>polit.split(","))
    let placeholder = Politicians[0].map(place=>'?').join(",")
    let key = Politicians[0].map(key=>key).join(",")
    let stmt = db.prepare(`insert into Politicians (${key}) values (${placeholder})`)
    let count = 0
    Politicians.map(politician=>{
        if(count>0){
            stmt.run(politician);
        }
        count++         
    })
    stmt.finalize()
   }

   const seedVoters = () =>{     
   let voters = fs.readFileSync('voters.csv','utf8').split("\n").map(voter=>voter.split(","))
   let placeholder = voters[0].map(place=>'?').join(",")
   let key = voters[0].map(key=>key).join(",")
   let stmt = db.prepare(`insert into Voters (${key}) values (${placeholder})`)
   let count = 0 
   voters.map(voter=>{
       if(count>0){
        stmt.run(voter);
           }
       count++           
   })
       stmt.finalize()
   }

   const seedVotes = () =>{     
    let votes = fs.readFileSync('votes.csv','utf8').split("\n").map(vote=>vote.split(","))
    let placeholder = votes[0].map(place=>'?').join(",")
    let key = votes[0].map(key=>key).join(",")
    let stmt = db.prepare(`insert into Votes (${key}) values (${placeholder});`)
    let count = 0 
    votes.map(vote=>{
        if(count>0){
            
         stmt.run(vote);
            }
        count++           
    })
        stmt.finalize()
    }

    const Crud = () =>{
        db.serialize(()=>{
            db.run(`insert into Politicians values (null,'muhammad rifky','R','New York','31457555');`)
            db.run(`update Politicians set name = "muhammad rifky ilyas" where id = 21 `)
            db.run(`delete from Politicians where id = 21`)
        })

    }      

// seedVoters()
// seedPolitician()
// seedVotes()
// Crud()

   


