const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Drift stars
const stars = [];
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
  stars.push(star);
}
Array(500).fill().forEach(addStar);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  stars.forEach(star => {
    star.position.z += 0.05;
    if (star.position.z > 50) {
      star.position.z = -100;
    }
  });
  renderer.render(scene, camera);
}
animate();

// Neon cursor
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.top = '0';
cursor.style.left = '0';
cursor.style.width = '16px';
cursor.style.height = '16px';
cursor.style.border = '2px solid #0ff';
cursor.style.borderRadius = '50%';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '10000';
cursor.style.transition = 'transform 0.1s ease-out';
cursor.style.boxShadow = '0 0 15px #0ff, 0 0 25px #0ff';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


