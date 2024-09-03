'use client';

import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import useMeasure from 'react-use-measure';

export function Background() {
    let [ref, { width }] = useMeasure();
    const xTranslation = useMotionValue(0);

    useEffect(() => {
        const finalPosition = -width / 2 - 50;
        const controls = animate(xTranslation, [0, finalPosition], {
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            repeatDelay: 0,
        });
        return () => controls.stop();
    }, [xTranslation, width]);

    return <div className="absolute self-start h-full -z-10 bg-white dark:bg-black">
        <div className="relative h-full w-full">
            <motion.div style={{ x: xTranslation }} ref={ref} className="relative h-full flex items-center gap-x-[100px] bg-white dark:bg-black">
                {
                    Array(40).fill(0).map((_, i) => (<div key={i} className="h-full flex flex-col relative flex" style={{ height: "calc(80%)" }}>
                        {i % 4 == 0 ? <div className="absolute top-[-30px] left-1/2 translate-x-[-50%] text-center text-md w-[200px] text-black dark:text-white">{1890 + Math.floor((i % 20) / 4) * 10}</div> : null}

                        <svg width="5" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 0L2.5 3000" stroke="#A8A8A8" strokeDasharray="5 5" />
                            {i % 4 == 0 && <circle cx="2.5" cy="2.5" r="2.5" className='fill-black dark:fill-white' />}
                        </svg>
                    </div>))
                }
            </motion.div>
        </div>
    </div>
}