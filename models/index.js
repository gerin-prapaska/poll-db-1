const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./PollDb.db')
class Model{
    static create(input,cb){
        let {table,values} = input
        let placeHolder = values.map(a=>'?').join(',')
        let query=`INSERT INTO ${table} values (null,${placeHolder})`
        db.run(query,values,(err,data)=>{
            if(err){
                cb(err)
            }else{
                cb(data)
            }
        })

            
    }

    static findAll(table,cb){
        let query = `SELECT * FROM ${table}`
        db.all(query,(err,data)=>{
            if(err){
                cb(err)
            }else{
                cb(data)
            }
        })
        
    }

    static delete(option,cb){
        let {table,field,values} = option
        let query = `delete from ${table} where ${field} = ${values}`
        db.run(query,(err,data)=>{
            if(err){
                cb(err)
            }else{
                cb(data)
            }
        })        
    }

    static update(option,cb){
        let {table,field1,value1,field2,value2} = option
        let query = `update ${table} set ${field2} = '${value2}' where ${field1}=${value1}`
        db.run(query,(err,data)=>{
            if(err){
                cb(err)
            }else{
                cb(data)
            }
        })
    }

}

module.exports = Model