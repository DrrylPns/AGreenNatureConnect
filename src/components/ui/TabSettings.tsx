"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const TabSettings = TabsPrimitive.Root

const TabSettingsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      " inline-flex w-full items-center justify-start  gap-0 border-b-2 border-border p-0 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabSettingsList.displayName = TabsPrimitive.List.displayName;

const TabSettingsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "mx-2 -mb-[2px] inline-flex items-center justify-start  whitespace-nowrap border-b-2 px-2  py-2   text-base font-medium  transition-all first-of-type:ml-0 disabled:pointer-events-none disabled:text-muted-foreground data-[state=active]:border-primary data-[state=inactive]:border-transparent data-[state=active]:font-semibold data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  />
));
TabSettingsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabSettingsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2  ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabSettingsContent.displayName = TabsPrimitive.Content.displayName

export { TabSettings, TabSettingsList, TabSettingsTrigger, TabSettingsContent }
