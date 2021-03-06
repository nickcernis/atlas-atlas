/**
 * Glow Mesh
 *
 * Modified from: https://github.com/chrisrzhou/three-glow-mesh/blob/main/index.js.
 * Original author: https://github.com/chrisrzhou
 * Licence: MIT
 *
 * Includes a (not yet thoroughly tested) workaround for
 * https://github.com/chrisrzhou/three-glow-mesh/issues/8.
 */

import { BackSide, Color, Mesh, ShaderMaterial } from "three";

const fragmentShader = `
uniform vec3 color;
uniform float coefficient;
uniform float power;
varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;
void main() {
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity	= pow(
    coefficient + dot(vVertexNormal, viewCameraToVertex),
    power
  );
  gl_FragColor = vec4(color, intensity);
}`;

const vertexShader = `
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
void main() {
  vVertexNormal	= normalize(normalMatrix * normal);
  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const defaultOptions = {
  backside: true,
  coefficient: 0.5,
  color: "gold",
  size: 2,
  power: 1,
};

// Based off: http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
export function createGlowMaterial(coefficient, color, power) {
  return new ShaderMaterial({
    depthWrite: false,
    fragmentShader,
    transparent: true,
    uniforms: {
      coefficient: {
        value: coefficient,
      },
      color: {
        value: new Color(color),
      },
      power: {
        value: power,
      },
    },
    vertexShader,
  });
}

export function createGlowGeometry(geometry, scale) {
  let glowGeometry = geometry.clone();
  glowGeometry.scale(scale, scale, scale);
  return glowGeometry;
}

export function createGlowMesh(geometry, options = defaultOptions) {
  const { backside, coefficient, color, size, power } = options;

  const glowGeometry = createGlowGeometry(geometry, size);
  const glowMaterial = createGlowMaterial(coefficient, color, power);

  if (backside) {
    glowMaterial.side = BackSide;
  }

  return new Mesh(glowGeometry, glowMaterial);
}
