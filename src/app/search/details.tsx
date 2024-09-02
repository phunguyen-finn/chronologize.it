'use client';

import { Marker } from "@/services/openai.service";
import Divider from "antd/es/divider";
import Image from "next/image";

export default function Details({ marker }: { marker: Marker }) {
    return <div className='flex flex-col h-full sm:grid sm:grid-cols-4 items-left w-full py-6 gap-x-4'>
        {
            marker.medias.length == 0 && <>
                <div className='sm:col-span-4 flex flex-col'>
                    <h1 className='mt-3 font-bold '>{marker.title}</h1>
                    <p className='text-gray-600'>{marker.time}</p>
                    <Divider style={{ margin: '10px 0px' }} />
                    <div className='flex w-full'><p>{marker.details}</p></div>
                </div>
            </>
        }
        {
            marker.medias.length != 0 && <>
                <div className='sm:col-span-2 flex flex-col mb-5'>
                    <p className='text-gray-600'>{marker.time}</p>
                    <h1 className='mt-3 font-bold '>{marker.title}</h1>
                    <p className='text-gray-600'>{marker.preview}</p>
                    <Divider style={{ margin: '10px 0px' }} />
                    <div className='flex w-full'><p>{marker.details}</p></div>
                </div>
                <div className='sm:col-span-2 h-full max-h-[80vh] overflow-y-auto no-scrollbar'>
                    {
                        marker.medias.map((media, index) => {
                            return <div key={index} className='flex flex-col gap-y-2 mb-5'>
                                <Image src={media.url} alt={media.title} width={media.width} height={media.height} style={{ width: "100%", height: "auto" }} />
                                <p className="text-gray-600 italic">{media.title}, from Wikipedia</p>
                            </div>
                        })
                    }
                </div>
            </>
        }
    </div>;
}