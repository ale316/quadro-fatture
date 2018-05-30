const CronJob = require('cron').CronJob
const updateDocuments = require('./jobs/updateDocuments')

module.exports = function() {
    // Init the cron jobs
    let documentsCron = new CronJob('0 8 * * *', updateDocuments, null, true, 'Europe/Berlin')
}