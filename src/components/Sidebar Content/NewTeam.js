import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Plus from "../../assets/PlusWhite.png";

const NewTeam = () => {
     return (
         <>
             <div className="flex mt-5">
                 <div
                     className="w-1/4 bg-[#000000] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
                     <a
                         href="team/newTeam"
                         rel="noopener noreferrer"
                         className="cursor-pointer flex justify-center items-center flex-col"
                     >
                         <div className="">
                             <div className="flex justify-center items-center mb-3">
                                 <Image src={Plus} alt="Plus" width={40} height={40}/>
                             </div>
                             <div className="text-white">Create New Team</div>
                         </div>
                     </a>
                 </div>
             </div>
         </>
     )
}
export default NewTeam;