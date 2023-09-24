import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between px-5 py-4 '>
                <div>
                    <h1 className='text-lg'>Chat-App</h1>
                </div>
                <div className='space-x-5'>
                    <Link to={"/signin"} className='text-white bg-indigo-500 py-2 px-5 rounded-sm focus:outline-none'>Sign in</Link >
                    <Link to={'/signup'} className='text-white bg-indigo-500 py-2 px-5 rounded-sm focus:outline-none'>Sign up</Link >
                </div>
            </nav>
        </div>
    )
}

export default Navbar