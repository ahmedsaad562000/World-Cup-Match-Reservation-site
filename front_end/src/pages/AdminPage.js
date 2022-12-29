// import { useNavigate } from 'react-router-dom';
import AdminContent from "../Components/meetups/adminContent";

function Adminstrator(props)
{
    return(
        <section>
            <h1 style={{color: '#6a6f8c'}}>Admin Page</h1>
            <AdminContent />
        </section>
    );
}

export default Adminstrator;