import { useState } from "react";
import "./container.css"

function Seat(probes)
{
    const [btnstate,setbtnstate]=useState(false);
    function btnhandler()
    {
        
        setbtnstate(btnstate=>!btnstate);
        console.log(`${probes.rown},${probes.coln}`);
    }
    let toggleclass=btnstate ? ' occupied':null
    return (
<button disabled ={(btnstate===true || probes.role !=='F') ? 'disabled' : ''} className={`seat ${toggleclass}`} onClick={btnhandler} value={`${probes.rown},${probes.coln}`} ></button>

    );
}
export default Seat;