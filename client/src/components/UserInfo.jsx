import React from 'react'
import PropTypes from 'prop-types'
import { UseContext } from '../context/appContext'

const UserInfo = props => {
    const { user } = UseContext()
    return (
        <div>
            <div className=' bg-white rounded py-3 px-5 w-[300px] '>
                <div className='flex justify-center pb-3'>
                    <div className='w-28 h-28 rounded-full overflow-hidden'>
                        <img
                            className='w-28 h-28 object-cover'
                            src={user?.picture}
                            alt="avatar" />
                    </div>
                </div>
                <div>
                    <div className=''>
                        <h6 className='font-semibold text-lg'>{user?.name?.split(" ")[0] + " " + user?.name?.split(" ")[1]}</h6>
                    </div>
                    <div>
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserInfo.propTypes = {}

export default UserInfo