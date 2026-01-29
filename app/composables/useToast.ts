export interface Toast {
    id: string
    title: string
    description?: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
}

export const useToast = () => {
    const toasts = useState<Toast[]>('toasts', () => [])

    const add = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9)
        toasts.value.push({
            id,
            ...toast,
            duration: toast.duration ?? 5000
        })

        if (toast.duration !== 0) {
            setTimeout(() => {
                remove(id)
            }, toast.duration ?? 5000)
        }

        return id
    }

    const remove = (id: string) => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    const success = (title: string, description?: string) => {
        add({ title, description, type: 'success' })
    }

    const error = (title: string, description?: string) => {
        add({ title, description, type: 'error' })
    }

    const info = (title: string, description?: string) => {
        add({ title, description, type: 'info' })
    }

    const warning = (title: string, description?: string) => {
        add({ title, description, type: 'warning' })
    }

    return {
        toasts,
        add,
        remove,
        success,
        error,
        info,
        warning
    }
}
