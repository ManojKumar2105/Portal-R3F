import { Center, OrbitControls, Stars,Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import portalFragmentShader from "./shaders/portal/fragment.js"
import portalVertexShader from "./shaders/portal/vertex.js"
import * as THREE from "three"
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

export default function Experience()
{

    const colorStart = useControls({startColor:"#ffffff"})
    const colorEnd = useControls({endcolor:"#000000"})

    const PortalMaterial = shaderMaterial({
        uTime:0,
        uColorStart:new THREE.Color(`#ffffff`),
        uColorEnd:new THREE.Color(`#000000`)
    },
    portalVertexShader,
    portalFragmentShader
    )

    extend({PortalMaterial})


    const portalref=useRef()
    useFrame((state,delta)=>{
        portalref.current.uTime += delta*1.25
        portalref.current.uColorStart=new THREE.Color(`${colorStart.startColor}`)
        portalref.current.uColorEnd=new THREE.Color(`${colorEnd.endcolor}`)
    })

    const {nodes} =useGLTF("./model/finalportal.glb")
    const bakedTexture = useTexture("./model/Bakedimg.jpg")
    bakedTexture.flipY=false
    
    return <>
    <Perf position='top-left' />

            <OrbitControls makeDefault />
            
            {/* Portal */}
            <Center>
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
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Portal Light */}

            <mesh 
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                    <portalMaterial ref={portalref} />
            </mesh>
            
            {/* Fireflies */}
            <Sparkles 
                size={6}
                scale={[4,2,4]}
                count={60}
                speed={0.5}
                position-y={1.2}
            />
            {/* <Stars radius={10} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
        </Center>
    </>
}

