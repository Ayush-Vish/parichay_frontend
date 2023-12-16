import { useEffect, useRef, useState } from "react"
import { usePeer } from "../Peer";

const useMediaStream = () => {
    const [ state  , setState] = useState(null) ;

    const isStreamSet = useRef( false) ;
        useEffect(()=> {
            if(isStreamSet.current) return ;
            isStreamSet.current = true ;
            (async function  initStream()  {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio : true ,
                        video : true ,
                    })

                    
                    console.log("Setting You Stream"  );

                    setState(stream) ;
                    console.log("sfjkbsdjfvkjdhvb")
                } catch (error) {
                    console.log("Error in media navigator  " ,error) ;

                    
                }
            })()

        } ,[])


        return {
            stream :state
        }
}


export default useMediaStream ;
