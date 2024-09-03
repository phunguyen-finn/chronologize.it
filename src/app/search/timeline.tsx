'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Marker, Timeline } from '@/services/openai.service';
import Modal from "antd/es/modal";
import Details from './details';
import { generateDetails, loadMore } from '@/services/server.actions';
import { ExpandAltOutlined } from '@ant-design/icons';
import { readStreamableValue } from 'ai/rsc';
import Segment from '@/components/Segment';
import TimeDivider from '@/components/TimeDivider';

export default function TimelineVisualizer({ initTimeline }: { initTimeline: Timeline }) {
    const ref = useRef<any>(null);
    const { scrollY } = useScroll({
        target: ref,
    });
    const x = useTransform(scrollY, [0, 100], ["0px", "-100px"], { clamp: false });
    const [open, setOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<number>(0);
    const [timeline, setTimeline] = useState(initTimeline);
    const [loading, setLoading] = useState(-1);

    const handleClick = async (index: number) => {
        setSelectedMarker(index);
        setOpen(true);

        if (timeline.markers[index].details) {
            return;
        }

        const { output } = await generateDetails(timeline.title, timeline.markers[index]);

        for await (const delta of readStreamableValue(output)) {
            setTimeline((timeline: any) => {
                return {
                    ...timeline,
                    markers: timeline.markers.map((marker: Marker, i: number) => {
                        if (i == index) {
                            return {
                                ...marker,
                                details: `${marker.details ?? ""}${delta}`
                            }
                        }
                        return marker;
                    })
                }
            });
        }
    }

    const handleLoadMore = (index: number) => {
        if (index == 0) {
            return;
        }
        if (loading != -1) {
            return;
        }
        setLoading(index);
        const startMarker = timeline.markers[index - 1];
        const endMarker = timeline.markers[index];
        loadMore(timeline.title, startMarker, endMarker).then((newTimeline) => {
            setTimeline({
                ...timeline,
                markers: [...timeline.markers.slice(0, index), ...newTimeline.markers, ...timeline.markers.slice(index)]
            });
            setLoading(-1);
        });
    };

    return <div>
        <div ref={ref} className="sm:flex-row sm:relative sm:sticky sm:top-0 sm:flex sm:no-scrollbar w-full justify-center [@media(max-width:640px)]:!h-auto py-14 sm:py-0" style={{ height: `${timeline.markers.length * 500 + 400}px` }}>
            <div className="sm:max-h-[100vh] flex sm:sticky top-0 flex h-auto sm:h-screen items-center w-full overflow-y-auto sm:overflow-hidden no-scrollbar">
                <motion.div style={{ x }} className='[@media(max-width:640px)]:!transform-none static flex flex-col sm:flex-row h-[75%] px-5 gap-0 sm:gap-[100px]'>
                    <div className="static w-full sm:w-[300px] lg:w-[400px] h-auto sm:h-full md:ml-[100px]">
                        <h1 className="font-bold text-2xl lg:text-3xl">
                            {timeline.title}
                        </h1>
                        <p>
                            {timeline.description}
                        </p>
                    </div>
                    {
                        timeline.markers.map((marker: Marker, index: number) => {
                            return <Segment key={index} marker={marker} handleClick={() => handleClick(index)} position={index % 2 ? "top" : "bottom"}>
                                {(index != 0 && loading == -1) && <div className='hidden sm:flex opacity-0 group hover:opacity-100 absolute h-full w-[200px] duration-[200ms] top-0 left-[-202px] items-center justify-center'>
                                    <motion.button whileHover={{
                                        scale: 1.5, rotate: "45deg", transition: { duration: 0.1 }, backgroundColor: "rgba(0,0,0,1)"
                                    }}
                                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                                        className="relative opacity-0 group-hover:opacity-100 ease-in-out duration-[200ms] text-white w-10 h-10 rounded-full" onClick={() => handleLoadMore(index)}>
                                        <ExpandAltOutlined color="white" />
                                    </motion.button>
                                </div>
                                }
                                {
                                    loading == index && (<>
                                        <div className='hidden sm:flex opacity-100 absolute h-full w-[200px] duration-[200ms] top-0 left-[-202px] flex items-center justify-center'>
                                            <div
                                                className="relative opacity-100 ease-in-out duration-[200ms] bg-black flex items-center justify-center w-10 h-10 rounded-full scale-150" onClick={() => handleLoadMore(index)}>
                                                <svg aria-hidden="true" className="inline w-4 h-4 text-black animate-spin dark:text-white fill-white dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                    )

                                }
                            </Segment>
                        })
                    }
                    <TimeDivider time={"Now"} style={{ marginRight: "100px" }} />
                </motion.div>
            </div>
        </div >
        {/* <div className='block sm:hidden flex flex-col items-center justify-center p-5'>
            {
                timeline.markers.map((marker: Marker, index: number) => {
                    return <div key={index} className='mt-5'>
                        <span>{marker.time}</span>
                        <div onClick={() => handleClick(index)} className={`cursor-pointer border-black border-[1px] left-10 ease-in-out duration-100 hover:shadow-2xl bg-white rounded-md flex flex-col p-4 w-full max-w-[300px]`}>
                            <div className="text-base font-bold">{marker.title}</div>
                            <div className="text-xs">{marker.preview}</div>

                            {
                                marker.medias.length != 0 && marker.medias[0].width / marker.medias[0].height >= 0.7 && <Image
                                    src={marker.medias[0].url}
                                    alt={marker.title}
                                    width={marker.medias[0].width}
                                    height={marker.medias[0].height}
                                    style={{ width: '100%', height: 'auto' }}
                                    className='rounded-md border-black border-[1px] mt-5'
                                />
                            }
                            {
                                marker.medias.length != 0 && marker.medias[0].width / marker.medias[0].height < 0.7 &&
                                <div className="relative w-full h-[200px] mt-5 rounded-md border-black border-[1px]">
                                    <Image
                                        src={marker.medias[0].url}
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
        </div> */}
        <Modal
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
            closable={true}
            centered
            width="min(calc(100vw - 32px), 800px)"
        >
            <Details marker={timeline.markers[selectedMarker] as Marker} />
        </Modal >;
    </div >
}