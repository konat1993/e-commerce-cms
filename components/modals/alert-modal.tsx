"use client"

import React from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}: Props) => {
    const [isMounted, setIsMounted] = React.useState(false)


    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }


    return (
        <Modal
            title="Are you sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default AlertModal