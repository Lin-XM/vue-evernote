const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://localhost:3000'
const realBaseURL = 'http:s//note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev:true}) {
    let fileTxt = `
        module.exports = {
            baseURL:'${isDev ?  mockBaseURL : realBaseURL}'
        }
    `
    fs.writeFileSync(path.join(__dirname,'../helper/config-baseURL.js'),fileTxt)
}