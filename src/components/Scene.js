import React, {useRef, Suspense, useState, useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import {  OrbitControls, PositionalAudio } from '@react-three/drei';
import Sphere from './Sphere';
import './scene.css';

const Scene = () => {

    const [play, setPlay] = useState(false);
    
    const sound = useRef();

    
    const playMusic = () => {
        console.log("sound: "+ sound);
        if(play){
            sound.current.pause();
        }else{
            sound.current.play();
        }
        setPlay(!play);
    }
    return (
        <>
        <button onClick={playMusic}>click</button>
        <Canvas className='canvas' camera={{position: [0.0,0.0,8.0], fov: 115}}>
            
            <Suspense fallback={null}>
                
                <PositionalAudio url='3.mp3' distance={10} loop ref={sound} autoplay={false} />
                <Sphere sound={sound} />
            </Suspense>
            
            <axesHelper />
            <OrbitControls maxDistance={10} minDistance={5} enableZoom />
            {/* <FlyControls /> */}
        </Canvas>
        </>
        
    );
}

export default Scene;
