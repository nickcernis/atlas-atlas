const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const key = functions.config().ipstack.key;
const databaseURL = "https://atlasatlas-1f9a2-default-rtdb.firebaseio.com";

admin.initializeApp({
  databaseURL,
});

/**
 * Stores arc start and end positions based on two IPs.
 */
exports.logGraphqlRequest = functions.https.onRequest((request, response) => {
  Promise.all([
    fetch(`https://api.ipstack.com/${request.query.ip}?access_key=${key}`).then(
        (value) => value.json()
    ),
    fetch(
        `https://api.ipstack.com/${request.query.ip2}?access_key=${key}`
    ).then((value) => value.json()),
  ]).then(([firstIP, secondIP]) => {
    const ref = admin.database().ref("requests");
    const childRef = ref.push();
    childRef.set({
      startLat: firstIP.latitude,
      startLng: firstIP.longitude,
      endLat: secondIP.latitude,
      endLong: secondIP.longitude,
    });
    response.status(200).send("OK!");
  });
});
