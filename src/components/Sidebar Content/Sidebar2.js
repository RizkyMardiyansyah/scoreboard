import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Subtitutions from "./SubtitutionNew";
import Control from "./Control";
import TeamScore from "./TeamScore";
import axios from "axios";
import DropdownButton from "../Dropdown";
import Overview from "./Overview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePause,
  faCirclePlay,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Swal from "sweetalert2";
import getConfig from "next/config";
import { useUser, UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import GoalPlayer from "../Player Component/GoalPlayer";
import YellowCard from "../Player Component/YellowCard";
import RedCard from "../Player Component/RedCard";
import Play from "../../assets/PlayCircle.png";
import PlayBlack from "../../assets/PlayCircleBlack.png";
import Presentation from "../../assets/Presentation.png";
import Prematch from "./Prematch";
import { useStopwatch } from "../Timer/timerAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideBar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Control");
  const [score, setScore] = useState(null);

  const [teamHome, setTeamHome] = useState([]);
  const [teamAway, setTeamAway] = useState([]);
  const [data, setData] = useState(null);
  const { publicRuntimeConfig } = getConfig();
  const { IFRAME_URL } = publicRuntimeConfig;
  const { user, isLoaded } = useUser();

  const {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    handleStartFromZero,
    handleStartFrom45,
  } = useStopwatch();

  const fetchData = async (url, setData, errorMessage) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/${url}`
      );
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${errorMessage} data:`, error);
    }
  };

  useEffect(() => {
    fetchData("coach", setData, "coach");
    fetchData("homeTeam", (data) => setTeamHome(data[0]), "Team home");
    fetchData("awayTeam", (data) => setTeamAway(data[0]), "Team away");
    fetchData("score", (data) => setScore(data[0]), "score");
  }, []);

  const clearHomeTeamData = async () => {
    const homeTeamId = "65a4c43b781814cf4206a691";
    const updatedData = {
      name: "",
      logo: "",
      formation: "",
    };
    const coach = {
      name: "",
    };
    const emptyScore = {
      messagesHome: [],
      messagesAway: [],
      minutesAway: [],
      minutesHome: [],
    };

    try {
      // Send a PUT request to update the homeTeam data with empty values
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam/${homeTeamId}`,
        updatedData
      );
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam/65a4cbb0a5c2cc43008bbe79`,
        updatedData
      );
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/65aa203d672025c87a76f5d0`,
        coach
      );
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/65aa2055672025c87a76f5d3`,
        coach
      );
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/score/65b3543eba1432d9d3e02d56`,
        emptyScore
      );

      console.log("Data cleared successfully!");
    } catch (error) {
      console.error("Error updating data for homeTeam:", error.message);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // tabs
  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "Prematch":
        return <Prematch />;
      case "Subtitution":
        return <Subtitutions />;
      case "Control":
        return (
          <>
            {/* menu awal sperti timer, pause, play dsb */}
            <div className="flex mt-5">
              <div className="w-1/4 bg-[#000000] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer flex justify-center items-center flex-col"
                >
                  <div className="">
                    <div className="flex justify-center items-center mb-3">
                      <Image
                        src={Presentation}
                        alt="Presentation"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="text-white">View Board</div>
                  </div>
                </a>
              </div>

              <div className="w-1/4 bg-[#EAEAEA] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
                <div className="">
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "60px" }}>
                      <span className="text-black">{formatTime(time)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-1/4 bg-[#5AD8AE] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={isRunning ? pauseTimer : startTimer}
              >
                {isRunning ? (
                  <div>
                    <div className="flex justify-center items-center mb-3">
                      <FontAwesomeIcon
                        icon={faCirclePause}
                        className="fa-2xl"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      Pause
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-center items-center mb-3">
                        <FontAwesomeIcon
                          icon={faCirclePlay}
                          className="fa-2xl"
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        Start
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div
                className="w-1/4 bg-[#5786E3] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={handleStartFromZero}
              >
                <div className="">
                  <div className="flex justify-center items-center mb-3">
                    <FontAwesomeIcon icon={faCirclePlay} className="fa-2xl" />
                  </div>
                  <div>First Half</div>
                </div>
              </div>

              <div
                className="w-1/4 bg-[#FFCB82] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={handleStartFrom45}
              >
                <div className="">
                  <div className="flex justify-center items-center mb-3">
                    <FontAwesomeIcon icon={faCirclePlay} className="fa-2xl" />
                  </div>
                  <div>Second Half</div>
                </div>
              </div>
            </div>
            {/* <button onClick={clearHomeTeamData}>Clear</button> */}
            {/* tabs */}
            <div className="">
              {/* tabs List */}
              <Tab.Group>
                <div className="w-full px-2 flex justify-between py-8 sm:px-0 ">
                  {/* dashboard, red, yellow, goal, score */}
                  <div className=" w-1/2">
                    <Tab.List className="flex space-x-1 rounded-xl min-w-xl  bg-[#EAEAEA] p-2">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                        onClick={() => {
                          localStorage.setItem("showComponent", "1");
                        }}
                      >
                        Dashboard
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                      >
                        Goal Player
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                      >
                        Yellow Card
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                      >
                        Red Card
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                        onClick={() => {
                          localStorage.setItem("showComponent", "1");
                        }}
                      >
                        Update Score
                      </Tab>
                    </Tab.List>
                  </div>
                  {/* formation */}
                  <div className="w-1/3 mr-4">
                    <Tab.List className="flex space-x-1 rounded-xl min-w-xl  bg-[#EAEAEA] p-2">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                        onClick={() => {
                          let showComponentValue;

                          switch (teamHome.formation) {
                            case "4-3-3":
                              showComponentValue = "2";
                              break;
                            case "4-2-3-1":
                              showComponentValue = "7";
                              break;
                            case "4-4-2":
                              showComponentValue = "8";
                              break;
                            default:
                              showComponentValue = "1"; // Default value if no match
                              break;
                          }

                          // Set local storage item
                          localStorage.setItem(
                            "showComponent",
                            showComponentValue
                          );
                        }}
                      >
                        Formation Home
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                            "focus:outline-none",
                            selected
                              ? "bg-white text-black shadow"
                              : "text-black hover:bg-white/[0.12] hover:text-black"
                          )
                        }
                        onClick={() => {
                          let showComponentValue;

                          switch (teamAway.formation) {
                            case "4-3-3":
                              showComponentValue = "6";
                              break;
                            case "4-2-3-1":
                              showComponentValue = "9";
                              break;
                            case "4-4-2":
                              showComponentValue = "10";
                              break;
                            default:
                              showComponentValue = "1"; // Default value if no match
                              break;
                          }

                          // Set local storage item
                          localStorage.setItem(
                            "showComponent",
                            showComponentValue
                          );
                        }}
                      >
                        Formation Away
                      </Tab>
                    </Tab.List>
                  </div>
                </div>
                {/* Tabs Content */}
                <Tab.Panels>
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    {" "}
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>

                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <GoalPlayer />
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>

                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <YellowCard />
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>

                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <RedCard />
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>

                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <TeamScore />
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
                {/* 2 */}
                <Tab.Panels>
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    {" "}
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>

                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    {" "}
                    <div className="flex items-center justify-center mb-5 mr-2">
                      <iframe
                        className="rounded-lg"
                        src={IFRAME_URL}
                        title="Content from localhost:3000"
                        width="100%"
                        height="800"
                      />
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </>
        );
      case "Overview":
        return <Overview />;
      case "TeamScore":
        return <TeamScore />;
      default:
        return <Prematch />;
    }
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
        <Sidebar backgroundColor="#ffffff" width="200px">
          {/* User Name */}
          <Menu>
            <div className="">
              {isLoaded && user ? (
                <>
                  <div className="border border-gray flex justify-center items-center rounded-lg mt-2 mb-2 py-2">
                    <UserButton afterSignOutUrl="/" className="mr-2" />
                    <span className="text-black ml-3 text-sm">{`${user.firstName} ${user.lastName}`}</span>
                  </div>
                </>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link href="/login">Login</Link>
                </button>
              )}
            </div>

            {/* Menu Item */}
            <MenuItem
              onClick={() => handleMenuItemClick("Prematch")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Prematch" ? "#f3f3f3" : "inherit",
                color: selectedMenuItem === "Prematch" ? "black" : "#000000",
              }}
            >
              Match Setup
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("Overview")}
              disabled={teamHome.name === ""}
              style={
                !teamHome.name
                  ? undefined
                  : {
                      backgroundColor:
                        selectedMenuItem === "Overview" ? "#F3F3F3" : "inherit",
                      color:
                        selectedMenuItem === "Overview" ? "black" : "#000000",
                      cursor: "pointer",
                    }
              }
            >
              Overview
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("Control")}
              disabled={teamHome.name === ""}
              style={
                !teamHome.name
                  ? undefined
                  : {
                      backgroundColor:
                        selectedMenuItem === "Control" ? "#F3F3F3" : "inherit",
                      color:
                        selectedMenuItem === "Control" ? "black" : "#000000",
                      cursor: "pointer",
                    }
              }
            >
              Control
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("Subtitution")}
              disabled={teamHome.name === ""}
              style={
                !teamHome.name
                  ? undefined
                  : {
                      backgroundColor:
                        selectedMenuItem === "Subtitution"
                          ? "#F3F3F3"
                          : "inherit",
                      color:
                        selectedMenuItem === "Subtitution"
                          ? "black"
                          : "#000000",
                      cursor: "pointer",
                    }
              }
            >
              Subtitution
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="flex-1" style={{ marginLeft: "10px" }}>
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default SideBar;
