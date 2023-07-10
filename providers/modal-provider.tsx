"use client"

import { useState, useEffect } from 'react'

import StoreModal from '@/components/modals/store-modal'
import useMounted from '@/hooks/useMounted'

const ModalProvider = () => {
    const isMounted = useMounted()

    if (!isMounted) return null

    return (
        <StoreModal />
    )
}

export default ModalProvider