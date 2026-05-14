import { useState,useEffect } from "react";

export default function useMousePosition()
{
    const [mousePositon,setMousePosition]=useState({x:0,y:0});

    const updateMousePosition=(e)=>{
        setMousePosition({x:e.clientX,y:e.clientY});
    }

    useEffect(()=>{
        window.addEventListener("mousemove",updateMousePosition)
        return ()=>{
            window.removeEventListener("mousemove",updateMousePosition)
        }
    },[])

    return mousePositon;
}