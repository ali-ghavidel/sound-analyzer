import React, {useRef, Suspense, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import {  OrbitControls, PerspectiveCamera, PositionalAudio } from '@react-three/drei';
import Sphere from './Sphere';
import './scene.css';
import Loading from './Loading';



const Scene = () => {

    const [play, setPlay] = useState(false);
    
    

    const sound = useRef();


    // useThree(({camera})=>{
    //     camera.position.x += (mouseX - camera.position.x) * 0.05;
    //     camera.position.y += (mouseY - camera.position.y) * 0.05;
    // })

   
    
    const playMusic = () => {
        // console.log("sound: "+ sound);
        if(play){
            sound.current.pause();
        }else{
            sound.current.play();
        }
        setPlay(!play);
    }

    const Experience = () => {
        // const camera = useRef()
        // useHelper(camera, THREE.CameraHelper)
        return (
          <>
            
            <PerspectiveCamera makeDefault far={100}  position={[0, 0, 8.0]}></PerspectiveCamera>
            </>
    )}

    return (
        <>
        {/* <button className='btn' onClick={playMusic}>Sepid Click Here</button> */}
        <Suspense fallback={<Loading />}>
        <Canvas className='canvas'>
         <Experience />
       
            
                <PositionalAudio url='1.mp3' distance={10} loop ref={sound} autoplay={false} />
                
                <Sphere playMusic={playMusic} sound={sound} play={play} />
                {/* <Line playMusic={playMusic} sound={sound} /> */}
            
            {/* <axesHelper /> */}
            {/* <cameraHelper /> */}
            <OrbitControls maxDistance={10} minDistance={5} enableZoom />
            {/* <FlyControls /> */}
            
        </Canvas>
        </Suspense>
        </>
        
    );
}

export default Scene;
