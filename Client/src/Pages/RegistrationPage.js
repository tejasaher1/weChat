import styles from "../Styles/RegistrationPage.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { handleError,handleSuccess } from '../utils';
import { ToastContainer} from 'react-toastify';


export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    Firstname : "",
    Lastname : "",
    Email : "",
    Password : "",
    Confirmpassword : "",
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const {Email, Password} = formData;

    if(!Email || !Password) {
      return handleError('Fill all details');
  }

    try{
      const responce = await Axios.post(`https://wechat-1go6.onrender.com/user/registartion`, formData);
      if(responce.data.success){
        handleSuccess('Registration Successful')
        setTimeout(() => {
          Navigate('/sign-in');
        },3000);
      }
    }catch(err){
        handleError('Error sending form data')
        console.error('Error sending form data:', err);
        return handleError('Error in registration');
    }
        
  };
  

  return (
    <>
    <div className={styles.mainFormDiv}>
        <form className={styles.form} onSubmit={handleSubmitLogin}>
            <p className={styles.title}>Registration</p>

           
            <div className={styles.flex}>
                
              <label> 
                  <input autoFocus className={styles.input} name="Firstname" type="text" placeholder="" onChange={handleChange} required /> 
                  <span>Firstname</span>  
                </label>
                <label>
                  <input className={styles.input} name="Lastname" type="text" placeholder="" onChange={handleChange} required />
                  <span>Lastname</span>
              </label>
                  
                  
            </div>

            <label>
                <input className={styles.input} type="email" name="Email" placeholder="" onChange={handleChange} required />
                <span>Email</span>
            </label>

            <label>
                <input className={styles.input} type="password" name="Password" placeholder="" onChange={handleChange} required />
                <span>Password</span>
            </label>
            
            <label>
                <input className={styles.input} type="password" name="Confirmpassword" placeholder="" onChange={handleChange} required />
                <span>Confirm password</span>
            </label>
            
            <button className={styles.submit}>Submit</button>
            
            <p className={styles.signin}>
                Already have an account? <Link to="../sign-in"> signin </Link>
            </p>
        </form>
    </div>
    <ToastContainer />
    </>
  );
}
