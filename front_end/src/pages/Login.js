import { useNavigate } from "react-router-dom";
import "./Login.css"
import { useRef, useState } from 'react';
import axios from "axios";

function Login() {
    const Navigate = useNavigate();
    function navigateHandler(url) {
        Navigate(url);
    }

    const [signInSugnUp, setSignInSignUp] = useState("signIn");

    /* Sign IN input values*/
    const UserSignINRef = useRef();
    const PassSignINRef = useRef();

    /* Sign UP input values*/
    const FullNameNRef = useRef();
    const UserNameRef = useRef();
    const BirthdateRef = useRef();
    const PassRef = useRef();
    const RePassRef = useRef();
    const EmailRef = useRef();
    const MaleRef = useRef();
    const FemaleRef = useRef();
    const RoleRef = useRef();


    function SaveToLocalStorage(data) {
        var LoggedIn = [];

        //Add Data Of New User
        LoggedIn.push({
            username: data.username,
            role: data.role,
        })

        localStorage.setItem('LoggedIn', JSON.stringify(LoggedIn));
    }

    const postMechanic = (meetupData) =>
        axios
            .post("http://localhost:8000/api/login/", meetupData)
            .then((response) => {
                return response;
            }).catch((err) => {
                if (err.response.status === 401)
                    alert("Unapproved Manager");
                else if (err.response.status === 404)
                    alert("No User With This Data");
                else if (err.response.status === 500)
                    alert("Server Error");
            });

    function SignINHandler(meetupData) {
        postMechanic(meetupData).then((res) => {
            if (res.status !== 200) {
                alert(" No User With This Data ");
            }
            else {
                if (res.data.role === 'A') {
                    navigateHandler('/admin');
                }
                else {
                    SaveToLocalStorage(res.data);
                    navigateHandler('/Home');
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    function addUserHandler(meetupData) {
        fetch(
            'http://localhost:8000/api/adduser/',
            {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => {
            console.log(meetupData);
            if (res.status !== 200) {
                alert("Error ");
            }
            else {
                alert("You Signed Up Succesfully");
                setSignInSignUp("signIn")
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    function ValidateSignIN(event) {
        event.preventDefault();
        const UserName = UserSignINRef.current.value;
        const PassWord = PassSignINRef.current.value;

        const meetupData = {
            username: UserName,
            password: PassWord
        };

        var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!password_pattern.test(PassWord)) {
            alert("Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number");
        }
        else {
            /*Local Storage*/

            SignINHandler(meetupData);
        }
    }

    function ValidateSignUP(event) {
        event.preventDefault();


        var Array = [];
        console.log(FullNameNRef.current.value);
        if (FullNameNRef.current.value.indexOf(" ") !== -1)
            Array = FullNameNRef.current.value.split(" ");
        else {
            Array[0] = FullNameNRef.current.value;
            Array[1] = "";
        }

        let G;
        if (MaleRef.current.checked) {
            G = 'M';
        }
        else {
            G = 'F';
        }

        let R;
        if (RoleRef.current.value === "manager") {
            R = 'M';
        }
        else {
            R = 'F';
        }

        const FirstName = Array[0];
        const LastName = Array[1];
        const UserName = UserNameRef.current.value;
        const BirthDate = BirthdateRef.current.value;
        const PassWord = PassRef.current.value;
        const REPassWord = RePassRef.current.value;
        const Gender = G;
        const EMail = EmailRef.current.value;
        const ROle = R;

        const meetupData = {
            username: UserName,
            first_name: FirstName,
            last_name: LastName,
            birthdate: BirthDate,
            password: PassWord,
            email: EMail,
            gender: Gender,
            role: ROle
        };

        //validate on PASSWORD 
        var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var email_pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
        if (!password_pattern.test(PassWord)) {
            alert("Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number");
        }
        else if (REPassWord !== PassWord) {
            alert("Unamtched Passwords");
        }
        else if (!email_pattern.test(EMail)) {
            alert("Invalid Email, valid email is in form of: Name@mail.com");
        }
        else if (LastName === null || LastName === "") {
            alert("Please enter at least 2 names in your full-name");
        }
        else {
            addUserHandler(meetupData);
        }
    }

    function guestHandler() {
        /**Save that user is a guest */
        navigateHandler('/Home');
    }


    return (
        <div>
            <div className="box">
                <div className="login-wrap">
                    <div className="login-html">
                        <input id="tab-1" type="radio" name="tab" className="sign-in" checked={signInSugnUp === "signIn" ? true : false} onClick={() => setSignInSignUp("signIn")} /><label htmlFor="tab-1"
                            className="tab">Sign
                            In</label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up" checked={signInSugnUp === "signUp" ? true : false} onClick={() => setSignInSignUp("signUp")} /><label htmlFor="tab-2" className="tab">Sign
                            Up</label>
                        <div className="login-form">
                            <form action="" onSubmit={ValidateSignIN}>
                                <div className="sign-in-htm">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input id="user" type="text" required className="input" ref={UserSignINRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input id="pass" type="password" required className="input" data-type="password" ref={PassSignINRef} />
                                    </div>
                                    <div className="group">
                                        <input id="check" type="checkbox" className="check" />
                                        <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                    </div>
                                    <div className="group">
                                        <input type="submit" className="button" value="Sign In" />
                                    </div>
                                    <div className="hr"></div>
                                    <div className="foot-lnk">
                                        <a href="" onClick={guestHandler} style={{ color: "white" }}>Continue as a Guest</a>
                                    </div>
                                </div>
                            </form>
                            <form action="" onSubmit={ValidateSignUP}>
                                <div className="sign-up-htm">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Full Name</label>
                                        <input id="user" required type="text" className="input" ref={FullNameNRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input id="user" required type="text" className="input" ref={UserNameRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="user" className="label">Date of birth</label>
                                        <input id="user" required type="date" className="input" ref={BirthdateRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input id="pass" required type="password" className="input" data-type="password" ref={PassRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Repeat Password</label>
                                        <input id="pass" required type="password" className="input" data-type="password" ref={RePassRef} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Email Address</label>
                                        <input id="pass" required type="text" className="input" ref={EmailRef} />
                                    </div>
                                    <div className="options_type">
                                        <div className="type">
                                            <input type="radio" required id="female" value="F" name="gender" ref={FemaleRef} />
                                            <label htmlFor="female" style={{ color: "white", marginRight: "20px" }}>Female</label>
                                            <input type="radio" required id="male" value="M" name="gender" ref={MaleRef} />
                                            <label htmlFor="male" style={{ color: "white" }}>Male</label>
                                        </div>
                                        <div className="options" style={{width:'90px'}}>
                                            <select name="role" required id="role" ref={RoleRef}>
                                                <option value="manager">Manager</option>
                                                <option value="fan">Fan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <input type="submit" className="button signbutton" value="Sign Up" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login