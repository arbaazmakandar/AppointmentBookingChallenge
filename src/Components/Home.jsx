import { useState } from "react";
import axios from 'axios'

const Home =()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [doctor, setDoctor] = useState("");
    const [displayWhenAndWhere, setDisplayWhenAndWhere] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    const postData = async({userId, title, body}) =>{
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: title,
                body: body,
                userId: userId
                }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
                });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic, e.g., send data to backend
        // console.log('Form submitted:');
        // console.log(firstName, lastName, email, doctor);

        setLoading(true);
        const response = await postData({userId:1, title:`${firstName}  ${lastName}`, body:`${email}`})
        setLoading(false);
        if(response.status === 201){
            setShowSuccess(true);
        }


      };

    const handleCancelBooking = () =>{
        // console.log("CancelBooking")
        setDisplayWhenAndWhere(false);
        setShowSuccess(false);
    
    }



    const handleDoctorSelect = (event) => {
        setDoctor(event.target.value);
        setDisplayWhenAndWhere(true);
    }  


    return (
       
        
        <>{showSuccess ? <><h1>Appointment Booked Successfully</h1><br/><button onClick={()=>{handleCancelBooking()}}type="submit">Cancel Booking</button></>:<> 
            <h1>Book a Session</h1>
            <p>Fill in the form below to book a virtual s   ession with your doctor</p>
            <br/>
            { loading ? <h5>Scheduling the Appointment... </h5> :
            <>
                <strong>Basic Info</strong>
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    <label>First Name
                        <input
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>Last Name
                        <input
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>Email
                        <input
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <strong>Doctor</strong>
                    <br/>
                    <br/>
                    <select onChange={(event)=>handleDoctorSelect(event)}>
                        <option value="selectDoctor" default>Select Your Doctor</option>
                        <option value="johnHopkins">Dr. John Hopkins</option>
                        <option value="alexanderFlemming">Dr. Alexander Flemming</option>
                        <option value="edwardJenner">Dr. Edward Jenner</option>
                    </select>
                    <br/>
                    <br/>

                    {displayWhenAndWhere && 
                    <>
                    <div>
                    <br/>
                    <br/>
                    <strong>Where</strong>
                    <br/>
                    <br/>   
                    
                        <input type="radio" value="googleMeet" name="where" /> Google Meet
                        <input type="radio" value="phone" name="where" /> Phone
                    
                    <br/>
                    <br/>
                    <strong>When</strong>
                    <br/>
                    <br/> 
                        <input type="datetime-local" id="datetime" name="datetime"/>
                    </div>
                    </> 
                    }
                    <br/>
                    <br/> 
                    <button type="submit">Confirm Booking</button>


                </form>
            </>
            }
            </>
            }
        </>
        

    )
}

export default Home