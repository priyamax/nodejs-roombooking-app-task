
const mongo = require('../shared/connect');

module.exports.getAvailability = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("room_availability").find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.bookRoom = async (req,res,next) => {
    try{
    var con=await mongo.db.collection("room_availability").findOne({Room_id : req.body.RoomId});
    if(con.length!==0)
    {   
    try {
        let data = await mongo.db.collection("booked_rooms_details").insertOne(req.body);
        let data1 = await mongo.db.collection("booked_customer_details").insertOne(req.body);
        await mongo.db.collection("room_availability").updateOne({Room_id : req.body.RoomId},{$set:{BookedStatus:"BOOKED"}});
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }

   }
else{
   res.status(500).send("Invalid room id");
   }
} catch(err){
    console.log(err);
        res.status(500).send(err);
}
}

module.exports.getRoombookedDetails = async (req,res,next) => {
    try {
        let data = await mongo.db.collection("room_availability").find({BookedStatus:"BOOKED"}).toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.getCustomerbookedDetails = async (req,res,next) => {
    try {
        let data = await mongo.db.collection("booked_customer_details").find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.getclear=async(req,res,next)=>{
    try{
        let data = await mongo.db.collection("room_availability").updateMany({BookedStatus:"BOOKED"},{$set:{BookedStatus:"NO"}});
        let data1=await mongo.db.collection("room_availability").find().toArray();
        let data2=await mongo.db.collection("booked_customer_details").remove();
        res.send(data1);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}