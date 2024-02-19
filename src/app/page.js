"use client";
import { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import Lineup433Home from "../components/Formation/433Home";
import Lineup4231Home from "../components/Formation/4231Home";
import Lineup442Home from "../components/Formation/442Home";
import Lineup433Away from "../components/Formation/433Away";
import Lineup4231Away from "../components/Formation/4231Away";
import Lineup442Away from "../components/Formation/442Away";
import Goal from "../components/Goal";
import Image from "next/image";
import YellowCard from "../components/YellowCard";
import RedCard from "../components/RedCard";
import Timer from "../components/Timer/timer3";
import Sponsor1 from "../assets/sponsor1.png";
import Sponsor2 from "../assets/sponsor2.png";
import Sponsor3 from "../assets/sponsor3.png";
import axios from "axios";
import SubtitutionPage from "../components/SubtitutionPage";
import SubtitutionPageAway from "../components/SubtitutionPageAway";
import Marquee from "react-fast-marquee";

const Page = () => {
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showComponent4, setShowComponent4] = useState(false);
  const [showComponent5, setShowComponent5] = useState(false);
  const [showComponent6, setShowComponent6] = useState(false);
  const [showComponent7, setShowComponent7] = useState(false);
  const [showComponent8, setShowComponent8] = useState(false);
  const [showComponent9, setShowComponent9] = useState(false);
  const [showComponent10, setShowComponent10] = useState(false);
  const [showComponent11, setShowComponent11] = useState(false);
  const [showComponent12, setShowComponent12] = useState(false);
  const [showPicture, setShowPicture] = useState([]);
  const [getColor, setGetColor] = useState("");
  const [getColor2, setGetColor2] = useState("");

  useEffect(() => {
    const color = localStorage.getItem("pageColor") || "#C2C2E6";
    setGetColor(color);

    const color2 = localStorage.getItem("pageColor2") || "#CF4463";
    setGetColor2(color2);
  }, []);

  // show subtitute page for 10 seconds
  useEffect(() => {
    if (
      localStorage.getItem("showComponent") === "11" ||
      localStorage.getItem("showComponent") === "12"
    ) {
      setTimeout(() => {
        localStorage.setItem("showComponent", "1");
        setShowComponent11(false);
        setShowComponent12(false);
        setShowComponent1(true);
      }, 10000);
    }
  }, [showComponent11]);

  useEffect(() => {
    const storedComponent = localStorage.getItem("showComponent");
    if (storedComponent === "1") {
      setShowComponent1(true);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "2") {
      setShowComponent1(false);
      setShowComponent2(true);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "3") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(true);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "4") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(true);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "5") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(true);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "6") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(true);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "7") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(true);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "8") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(true);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "9") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(true);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "10") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(true);
      setShowComponent11(false);
      setShowComponent12(false);
    } else if (storedComponent === "11") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(true);
      setShowComponent12(false);
    } else if (storedComponent === "12") {
      setShowComponent1(false);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(true);
    } else {
      setShowComponent1(true);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      setShowComponent9(false);
      setShowComponent10(false);
      setShowComponent11(false);
      setShowComponent12(false);

      localStorage.setItem("showComponent", "1");
    }

    //when there is a change in local storage auto reload, except event.key
    const handleStorageChange = (event) => {
      if (
        event.key !== "stopwatchTime" &&
        event.key !== "subPhotoUrl2" &&
        event.key !== "subPhotoUrl" &&
        event.key !== "subPhotoName" &&
        event.key !== "subPhotoName2" &&
        event.key !== "subPhotoUrl2Away" &&
        event.key !== "subPhotoUrlAway" &&
        event.key !== "subPhotoNameAway" &&
        event.key !== "subPhotoName2Away" &&
        event.key !== "browser-tabs-lock-key-clerk.lock.refreshSessionToken"
        // event.key !== "pageColor" &&
        // event.key !== "pageColor2"
      ) {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //get homeTeam
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`
        );
        setShowPicture(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // hide scroll on scoreboard main page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  // console.log(showPicture[2].logo);

  return (
    <>
      <div className="flex h-screen">
        {/* left side */}
        {/* <div
          style={{
            width: "25%",
            backgroundColor: getColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="mb-auto mt-5">
            <Image src={Berani} width={250} height={250} alt="Sponsor Logo" />
          </div>
          <div className="text-white">
            <Timer />
          </div>
          <div className="mt-auto mb-5">
            <Image src={Nat} width={250} height={250} alt="Sponsor 2 Logo" />
          </div>
        </div> */}
        {/* center side */}
        <div className="flex-1 bg-[#2C2C2C] flex flex-col items-center justify-center">
          <div className="flex">
            <div className="mt-3 text-4xl font-medium item-start">
              {showPicture && showPicture[1] && showPicture[1].logo && (
                <Image
                  src={showPicture[1].logo}
                  width={100}
                  height={100}
                  alt="Competition Logo"
                />
              )}
            </div>
          </div>

          {/* show component */}
          <div className="m-auto w-full customFont font-medium">
            {showComponent1 && <Component1 />}
            {showComponent2 && <Component2 />}
            {showComponent3 && <Component3 />}
            {showComponent4 && <Component4 />}
            {showComponent5 && <Component5 />}
            {showComponent6 && <Component6 />}
            {showComponent7 && <Component7 />}
            {showComponent8 && <Component8 />}
            {showComponent9 && <Component9 />}
            {showComponent10 && <Component10 />}
            {showComponent11 && <Component11 />}
            {showComponent12 && <Component12 />}
          </div>
          <div className="mt-auto w-full border border-white overflow-hidden">
            <div className="px-4 py-2 bg-white">
              <Marquee>
                <Image
                  src={Sponsor1}
                  alt="Sponsor1"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor2}
                  alt="Sponsor2"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor3}
                  alt="Sponsor3"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor1}
                  alt="Sponsor1"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor2}
                  alt="Sponsor2"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor3}
                  alt="Sponsor3"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor1}
                  alt="Sponsor1"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor2}
                  alt="Sponsor2"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor3}
                  alt="Sponsor3"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor1}
                  alt="Sponsor1"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor2}
                  alt="Sponsor2"
                  width={125}
                  height={125}
                  className="mr-2"
                />
                <Image
                  src={Sponsor3}
                  alt="Sponsor3"
                  width={125}
                  height={125}
                  className="mr-2"
                />
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Component1 = () => {
  return <Scoreboard />;
};

const Component3 = () => {
  return <Goal />;
};

const Component4 = () => {
  return <YellowCard />;
};

const Component5 = () => {
  return <RedCard />;
};

const Component2 = () => {
  return <Lineup433Home />;
};
const Component7 = () => {
  return <Lineup4231Home />;
};
const Component8 = () => {
  return <Lineup442Home />;
};

const Component6 = () => {
  return <Lineup433Away />;
};

const Component9 = () => {
  return <Lineup4231Away />;
};
const Component10 = () => {
  return <Lineup442Away />;
};
const Component11 = () => {
  return <SubtitutionPage />;
};
const Component12 = () => {
  return <SubtitutionPageAway />;
};
export default Page;
