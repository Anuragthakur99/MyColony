"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/context/ThemeContext"

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme } = useTheme()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <div className="text-center min-h-screen pt-16 flex flex-col justify-center items-center hero-themed p-8">
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <span className="mx-auto px-6 py-3 rounded-full bg-primary/20 backdrop-blur-sm text-primary font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          No.1 Service Provide Website
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span>Search, Apply &</span> <br />
          <span>Get Your</span> <span className="text-primary">Colony Service</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquid incidunt optio dolore veritatis.
        </p>
        <div className="flex w-full max-w-2xl mx-auto shadow-lg rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream Colony"
            onChange={(e) => setQuery(e.target.value)}
            className={`flex-grow px-6 py-4 text-lg bg-background/10 backdrop-blur-sm outline-none border-none ${
              theme === "default" ? "text-gray-800" : ""
            }`}
          />
          <Button
            onClick={searchJobHandler}
            className="h-15 px-8 py-4 button-primary-themed font-bold text-lg transition-all duration-300"
          >
            <Search className="h-6 w-6 mr-2" /> Search
          </Button>
        </div>
      </div>
      <div className="mt-16">
        <p className="text-lg">Trusted by leading companies worldwide</p>
        <div className="flex justify-center items-center gap-8 mt-4">
          {["Google", "Amazon", "Microsoft", "Apple"].map((company) => (
            <span key={company} className="text-2xl font-bold hover:text-primary transition-colors duration-300">
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
