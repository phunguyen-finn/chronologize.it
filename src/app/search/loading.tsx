export default function Loading() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-1/2 h-1/2 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-700"></div>
            </div>
        </div>
    );
}