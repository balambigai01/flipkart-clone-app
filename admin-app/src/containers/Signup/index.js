import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import {Form,Button,Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Signup } from '../../actions'
const SignUp = (props) => {
    const[firstName,setfirstName]=useState('')
    const[lastName,setlastName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const auth=useSelector(state=>state.auth)
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!user.loading){
            setfirstName("");
            setlastName("");
            setEmail("");
            setPassword("")
        }
    },[user.loading])
    const userSignup=(e)=>{
        e.preventDefault()
        const user={
            firstName,lastName,email,password,
        }
           dispatch(Signup(user))
    }

    if (auth.authenticate){
        return <Redirect to ={'/'}/>
    }
    if(user.loading){
        return <p>loading..!</p>
    }

  return (
    <Layout>
            <Container>
                {user.message}
                <Row style={{marginTop:"50px"}}> 
                    <Col md={{span:6, offset:3}}>
                    <Form onSubmit={userSignup}>
                        <Row>
                            <Col md={6}>
                            <Input
                            
                            label="FirstName"
                            placeholder='Firstname'
                            type='text'
                            value={firstName}
                            onChange={(e)=>{
                              setfirstName(e.target.value)
                            }}

                        
                        
                        />
                            </Col>
                            <Col md={6}>
                            <Input
                            
                            label="LastName"
                            placeholder='Lastname'
                            type='text'
                            value={lastName}
                            onChange={(e)=>{
                               setlastName(e.target.value)
                            }}
                        />
                            </Col>
                        </Row>
                        <Input 
                            label="Email"
                            placeholder='Email'
                            type='email'
                            value={email}
                            onChange={(e)=>{
                              setEmail(e.target.value)
                            }}
                        />

                         <Input 
                            label="Password"
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e)=>{
                             setPassword(e.target.value)
                            }}
                        />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
                    </Col>
                </Row>
       
    </Container> 
    </Layout>
  )
}

export default SignUp
