"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NavbarBeforeLogin from "@/components/NavbarBeforeLogin";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/goal.module.css";
import Lineup433Home from "@/components/Formation/433Home";
import Lineup4231Home from "@/components/Formation/4231Home";
import Lineup442Home from "@/components/Formation/442Home";
import Lineup433Away from "@/components/Formation/433Away";
import Lineup4231Away from "@/components/Formation/4231Away";
import Lineup442Away from "@/components/Formation/442Away";
import Goal from "@/components/Goal";
import Image from "next/image";
import YellowCard from "@/components/YellowCard";
import RedCard from "@/components/RedCard";
import Timer from "@/components/test/timer3";

const Page1 = (isAuthenticated) => {
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
    } else {
      setShowComponent1(true);
      setShowComponent2(false);
      setShowComponent3(false);
      setShowComponent4(false);
      setShowComponent5(false);
      setShowComponent6(false);
      setShowComponent7(false);
      setShowComponent8(false);
      localStorage.setItem("showComponent", "1");
    }

    const handleStorageChange = (event) => {
      // Check if the change is related to the specific key you want to ignore
      if (event.key !== "stopwatchTime") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Apply styles to hide scroll when the component mounts
    document.body.style.overflow = "hidden";

    // Clean up the styles when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      <div className="flex h-screen">
        <div className="w-1/4 bg-[#2f2f2f] flex items-center justify-center">
          <div className="text-white">
            <Timer />
          </div>
        </div>
        <div className="flex-1 bg-red-500 flex flex-col items-center justify-center">
          <div className="mt-3 text-3xl">BRI Liga 1</div>
          <div className="mt-auto w-full ">
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
          </div>
          <div className="mt-auto mb-4 text-center ">
            <p>AFC Asian Cup</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Component1 = () => {
  return (
    <>
      <Scoreboard />;
    </>
  );
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
export default Page1;
