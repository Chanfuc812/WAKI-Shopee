import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTDp2R8xt_wq09adNYNPEpDjhTjNCUJe0",
  authDomain: "waki-c5178.firebaseapp.com",
  projectId: "waki-c5178",
  storageBucket: "waki-c5178.appspot.com",
  messagingSenderId: "622780875804",
  appId: "1:622780875804:web:228f27782fedc113f80bd9",
  measurementId: "G-25BEFNENGV"
};
// Khởi tạo kết nối Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;


