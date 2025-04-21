"use client"

import { useTheme } from "@/context/ThemeContext"
import { Palette } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const ThemeSwitcher = () => {
  const { changeTheme, themes, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
          <span
            className="absolute bottom-0 right-0 h-2 w-2 rounded-full"
            style={{
              backgroundColor:
                theme === themes.default
                  ? "black"
                  : theme === themes.dark
                    ? "#1e293b"
                    : theme === themes.purple
                      ? "#9333ea"
                      : theme === themes.green
                        ? "#10b981"
                        : "#3b82f6",
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="card-themed">
        <DropdownMenuItem
          onClick={() => changeTheme(themes.default)}
          className={`flex items-center gap-2 ${theme === themes.default ? "bg-primary/10" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-900"></div>
            <span>Default</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme(themes.dark)}
          className={`flex items-center gap-2 ${theme === themes.dark ? "bg-primary/10" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-800"></div>
            <span>Dark</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme(themes.purple)}
          className={`flex items-center gap-2 ${theme === themes.purple ? "bg-primary/10" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-purple-600"></div>
            <span>Purple</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme(themes.green)}
          className={`flex items-center gap-2 ${theme === themes.green ? "bg-primary/10" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-600"></div>
            <span>Green</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeTheme(themes.blue)}
          className={`flex items-center gap-2 ${theme === themes.blue ? "bg-primary/10" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
            <span>Blue</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcher
