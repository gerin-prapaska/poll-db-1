const  sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('./database.db');

function insertData(table,input) {
    if (table === 'Politicians'){
        db.serialize(function(){
            let stmt = db.prepare(`INSERT INTO Politicians(name,party,location,grade_current)
            VALUES (?,?,?,?)`)
            stmt.run(input.name,input.party,input.location,input.gradeCurrent)
            stmt.finalize((err)=>{
                if(err){
                    console.log(err)
                }else {
                    console.log(`insert data berhasil`)
                }
            })
        })
    }
    if (table === 'Voters'){
        db.serialize(function(){
            let stmt = db.prepare(`INSERT INTO Voters(first_name,last_name,gender,age)
            VALUES (?,?,?,?)`)
            stmt.run(input.firstName,input.lastName,input.gender,input.age)
            stmt.finalize((err)=>{
                if(err){
                    console.log(err)
                }else {
                    console.log(`insert data berhasil`)
                }
            })
        })
    }
    if (table === 'Votes'){
        db.serialize(function(){
            let stmt = db.prepare(`INSERT INTO Votes(votersId,politiciansId)
            VALUES (?,?)`)
            stmt.run(input.votersId,input.politiciansId)
            stmt.finalize((err)=>{
                if(err){
                    console.log(err)
                }else {
                    console.log(`insert data berhasil`)
                }
            })
        })
    }
    db.close();
}

function updateData(table,input) {
    if ( table === 'Politicians'){
        const query = `
        UPDATE ${table}
        SET name = '${input.name}',
            party = '${input.party}',
            location = '${input.location}',
            grade_current = ${input.gradeCurrent}
        WHERE id = ${input.id}`;
        db.run(query,(err)=>{
            if(err){
                console.log(err)
            }else {
                console.log('update data berhasil')
            }
        })
        
    }
    if ( table === 'Voters'){
        const query = `
        UPDATE ${table}
        SET fisrt_name = '${input.firstName}',
            last_name = '${input.lastName}',
            gender = '${input.gender}',
            age_current = ${input.age}
        WHERE id = ${input.id}`;
        db.run(query,(err)=>{
            if(err){
                console.log(err)
            }else {
                console.log('update data berhasil')
            }
        })
        
    }
    if ( table === 'Votes'){
        const query = `
        UPDATE ${table}
        SET votersId = '${input.votersId}',
            politiciansId = '${input.politiciansId}'
        WHERE id = ${input.id}`;
        db.run(query,(err)=>{
            if(err){
                console.log(err)
            }else {
                console.log('update data berhasil')
            }
        })
        
    }
}
function deleteData(table,id){
        if (table === 'Politicians'){
            const query = `DELETE FROM Politicians WHERE id = ${id}`
            db.run(query,(err)=>{
                if (err){
                    console.log(err)
                }else {
                    console.log('delete data berhasil')
                }
            })
        }
        if (table === 'Voters'){
            const query = `DELETE FROM Voters WHERE id = ${id}`
            db.run(query,(err)=>{
                if (err){
                    console.log(err)
                }else {
                    console.log('delete data berhasil')
                }
            })
        }
        if (table === 'Votes'){
            const query = `DELETE FROM Votes WHERE id = ${id}`
            db.run(query,(err)=>{
                if (err){
                    console.log(err)
                }else {
                    console.log('delete data berhasil')
                }
            })
        }
}
// test case

// deleteData('Politicians',2)
// updateData('Politicians',{
//     id : 2,
//     name : 'Adam Singer',
//     party : 'Z',
//     location : 'ML',
//     gradeCurrent : 20.5
// })
// insertData('Politicians',{
//     name : 'Seikh Abdul',
//     party : 'B',
//     location : 'ID',
//     gradeCurrent : 8.5
// })
// insertData('Voters',{
//     firstName : 'Muhamad',
//     lastName : 'Nabila Gozali',
//     gender : 'male',
//     age : 25 
// })