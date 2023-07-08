"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'

import { PopoverTriggerProps } from '@radix-ui/react-popover'
import { Store } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { cn } from '@/lib/utils'
import { useStoreModal } from '@/hooks/use-store-modal'

type Props = PopoverTriggerProps & {
  items: Store[]
}

const StoreSwitcher = ({ className, items = [] }: Props) => {
  const storeModal = useStoreModal()
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = React.useState(false)


  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find(item => item.value === params.storeId)
  const defaultStoreText = currentStore?.label || "Select store..."

  const onStoreSelect = (store: typeof formattedItems[0]) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-combo_box justify-between", className)}
          title={defaultStoreText}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {defaultStoreText}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-combo_box p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map(store => (
                <CommandItem
                  key={store.value}
                  className="text-sm"
                  onSelect={() => onStoreSelect({ label: store.label, value: store.value })}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {store.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher