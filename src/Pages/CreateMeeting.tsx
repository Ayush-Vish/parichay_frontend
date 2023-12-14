import { useSelector } from "react-redux";
import {authInitailState } from "../types/authTypes"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { VideoIcon } from "lucide-react";
import { getCurrentDate } from "@/Helpers/getDate.helper";
import { useSocket } from "@/Context/Socket";
import { useNavigate } from "react-router-dom";

function CreateMeetingPage ( )  { 
    const {socket} = useSocket();
    const navigate = useNavigate();

    const authData = useSelector(state => state.auth  )as authInitailState;
    console.log(authData.data.email);

    const randomId =  "fdf"


    
    const [code , setCode ] = useState("" );
    
    const data = useSelector(state   => state.auth) as authInitailState ;
    function handleSubmit ( )  {
        socket.emit("join-room" , {roomId: randomId , emailId : authData.data.email })
    }
    function handleRoomJoined ({roomId}) {
        navigate(`/meeting/${roomId}`);

    } 
    useEffect(()=>{
        socket.on("joined-room" ,handleRoomJoined )
    }, [socket])

    return ( 
        <main className="max-w-[60rem] mt-1 gap-7 flex flex-col m-auto   sm:items-center     ">
            <header className="flex justify-between sm:w-[100%] sm:flex-row   p-2  gap-1 ">
                <div>
                    <h1  className=" text-center text-gray-600 font-bold text-3xl " >
                        Boom
                    </h1>
                </div>
                <div className="flex  sm:flex-row  items-center gap-3 ">
                    <div className="text-lg font-light">
                        {getCurrentDate()}
                    </div>
                    <div >
                        <img className="h-8 w-8     rounded-full "  src={data.data.picture} alt="op" />
                    </div>
                </div>
            </header>
            <div className="flex flex-col sm:mt-[2rem] items-center">
                <section className="p-3 flex flex-col items-center gap-4 mt-8">
                    <div className="text-center font-bold text-5xl leading-[6   0px]">
                        <h1>
                            Premium video meetings. 
                            Now <span>
                                Free
                            </span> for everyone.
                        </h1>
                    </div>
                    <div className="text-center text-lg mb-10">
                        <p>
                            We are boom that provide free premium meetings for everyone.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row  items-center  gap-5 ">
                        <Button  onClick={handleSubmit}  className="gap-1">
                            Create Meeting <VideoIcon/>
                        </Button>
                        <div className="border-2  p-2 rounded-md focus:border-gray-700 focus:border-3 flex border-gray-500  ">
                            <input
                            className="active:outline-none focus:outline-none w-40" 
                            onChange={(e) => setCode(e.target.value)} 
                            type="text" 
                            name="code" 
                            value={code} 
                            placeholder="Enter code here"
                            />
                            <button
                            className="disabled:text-gray-500 disabled:font-light font-bold " 
                            disabled={!code}  
                            onClick={handleSubmit}
                            > Join
                            </button>
                        </div>
                    </div>

                </section> 
                <div>
                    <img src="https://lh3.googleusercontent.com/JnjEDJ6trEj_Edry9eP-FOCzx7pAcvaFfdaFIaXm5Cxt06HEP3YfS1WSuFEPrA0g7kbQPP0-KMZFgno5z6bxeYg6LH5_UQzZwNSVgFJA=e365-pa-nu-s0" alt=""  width="720" height="500" loading="eager" />
                </div>
            </div>
            
        </main>
    )


}

export default CreateMeetingPage; 
