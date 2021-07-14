import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  Color,
  AmbientLight,
  DirectionalLight,
  PointLight,
} from "three";
import ThreeGlobe from "three-globe";
import { createGlowMesh } from "./glowMesh";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./data/globe.min.json";
import config from "./config";
import { monitorGraphqlRequests } from "./firebaseClient";

let globe, renderer, scene, camera, controls;

const init = () => {
  // Renderer.
  renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Scene.
  scene = new Scene();

  // Data fetching and globe setup.
  fetch("/stats")
    .then((response) => response.json())
    .then((data) => initGlobe(data));

  // Camera.
  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, config.defaultZoom);
  scene.add(camera);

  // Camera controller.
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.minDistance = config.minZoom;
  controls.maxDistance = config.maxZoom;
  controls.update();

  // Lights.
  scene.add(new AmbientLight(0xbbbbbb, 0.3));

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0xa6a8d7, 0.5);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new PointLight(0xffffff, 0.3);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  // Event handlers.
  window.addEventListener("resize", onWindowResize, false);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const initGlobe = (data) => {
  globe = new ThreeGlobe()
    .arcColor(() => {
      let random = Math.floor(Math.random() * config.arcColors.length);
      return config.arcColors[random];
    })
    .arcAltitude(0.3)
    .arcStroke(0.6)
    .arcDashLength(0.8)
    .arcDashGap(4)
    .arcDashAnimateTime(1000)
    .arcsTransitionDuration(1000)
    .arcDashInitialGap(2)
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .labelsData(data.cities)
    .labelColor(() => config.labelColor)
    .labelDotOrientation((e) => {
      if (e.label === "williamston") return "top";
      if (e.label === "austin") return "right";
      return "bottom";
    })
    .labelDotRadius(0.3)
    .labelSize(0.6)
    .labelText("label")
    .labelResolution(6)
    .labelAltitude(
      (e) => 0.001 + (e.height / data.maxEmployees) * config.pointScalingFactor
    )
    .pointsData(data.cities)
    .pointColor(() => config.pointColor)
    .pointsMerge(true)
    .pointAltitude(
      (e) => (e.height / data.maxEmployees) * config.pointScalingFactor
    )
    .pointRadius(0.2)
    .showAtmosphere(false)
    .hexPolygonColor((e) => {
      if (data.countries.includes(e.properties.ISO_A3)) {
        return config.lightCountryColor;
      } else return config.darkCountryColor;
    });

  const globeMaterial = globe.globeMaterial();
  globeMaterial.color = new Color(0x5359fe);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  // Globe backside glow. 🍑
  const glowMesh = createGlowMesh(new SphereGeometry(100, 75, 75), {
    backside: true,
    color: "#5359fe",
    size: 1.3,
    power: 6,
    coefficient: 0.3,
  });
  globe.add(glowMesh);
  scene.add(globe);

  // Show arcs when data from Firebase changes.
  monitorGraphqlRequests((data) => globe.arcsData(data));
};

init();
animate();
