import { Center, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import portalFragmentShader from "./shaders/portal/fragment.js"
import portalVertexShader from "./shaders/portal/vertex.js"
import * as THREE from "three"
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

export default function Experience()
{



    const PortalMaterial = shaderMaterial({
        uTime:0,
        uColorStart:new THREE.Color("#ffffff"),
        uColorEnd:new THREE.Color(`#000000`)
    },
    portalVertexShader,
    portalFragmentShader
    )

    extend({PortalMaterial})


    const portalref=useRef()
    useFrame((state,delta)=>{
        portalref.current.uTime += delta*1.25
    })

    const {nodes} =useGLTF("./model/finalportal.glb")
    const bakedTexture = useTexture("./model/Bakedimg.jpg")
    bakedTexture.flipY=false
    
    return <>
    <Perf position='top-left' />

        <Center>
            
            <OrbitControls makeDefault />
            
            {/* Portal */}

            <mesh geometry={nodes.baked.geometry} >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            {/* Pole Lights */}

            <mesh 
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
                 >
                <meshBasicMaterial color="#ffffe5"/>
            </mesh>

            <mesh 
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
                 >
                <meshBasicMaterial color="#ffffe5"/>
            </mesh>

            {/* Portal Light */}

            <mesh 
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                {/* <shaderMaterial 
                        vertexShader={portalVertexShader}
                        fragmentShader={portalFragmentShader}  
                        uniforms={{
                            uTime:{value:0},
                            uColorStart:{value:new THREE.Color("#ffffff") },
                            uColorEnd:{value:new THREE.Color("#000000") }

                        }}                  
                    /> */}
                    <portalMaterial ref={portalref}/>
            </mesh>
            
            {/* Fireflies */}
            <Sparkles 
                size={6}
                scale={[4,2,4]}
                count={65}
                speed={0.5}
                position-y={1}
            />

        </Center>
    </>
}

