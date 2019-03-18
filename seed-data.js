const fs = require("fs");
const setup = require("./setup.js");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./poll.db");

let voterArray  = fs.readFileSync("./voters.csv","utf8").split("\n");
let voterQuery = `
INSERT INTO voters (first_name,last_name,gender,age) 
VALUES(?,?,?,?);
`

let politicianArray  = fs.readFileSync("./politicians.csv","utf8").split("\n");
let politicianQuery = `
INSERT INTO politicians (name,party,location,grade_current) 
VALUES(?,?,?,?);
`

let voteArray  = fs.readFileSync("./votes.csv","utf8").split("\n");
let voteQuery = `
INSERT INTO votes (voter_id,politician_id) 
VALUES(?,?);
`
function seedData(){
    db.serialize(function(){
        queryArray = [voterQuery,politicianQuery,voteQuery];
        dataArray = [voterArray,politicianArray,voteArray];

        for(let i = 0;i<queryArray.length;i++){
            let stmt = db.prepare(queryArray[i]);
            for(let j = 1; j<dataArray[i].length;j++){
               if(dataArray[i][j].trim() != ""){
                stmt.run(dataArray[i][j].split(","));
               }
            }
            stmt.finalize();
        }
    })
}

module.exports = seedData;


