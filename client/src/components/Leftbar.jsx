import { useState } from 'react'
import { SearchIcon } from '../assets/Icons/Search'
import Search from './Search'
import UserInfo from './UserInfo'
import { UseContext } from '../context/appContext'
import { LogoutIcon } from '../assets/Icons/LogOut'
import { useNavigate } from 'react-router-dom'

const Leftbar = () => {
    const [toggle, setToggle] = useState(false)
    const [toggleUserInfo, setToggleUserInfo] = useState(false)
    const { user } = UseContext()
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate("/signin")
    }
    return (
        <div className='relative min-h-screen w-12 flex flex-col items-center justify-between py-14 shadow-xl'>
            <div className=' '>
                <button onClick={() => {
                    setToggle(!toggle)
                }}>
                    <SearchIcon className={'h-6 w-6 text-indigo-600 hover:text-indigo-400 transition duration-300 '} />
                </button>
            </div>
            <div className=' space-y-4'>
                <button
                    onClick={logout}>
                    <LogoutIcon className={"h-6 w-6 text-black/70 hover:text-black duration-300"} />
                </button>
                <div className=' relative'>
                    <button
                        onClick={() => {
                            setToggleUserInfo(!toggleUserInfo)
                        }}
                        className=' h-6 w-6 bg-slate-400 rounded-full overflow-hidden '>
                        <img
                            src={user?.picture}
                            alt=""
                            className=' object-cover h-6 w-6' />
                    </button>
                    {
                        toggleUserInfo
                        &&
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='absolute left-12 bottom-0 z-10 userInfo'>
                            <UserInfo />
                        </div>
                    }
                </div>
            </div>
            {
                toggle
                &&
                <div className='absolute left-12 top-0 z-10'>
                    <Search setToggle={setToggle} />
                </div>
            }
        </div>
    )
}

export default Leftbar