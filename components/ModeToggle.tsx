"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { memo, useCallback } from "react"

 function ModeToggle() {
  const { setTheme } = useTheme()
  const handleLightClick = useCallback(() => setTheme("light"), [setTheme])
  const handleDarkClick = useCallback(() => setTheme("dark"), [setTheme])
  const handleSystemClick = useCallback(() => setTheme("system"), [setTheme])


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLightClick}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDarkClick}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystemClick}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(ModeToggle);