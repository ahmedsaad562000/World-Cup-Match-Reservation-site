import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login(props) {
    const Navigate = useNavigate();
    function navigateHandler(url) {
        Navigate(url);
    }
    return (
        <div>
            <div className="box">
                <form action="">
                    <div className="login-wrap">
                        <div className="login-html">
                            <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label htmlFor="tab-1"
                                className="tab">Sign
                                In</label>
                            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign
                                Up</label>
                            <div className="login-form">
                                <div className="sign-in-htm">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input id="user" type="text" className="input" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input id="pass" type="password" className="input" data-type="password" />
                                    </div>
                                    <div className="group">
                                        <input id="check" type="checkbox" className="check" />
                                        <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                    </div>
                                    <div className="group">
                                        <input type="submit" className="button" value="Sign In" onClick={() => { navigateHandler('/Home') }} />
                                    </div>
                                    <div className="hr"></div>
                                    <div className="foot-lnk">
                                        <a href="/Home" style={{ color: "white" }}>Continue as a Guest</a>
                                    </div>
                                </div>
                                <div className="sign-up-htm">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Full Name</label>
                                        <input id="user" type="text" className="input" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input id="user" type="text" className="input" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="user" className="label">Date of birth</label>
                                        <input id="user" type="date" className="input" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input id="pass" type="password" className="input" data-type="password" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Repeat Password</label>
                                        <input id="pass" type="password" className="input" data-type="password" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Email Address</label>
                                        <input id="pass" type="text" className="input" />
                                    </div>
                                    <div className="options_type">
                                        <div className="type">
                                            <input type="radio" id="female" value="female" name="gender" />
                                            <label htmlFor="female" style={{ color: "white" }}>Female</label>
                                            <input type="radio" id="male" value="male" name="gender" />
                                            <label htmlFor="male" style={{ color: "white" }}>Male</label>
                                        </div>
                                        <div className="options">
                                            <select name="role" id="role">
                                                <option value="manager">Manager</option>
                                                <option value="fan">Fan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <input type="submit" className="button signbutton" value="Sign Up" onClick={() => { navigateHandler('/Home') }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login