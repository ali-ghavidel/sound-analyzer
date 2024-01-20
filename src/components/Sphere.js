import React, { useMemo, useRef } from 'react';
import { fragmentShader , vertexShader } from './FragmentVertex';
import { useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';
// import * as THREE from 'three';
const Sphere = () => {
    const mesh = useRef();
    

    const uniforms = useMemo(()=>{
        return(
            {
                u_resolution: {
                    type: 'v2',
                    value: new Vector2(window.innerWidth, window.innerHeight)
                },
                u_time: {
                    type: 'f',
                    value: 0.0
                }
            }
        )
    },[]);

    // let t = 0;
    useFrame((state)=>{
        const { clock } = state;
        // console.log(state);
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
        mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
        // mesh.current.rotation.x = 
    });

    return (
        <mesh ref={mesh} position={[0,0,0]} scale={1.5} >
            <icosahedronGeometry args={[4,30]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </mesh>
    );
}

export default Sphere;
