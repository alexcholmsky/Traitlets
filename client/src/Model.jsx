/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ../public/model2.glb 
*/
import React, { useEffect, useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import {PlaneGeometry, MeshStandardMaterial, TextureLoader} from 'three';
import { useSelectionContext } from './context/SelectionContext.jsx';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/model2.glb');
  const { braceletDetails, centerpieceSide, steps } = useSelectionContext();
  const [materialBaseKey, setMaterialKey] = useState(null);
  const [materialAccessoryKey, setMaterialAccessoryKey] = useState(null);
  const [cylinderMaterialKey, setCylinderMaterialKey] = useState(null);

  const transparentImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
  const engraving = new TextureLoader().load(transparentImage);
  let engravingGeometry = new PlaneGeometry(20, 20);
  let engravingPosition = [0, 0, 1.3];
  let engravingScale = 0.015;
  let engravingMaterial = new MeshStandardMaterial({
    map: engraving,
    transparent: true,
  });

  const meshRef = useRef(null);

  const updateStickerMaterial = (image) => {
    // Load the new image dynamically based on braceletDetails or any other condition
    const engravingTexture = new TextureLoader().load(image);

    // Update the material's map property with the new texture
    engravingMaterial.map = engravingTexture;
  };

  const loadTexture = () =>
    new Promise((resolve) => {
      const textureLoader = new TextureLoader();
      textureLoader.load(braceletDetails?.braceletDetails['base-beads']['image'], resolve);
    });

  const loadMainBeadMaterial = async () => {
    const texture = await loadTexture();
    const newMainBead = new MeshStandardMaterial({
      map: texture,
      color: braceletDetails.braceletDetails['base-beads']['hex'],
      metalness: 0.1,
      roughness: 0.5,
    });
    // Generate a unique key for the material
    setMaterialKey(braceletDetails.braceletDetails['base-beads']['id']);
    // Replace the existing materials with the new base bead material for all spheres except accessory beads (10,11)
    for (let i = 1; i <= 29; i++) {
      const sphereKey = `Sphere${String(i).padStart(3, '0')}`;
      if (braceletDetails?.braceletDetails?.['accessory-beads']) {
        if (nodes[sphereKey] && i != 10 && i != 11) {
          nodes[sphereKey].material = newMainBead.clone();
        }
      } else {
        if (nodes[sphereKey]) {
          nodes[sphereKey].material = newMainBead.clone();
        }
      }
    }
  };

  const loadAccessoryBeadMaterial = () => {
    let texture = new TextureLoader().load(braceletDetails.braceletDetails['accessory-beads']['image']);
    let sideBead = new MeshStandardMaterial({
      map: texture,
      color: braceletDetails.braceletDetails['accessory-beads']['hex'],
      metalness: 0.1,
      roughness: 0.1,
    });

    setMaterialAccessoryKey(braceletDetails.braceletDetails['accessory-beads']['id']);

    // Replace the existing materials with the base bead material
    for (let i = 10; i <= 11; i++) {
      const sphereKey = `Sphere${String(i).padStart(3, '0')}`;
      if (nodes[sphereKey]) {
        nodes[sphereKey].material = sideBead;
      }
    }
  };

  const loadDefaultMaterial = () => {
    const texture = new TextureLoader().load(braceletDetails.braceletDetails['base-beads']['image'] || '');
    const sideBead = new MeshStandardMaterial({
      map: texture,
      color: braceletDetails.braceletDetails['base-beads']['hex'] || '',
      metalness: 0.1,
      roughness: 0.5,
    });

    setMaterialAccessoryKey('none');

    for (let i = 10; i <= 11; i++) {
      const sphereKey = `Sphere${String(i).padStart(3, '0')}`;
      if (nodes[sphereKey]) {
        nodes[sphereKey].material = sideBead;
      }
    }
  };

  useEffect(() => {
    if (braceletDetails?.braceletDetails?.['base-beads']) {
      loadMainBeadMaterial();
    }

    if (braceletDetails?.braceletDetails['accessory-beads']) {
      loadAccessoryBeadMaterial();
    } else if (braceletDetails.braceletDetails['base-beads']) {
      loadDefaultMaterial();
    }

    if (centerpieceSide == 'front-side' && braceletDetails?.braceletDetails?.['centerpiece']?.['front-side']?.['image']) {
      console.log(centerpieceSide, 'frontside')
      updateStickerMaterial(braceletDetails.braceletDetails['centerpiece']['front-side']['image']);
    }
    else if (centerpieceSide == 'back-side' && braceletDetails?.braceletDetails?.['centerpiece']?.['back-side']?.['image']) {
      console.log(centerpieceSide, 'backside')
      updateStickerMaterial(braceletDetails.braceletDetails['centerpiece']['back-side']['image']);
    }
    else{
      console.log('else called')
      console.log(centerpieceSide, braceletDetails?.braceletDetails?.['centerpiece']?.['back-side']?.['image'], braceletDetails?.braceletDetails?.['centerpiece']?.['front-side']?.['image'])
    }
  }, [braceletDetails, centerpieceSide, steps]);

  return (
    <group {...props} dispose={null}>
        <mesh
          ref={meshRef}
          geometry={engravingGeometry}
          material={engravingMaterial}
          position={engravingPosition}
          scale={engravingScale}
        />
      <mesh geometry={nodes.Torus001.geometry} material={nodes.Torus001.material} position={[-0.069, 0, 0.031]} rotation={[0, -0.728, 0]}>
        <mesh geometry={nodes.Cylinder.geometry} key={cylinderMaterialKey} material={nodes.Cylinder.material} position={[0.807, 0, 0.807]} rotation={[Math.PI / 2, 0, 2.356]} scale={[0.764, 0.649, 0.443]}>
        </mesh>
      </mesh>
      <mesh geometry={nodes.Sphere001.geometry} key={materialBaseKey} material={nodes.Sphere001.material} position={[0.681, 0, -0.81]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere002.geometry} material={nodes.Sphere002.material} position={[0.302, 0, -1.033]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere003.geometry} material={nodes.Sphere003.material} position={[-0.133, 0, -1.093]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere004.geometry} material={nodes.Sphere004.material} position={[-0.559, 0, -0.983]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere005.geometry} material={nodes.Sphere005.material} position={[-0.909, 0, -0.718]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere006.geometry} material={nodes.Sphere006.material} position={[-1.132, 0, -0.34]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere007.geometry} material={nodes.Sphere007.material} position={[-1.193, 0, 0.095]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere008.geometry} material={nodes.Sphere008.material} position={[-1.082, 0, 0.521]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere009.geometry} material={nodes.Sphere009.material} position={[-0.818, 0, 0.871]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere010.geometry} key={materialAccessoryKey + '1'} material={nodes.Sphere010.material} position={[-0.449, 0, 1.122]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere011.geometry} key={materialAccessoryKey + '0'} material={nodes.Sphere011.material} position={[0.434, 0, 1.071]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere012.geometry} material={nodes.Sphere012.material} position={[0.772, 0, 0.78]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere013.geometry} material={nodes.Sphere013.material} position={[0.995, 0, 0.401]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere014.geometry} material={nodes.Sphere014.material} position={[1.056, 0, -0.034]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere015.geometry} material={nodes.Sphere015.material} position={[0.945, 0, -0.459]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere016.geometry} material={nodes.Sphere016.material} position={[0.502, 0, -0.94]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere017.geometry} material={nodes.Sphere017.material} position={[0.087, 0, -1.084]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere018.geometry} material={nodes.Sphere018.material} position={[-0.351, 0, -1.059]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere019.geometry} material={nodes.Sphere019.material} position={[-0.747, 0, -0.868]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere020.geometry} material={nodes.Sphere020.material} position={[-1.039, 0, -0.54]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere021.geometry} material={nodes.Sphere021.material} position={[-1.184, 0, -0.125]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere022.geometry} material={nodes.Sphere022.material} position={[-1.158, 0, 0.314]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere023.geometry} material={nodes.Sphere023.material} position={[-0.967, 0, 0.709]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere024.geometry} material={nodes.Sphere024.material} position={[-0.641, 0, 1.005]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere025.geometry} material={nodes.Sphere025.material} position={[0.611, 0, 0.933]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere026.geometry} material={nodes.Sphere026.material} position={[0.902, 0, 0.601]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere027.geometry} material={nodes.Sphere027.material} position={[1.046, 0, 0.187]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere028.geometry} material={nodes.Sphere028.material} position={[1.021, 0, -0.252]} rotation={[0, -0.728, 0]} scale={0.118} />
      <mesh geometry={nodes.Sphere029.geometry} material={nodes.Sphere029.material} position={[0.83, 0, -0.648]} rotation={[0, -0.728, 0]} scale={0.118} />
    </group>
  )
}

useGLTF.preload('/model2.glb')