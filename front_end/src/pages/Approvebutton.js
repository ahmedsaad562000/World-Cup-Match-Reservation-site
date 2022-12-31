import { useState } from "react";

function Approve(props)
{
    const [Aprrovestate,Approvechange]=useState(props.state);


    function clickhandler(){
    
         Approvechange(true); 
          // fetch data put true approved  
    }
    return(

        <div>
            

<button disabled ={Aprrovestate==true ? 'disabled' : ''} onClick={clickhandler} className="btn btn-success">Approve</button> 
        </div>
    );
}

export default Approve;