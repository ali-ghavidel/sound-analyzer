import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { fragmentShader, vertexShader } from './FragmentVertex';
import { useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';
import * as THREE from 'three';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Text } from '@react-three/drei';


// const Analyzer = ({sound})=>{
//     const analyzer = useRef();
//     const mesh = useRef();

//     useEffect(()=>{
//         analyzer.current = new THREE.AudioAnalyser(sound.current, 128);

//     },[sound])

//     console.log(analyzer.current);
//     useFrame(()=>{
//         if(analyzer.current){
//             let data = analyzer.current.getFrequencyData();
//             mesh.current.rotation.x = data;
//                 mesh.current.rotation.y = data;
//                     mesh.current.rotation.z = data;

//         }
//     })

//     return(<></>)

// }

const Sphere = ({ sound, playMusic, play }) => {
    const mesh = useRef();
    const analyzer = useRef();
    const textRef = useRef();
    // console.log(props);

    const uniforms = useMemo(() => {
        return (
            {
                u_resolution: {
                    type: 'v2',
                    value: new Vector2(window.innerWidth, window.innerHeight)
                },
                u_time: {
                    type: 'f',
                    value: 0.0
                },
                u_frequency: {
                    type: 'f',
                    value: 0.0
                }
            }
        )
    }, []);

    useEffect(() => {
        analyzer.current = new THREE.AudioAnalyser(sound.current, 32);

    }, [sound])

    //  console.log(analyzer);

    useFrame((state) => {
        const { clock } = state;
        // console.log(camera);
        //  console.log(state);
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        // mesh.current.material.uniforms.u_frequency.value = analyzer.current.getByteFrequencyData();
        mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
        mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
        if(play){
            textRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.5;
        }
        
        // mesh.current.scale.x = clock.getElapsedTime() * 0.1; 
        // mesh.current.scale.y = clock.getElapsedTime() * 0.1; 
        // mesh.current.scale.z = clock.getElapsedTime() * 0.1; 

        if (analyzer.current.data)
            mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        mesh.current.material.uniforms.u_frequency.value = analyzer.current.getAverageFrequency();
        mesh.current.scale.x = 0.75 + analyzer.current.getAverageFrequency() / 1000;
        mesh.current.scale.y = 0.75 + analyzer.current.getAverageFrequency() / 1000;
        mesh.current.scale.z = 0.75 + analyzer.current.getAverageFrequency() / 1000;

        //console.log(analyzer.current.getAverageFrequency() / 150);
        //  camera.position.x = 25 -   analyzer.current.getAverageFrequency() / 25;
        //  camera.position.z = 25 -  analyzer.current.getAverageFrequency() / 25;
        //  camera.updateProjectionMatrix();
        //  console.log(camera.fov);
        //  camera.fov = 100 + analyzer.current.getAverageFrequency() ;

        //  console.log(data);
        //  for (let index = 0; index < data.length; index++) {
        //     mesh.current.material.uniforms.u_time.value = data[index];
        //     mesh.current.rotation.x = data[index] * 0.1;
        //     mesh.current.rotation.z = data[index] * 0.1;
        //     // mesh.current.scale.x = data[index];
        //     // mesh.current.scale.y = data[index];
        //     //     mesh.current.scale.z = data[index];

        //  }



    })

    // let t = 0;
    // useFrame((state)=>{
    //     const { clock } = state;

    //     // console.log(state);
    //     mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    //     mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
    //     mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    //     // mesh.current.rotation.x = 
    // });

    // const Experience = () => {
    //     const camera = useRef()
    //     useHelper(camera, THREE.CameraHelper)
    //     return (
    //       <>

    //         <PerspectiveCamera makeDefault ref={camera} near={1} far={4}  position={[0, 0, 8.0]}></PerspectiveCamera>
    //         </>
    // )}

    return (
        <Suspense fallback={null}>
            {/* <Experience /> */}
            <mesh onClick={playMusic} ref={mesh} position={[0, 0, 0]}   >
                <icosahedronGeometry args={[4, 30]} ref={analyzer} scale={1.5} />

                <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe toneMapped={false} />
            </mesh>
            <EffectComposer multisampling={0} disableNormalPass={true}>
                {/* <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={2}
                height={480}
                /> */}
                <Bloom

                    mipmapBlur
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.99}
                    intensity={1.0}
                />
                <ToneMapping mode={ToneMappingMode.OPTIMIZED_CINEON} />
                {/* <Noise opacity={0.025} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
            </EffectComposer>
            {!play ? (
                <Text
                    scale={0.75}
                    color="white" // default
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Touch to Play
                </Text>
            ) : (
                <Text
                    scale={0.35}
                    color="white" // default
                    anchorX="center" // default
                    anchorY="middle" // default
                    ref={textRef}
                    textAlign='center'
                >
                    Touch to Pause
                    {"\n"}
                    Vivaldi - Spring (The Four Seasons)
                </Text>
            )}
        </Suspense>

    );
}

export default Sphere;
