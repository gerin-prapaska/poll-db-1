const db    = require('./setup.js');
const fs = require('fs')
var getVoters = fs.readFileSync('voters.csv')
.toString()
.split("\n")
var getPoliticians = fs.readFileSync('politicians.csv')
.toString()
.split("\n")
var getVotes = fs.readFileSync('votes.csv')
.toString()
.split("\n")
let politicians = "INSERT INTO politicians VALUES (null,?,?,?,?)"
let voters = "INSERT INTO voters VALUES (null,?,?,?,?)"
let votes = "INSERT INTO votes VALUES (null,?,?)"
function seedingData(input, getData){
    db.serialize(function(){
        let dataPoliticianSeeding = db.prepare(input)
        for (let i = 1; i < getData.length-1; i++) {
           let splitPoliticians = getData[i].split(',')

           dataPoliticianSeeding.run(splitPoliticians)
            
        }

        dataPoliticianSeeding.finalize(function(err){
            if(err){
                console.log(err)
        
            }else{
                console.log('data masuk')
            }
        
        });
    
    })


}

seedingData(politicians, getPoliticians)
seedingData(voters, getVoters)
seedingData(votes, getVotes)
db.close()




