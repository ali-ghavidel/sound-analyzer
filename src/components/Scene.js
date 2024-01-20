import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sphere from './Sphere';
import './scene.css';

const Scene = () => {
    return (
        <Canvas className='canvas' camera={{position: [0.0,0.0,8.0], fov: 110}}>
            <Sphere />
            <axesHelper />
            <OrbitControls />
        </Canvas>
    );
}

export default Scene;
