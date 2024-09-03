'use client';
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';

export default function BlurryCursor() {
    const mouse = useRef({ x: 0, y: 0 });
    const circle = useRef<any>();
    const [opacity, setOpacity] = useState(0);
    const size = 30;

    const manageMouseMove = (e: any) => {
        const { clientX, clientY } = e;

        mouse.current = {
            x: clientX,
            y: clientY
        }

        moveCircle(mouse.current.x, mouse.current.y);
    }

    const moveCircle = (x: number, y: number) => {
        gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 })
    }

    useEffect(() => {
        window.document.body.addEventListener("mouseleave", () => setOpacity(0))
        window.document.body.addEventListener("mouseenter", () => setOpacity(1))

        window.addEventListener("mousemove", manageMouseMove);
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
        }
    }, [])

    return (
        <div className='h-0'>
            <div
                ref={circle}
                style={{
                    backgroundColor: "white",
                    width: size,
                    height: size,
                    opacity: opacity as any,
                }}
                className='top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none z-30'
            />
        </div>
    )
}