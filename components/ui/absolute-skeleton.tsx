"use client"

import React from 'react'
import { Skeleton } from './skeleton'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLElement> & {
    className?: React.HTMLAttributes<HTMLDivElement>["className"]
    loading: boolean
}

const AbsoluteSkeleton = ({ children, className, loading }: React.PropsWithChildren<Props>) => {
    return (
        <div className={cn(
            className,
            "relative w-full"
        )}>
            {loading && <Skeleton className="h-full w-full absolute z-[999999] top-0 left-0 bottom-0 scale-[1]" />}
            <div className={`${loading ? "invisible" : "visible"}`}>{children}</div>
        </div>
    )
}

export default AbsoluteSkeleton