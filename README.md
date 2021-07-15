# The Atlas Atlas

An atlas[^1] of the people building [Atlas](https://wpengine.com/atlas) and some of the events that power the platform.

Built for the WP Engine Atlas 2021 hackathon.

---

<center><a href="https://hlev3xhwqms7hpt5ew51y3qi1.js.wpenginepowered.com/">Visit the site →</a></center>

---

<img src="https://raw.githubusercontent.com/nickcernis/atlas-atlas/main/screenshot.png" alt="The Atlas Atlas">


## Key
- **Pillars** (in white) represent the people building the Atlas platform, with pillar height denoting the number of people in those cities.
- **Arcs** (in color) show a live updating path of the last 10 WPGraphQL requests for the site itself (from the requesting IP to the server hosting WPGraphQL).[^2]

## Stack
- [Atlas by WP Engine](https://wpengine.com/atlas) for headless WordPress and Node.js hosting.
- [WPGraphQL](https://www.wpgraphql.com/) for data access.
- [Atlas Content Modeler](https://github.com/wpengine/atlas-content-modeler/) to model and store data about people and places.
- [Three.js](https://threejs.org/) for visualisation (see `src/globe/`). 
- [Express](https://expressjs.com/) to serve static content and fetch/massage data via GraphQL (see `src/server/`).
- [Firebase](https://firebase.google.com/) for live data displaying WPGraphQL requests. (See `functions/` for Firebase functions and `src/globe/firebaseClient.js` for subscription logic.)
- A small WordPress plugin (see `plugin/`) to ping a Firebase function every time a WPGraphQL request is made.
- [IP Stack](https://ipstack.com/) is used via the Firebase function to convert IP addresses to latitude and longitude (because I already had a subscription).

## To run locally
- Run `npm install && npm run dev` to build the globe app.
- In a separate terminal, run `npm start` to start the server.
- Visit http://localhost:8080.

Running locally still uses my WordPress/Firebase instances by default, but will let you play with the globe and Express server code if you'd like to.

#### Footnotes
1. Ok, I admit it's a globe and not an atlas. “Atlas globe” isn't nearly as satisfying to say.
2. WPGraphQL requests originate from the Node.js server by default, so most of the arcs represent requests from the Node.js server (in Europe) to the WordPress server (in the US). But try visiting the [WPGraphQL endpoint](https://atlasatlas.wpengine.com/graphql) in your browser, and you should see an arc from your IP location to the WordPress server.
