// Skeleton loader for message content
'use client';

const MessageContentSkeleton = () => {
    return (
        <div className="flex h-[85%] w-full flex-col gap-6 overflow-y-auto p-6 bg-white">
            {[...Array(3)].map((_, idx) => (
                <div key={idx} className="rounded-md border border-gray-200 bg-white shadow-sm animate-pulse p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div className="flex flex-col gap-2 w-full">
                            <div className="h-4 w-1/3 bg-gray-200 rounded" />
                            <div className="h-3 w-1/4 bg-gray-100 rounded" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="h-3 w-16 bg-gray-100 rounded" />
                            <div className="h-3 w-12 bg-gray-100 rounded" />
                        </div>
                    </div>
                    <div className="h-4 w-1/2 bg-gray-100 rounded" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded" />
                </div>
            ))}
        </div>
    );
};

export default MessageContentSkeleton;
