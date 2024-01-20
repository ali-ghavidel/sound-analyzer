import React, { useMemo, useRef } from 'react';
import { fragmentShader , vertexShader } from './FragmentVertex';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector2 } from 'three';
// import * as THREE from 'three';
const Sphere = () => {
    const mesh = useRef();
    const hover = useRef(false);

    const uniforms = useMemo(()=>{
        return(
            {
                u_resolution: {
                    type: 'v2',
                    value: new Vector2(window.innerWidth, window.innerHeight)
                },
                u_intensity: {
                    value: 0.3
                },
                u_time: {
                    type: 'f',
                    value: 0.0
                }
            }
        )
    },[]);

    useFrame((state)=>{
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = 0.4 - clock.getElapsedTime();

        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
            mesh.current.material.uniforms.u_intensity.value,
            hover.current ? 0.25 : 0.0,
            0.02
        );
    });

    return (
        <mesh ref={mesh} position={[0,0,0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5} onPointerOver={()=>hover.current = true} onPointerOut={()=>hover.current = false}>
            <icosahedronGeometry args={[4,30]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
        </mesh>
    );
}

export default Sphere;
