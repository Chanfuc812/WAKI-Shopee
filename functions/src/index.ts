const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document('orders/{uid}').onWrite(async (event) => {
    //let docID = event.after.id;
    let title = event.after.get('title');
    let content = event.after.get('content');
    var message = {
        notification: {
            title: title,
            body: content,
        },
        topic: 'namelesscoder',
    };

    let response = await admin.messaging().send(message);
    console.log(response);
});
