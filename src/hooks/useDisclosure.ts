import { useState } from "react"

export const useDisclosure = () => {
    const [isOpen, setOpen] = useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    return {isOpen, onOpen, onClose}
} 