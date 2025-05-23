"use client"

import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/redux/authSlice"
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { motion } from "framer-motion"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const { loading } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Welcome Back</h2>
            <p className="text-primary-foreground/80">Log in to access your account and explore our platform.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <form onSubmit={submitHandler} className="card-themed shadow-2xl rounded-lg p-8 space-y-6">
              <h1 className="font-bold text-3xl mb-6 text-center text-card-foreground lg:hidden">Welcome Back</h1>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    className="w-full pl-10 pr-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="youremail@example.com"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full pl-10 pr-10 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Your secure password"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none bg-transparent border-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full button-primary-themed font-bold py-3 rounded-md transition duration-300 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-primary hover:text-primary/80 transition duration-200">
                  Sign Up
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
