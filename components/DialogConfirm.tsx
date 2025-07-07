import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DialogConfirmProps {
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onClose: () => void
    open: boolean
    setOpen: (open: boolean) => void
}

export function DialogConfirm({
    title = "Tem certeza?",
    message = "Essa ação não poderá ser desfeita.",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onClose,
    open,
    setOpen
}: DialogConfirmProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={onClose} className="cursor-pointer">{cancelText}</Button>
                    </DialogClose>
                    <Button type="submit" onClick={onConfirm} className="cursor-pointer">{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
