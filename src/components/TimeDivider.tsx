'use client';

export default function TimeDivider({ time, style, className }: any) {
    return <div className={"h-full flex flex-col relative self-end" + className} style={{ height: "calc(100% - 30px)", ...style }}>
        {time ? <div className="absolute top-[-30px] left-1/2 translate-x-[-50%] text-center text-md w-[200px]">{time}</div> : null}
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
