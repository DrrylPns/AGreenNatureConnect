"use client"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { Button } from "@/app/components/Ui/Button"
import { ArrowDownUp, CheckIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/app/components/Ui/command"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EnumValues } from "zod"
import { Community } from "@prisma/client"
import { useState } from "react"

export function PopoverVideo({ onSelectCommunity }: any) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const { isLoading, isError, data: communities } = useQuery({
        queryKey: ['video-tutorial-by-community'],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getVT");
                return data as Community[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    const handleSelectCommunity = (currentValue: any) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        onSelectCommunity(currentValue);
        console.log(currentValue)
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? communities?.find((community) => community.id === value)?.name
                        : "Select barangay..."}
                    <ArrowDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search community..." className="h-9" />
                    <CommandEmpty>No community found.</CommandEmpty>
                    <CommandGroup>
                        {communities?.map((community) => (
                            <CommandItem
                                key={community.id}
                                value={community.id}
                                onSelect={(currentValue) => {
                                    handleSelectCommunity(currentValue)
                                    setOpen(false)
                                }}
                            >
                                {community.name}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === community.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
