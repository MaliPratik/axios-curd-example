import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';

function ExampleTable() {
    let [users, setUser] = useState([]);
    let [showdeletealert, setShowDeleteAlert] = useState(false);
    let [id, setId] = useState(0);

    useEffect(() => {
        bindData();
    }, [])

    function confirmDeleteUser(e, userid) {
        e.preventDefault();
        setShowDeleteAlert(true)
        setId(userid);

    }
    function deleteUser(e) {
        if (id !== 0) {
            axios.delete("https://637f49192f8f56e28e86b270.mockapi.io/user/" + id).then((result) => {
                setShowDeleteAlert(false);
                bindData();
            })
        }
    }


    function bindData() {
        // e.preventDefault();
        axios.get("https://637f49192f8f56e28e86b270.mockapi.io/user").then(
            (response) => {
                console.log(response.data);
                setUser(response.data);
            }
        )
    }
    return (
        <div>
            
            {
                showdeletealert &&

                    <SweetAlert
                    custom
                    warning
                    customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="success"
                    title="Are you sure?"
                    onConfirm={(e) => { deleteUser() }}
                    onCancel={(e) => { setShowDeleteAlert(false) }}
                    focusCancelBtn
                    >
                    <h5>You will not be able to recover this imaginary file!</h5>
                    </SweetAlert>

            }
            <table className='container'>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => {
                            return (

                                <tr key={i}>
                                    <td>
                                        <Link className='btn btn-primary' to={ "edit/" + user.id }><i className='fa fa-edit'></i></Link> &nbsp;
                                        <Button onClick={(e) => { confirmDeleteUser(e, user.id) }} variant="danger"><i className='fa fa-trash'></i></Button>
                                    </td>
                                    <td>{i + 1}</td>
                                    <td>{user.FirstName}</td>
                                    <td>{user.LastName}</td>
                                    <td>{user.Contact}</td>
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


export default ExampleTable;