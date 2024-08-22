import React, { useState } from 'react'
import img from '../assets/bg2.jpg'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            'http://localhost:4000/login', {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if(result !=="User Not Found"){
            navigate("/home")
        }
        else{
            alert("Incorrect Details :(")
        }
    }
    return (
        <> 
    
        <div className="w-screen h-screen flex flex-col  bg-no-repeat bg-cover bg-left" style={{ backgroundImage: `url(${img})` }}>
          <div className='text-2xl font-serif font-semibold text-white' >
          <div className=' w-3/5 h-fit pr-40 '>
                <form className='mt-16 bg-[#ffffff52] shadow-2xl  shadow-black p-10 border-black ml-32'> <br/>
                    <h1 className='text-center mb-8 text-purple-700'>Welcome Back Folks ! </h1> <br/>
                    <input type="text" value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} className='bg-purple-300 text-black  border-2 border-purple-700 text-lg p-2 mb-12  w-full rounded-lg focus:outline-none' />
                    <br /> 
                    <input type="password" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} className='bg-purple-300 text-black  border-2 border-purple-700 text-lg p-2 mb-8 w-full rounded-lg focus:outline-none' />
                    <br />
                    
                    <br />
                    <input type="button" value="Login" className='bg-gradient-to-r from-purple-700 to-purpe-400 text-xl px-20 py-3.5 my-12 rounded-3xl  text-black shadow-lg hover:shadow-xl hover:shadow-[#9e9e9e] hover:text-white hover:bg-[#000000] cursor-pointer w-full text-center no-underline border-2 border-purple-800' onClick={handleOnSubmit} />
                </form>
            </div>
          </div>
          </div>
        </>
    )
}

export default Login;