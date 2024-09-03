'use client';

import { Marker } from "@/services/openai.service";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import TimeDivider from "./TimeDivider";
import Skeleton from "antd/es/skeleton";

const cardVariants = [{
    hover: { scale: 1.02, translateX: '0px', rotate: '0deg' },
    initial: { scale: 1, translateX: '0px', rotate: '0deg' }
}, {
    hover: { rotate: '5deg', translateX: '20px', translateY: '20px', opacity: 1 },
    initial: { rotate: '0deg', translateX: '0px', translateY: '0px', opacity: 1 }
},
{
    hover: { rotate: '-5deg', translateX: '-20px', translateY: '20px', opacity: 1 },
    initial: { rotate: '0deg', translateX: '0px', translateY: '0px', opacity: 1 }
}];

export default function Segment({ marker, children, handleClick, position }: { marker?: Marker, children?: ReactNode, handleClick?: any, position: "top" | "bottom" }) {
    return (
        <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: marker ? 1 : 0.9, opacity: marker ? 1 : 0 }} transition={{ ease: "easeIn", duration: 0.2 }} className="flex items-center relative gap-0 sm:gap-[100px]">
            {children}
            <TimeDivider time={marker?.time} />
            <TimeDivider />
            <TimeDivider />
            <TimeDivider />
            <TimeDivider />
            <span className="block sm:hidden absolute top-[-30px] left-1/2 z-10 -translate-x-1/2 bg-white w-11/12 text-center">{marker?.time}</span>
            <motion.div
                initial="initial"
                whileHover="hover"
                onClick={handleClick}
                className={`z-10 cursor-pointer border-black border-[1px] static sm:absolute left-10 ease-in-out duration-300 hover:shadow-2xl bg-white rounded-md flex flex-col p-4 w-full my-3 sm:w-[70%] ${position == 'top' ? 'top-[15%]' : 'bottom-[15%]'}`}>
                {marker
                    ? <>
                        <div className="text-lg font-bold">{marker.title}</div>
                        <div className="text-md mb-5">{marker.preview}</div>
                    </>
                    : <Skeleton active />
                }
                {
                    marker ? <motion.div className="relative bg-white" variants={cardVariants[0]}>
                        {
                            (marker.medias.length > 0 && marker.medias[0].width / marker.medias[0].height >= 0.8) ?
                                <Image
                                    src={marker.medias[0]?.url}
                                    alt={marker.title}
                                    width={marker.medias[0].width}
                                    height={marker.medias[0].height}

                                    style={{ width: '100%', height: 'auto' }}
                                    className='rounded-md border-black bg-white border-[1px] relative z-10'
                                /> : (marker.medias.length > 0 && <div className="relative w-full h-[200px] z-10">
                                    <div className='w-full h-full absolute bg-white z-0 rounded-md border-black border-[1px]' />
                                    <Image
                                        src={marker.medias[0].url}
                                        alt={marker.title}
                                        layout="fill"
                                        objectFit="contain"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>)
                        }
                        {
                            marker.medias.slice(1, 3).map((media, index) => {
                                return <motion.div
                                    key={index}
                                    className="absolute top-0 bg-white left-0 w-full h-full overflow-hidden rounded-md border-black border-[1px]"
                                    variants={cardVariants[(index + 1) % 3]}
                                    style={{ zIndex: index }}
                                >
                                    <Image
                                        src={media.url}
                                        alt={media.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </motion.div>
                            })
                        }
                    </motion.div>
                        : <Skeleton.Node style={{ width: '100%', height: '100px', marginTop: "20px" }} active><div></div></Skeleton.Node>
                }
            </motion.div>
        </motion.div>
    );
}