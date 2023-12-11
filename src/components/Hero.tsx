import axiosInstance from "@/Helpers/axios/axios.helper";
import image from "../assets/unnamed.webp"
import { Button } from "./ui/button";
import { useState } from "react";

function Hero ( ) { 

    const [ showCode , setShowCode ] = useState(0);  
    const [code , setCode] = useState("");

    function handleUserInput (e)   {

        const {value} = e.target;
        
        setCode(value); 
        console.log(value); 
    }

    function handleSubmit (e : React.FormEvent<HTMLButtonElement> )  {
        e.preventDefault();
        console.log("submitted")
        


    }
    async function handleLogin () {
       
       
        window.location.href  = "http://localhost:4000/api/v1/user/auth/google";
        const response = await axiosInstance.get("/user/auth/google");
        



    }

    return ( 
        <section className="flex flex-col sm:flex-row   max-w-[60rem] mt-44 gap-7"  > 
            <div className="flex  flex-col  items-center gap-3 sm:items-start "> 
                <div className="flex text-3xl text-gray-700">
                    {/* <GoalIcon/> */}
                    <h3>Boom </h3>
                </div>
                <div>
                    <h1 className="text-center  sm:text-left font-bold text-4xl">
                        Video calls with anyone, anywhere
                    </h1>
                </div>
                <div className="text-center sm:text-left text-sm w-[95%] text-gray-600">
                    <p>
                        Stay connected and collaborate with family, friends and colleagues no matter where  you are. 
                    </p>
                </div>
                <div>
                    <Button onClick={handleLogin}>
                        Sign In 
                    </Button>
                </div>
                <div className="flex  flex-col items-center sm:flex-row sm:gap-2 sm:text-sm ">
                    Join a meeting now   {!showCode ?  <span onClick={() =>setShowCode(1)} className="text-gray-800 underline font-bold ">Enter Code </span> : <div> <input className="active:outline-none focus:outline-none w-40" onChange={handleUserInput} type="text" name="code" value={code} placeholder="Enter code here" /> <button className="disabled:text-gray-500 disabled:font-light font-bold " disabled={!code}  onClick={handleSubmit}> Join</button> </div> }    
                </div>
            </div>
            <div>
            <img src={image} alt="Three windows of a Google Meet video call show participants for a virtual party." width="720" height="500" loading="eager"/>
               
            </div>

        </section>
    )


}


export default Hero ;
