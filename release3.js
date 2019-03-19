const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./PollDb.db')
const Rilis3 = () => {
    db.serialize(()=>{
        let query = `select * from politicians where grade_current > 9  and grade_current < 11 and party = 'R'`
        db.all(query,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

        let query2 = `select count(*) as totaVotes, name from votes join Politicians on votes.politicianId = Politicians.id where Politicians.name = "Olympia Snowe"`
        db.all(query2,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

        let query3 = `select name,count(*) as totaVote from Politicians join Votes on Politicians.id = Votes.politicianId where name like 'Adam%' group by name`
        db.all(query3,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

        let query4 = `select count(*) as totalVote,name,party,location from Politicians join  Votes on Politicians.id = votes.politicianId group by name order by count(*) DESC limit 3`
        db.all(query4,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

        let query5 = `select first_name,last_name,gender,age  from voters join votes on Voters.id = votes.voterId join Politicians on Politicians.id = Votes.politicianId where Politicians.name = 'Olympia Snowe'`
        db.all(query5,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
    })

}

Rilis3()