'use client';

import { Marker } from "@/services/openai.service";
import Divider from "antd/es/divider";
import Image from "next/image";

export default function Details({ marker }: { marker: Marker }) {
    return <div className='flex flex-col h-full sm:grid sm:grid-cols-3 items-left w-full py-6 gap-x-4'>
        {
            marker.thumbnailUrl && <>
                <div className='sm:col-span-1'>
                    {
                        marker.thumbnailUrl && <Image src={marker.thumbnailUrl as string} alt={marker.title} width={800} height={800} style={{
                            width: '100%',
                            height: 'auto',
                        }} />
                    }
                </div>
                <div className='sm:col-span-2 flex flex-col'>
                    <h1 className='mt-3 font-bold '>{marker.title}</h1>
                    <p className='text-gray-600'>{marker.time}</p>
                    <Divider style={{ margin: '10px 0px' }} />
                    <div className='flex w-full'><p>{marker.details}</p></div>
                </div>
            </>
        }
        {
            !marker.thumbnailUrl && <>
                <div className='sm:col-span-3 flex flex-col'>
                    <h1 className='mt-3 font-bold '>{marker.title}</h1>
                    <p className='text-gray-600'>{marker.time}</p>
                    <Divider style={{ margin: '10px 0px' }} />
                    <div className='flex w-full'><p>{marker.details}</p></div>
                </div>
            </>
        }
    </div>;
}