const admin=require('firebase-admin')
const serviceAccount=require("./login-auth-da499-firebase-adminsdk-fbsvc-e56021e6b6.json")
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
module.exports=admin