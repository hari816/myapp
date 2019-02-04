import React, { Component } from 'react';
import Axios from 'axios';
let valid = false;
class Registration extends Component {
    constructor(props){
        super(props)
        this.state = { 
            funct:{
        firstname :'',
        lastname:'',
        email:'',
            },
        password:'',
        firstnameerror :'',
        lastnameerror:'',
        emailerror:'',
        passworderror:'',
        btn:true,
        imageURL:"",
        res:true,
     }
    }
     handleChange = (e) =>{
        // console.log('Hello',e);
         this.setState({[e.target.name]:e.target.value})
         let firstnameerror ='';
         let lastnameerror='';
         let emailerror='';
         let passworderror='';
         let name=e.target.name;
         let value=e.target.value;
         let msg='';
         if(name==='firstname'||name==='lastname'){
         if (name.split("name").length > 1) {
            let reg1 = /[^a-zA-Z0-9]/;
            if (!reg1.test(value) === false)
              msg = "Name cannot include special characters";
            else if (value.length < 5 || value.length > 10)
              msg =
                "Name should be greater than 5 characters and less than 11 characters";
            else if (value.length > 0 && !isNaN(value[0]))
              msg = "Name cannot start with a Number";
            else msg = "";
            if(name==='firstname')firstnameerror=msg;
            else lastnameerror=msg;
         }
        }
        else if(name==='email'){
         if (name.split("email").length > 1) {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(value) === false) {
              emailerror = "Invalid Email Address";
            } else emailerror = "";
        }
    }
    else{

    }
    
         if(firstnameerror || lastnameerror || emailerror || passworderror){
             this.setState({firstnameerror,lastnameerror,emailerror,passworderror})
             valid=false
         }
         else{
         valid=true;
            // console.log('entering');
             let btn=false;
         this.setState({btn:btn})}
         }
         //let msg1=this.state.firstname;
         //let msg2=this.state.lastname;let msg3=this.state.email;
     handleSubmit = (e) =>{
         e.preventDefault();
        if(valid){
            valid=false;
            console.log(this.state);
            if(!this.state.firstnameerror && !this.state.lastnameerror &&!this.state.emailerror && !this.state.passworderror)
            {
                let btn=false;
                this.setState({btn})
            }
            //const data=  this.state;
            const body ={
                name:this.state.firstname,
                email:this.state.email,
                password:this.state.password,
            }
            Axios.post('http://localhost:4000/submit',body)
            .then(data=>console.log(data));
        }
        else
        console.log("enter valid form");
         }


         handleReset = () =>{
             this.setState({
            firstname :'',
            lastname:'',
            email:'',
            password:'',
            firstnameerror :'',
            lastnameerror:'',
            emailerror:'',
            passworderror:'',
            btn:true,
            res:true,
         }
             )}


    render() {
        //console.log(this.state)
        return ( 
            <div>
                <h1>REGISTRATION</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <label>FirstName:</label>
                    <br />
                    <input type='text' name='firstname' onChange={this.handleChange} value={this.state.firstname} />
                    <div style={{color:'red'}}>
                    {this.state.firstnameerror}</div>
                    </div>
                    <div>
                    <label>LastName:</label>
                    <br />
                    <input type='text' name='lastname' onChange={ this.handleChange} value={this.state.lastname} />
                    <div style={{color:'red'}}>
                    {this.state.lastnameerror}</div>
                    </div>
                    <div>
                    <label>Email:</label>
                    <br />
                    <input type='text' name='email' onChange={this.handleChange} value={this.state.email} />
                    <div style={{color:'red'}}>
                    {this.state.emailerror}</div>
                    </div>
                    <div>
                    <label>Password:</label>
                    <br />
                    <input type='password' name='password' onChange={this.handleChange} value={this.state.password} />
                    <div style={{color:'red'}}>{this.state.passworderror}</div>
                    </div>
                    <button disabled={this.state.btn}>Submit</button>
                    <button disabled={this.state.res} onClick={this.handleReset}>Reset</button>
                </form>
            </div>
         );
        }
    }
 
export default Registration;