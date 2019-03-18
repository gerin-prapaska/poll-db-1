const fs = require('fs')

class readData {
  static read(file) {
    const readData = fs.readFileSync(file, 'utf8')
    return readData.split('\n')
  }

  static findAll(file) {
    let parseData = readData.read(file)
    parseData = parseData.map(data => data.split(','))
    return parseData
  }
}

module.exports = readData