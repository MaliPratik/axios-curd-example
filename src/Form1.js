import axios from 'axios';
import React, { useEffect, useState, CSSProperties } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import ClipLoader from "react-spinners/ClipLoader";

function Form1() {

    let navigaet = useNavigate();
  let { id } = useParams();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const override: CSSPropertiesies = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

    let [user, setUser] = useState({
        name: "",
        email: "",
        mobileno: "",
        address: ""
    })

    useEffect(()=>{
        if (id !== undefined) {
            axios.get("https://637f49192f8f56e28e86b270.mockapi.io/form1/" + id).then((result) => {
            console.log(result);

            setUser({
                name:result.data.name,
                email:result.data.email,
                mobileno:result.data.mobileno,
                address:result.data.address,
            })

            }, (err) => {
                console.log(err);
            })
        }
        else{
            setUser({
                name:"",
                email:"",
                mobileno:"",
                address:"", 
            })
        }
    },[id]);  

    let [userValidations, setUserValidations] = useState({
        nameMessage: "",
        emailMessage: "",
        mobilenoMessage: "",
        addressMessage: ""
    })

    function handleChange(e) {
        e.preventDefault();
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    function submit(e) {
        e.preventDefault();
        let validated = true;
        let nameMessage = "";
        let emailMessage = "";
        let mobilenoMessage = "";
        let addressMessage = "";

        if (user.name.trim() === "") {
            nameMessage = "Please enter name";
            validated = false;
        }
        if (user.email.trim() === "") {
            emailMessage = "Please enter email";
            validated = false;
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))
        {
            emailMessage = "Please Enter Valid email";
            validated = false;
        }
        if (user.mobileno.trim() === "") {
            mobilenoMessage = "Please enter mobile no";
            validated = false;
        }
        else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(user.mobileno)) {
            mobilenoMessage = "Please Enter Valid Number";
            validated = false;
        }
        if (user.address.trim() === "") {
            addressMessage = "Please enter address";
            validated = false;
        }
        setUserValidations(
            {
                nameMessage: nameMessage,
                emailMessage: emailMessage,
                mobilenoMessage: mobilenoMessage,
                addressMessage: addressMessage
            })

        if (validated) {
            setLoading(true);
            //Api calls
            if (id === undefined) {
                axios.post("https://637f49192f8f56e28e86b270.mockapi.io/form1", user).then((result) => {
                    setLoading(false);
                navigaet("/list")

                }, (err) => {
                    console.log(err);
                })
            }
            else {
                axios.put("https://637f49192f8f56e28e86b270.mockapi.io/form1/" + id, user).then((result) => {
                setLoading(false);
                navigaet("/list");
                }, (err) => {
                    console.log(err);
                })
            }
        }
            else {
                return;
            }

            
            
    }   


        return (
            <div className='col-lg-6  container border'>

                {
                   
                    loading && 

                    <ClipLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  
                }
             
            {   
              
                !loading &&  

                <Form onSubmit={(e) => { submit(e) }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label><span className='text-danger'>{userValidations.nameMessage}</span>
                        <Form.Control type="text" id='name' value={user.name} placeholder="Enter name" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label><span className='text-danger'>{userValidations.emailMessage}</span>
                        <Form.Control type="text" id='email' value={user.email} placeholder="Enter email" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Mobile no</Form.Label><span className='text-danger'>{userValidations.mobilenoMessage}</span>
                        <Form.Control type="text" id='mobileno' value={user.mobileno} placeholder="Enter mobile no" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Address</Form.Label><span className='text-danger'>{userValidations.addressMessage}</span>
                        <Form.Control type="text" id='address' value={user.address} placeholder="Enter Adderss" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            }
        </div>
        )
    }

    export default Form1;