import { useEffect, useRef } from "react";
import * as THREE from "three";

import image1 from "../assets/1.webp";
import image2 from "../assets/2.webp";
import image3 from "../assets/3.webp";
import image4 from "../assets/4.jpeg";
import image5 from "../assets/5.webp";
import image6 from "../assets/6.jpg";
function Cube() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const scene = new THREE.Scene();

    const texture1 = new THREE.TextureLoader().load(image1);
    const texture2 = new THREE.TextureLoader().load(image2);
    const texture3 = new THREE.TextureLoader().load(image3);
    const texture4 = new THREE.TextureLoader().load(image4);
    const texture5 = new THREE.TextureLoader().load(image5);
    const texture6 = new THREE.TextureLoader().load(image6);

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
    const material4 = new THREE.MeshBasicMaterial({ map: texture4 });
    const material5 = new THREE.MeshBasicMaterial({ map: texture5 });
    const material6 = new THREE.MeshBasicMaterial({ map: texture6 });

    const materials = [
      material1,
      material2,
      material3,
      material4,
      material5,
      material6,
    ];

    const mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);

    const starCount = 7000;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = [];

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);

      starsPositions.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsPositions, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.002;

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div ref={canvasRef} className="w-screen h-screen"></div>;
}

export default Cube;
