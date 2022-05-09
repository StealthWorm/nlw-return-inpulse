import { X } from 'phosphor-react'
import { useState } from 'react'
import { Popover } from '@headlessui/react'

export function CloseButton() {
   return (
      <Popover.Button className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100" title="Fechar forulario de feedback">
         <X weight="bold" className="w-4 h-4" />
      </Popover.Button>
   )
}