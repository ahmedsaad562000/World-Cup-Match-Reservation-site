import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function EditUser(props) {
    const [MaleFemale, setMaleFemale] = useState();
    // const [Passo, SetPasso] = useState("false");
    let Passo="false";
    var theRole;

    var LoggedIn = localStorage.getItem('LoggedIn');
    LoggedIn = JSON.parse(LoggedIn);

    const [loadedMeetups, setLoadedMeetups] = useState([]);
    useEffect(() => {
        fetch(
            `http://localhost:8000/api/getuser/${LoggedIn[0]["username"]}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(`Data is: ${data}`);
                const meetup = data;
                // console.log(`meetup is: ${JSON.stringify(meetup)}`);
                setLoadedMeetups(meetup);
                setMaleFemale(meetup.gender);
            });
    }, []);

    if (loadedMeetups.role === 'F') {
        theRole = "Fan";
    }
    else {
        theRole = "Manager";
    }

    const usernameRef = useRef();
    const oldpasswordRef = useRef();
    const passwordRef = useRef();
    const ConpasswordRef = useRef();
    const fisrtNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const birthRef = useRef();
    const MgenderRef = useRef();
    const FgenderRef = useRef();
    const NationRef = useRef();
    const roleRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        
        var Gndr;
        if(MaleFemale ==='M')
        {
            Gndr=MgenderRef.current.value;
        }
        else
        {
            Gndr=FgenderRef.current.value;
        }
        const oldPassword = oldpasswordRef.current.value;
        const Password = passwordRef.current.value;
        const conPassword = ConpasswordRef.current.value;
        const firstName = fisrtNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const birthdate = birthRef.current.value;
        const Gender = Gndr;
        const Nation = NationRef.current.value;

        /*Paswords check*/
        console.log(oldpasswordRef.current.value.length);
        if (oldpasswordRef.current.value.length !== 0 || passwordRef.current.value.length !== 0 || ConpasswordRef.current.value.length !== 0 ) {
            Passo="true";
            console.log(Passo);
        }
        else {
            Passo="false";
            console.log(Passo);
        }
        console.log(Passo);

        var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (loadedMeetups.password !== oldPassword && Passo==="true") {
            alert("You Entered Wrong Password");
        }
        else if (!password_pattern.test(Password) && Passo==="true") {
            alert("Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number");
        }
        else if (conPassword !== Password && Passo==="true") {
            alert("Unamtched Passwords");
        }
        else if(Passo==="true")
        {
            const meetupData = {
                password: Password,
                first_name: firstName,
                last_name: lastName,
                birthdate: birthdate,
                gender: Gender,
                nationality: Nation,
            };
            props.onAddMeetup(meetupData);
        }
        else {
            const meetupData = {
                password: loadedMeetups.password,
                first_name: firstName,
                last_name: lastName,
                birthdate: birthdate,
                gender: Gender,
                nationality: Nation,
            };
            props.onAddMeetup(meetupData);
        }
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'><span className={classes.vip}>User</span>Name</label>
                    <input type='text' placeholder='username' required id='username' ref={usernameRef} disabled value={loadedMeetups.username} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='opass'><span className={classes.vip}>Old</span> Password</label>
                    <input type='password' placeholder='password' required={Passo === "true" ? true : false} id='opass' ref={oldpasswordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='pass'><span className={classes.vip}>Pass</span>word</label>
                    <input type='password' placeholder='password' required={Passo === "true" ? true : false} id='pass' ref={passwordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='cpass'><span className={classes.vip}>Confirm</span> Password</label>
                    <input type='password' placeholder='password' required={Passo === "true" ? true : false} id='cpass' ref={ConpasswordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='first_name'><span className={classes.vip}>First</span> Name</label>
                    <input type='text' placeholder='First name' required id='first_name' ref={fisrtNameRef} defaultValue={loadedMeetups.first_name} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='last_name'><span className={classes.vip}>Last</span> Name</label>
                    <input type='text' placeholder='Second name' required id='last_name' ref={lastNameRef} defaultValue={loadedMeetups.last_name} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Email' required id='email' ref={emailRef} disabled value={loadedMeetups.email} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='birth'><span className={classes.vip}>Birth</span>date</label>
                    <input type='date' required id='birth' ref={birthRef} defaultValue={loadedMeetups.birthdate} />
                </div>

                <div className="options_type">
                    <div className="type">
                        <input type="radio" required id="gender" value="F" name="gender" ref={FgenderRef} checked={MaleFemale === "F" ? true : false} onClick={() => setMaleFemale('F')} />
                        <label htmlFor="female" style={{ color: "#9c1458", marginRight: "20px" }}>Female</label>
                        <input type="radio" required id="gender" value="M" name="gender" ref={MgenderRef} checked={MaleFemale === "M" ? true : false} onClick={() => setMaleFemale('M')} />
                        <label htmlFor="male" style={{ color: "#9c1458" }}>Male</label>
                    </div>
                    <div className="options">
                        <label htmlFor="nationality">Nationality</label>
                        <select name="nationality" id="nationality" ref={NationRef} style={{ backgroundColor: "#9c1458", color: 'whitesmoke' }}>
                            <option value={loadedMeetups.nationality} selected disabled hidden>{loadedMeetups.nationality}</option>
                            <option value="afghan">Afghan</option>
                            <option value="albanian">Albanian</option>
                            <option value="algerian">Algerian</option>
                            <option value="american">American</option>
                            <option value="andorran">Andorran</option>
                            <option value="angolan">Angolan</option>
                            <option value="antiguans">Antiguans</option>
                            <option value="argentinean">Argentinean</option>
                            <option value="armenian">Armenian</option>
                            <option value="australian">Australian</option>
                            <option value="austrian">Austrian</option>
                            <option value="azerbaijani">Azerbaijani</option>
                            <option value="bahamian">Bahamian</option>
                            <option value="bahraini">Bahraini</option>
                            <option value="bangladeshi">Bangladeshi</option>
                            <option value="barbadian">Barbadian</option>
                            <option value="barbudans">Barbudans</option>
                            <option value="batswana">Batswana</option>
                            <option value="belarusian">Belarusian</option>
                            <option value="belgian">Belgian</option>
                            <option value="belizean">Belizean</option>
                            <option value="beninese">Beninese</option>
                            <option value="bhutanese">Bhutanese</option>
                            <option value="bolivian">Bolivian</option>
                            <option value="bosnian">Bosnian</option>
                            <option value="brazilian">Brazilian</option>
                            <option value="british">British</option>
                            <option value="bruneian">Bruneian</option>
                            <option value="bulgarian">Bulgarian</option>
                            <option value="burkinabe">Burkinabe</option>
                            <option value="burmese">Burmese</option>
                            <option value="burundian">Burundian</option>
                            <option value="cambodian">Cambodian</option>
                            <option value="cameroonian">Cameroonian</option>
                            <option value="canadian">Canadian</option>
                            <option value="cape verdean">Cape Verdean</option>
                            <option value="central african">Central African</option>
                            <option value="chadian">Chadian</option>
                            <option value="chilean">Chilean</option>
                            <option value="chinese">Chinese</option>
                            <option value="colombian">Colombian</option>
                            <option value="comoran">Comoran</option>
                            <option value="congolese">Congolese</option>
                            <option value="costa rican">Costa Rican</option>
                            <option value="croatian">Croatian</option>
                            <option value="cuban">Cuban</option>
                            <option value="cypriot">Cypriot</option>
                            <option value="czech">Czech</option>
                            <option value="danish">Danish</option>
                            <option value="djibouti">Djibouti</option>
                            <option value="dominican">Dominican</option>
                            <option value="dutch">Dutch</option>
                            <option value="east timorese">East Timorese</option>
                            <option value="ecuadorean">Ecuadorean</option>
                            <option value="egyptian">Egyptian</option>
                            <option value="emirian">Emirian</option>
                            <option value="equatorial guinean">Equatorial Guinean</option>
                            <option value="eritrean">Eritrean</option>
                            <option value="estonian">Estonian</option>
                            <option value="ethiopian">Ethiopian</option>
                            <option value="fijian">Fijian</option>
                            <option value="filipino">Filipino</option>
                            <option value="finnish">Finnish</option>
                            <option value="french">French</option>
                            <option value="gabonese">Gabonese</option>
                            <option value="gambian">Gambian</option>
                            <option value="georgian">Georgian</option>
                            <option value="german">German</option>
                            <option value="ghanaian">Ghanaian</option>
                            <option value="greek">Greek</option>
                            <option value="grenadian">Grenadian</option>
                            <option value="guatemalan">Guatemalan</option>
                            <option value="guinea-bissauan">Guinea-Bissauan</option>
                            <option value="guinean">Guinean</option>
                            <option value="guyanese">Guyanese</option>
                            <option value="haitian">Haitian</option>
                            <option value="herzegovinian">Herzegovinian</option>
                            <option value="honduran">Honduran</option>
                            <option value="hungarian">Hungarian</option>
                            <option value="icelander">Icelander</option>
                            <option value="indian">Indian</option>
                            <option value="indonesian">Indonesian</option>
                            <option value="iranian">Iranian</option>
                            <option value="iraqi">Iraqi</option>
                            <option value="irish">Irish</option>
                            <option value="italian">Italian</option>
                            <option value="ivorian">Ivorian</option>
                            <option value="jamaican">Jamaican</option>
                            <option value="japanese">Japanese</option>
                            <option value="jordanian">Jordanian</option>
                            <option value="kazakhstani">Kazakhstani</option>
                            <option value="kenyan">Kenyan</option>
                            <option value="kittian and nevisian">Kittian and Nevisian</option>
                            <option value="kuwaiti">Kuwaiti</option>
                            <option value="kyrgyz">Kyrgyz</option>
                            <option value="laotian">Laotian</option>
                            <option value="latvian">Latvian</option>
                            <option value="lebanese">Lebanese</option>
                            <option value="liberian">Liberian</option>
                            <option value="libyan">Libyan</option>
                            <option value="liechtensteiner">Liechtensteiner</option>
                            <option value="lithuanian">Lithuanian</option>
                            <option value="luxembourger">Luxembourger</option>
                            <option value="macedonian">Macedonian</option>
                            <option value="malagasy">Malagasy</option>
                            <option value="malawian">Malawian</option>
                            <option value="malaysian">Malaysian</option>
                            <option value="maldivan">Maldivan</option>
                            <option value="malian">Malian</option>
                            <option value="maltese">Maltese</option>
                            <option value="marshallese">Marshallese</option>
                            <option value="mauritanian">Mauritanian</option>
                            <option value="mauritian">Mauritian</option>
                            <option value="mexican">Mexican</option>
                            <option value="micronesian">Micronesian</option>
                            <option value="moldovan">Moldovan</option>
                            <option value="monacan">Monacan</option>
                            <option value="mongolian">Mongolian</option>
                            <option value="moroccan">Moroccan</option>
                            <option value="mosotho">Mosotho</option>
                            <option value="motswana">Motswana</option>
                            <option value="mozambican">Mozambican</option>
                            <option value="namibian">Namibian</option>
                            <option value="nauruan">Nauruan</option>
                            <option value="nepalese">Nepalese</option>
                            <option value="new zealander">New Zealander</option>
                            <option value="ni-vanuatu">Ni-Vanuatu</option>
                            <option value="nicaraguan">Nicaraguan</option>
                            <option value="nigerien">Nigerien</option>
                            <option value="north korean">North Korean</option>
                            <option value="northern irish">Northern Irish</option>
                            <option value="norwegian">Norwegian</option>
                            <option value="omani">Omani</option>
                            <option value="Palestine">Palestine</option>
                            <option value="pakistani">Pakistani</option>
                            <option value="palauan">Palauan</option>
                            <option value="panamanian">Panamanian</option>
                            <option value="papua new guinean">Papua New Guinean</option>
                            <option value="paraguayan">Paraguayan</option>
                            <option value="peruvian">Peruvian</option>
                            <option value="polish">Polish</option>
                            <option value="portuguese">Portuguese</option>
                            <option value="qatari">Qatari</option>
                            <option value="romanian">Romanian</option>
                            <option value="russian">Russian</option>
                            <option value="rwandan">Rwandan</option>
                            <option value="saint lucian">Saint Lucian</option>
                            <option value="salvadoran">Salvadoran</option>
                            <option value="samoan">Samoan</option>
                            <option value="san marinese">San Marinese</option>
                            <option value="sao tomean">Sao Tomean</option>
                            <option value="saudi">Saudi</option>
                            <option value="scottish">Scottish</option>
                            <option value="senegalese">Senegalese</option>
                            <option value="serbian">Serbian</option>
                            <option value="seychellois">Seychellois</option>
                            <option value="sierra leonean">Sierra Leonean</option>
                            <option value="singaporean">Singaporean</option>
                            <option value="slovakian">Slovakian</option>
                            <option value="slovenian">Slovenian</option>
                            <option value="solomon islander">Solomon Islander</option>
                            <option value="somali">Somali</option>
                            <option value="south african">South African</option>
                            <option value="south korean">South Korean</option>
                            <option value="spanish">Spanish</option>
                            <option value="sri lankan">Sri Lankan</option>
                            <option value="sudanese">Sudanese</option>
                            <option value="surinamer">Surinamer</option>
                            <option value="swazi">Swazi</option>
                            <option value="swedish">Swedish</option>
                            <option value="swiss">Swiss</option>
                            <option value="syrian">Syrian</option>
                            <option value="taiwanese">Taiwanese</option>
                            <option value="tajik">Tajik</option>
                            <option value="tanzanian">Tanzanian</option>
                            <option value="thai">Thai</option>
                            <option value="togolese">Togolese</option>
                            <option value="tongan">Tongan</option>
                            <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                            <option value="tunisian">Tunisian</option>
                            <option value="turkish">Turkish</option>
                            <option value="tuvaluan">Tuvaluan</option>
                            <option value="ugandan">Ugandan</option>
                            <option value="ukrainian">Ukrainian</option>
                            <option value="uruguayan">Uruguayan</option>
                            <option value="uzbekistani">Uzbekistani</option>
                            <option value="venezuelan">Venezuelan</option>
                            <option value="vietnamese">Vietnamese</option>
                            <option value="welsh">Welsh</option>
                            <option value="yemenite">Yemenite</option>
                            <option value="zambian">Zambian</option>
                            <option value="zimbabwean">Zimbabwean</option>
                        </select>
                    </div>
                </div>
                <div className="options_type" style={{ marginTop: '-40px' }}>
                    <div className="type">
                        <label htmlFor="">Role</label>
                        <select name="role" id="role" ref={roleRef} style={{ backgroundColor: "#9c1458" }} disabled>
                            {/* role from local storage */}
                            <option value={loadedMeetups.role}>{theRole}</option>
                        </select>
                    </div>
                </div>

                <div className={classes.actions}>
                    <button>Update</button>
                </div>
            </form>
        </Card>
    );
}
export default EditUser;
