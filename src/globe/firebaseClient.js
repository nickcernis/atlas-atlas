import firebase from "firebase/app";
import "firebase/database";
import config from "./config";

firebase.initializeApp({
  databaseURL: config.firebaseUrl,
});

const database = firebase.database();
const requestsRef = database.ref("requests");

// Monitor GraphQL requests and pass data to the callback.
function monitorGraphqlRequests(callback) {
  requestsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    callback(Object.values(data));
  });
}

export { monitorGraphqlRequests };
