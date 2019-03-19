const Controller = require('./controllers')
const argv = process.argv.slice(2)
let [command,...input] = argv


switch (command) {
    case 'create':Controller.create(input)        
        break;
    case 'delete': Controller.delete(input)
        break    
    case 'update': Controller.update(input)
        break    
    case 'view' : Controller.ViewAll(input)
         break;     

    default:console.log(`
    node index.js create <<table name>> 'full name' party region grade_current
    node index.js update <<table name>> id <field, ex: name> <values,ex:'rifky'> 
    node index.js delete <<table name>> <<id>>
    node index.js View <<table name>>
    `)
        break;
}