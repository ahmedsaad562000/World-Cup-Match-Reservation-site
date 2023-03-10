import { useEffect, useState } from "react";
import Approve from "../../pages/Approvebutton";
import { Link } from "react-router-dom"

function AdminContent(props) {
    const [empdata, empdatachange] = useState(null);


    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`http://localhost:8000/api/deleteuser/${id}`, {
                method: "DELETE"
            }).then((res) => {
                if (res.status !== 200) {
                    alert("Server Error");
                }
                else {
                    alert('Removed successfully.')
                    window.location.reload();
                }
                }).catch((err) => {
                    console.log(err.message)
                })
        }
    }




    useEffect(() => {
        fetch("http://localhost:8000/api/adminusers").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="container" style={{backgroundColor:'#2c3e50', color:'white'}}>
            <div>
                <div className="card-body" style={{color:'white'}}>
                    <div className="divbtn" style={{marginBottom:'3%'}}>
                        <Link to="/" className="btn btn-success" style={{ marginLeft: "1100px",marginTop:'3%' }}>Log Out</Link>
                    </div>
                    <table className="table table-bordered" style={{color:'#ecf0f1'}}>
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id} >
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td className="d-flex">
                                            <Approve state={false} id={item.id} myrole={item.role} username={item.username} approvale={item.approved}></Approve>
                                            <button onClick={() => { Removefunction(item.username) }} className="btn btn-danger">Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminContent;