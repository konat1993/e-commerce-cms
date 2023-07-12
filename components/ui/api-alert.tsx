"use client"

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Copy, Server } from 'lucide-react'
import { Badge, BadgeProps } from './badge'
import { Button } from './button'
import { toast } from 'react-hot-toast'
import AbsoluteSkeleton from './absolute-skeleton'

type Props = {
    title: string
    description: string
    variant: "public" | "admin"
    loading?: boolean
}

const textMap: Record<Props["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert = ({ title, description, variant = "public", loading = false }: Props) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("API Route copied to clipboard!")
    }

    return (
        <AbsoluteSkeleton loading={loading} className='h-28'>
            <Alert>
                <Server className='h-4 w-4' />
                <AlertTitle className='flex items-center gap-x-2'>
                    {title}
                    <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
                </AlertTitle>
                <AlertDescription className='mt-4 flex items-center justify-between'>
                    <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                        {description}
                    </code>
                    <Button variant="outline" size="icon" onClick={onCopy}>
                        <Copy className='h-4 w-4' />
                    </Button>
                </AlertDescription>
            </Alert>
        </AbsoluteSkeleton>
    )
}

export default ApiAlert