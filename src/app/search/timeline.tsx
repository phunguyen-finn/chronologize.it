'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Marker, Timeline } from '@/services/openai.service';
import Modal from "antd/es/modal";
import Details from '@/components/Details';
import { createTimeline, generateDetails, loadMore, updateTimeline } from '@/services/server.actions';
import { CheckOutlined, CopyOutlined, ExpandAltOutlined, ShareAltOutlined } from '@ant-design/icons';
import { readStreamableValue } from 'ai/rsc';
import Segment from '@/components/Segment';
import TimeDivider from '@/components/TimeDivider';
import { Input, Space } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function TimelineVisualizer({ initTimeline }: { initTimeline: Timeline }) {
    const ref = useRef<any>(null);
    const { scrollY } = useScroll({
        target: ref,
    });
    const x = useTransform(scrollY, [0, 100], ["0px", "-100px"], { clamp: false });
    const [open, setOpen] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<number>(0);
    const [timeline, setTimeline] = useState(initTimeline);
    const [loading, setLoading] = useState<number>(-1);
    const [sharing, setSharing] = useState<boolean>(false);
    const [shareId, setShareId] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);
    const shareUrl = useMemo(() => (shareId == "") ? "" : "https://" + window?.location.hostname + "/share/" + shareId, [shareId]);

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
        loadMore(timeline.title, startMarker, endMarker).then((data) => {
            const new_timeline = {
                ...timeline,
                markers: [...timeline.markers.slice(0, index), ...data.markers, ...timeline.markers.slice(index)]
            }
            setTimeline(new_timeline);
            setLoading(-1);
            if (shareId) updateTimeline(shareId, new_timeline);
        });
    };

    const handleShare = () => {
        if (shareId) {
            setOpenShare(true);
            return;
        }
        setSharing(true);
        createTimeline(timeline).then((id) => {
            setSharing(false);
            setOpenShare(true);
            setShareId(id);
        });
    }

    return <div>
        <div className="fixed top-0 right-0 p-5 z-20">
            <button
                disabled={sharing}
                onClick={handleShare}
                style={{ opacity: sharing ? 0.7 : 1 }}
                className="disabled:cursor-not-allowed cursor-pointer flex items-center gap-x-[10px] justify-center bg-black text-white p-2 rounded-lg hover:shadow-xl ease-in-out duration-100 px-2"
            >
                {sharing ? <svg aria-hidden="true" className="inline w-3 h-3 text-black animate-spin dark:text-white fill-white dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg> : <ShareAltOutlined />}Share
            </button>
        </div>
        <div ref={ref} className="sm:flex-row relative sm:sticky sm:top-0 sm:flex sm:no-scrollbar w-full justify-center [@media(max-width:640px)]:!h-auto py-24 sm:py-0" style={{ height: `${timeline.markers.length * 530 + 500 + (loading != -1 ? 1 : 0) * 1590}px` }}>
            <div className="sm:max-h-[100vh] flex sm:sticky top-0 flex h-auto sm:h-screen items-center w-full overflow-y-auto sm:overflow-hidden no-scrollbar">
                <motion.div style={{ x }} className='[@media(max-width:640px)]:!transform-none static flex flex-col sm:flex-row h-[85%] px-5'>
                    <div className="static w-full sm:w-[300px] lg:w-[400px] h-auto sm:h-full sm:ml-[30px] sm:mr-[100px] lg:mx-[100px]">
                        <h1 className="font-bold text-2xl lg:text-3xl">
                            {timeline.title}
                        </h1>
                        <p>
                            {timeline.description}
                        </p>
                    </div>
                    <div className='relative flex flex-col sm:flex-row gap-y-[100px] sm:gap-[100px] mt-[60px] py-[60px] sm:mt-0'>
                        {
                            timeline.markers.map((marker: Marker, index: number) => {
                                return <React.Fragment key={index}>
                                    {loading == index && Array(3).fill(null).map((_, i) =>
                                        <Segment key={i} position={(index + i) % 2 ? "top" : "bottom"}>
                                            {(i == 0 && <div
                                                className='sm:flex group z-10 absolute left-1/2 -translate-x-[12px] sm:translate-x-0 top-[-80px] sm:h-full sm:w-[200px] duration-[200ms] sm:top-0 sm:left-[-202px] sm:items-center sm:justify-center'
                                            >
                                                <button
                                                    style={{ opacity: 1 }}
                                                    className="origin-center  h-7 w-7 flex items-center opacity-0 justify-center relative bg-black/[0.5] group-hover:opacity-100 hover:scale-150 hover:!bg-black sm:hover:rotate-45 ease-in-out duration-[200ms] text-white sm:w-10 sm:h-10 rounded-full">
                                                    {
                                                        loading == index
                                                            ? <svg aria-hidden="true" className="inline w-4 h-4 text-black animate-spin dark:text-white fill-white dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            : <ExpandAltOutlined color="white" />
                                                    }
                                                </button>
                                            </div>)}
                                        </Segment>)}
                                    <Segment marker={marker} handleClick={() => handleClick(index)} position={index % 2 ? "top" : "bottom"}>
                                        {(loading == -1 && index != 0) && <div
                                            className='sm:flex group z-10 absolute left-1/2 -translate-x-[12px] sm:translate-x-0 top-[-80px] sm:h-full sm:w-[200px] duration-[200ms] sm:top-0 sm:left-[-202px] sm:items-center sm:justify-center'
                                            onClick={() => handleLoadMore(index)}
                                        >
                                            <button
                                                className="origin-center hover:-rotate-45 h-7 w-7 flex items-center opacity-100 sm:opacity-0 justify-center relative bg-black/[0.5] group-hover:opacity-100 hover:scale-150 hover:!bg-black sm:hover:rotate-45 ease-in-out duration-[200ms] text-white sm:w-10 sm:h-10 rounded-full">
                                                {
                                                    loading == index
                                                        ? <svg aria-hidden="true" className="inline w-4 h-4 text-black animate-spin dark:text-white fill-white dark:fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        : <ExpandAltOutlined color="white" />
                                                }
                                            </button>
                                        </div>
                                        }
                                    </Segment>
                                </React.Fragment>
                            })
                        }
                        {
                            <div className="h-full sm:hidden flex flex-col absolute flex h-full top-0 left-1/2 z-0">
                                <svg width="5" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 0L2.5 100000" stroke="#000000" strokeDasharray="5 5" />
                                </svg>
                            </div>
                        }
                        <TimeDivider time={"Now"} style={{ marginRight: "100px" }} />
                    </div>
                    <span className='self-center mb-5 sm:hidden' >Now</span>
                </motion.div>
            </div>
        </div >
        <Modal
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
            closable={true}
            centered
            width="min(calc(100vw - 32px), 800px)"
        >
            <Details showDetailsSkeleton={true} marker={timeline.markers[selectedMarker] as Marker} />
        </Modal>
        <Modal
            open={openShare}
            footer={null}
            onCancel={() => { setOpenShare(false); setCopied(false); }}
            closable={true}
            centered
            width="min(calc(100vw - 32px), 500px)"
        >
            <h1 className='mt-3 text-xl font-bold'>Share this timeline</h1>
            <span>through the links below</span>
            <Space.Compact
                style={{
                    width: '100%',
                    margin: '20px 0px'
                }}
            >
                <Input disabled value={shareUrl} />
                <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)} >
                    <button
                        style={{ borderRadius: '0px 5px 5px 0px' }}
                        className='flex items-center gap-x-[10px] justify-center bg-black text-white p-2 hover:shadow-xl ease-in-out duration-100 px-2' >
                        {copied ? <CheckOutlined /> : <CopyOutlined />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </CopyToClipboard>
            </Space.Compact>
        </Modal>
    </div>
}