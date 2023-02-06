import axios from 'axios';
import React ,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';

function List() {
    let [user, setUser] = useState([]);
    let [showdeletealert, setShowDeleteAlert] = useState(false);
    let [id, setId] = useState(0);

    useEffect(() => {
        bindData();
    }, []) 

    function bindData() {
        // e.preventDefault();
        axios.get("https://637f49192f8f56e28e86b270.mockapi.io/form1")
        .then((response) => {
                console.log(response.data);
                setUser(response.data);
            }
        )
    }

    function confirmDeleteUser(e, userid){
        e.preventDefault();
        setId(userid);
        setShowDeleteAlert(true);
    }

    function deleteUser(e){
       
        if(id !== 0){
            axios.delete("https://637f49192f8f56e28e86b270.mockapi.io/form1/" + id)
            .then((result) => {
               setShowDeleteAlert(false)
                bindData();
                }
            )
        }
    }

    console.log(user);
  return (
    <div>
        {
            showdeletealert &&
            <SweetAlert
                title="Sure to delete?"
                warning
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="success"
                onConfirm={(e)=>{deleteUser()}}
                onCancel={(e)=>{setShowDeleteAlert(false);}}
                showCancel={true}
                focusCancelBtn={true}
            />
        }
        <table className='container'>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Address</th>

                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((user, i) => {
                            return (

                                <tr key={i}>
                                    <td>
                                        <Link className='btn btn-primary'  to={ "/edit1/" + user.id }><i className='fa fa-edit'></i></Link> &nbsp;
                                        <Button onClick={(e) => { confirmDeleteUser(e, user.id) }} variant="danger"><i className='fa fa-trash'></i></Button>
                                    </td>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobileno}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <img width={"50px"} src={user.avatar} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

    </div>
  )
}

export default List