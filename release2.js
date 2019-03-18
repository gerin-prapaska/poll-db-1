const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll.db')

function create(table_name, obj) {
    const query = `INSERT INTO ${table_name} (${Object.keys(obj).join(', ')})
                   VALUES (${Object.keys(obj).map(el => '?').join(', ')})`;

    db.run(query, Object.values(obj),
        (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(`Insert data into ${table_name} succed`);
            }
        }
    )
}

function update(table_name, obj) {
    const query = `UPDATE ${table_name} SET ${obj.key} = ? WHERE ${obj.whereKey} = ?`;

    db.run(query, [obj.value, obj.whereValue],
        (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(`Update ${table_name} data succed`);
            }
        }
    )
}

function destroy(table_name, obj) {
    const query = `DELETE FROM ${table_name} WHERE ${obj.whereKey} = ?`

    db.run(query, [obj.whereValue],
        (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(`Delete data from ${table_name} succed`);
            }
        }
    )
}

// create('Politicians',
//     {
//         name: 'M Rido',
//         party: 'PKS',
//         location: 'JKT',
//         grade_current: '21.4'
//     }
// )

// update('Politicians',
//     {
//         whereKey: 'id',
//         whereValue: 21,
//         key: 'location',
//         value: 'BDG'
//     }
// )

// destroy('Politicians',
//     {
//         whereKey: 'id',
//         whereValue: 21
//     }
// )