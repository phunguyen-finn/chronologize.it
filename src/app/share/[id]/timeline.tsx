'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Marker, Timeline } from '@/services/openai.service';
import Modal from "antd/es/modal";
import Details from '@/components/Details';
import Segment from '@/components/Segment';
import TimeDivider from '@/components/TimeDivider';
import { CloseOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { ConfigProvider } from 'antd';

export default function TimelineVisualizer({ initTimeline }: { initTimeline: Timeline }) {
    const ref = useRef<any>(null);
    const { scrollY } = useScroll({
        target: ref,
    });
    const x = useTransform(scrollY, [0, 100], ["0px", "-100px"], { clamp: false });
    const [open, setOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<number>(0);
    const [timeline, setTimeline] = useState(initTimeline);
    const { theme } = useTheme();

    const handleClick = async (index: number) => {
        setSelectedMarker(index);
        setOpen(true);
    }

    return <ConfigProvider
        theme={{
            components: {
                Modal: {
                    contentBg: theme == "light" ? "white" : "black",
                },
            },
        }}
    >
        <div>
            <div ref={ref} className="sm:flex-row relative sm:sticky sm:top-0 sm:flex sm:no-scrollbar w-full justify-center [@media(max-width:640px)]:!h-auto py-14 sm:py-0" style={{ height: `${timeline.markers.length * 530 + 500}px` }}>
                <div className="sm:max-h-[100vh] flex sm:sticky top-0 flex h-auto sm:h-screen items-center w-full overflow-y-auto sm:overflow-hidden no-scrollbar">
                    <motion.div style={{ x }} className='[@media(max-width:640px)]:!transform-none static flex flex-col sm:flex-row h-[75%] px-5'>
                        <div className="static w-full sm:w-[300px] lg:w-[400px] h-auto sm:h-full sm:ml-[30px] sm:mr-[100px] lg:mx-[100px]">
                            <h1 className="font-bold text-2xl lg:text-3xl dark:text-white">
                                {timeline.title}
                            </h1>
                            <p className='dark:text-white'>
                                {timeline.description}
                            </p>
                        </div>
                        <div className='relative flex flex-col sm:flex-row gap-y-[100px] sm:gap-[100px] mt-[60px] py-[60px] sm:mt-0'>
                            {
                                timeline.markers.map((marker: Marker, index: number) => {
                                    return <React.Fragment key={index}>
                                        <Segment marker={marker} handleClick={() => handleClick(index)} position={index % 2 ? "top" : "bottom"} />
                                    </React.Fragment>
                                })
                            }
                            {
                                <div className="h-full sm:hidden flex flex-col absolute flex h-full top-0 left-1/2 z-0">
                                    <svg width="5" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 0L2.5 100000" stroke="#A8A8A8" strokeDasharray="5 5" />
                                    </svg>
                                </div>
                            }
                            <TimeDivider time={"Now"} style={{ margin: "0px 100px" }} />
                        </div>
                        <span className='self-center mb-5 sm:hidden dark:text-white'>Now</span>
                    </motion.div>
                </div>
            </div >
            <Modal
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                closable={true}
                centered
                closeIcon={<CloseOutlined style={theme === 'dark' ? { color: "white" } : {}} />}
                width="min(calc(100vw - 32px), 800px)"
            >
                <Details showDetailsSkeleton={true} marker={timeline.markers[selectedMarker] as Marker} />
            </Modal >;
        </div>
    </ConfigProvider>
}