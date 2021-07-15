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
  requestsRef.limitToLast(10).on("value", (snapshot) => {
    const data = snapshot.val();
    callback(Object.values(data));
  });
}

export { monitorGraphqlRequests };
