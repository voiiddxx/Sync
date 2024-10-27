"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { BadgeCheckIcon } from "lucide-react"
import { BugAntIcon } from "@heroicons/react/24/solid"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2 ml-2 items-center text-zinc-300">
              {
                variant === 'destructive'  ? <BugAntIcon className="size-4 text-red-400" /> : <BadgeCheckIcon className="size-5 text-green-400 shadow-xl" />
              }
              {description && (
                <ToastDescription >{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
