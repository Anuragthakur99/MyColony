"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { motion } from "framer-motion"
import ThemeSwitcher from "../ThemeSwitcher"
import AnalogClock from "../AnalogClock" // Import the AnalogClock component

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      dispatch(setUser(null))
      navigate("/")
      toast.success(res.data?.message || "Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      // Even if the server request fails, we should still log out the user locally
      dispatch(setUser(null))
      navigate("/")
      toast.success("Logged out successfully")
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 navbar-themed shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center">
          <h1 onClick={() => (window.location.href = "http://localhost:5173/")} className="text-2xl font-bold">
            My<span className="opacity-75">Colony</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* Add the clock here, before the navigation links with increased size */}
            <li className="mr-3 hidden md:block">
              <div className="flex items-center justify-center">
                <Link to="/clock" className="hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                  <AnalogClock size={60} className="border-2 border-gray-200 hover:border-primary" />
                </Link>
              </div>
            </li>

            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:opacity-80 transition-colors">
                    Colonies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:opacity-80 transition-colors">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:opacity-80 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:opacity-80 transition-colors">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:opacity-80 transition-colors">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to={"/login"}>
                  <Button className="button-secondary-themed">Login</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="button-primary-themed">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer border border-gray-300 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <AvatarImage
                      className="h-full w-full object-cover"
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="text-xs">{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-2 p-0 bg-transparent border-none" style={{ zIndex: 9999 }}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg overflow-hidden shadow-lg card-themed"
                  >
                    <div className="bg-primary p-4 text-primary-foreground">
                      <div className="flex items-center gap-4 ">
                        <Avatar className="cursor-pointer border-2 border-white h-16 w-16 rounded-full overflow-hidden">
                          <AvatarImage
                            className="h-full w-full object-cover"
                            src={user?.profile?.profilePhoto}
                            alt={user?.fullname || "User"}
                          />
                          <AvatarFallback className="bg-gray-200 text-xl font-bold flex items-center justify-center">
                            {user?.fullname?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-lg">{user?.fullname}</h4>
                          <p className="text-sm opacity-80">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col gap-3">
                        {user && user.role === "student" && (
                          <button>
                            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-colors">
                              <User2 className="h-5 w-5" />
                              <span>View Profile</span>
                            </Link>
                          </button>
                        )}
                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-2 hover:opacity-80 transition-colors"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
