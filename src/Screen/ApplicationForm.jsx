import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { Supabase } from "../config/supabase-config";
import axios from "axios";
import Modal from "react-modal";

// import Modal from "react-modal";
// import { validCodes } from "../utils/Data";
import '../App.css'

const ApplicationForm = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [regions, setRegions] = useState([])
  const [lga, setLga] = useState([])

    useEffect(()=> {
      const url= 'https://nigeria-states-towns-lga.onrender.com/api/all'
      axios.get(url).then((response)=> {
        setRegions(response.data);
        console.log(response.data)
      })
    }, []);

    // useEffect(()=> {
    //   const url= 'https://nigeria-states-towns-lga.onrender.com/api/{state_code}/towns'
    //   axios.get(url).then((response)=> {
    //     setLga(response.data);
    //     // console.log(response.data)
    //   })
    // }, []);
  

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto'; // Enable scrolling

  }, [pathname]);


  // let [formData, setFormData] = useState({});
  const initialValues = {
    fullname: "",
    gender: "",
    age: "",
    email: "",
    state: "",
    lga: "",
    course: "",
    phone: "",
    laptop: "",
    physical: "",
    message: "",
  };
  

  const [formData, setFormData] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // const {fullname, value} = e.target;
    setFormData({ ...formData, fullname: e.target.value });
    console.log(formData);
  };

  // code section starts here

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const congrat = () => {
    navigate("/Congrat");
  };


  // Your array of valid codes
  // const isInArray = validCodes.includes(formData.code);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const checkInputAgainstArray = (input) => {
    // return validCodes.some((value) => value === input);
  };

  // code section ends here

  const handleSubmit = (e) => {
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);



