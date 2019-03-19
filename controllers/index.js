const Model = require('../models')
const View = require('../views')
class Controller{
    static create(input){
        let [table,...values] = input
        Model.create({table,values},(err,data)=>{
            if(err){
                View.error(err)
            }else{
                View.success('data berhasil diinput')
                
            }
        })
    }

    static ViewAll(input){
        Model.findAll(input,(err,data)=>{
            if(err){
                View.error(err)
            }else{
                View.list(data)
            }
        })
    }

    static delete(input){
        let [table,values] = input
        Model.delete({'table':table,'field':'id','values':values},(err,data)=>{
            if(err){
                View.error(err)
            }else{
                View.success('berhasil di delete')
            }
        })
    }

    static update(input){
        let [table,value1,field2,value2] = input
        Model.update({'table':table,'field1':'id','value1':value1,'field2':field2,'value2':value2},(err,data)=>{
            if(err){
                View.error(err)
            }else{
                View.success('berhasil di update')
            }
        })
    }


}

// Controller.ViewAll('Politicians')



module.exports = Controller