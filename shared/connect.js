const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");

module.exports = {
    db: {},
    async connect() {
        try{
            const client = await MongoClient.connect(process.env.MongoUrl);
            this.db = client.db(process.env.MongoDB);
            console.log(this.db)
            console.log('connected')
        } catch(err) {
            console.log(err)
        }
    }
}