"use client";

// We have used client here because motion uses useEffect which can be used in trhe clientr side only ; 
// if we use it in the server side it will give an error
import { motion } from "framer-motion"

import {links} from "../lib/data";
import { Link } from "react-router-dom";


function Header ( ) {

    return (
       <header className="z-[99] relative" >
            <motion.div  className="fixed top-0 left-1/2  h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full   " 
                initial={{y:-100 ,x:"-50%",  opacity:0}}
                animate={{y:0 , x:"-50%",opacity:1}}
            >
            </motion.div> 
            <nav className=" flex fixed top-[0.15rem] left-1/2  h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[1.7rem ] sm:h-[initial] sm:py-0">
                <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium  text-gray-500 sm:w-[initial]  sm:flex-nowrap sm:gap-5  ">
                    {
                        links.map(e => (
                            <motion.li
                                initial={{y:-100 , opacity:0}}
                                animate={{y:0 , opacity:1}}
                                transition={{delay:0.2}}
                            className="h-3/4 flex items-center justify-center " key={e.hash} >
                                <Link className="w-full items-center justify-center p-3 hover:text-gray-700  transition-all ease-in-out duration-300 " to={e.hash}> {e.name}</Link>
                            </motion.li >
                        ))
                    }
                </ul>
            </nav>

       </header>
    )

}

export default Header;