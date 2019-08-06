const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}

const proxy = {
  'GET /config': { "namesrvs": ["localhost:9988"], "enableVIPChannel":true },
  'PUT /config': (req, resp) => {
    return resp.status(400).send({message:'bad namesrvs', code:400})
  }
}

module.exports = proxy
