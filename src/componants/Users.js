import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';


function Users() {

  let navigaet = useNavigate();
  let { id } = useParams();

  let [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Contact: ""
  })

  useEffect(() => {
    if (id !== undefined) {
      axios.get("https://637f49192f8f56e28e86b270.mockapi.io/user/" + id).then((result) => {
        console.log(result.data);
        setUser({
          FirstName: result.data.FirstName,
          LastName: result.data.LastName,
          Contact: result.data.Contact
        })
      }, (err) => {
        console.log(err);
      });
    }
    else {
      setUser({
        FirstName: "",
        LastName: "",
        Contact: ""
      })
    }
  }, [id]);

  let [userValidations, setUserValidations] = useState({
    FirstNameMessage: "",
    LastNameMessage: "",
    ContactMessage: ""
  })

  function handleChange(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  function submit(e) {

    e.preventDefault();
    let validated = true;
    let FirstNameMessage = "";
    let LastNameMessage = "";
    let ContactMessage = "";


    if (user.FirstName.trim() === "") {
      FirstNameMessage = "please Enter First_Name";
      validated = false;
    }

    if (user.LastName.trim() === "") {
      LastNameMessage = "please Enter Last_Name";
      validated = false;
    }

    if (user.Contact.trim() === "") {
      ContactMessage = "please Enter Cotact no";
      validated = false;
    }
    else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(user.Contact)) {
      ContactMessage = "Please Enter Valid Number";
      validated = false;
    }
    setUserValidations(
      {
        FirstNameMessage: FirstNameMessage,
        LastNameMessage: LastNameMessage,
        ContactMessage: ContactMessage
      }
    )

    if(validated){
      //
      if(id === undefined) {
        axios.post("https://637f49192f8f56e28e86b270.mockapi.io/user", user).then((result) => {
          navigaet("/");
        }, (err) => {
          console.log(err);
        })
      }
      else {
        axios.put("https://637f49192f8f56e28e86b270.mockapi.io/user/" + id, user).then((result) => {
          navigaet("/");
        }, (err) => {
          console.log(err);
        })
      }
    }
    else {
      return;
    }

  }

  // console.log(user);
  return (
    <div className='container'>
      <h2>users</h2>

      <Form onSubmit={(e) => { submit(e) }}>
        <Form.Group className="mb-3" >
          <Form.Label>First Name <span className='text-danger'>{userValidations.FirstNameMessage}</span></Form.Label>
          <Form.Control type="text" id='FirstName' placeholder="Fisrt name" value={user.FirstName} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>LastName <span className='text-danger'>{userValidations.LastNameMessage}</span></Form.Label>
          <Form.Control type="text" id='LastName' placeholder="Last Name" value={user.LastName} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Contact <span className='text-danger'>{userValidations.ContactMessage}</span></Form.Label>
          <Form.Control type="number" id='Contact' placeholder="Contact no." value={user.Contact} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>



      
    </div>
  )
}

export default Users;