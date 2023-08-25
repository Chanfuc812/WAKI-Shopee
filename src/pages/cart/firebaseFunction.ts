import functions from 'firebase-functions';
import admin from 'firebase-admin';
admin.initializeApp();

exports.sendNotificationOnNewDocument = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snapshot, context) => {
    const newData = snapshot.data();
    // Gửi thông báo hoặc thực hiện xử lý dữ liệu ở đây
    return null;
  });
