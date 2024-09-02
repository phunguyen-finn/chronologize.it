'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Marker, Timeline } from '@/services/openai.service';
import Image from 'next/image';

const Divider = ({ time, style, className }: any) => {
    return <div className={"h-full flex flex-col relative self-end" + className} style={{ height: "calc(100% - 30px)", ...style }}>
        {time ? <div className="absolute top-[-30px] left-1/2 translate-x-[-50%] text-center text-md w-[100px]">{time}</div> : null}
        <svg width="5" height="100%" viewBox="0 0 5 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0L2.5 3000" stroke="#A8A8A8" strokeDasharray="5 5" />
            {
                time
                    ? <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                    : null
            }
        </svg>
    </div>
}

export default function TimelineVisualizer({ timeline }: { timeline: Timeline }) {
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const width = useTransform(scrollYProgress, [0, 1], ["50vw", "100vw"]);
    const _x = useTransform(() => `calc(${x.get()} + ${width.get()})`)

    return <div>
        <div ref={ref} className="hidden sm:flex sticky top-0 flex no-scrollbar w-full justify-center" style={{ height: `${timeline.markers.length * 350}px` }}>
            <div className="max-h-[1080px] sticky top-0 flex h-screen items-center w-full overflow-hidden no-scrollbar">
                <motion.div style={{ x: _x }} className='relative flex h-[75%] px-5 translate-x-[100%] gap-[100px]'>
                    <div className="absolute w-[300px] left-0 -translate-x-full h-full">
                        <h1 className="font-bold text-2xl">
                            {timeline.title}
                        </h1>
                        <p>
                            {timeline.description}
                        </p>
                    </div>
                    {
                        timeline.markers.map((marker: Marker, index: number) => {
                            return <div key={index} className="flex items-center relative gap-[100px]">
                                <Divider time={marker.time} />
                                <Divider />
                                <Divider />
                                <Divider />
                                <Divider />
                                <div className={`border-black border-[1px] absolute left-10 ease-in-out	duration-100 hover:shadow-2xl bg-white rounded-md flex flex-col p-4 w-[60%] ${index % 2 ? 'top-[15%]' : 'bottom-[15%]'}`}>
                                    <div className="text-lg font-bold">{marker.title}</div>
                                    <div className="text-md">{marker.preview}</div>

                                    {
                                        marker.thumbnailUrl && marker.width && marker.height && marker.width / marker.height >= 0.7 && <Image
                                            src={marker.thumbnailUrl}
                                            alt={marker.title}
                                            width={marker.width}
                                            height={marker.height}
                                            style={{ width: '100%', height: 'auto' }}
                                            className='rounded-md border-black border-[1px] mt-5'
                                        />
                                    }
                                    {
                                        marker.thumbnailUrl && marker.width && marker.height && marker.width / marker.height < 0.7 &&
                                        <div className="relative w-full h-[200px] mt-5 rounded-md border-black border-[1px]">
                                            <Image
                                                src={marker.thumbnailUrl}
                                                alt={marker.title}
                                                layout="fill"
                                                objectFit="contain"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        })
                    }
                    <Divider time={"Now"} style={{ marginRight: "100px" }} />
                </motion.div>
            </div>
        </div >
        <div className='block sm:hidden flex flex-col items-center justify-center p-5'>
            {
                timeline.markers.map((marker: Marker, index: number) => {
                    return <div key={index} className='mt-5'>
                        <span>{marker.time}</span>
                        <div className={`border-black border-[1px] left-10 ease-in-out duration-100 hover:shadow-2xl bg-white rounded-md flex flex-col p-4 w-full max-w-[300px]`}>
                            <div className="text-base font-bold">{marker.title}</div>
                            <div className="text-xs">{marker.preview}</div>

                            {
                                marker.thumbnailUrl && marker.width && marker.height && marker.width / marker.height >= 0.7 && <Image
                                    src={marker.thumbnailUrl}
                                    alt={marker.title}
                                    width={marker.width}
                                    height={marker.height}
                                    style={{ width: '100%', height: 'auto' }}
                                    className='rounded-md border-black border-[1px] mt-5'
                                />
                            }
                            {
                                marker.thumbnailUrl && marker.width && marker.height && marker.width / marker.height < 0.7 &&
                                <div className="relative w-full h-[200px] mt-5 rounded-md border-black border-[1px]">
                                    <Image
                                        src={marker.thumbnailUrl}
                                        alt={marker.title}
                                        layout="fill"
                                        objectFit="contain"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </div >
}