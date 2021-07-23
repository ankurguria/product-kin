import React , {useState} from 'react'
import { Redirect } from 'react-router';
import axios from 'axios';
import logo from '../../resources/logo.png'
import Illustration from '../../resources/Illustration.png'
import './authentication.css'
import { Link , NavLink} from 'react-router-dom'
export default function Authentication() {

window.addEventListener('resize', () => {

})

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPassword2, setSignupPassword2] = useState("");

    const [message, setMessage] = useState("");

    function handleloginEmailChange(event) {
        setLoginEmail(event.target.value);
    }
    
    function handleloginPasswordChange(event) {
        setLoginPassword(event.target.value);
    }

    function handleSignupNameChange(event) {
        setSignupName(event.target.value);
    }

    function handleSignupEmailChange(event) {
        setSignupEmail(event.target.value);
    }

    function handleSignupPasswordChange(event) {
        setSignupPassword(event.target.value);
    }

    function handleSignupPassword2Change(event) {
        setSignupPassword2(event.target.value);
    }


    function handleLogin(event) {
        event.preventDefault();
        console.log(loginEmail, " ", loginPassword);

        const loginDetails = {
            email : loginEmail,
            password : loginPassword
        };

        console.log(loginDetails)

        axios.post('/login', loginDetails)
        .then(function (response) {
            console.log("inside response");
            console.log(response.data);
            if(response.data.status === "true")
            {
                localStorage.setItem("user_id", response.data.user.user_id);
                localStorage.setItem("name", response.data.user.name);
                localStorage.setItem("profile_pic", response.data.user.profile_pic);
                //return (<Redirect to="/" />)
            }
            else{
                setMessage(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    function handleSignup(event) {
        event.preventDefault();
        console.log(signupName, " ", signupEmail, " ", signupPassword, " ", signupPassword2);

        if(signupPassword.length < 6)
            setMessage("Password should have atleast 6 characters");
        else if(signupPassword !== signupPassword2)
            setMessage("Password and Confirm Password must be same");
        else{
            const signupDetails = {
                name : signupName,
                email : signupEmail,
                password : signupPassword
            };
    
            console.log(signupDetails)
    
            axios.post('/signup', signupDetails)
            .then(function (response) {
                console.log("inside signup response");
                console.log(response.data);
                if(response.data.status === "true")
                {
                    setMessage("Registration Successfull. Login to continue");
                    //return (<Redirect to="/" />)
                }
                else{
                    setMessage(response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

return (
<>

    <div className="container-fluid">

        <div className="img mt-3">
            <img src={logo} alt="" />
        </div>

        <div className="text-center mt-2" id="main-hd">
            <p>A place to share knowledge and to be competent related for the product Roles in the world</p>
        </div>


        <div className="row justify-content-around mt-5">

            <div className="col-6" id="illustration">
                <img src={Illustration} alt="" />
            </div>

            <div className="col-4 form-main">
                <div className="form-ap">
                    {message}
                    <input type="checkbox" className="btn-main " />
                    <form className="login" onSubmit={handleLogin}>
                        <div className="login">
                            <p>Doesn’t have an account yet? <a href="">Sign Up</a></p>
                            <div className="form-group mt-3">
                                <label htmlFor="InputEmail">Email</label>
                                <input type="email" className="form-control" id="InputEmail"
                                    placeholder="xyz@example.com" onChange = {handleloginEmailChange} value={loginEmail} required/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" id="InputPassword"
                                    placeholder="Enter 6 characters or more" onChange = {handleloginPasswordChange} value={loginPassword}required />
                            </div>
                            <div className="form-check mt-3">
                                <div className="row row justify-content-between ">
                                    <div className="col-4">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="col-4">
                                        <Link exact to="/login/forget">Forgot Password</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <NavLink exact to="/"> */}
                                <button type="submit" className="btn btn-primary mt-3" id="login-2">Login</button>
                            {/* </NavLink> */}
                            <h6 className="mt-4"><span>or login with</span></h6>

                            {/* <div className="d-flex justify-content-around icons-btn">
                                <div>
                                    <button><i className="fa fa-linkedin"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-google"></i></button>
                                </div>
                                <div>
                                    <button><i className="fa fa-facebook"></i></button>
                                </div>

                            </div> */}
                            <button type="submit" className="btn btn-primary mt-3" id="login-3"><i className="fa fa-google"></i> <span>
                                Sign In with Google </span></button>
                        </div>
                    </form>
                    <form className="signup" onSubmit={handleSignup} >
                        <div className="signup">


                            <div className="form-group mt-4">
                                <label htmlFor="name">Name <span style={{color: "red"}}>*</span></label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                    placeholder="John Bid" onChange = {handleSignupNameChange} value={signupName} required/>
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputEmail1">Email <em>*</em></label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                    placeholder="xyz@example.com"  onChange = {handleSignupEmailChange} value={signupEmail} required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" onChange = {handleSignupPasswordChange} value={signupPassword} required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Confirm Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" onChange = {handleSignupPassword2Change} value={signupPassword2} required />
                            </div>
                            <div className="form-check mt-2">
                                <div className=" row row justify-content-around ">
                                    <div className="">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Yes, I want to
                                            receive updates on the new challenges</label>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" id="login-2">Signup</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>


    </div>
</>
)
}
