import React, { useState } from 'react';
import {useAuth} from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../Components/Alert';

export default function Register(){

    const [user, setUser] = useState({
        email : '',
        password : ''
    });

    const {signup} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState()

    const handleChange = ({target : {name, value}}) =>setUser({...user, [name]: value});
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('')
        try{
            await signup(user.email, user.password);
            navigate('/');
        }catch(e){
            setError(e.message)
        }
    }

    return(
        <div className='w-full max-w-xs m-auto'> 
            {error && <Alert message={error} />}
            <form 
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700 text-sm font-bold my-2' >
                Email
                </label>
                <input 
                type='email'
                name='email' 
                placeholder='youremail@company.ltd' 
                id='email' 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={handleChange}/>
            </div>

            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700 text-sm font-bold my-2' >
                Password
                </label>
                <input 
                type='password'
                name='password' 
                id='password' 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='******' 
                onChange={handleChange}/>
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm'>Register</button>
        </form>
        <p className='my-4 text-sm flex justify-between px-3'>Already have an Account? <Link to='/login'>Login</Link></p>
        </div>
    )
}