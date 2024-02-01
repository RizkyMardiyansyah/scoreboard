import React from "react";
import Image from "next/image";
import green from "../assets/green.png";
import red from "../assets/red.png";

const SubtitutionPage = () => {
  const subPhoto = localStorage.getItem("subPhotoUrl");
  const subPhoto2 = localStorage.getItem("subPhotoUrl2");
  const subName = localStorage.getItem("subPhotoName");
  const subName2 = localStorage.getItem("subPhotoName2");

  return (
    <>
      <div className=" ">
        <div class="flex justify-around items-center">
          <div>
            <div className="text-white text-center">{subName}</div>
            <Image src={subPhoto} width={250} height={250} />
          </div>
          <div>
            <div className="text-white text-center ">Out</div>
            <Image src={red} width={115} height={115} />
          </div>
          <div>
            <div className="text-white text-center ">In</div>
            <Image src={green} width={115} height={115} />
          </div>
          <div>
            <div className="text-white text-center">{subName2}</div>
            <Image src={subPhoto2} width={250} height={250} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubtitutionPage;
