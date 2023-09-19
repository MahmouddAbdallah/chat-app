import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types'
import { selectedUser } from "../redux/features/user";

const Contact = ({ online }) => {
    const [user, setUser] = useState([]);
    const dispatch = useDispatch()
    const getUser = useCallback(
        async () => {
            try {
                const { data } = await axios.get(`/user/${online}`)
                setUser([data.user]);
            } catch (error) {
                console.error(error);
            }
        }, [online])
    useEffect(() => { getUser() }, [getUser])


    return (
        <div>
            {user?.map((items) => {
                const selected = (e) => {
                    e.preventDefault()
                    dispatch(selectedUser({
                        id: items._id
                    }))
                }
                return (
                    <button onClick={selected} key={items._id}>
                        <div className="flex items-center gap-3">
                            <div>
                                <div className=' w-10 h-10 rounded-full bg-blue-500 relative'>
                                    <div className=" w-2 h-2 bg-green-400 rounded-full absolute bottom-0 right-1" />
                                </div>
                            </div>
                            <div>
                                {items.name.split(" ")[0]}
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

Contact.propTypes = {
    online: PropTypes.string
}

export default Contact;