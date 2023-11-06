import React, {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'


export const RegisterPage = () => {

    const {handleUserRegister} = useAuth()

    const [credentials, setCredentials] = useState({name:'', email:'', password1:'', password2:''})

    const handleInputChange = (e) => {
        let name = e.target.name 
        let value = e.target.value
    
        setCredentials( {...credentials, [name]:value} ) // [ ] says the vaue os dynaic
      }

      
  return (
    <div className='auth--container'>
    <div className="form--wrapper">
      <form onSubmit={(e) => (handleUserRegister(e, credentials))}>
      
        <div className="field--wrapper">
          <label htmlFor="Name">Name:</label>
          <input type="text" required name='name' placeholder='Enter Your Name...' value={credentials.name} onChange={handleInputChange} />
        </div>

        <div className="field--wrapper">
          <label htmlFor="Email">Email:</label>
          <input type="email" required name='email' placeholder='Enter Your Email...' value={credentials.email} onChange={handleInputChange} />
        </div>

        <div className="field--wrapper">
          <label htmlFor="Password1">Password:</label>
          <input type="password" required name='password1' placeholder='Enter Your Password...' value={credentials.password1} onChange={handleInputChange} />
        </div>

        <div className="field--wrapper">
          <label htmlFor="Password2">Confirm Password:</label>
          <input type="password" required name='password2' placeholder='Confirm Your Password...' value={credentials.password2} onChange={handleInputChange} />
        </div>

        <div className="field--wrapper">
          <input type="submit" value="LogIn" className='btn btn--lg btn--main' />
        </div>
      </form>

      <p>Already have an account? Login <Link to="/login">here</Link>!</p>


    </div>
</div>
  )
}