const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (inputValue.trim() !== "" && !checkInputAgainstArray(inputValue)) {
    // console.log('Input value does not match any value in the array:', inputValue);
    // Handle the case when inputValue doesn't match any value in the array
    errors.code = inputValue + " is an invalid code";
  }
   else if (!values.fullname) {
    errors.fullname = "Full name is required";
  } else if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!values.email) {
    errors.email = "email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email";
  } else if (!values.gender) {
    errors.gender = "Select your gender";
  } else if (!values.age) {
    errors.age = "Age range is required";
  } else if (!values.course) {
    errors.course = "Select preferred package";
  } else if (!values.state) {
    errors.state = "state is required";
  } else if (!values.lga) {
    errors.lga = "LGA is required";
  } else if (!values.laptop) {
    errors.laptop= "Laptop availability is required";
  } 
  else if (!values.physical) {
    errors.physical = "this field is required";
  } 
  
  else{
      Supabase.from("signup")
        .upsert([
          {
            fullname: formData.name,
            email: formData.email,
            message: formData.message,
            
          },
        ])
        .then((response) => {
          console.log(response);
          navigate("/congrat");
        });
          }
    return errors;
  };


 

  const saveItem = () => {
   
    // crate a record in a public supabase schema.
    Supabase.from("signup")
      .upsert([
        {
          name: formData.fullname,
          email: formData.email,
          metadata: formData,
        },
      
      ])
      .then((response) => {
        console.log(response);
        navigate("/Congrat");
      });
    
  };

  function getLga(e){
    setFormData({
      ...formData,
     state: e.target.value,
    });
    const state_code = e.target.value;
    const url= `https://nigeria-states-towns-lga.onrender.com/api/${state_code}/towns`
      axios.get(url).then((response)=> {
        setLga(response.data);
        console.log(response.data)
      })
    }
  

  
  return (
    <div className="application">
      <div className="form-text">
        
        <div className="embrace">
        {/* <h2>
          "Embrace the power of learning tech skills; for with each new skill
          you acquire, you unlock the door to innovation and shape a brighter
          future for yourself and the world."
        </h2> */}
        </div>
        
        <div className="pix1">
          {/* <img src={pix} alt="" /> */}
        </div>
        
      </div>

      <div className="formHolder">
        <p></p>
        <h4>Sign Up</h4>
        <p>Fill in your Details</p>
        <div className="form">
          <label htmlFor="name">
            {/* <p>Fullname</p> */}
            <input
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              value={formData.fullname}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  fullname: e.target.value,
                });
              }}
            />
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.fullname}
            </p>
          </label>

          <label htmlFor="">
            {/* <p>Phone Number</p> */}
            <input
              value={formData.phone}
              type="tel"
              name=""
              id=""
              placeholder="Phone number"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: e.target.value,
                });
              }}
            />
            <p style={{ color: "red", fontSize: "14px" }}>{formErrors.phone}</p>
          </label>

          <label htmlFor="">
            {/* <p>Email Address</p> */}
            <input
              type="email"
              name=""
              id=""
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
            <p style={{ color: "red", fontSize: "14px" }}>{formErrors.email}</p>
          </label>

          <label htmlFor="">
            {" "}
            {/* <p>Gender</p> */}
            <select
              value={formData.gender}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  gender: e.target.value,
                });
              }}
              id=""
            >
              <option value={null} style={{ fontSize: "10px" }}>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.gender}
            </p>
          </label>

          <label htmlFor="">
            {/* <p>Age Range</p> */}

            <select
              value={formData.age}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  age: e.target.value,
                });
              }}
              id=""
            >
              <option value={null} style={{ fontSize: "10px" }}>
                Select Age Range
              </option>
              <option value="1">18 - 25</option>
              <option value="2">26 - 30</option>
              <option value="3">31 - 35</option>
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>{formErrors.age}</p>
          </label>

          <label htmlFor="">
            {" "}
            {/* <p>Preferred Package</p> */}
            <select
              value={formData.course}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  course: e.target.value,
                });
              }}
              id=""
            >
              <option value={null}>Preferred Package</option>
              <option value="Product Design">Product Design</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Web Development (Frontend)">Web Development (Frontend)</option>
              <option value="Graphics Design">Graphics Design</option>
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.course}
            </p>
          </label>

          

         

          <label htmlFor="">
            {" "}
            <p>Do you have a laptop?</p>
            <select
              value={formData.laptop}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  laptop: e.target.value,
                });
              }}
              id=""
            >
              {/* <option value={null}></option> */}
              <option value="laptop-available">Yes</option>
              <option value="laptop-unavailable">No</option>
              
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.laptop}
            </p>
          </label>



          <label>
            {" "}
            <p>Select State</p>
            <select
            value={formData.state}
            // onChange={(e) => {
              
            //   setFormData({
            //     ...formData,
            //    state: e.target.value,
            //   });
            //   getLga()
              
            // }}
              onChange={getLga}
            >
              {regions.map((s)=>{
                return  <option value={s.state_code}>{s.name}</option>
              })}
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.state}
            </p>
           
          </label>

          {/* <label>
            {" "}
            <p>Select LGA</p>
            <select
             value={formData.lga}
             onChange={(e) => {
               setFormData({
                 ...formData,
                lga: e.target.value,
               });
               
             }}
            >
              
              {lga.map((l)=>{
                
                return  <option value={l.name}>{l.name}</option>
              })}
            </select>

            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.state}
            </p>
           
          </label> */}

          <label htmlFor="">
            <p>LGA</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="LGA"
              value={formData.lga}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lga: e.target.value,
                });
              }}
            />
            <p style={{ color: "red", fontSize: "14px" }}>{formErrors.lga}</p>
          </label>  


          <label htmlFor="">
            {" "}
            <p>Available for 3 months?</p>
            <select
              value={formData.physical}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  physical: e.target.value,
                });
              }}
              id=""
            >
              <option value={null}>physical availability</option>
              <option value="physical-available">yes</option>
              <option value="physical-unavailable">No</option>
              
            </select>
            <p style={{ color: "red", fontSize: "14px" }}>
              {formErrors.physical}
            </p>
          </label>

       

          <label htmlFor="" className="txt">
            <p>What is your message to the foundation? (optional)</p>

            <textarea 
            value={formData.message}
            onChange={(e) => {
              setFormData({
                ...formData,
                message: e.target.value,
              });
            }}
            type="text"
            name=""
            id=""
            placeholder="Message"
            >

            </textarea>
            
          </label>

         
         


        </div>
        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Enroll
          </button>
        </div>
      </div>



      {/* <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        className="two"
        style={{
          overlay: {
            position: "fixed",
            top: "0px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 12,
            // backgroundColor: "hsl(0, 0%, 0%, .5)",
            backgroundColor: "hsl(0, 0%, 0%, .6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <div className="confirm confirms">
          <h4>Congratulations, your registration was successful. You will receive an email on or before May.</h4>
          
          <button onClick={setIsOpen(false)}>Ok</button>
        </div>
      </Modal>
       */}
    </div>
  );
};

export default ApplicationForm;
