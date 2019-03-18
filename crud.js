const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

const argv = process.argv.slice(2)

function PoliticansInsert(name,party,location,grade_current) {
    grade_current = +grade_current
    db.run(`INSERT INTO Politicans (name,party,location,grade_current) VALUES ('${name}','${party}','${location}',${grade_current})`,(err) => {
        if(err) throw err
        console.log('berhasil insert data ke Politicans')
    })
}

function PoliticansUpdate(id,varUpdate,value) {
    if (varUpdate == 'grade_current') {
        value = +value
    }
    db.run(`UPDATE Politicans SET ${varUpdate} = ${value} WHERE id = ${id}`,(err) => {
        if(err) throw err
        console.log('berhasil update data Politicans')
    })
}

function PoliticansDelete(id) {

    db.run(`DELETE FROM Politicans WHERE id =  ${id}`,(err) => {
        if(err) throw err
        console.log('berhasil data di Politicans')
    })
}




function VotersInsert(first_name,last_name,gender,age) {
    age = +age
    db.run(`INSERT INTO Voters (first_name,last_name,gender,age) VALUES ('${first_name}','${last_name}','${gender}',${age})`,(err) => {
        if(err) throw err
        console.log('berhasil insert data ke Voters')
    })
}

function VotersUpdate(id,varUpdate,value) {
    if (varUpdate == 'age') {
        value = +value
    }
    db.run(`UPDATE Voters SET ${varUpdate} = ${value} WHERE id = ${id}`,(err) => {
        if(err) throw err
        console.log('berhasil update data Voters')
    })
}

function VotersDelete(id) {

    db.run(`DELETE FROM Voters WHERE id =  ${id}`,(err) => {
        if(err) throw err
        console.log('berhasil data di Voters')
    })
}



switch(argv[0]){
    case 'politicians' :
        switch(argv[1]){
            case 'insert':
                PoliticansInsert(argv[2],argv[3],argv[4],argv[5])
            break
            case 'update':
                PoliticansUpdate(argv[2],argv[3],argv[4])
            break
            case 'delete':
                PoliticansDelete(argv[2])
            break
        }
    case 'voters' :
        switch(argv[1]) {
            case 'insert':
                VotersInsert(argv[2],argv[3],argv[4],argv[5])
            break
            case 'update':
                VotersUpdate(argv[2],argv[3],argv[4])
            break
            case 'delete':
                VotersDelete(argv[2])
            break
        }
}
