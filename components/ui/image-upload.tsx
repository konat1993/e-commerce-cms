"use client"

import useMounted from "@/hooks/useMounted"
import { Button } from "./button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

type Props = {
    disabled?: boolean
    onChange: (url: string) => void
    onRemove: (url: string) => void
    value: string[]
    multiple?: boolean
}

const ImageUpload = ({ value, onChange, onRemove, disabled, multiple = false }: Props) => {
    const isMounted = useMounted()

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!isMounted) {
        return (
            <div className="h-[256px] w-[255px]" />
        )
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map(url => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            src={url}
                            className="object-cover"
                            alt="Image"
                            fill
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset="scpu5pr8"
                options={{
                    folder: "store-app",
                    multiple

                }}
            >
                {({ open }) => (
                    <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={() => open()}
                    >
                        <ImagePlus className="w-4 h-4 mr-2" />
                        Upload an Image
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload