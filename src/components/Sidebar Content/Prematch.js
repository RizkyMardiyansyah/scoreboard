import SelectHomeTeam from "../SelectHomeTeam";
import SelectAwayTeam from "../SelectAwayTeam";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Plus from "../../assets/PlusWhite.png";

const Prematch = () => {
  return (
    <>
      <div className="flex mt-5">
        <div className="w-1/4 bg-[#000000] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
          <a
            href="prematch/prematch-1"
            rel="noopener noreferrer"
            className="cursor-pointer flex justify-center items-center flex-col"
          >
            <div className="">
              <div className="flex justify-center items-center mb-3">
                <Image src={Plus} alt="Plus" width={40} height={40} />
              </div>
              <div className="text-white">Create New Match</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Prematch;
