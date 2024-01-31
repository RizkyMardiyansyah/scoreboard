import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Test from "@/components/Sidebar Content/test";
import Subtitutions from "./Subtitution";
import Control from "./Sidebar Content/Control";
import TeamScore from "./Sidebar Content/TeamScore";
import FormationAway from "./Sidebar Content/FormationAway";

const SideBar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Test");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "Test":
        return <Test />;
      case "Subtitution":
        return <Subtitutions />;
      case "Control":
        return <Control />;
      case "TeamScore":
        return <TeamScore />;
      case "FormationAway":
        return <FormationAway />;
      default:
        return <Test />;
    }
  };
  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
        <Sidebar backgroundColor="#bcf3ff" width="200px">
          <Menu>
            <MenuItem
              onClick={() => handleMenuItemClick("Control")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Control" ? "#ffcccb" : "inherit",
                color: selectedMenuItem === "Control" ? "black" : "inherit",
              }}
            >
              Control
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("Test")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Test" ? "#ffcccb" : "inherit",
                color: selectedMenuItem === "Test" ? "black" : "inherit",
              }}
            >
              Formation Home
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("FormationAway")}
              style={{
                backgroundColor:
                  selectedMenuItem === "FormationAway" ? "#ffcccb" : "inherit",
                color:
                  selectedMenuItem === "FormationAway" ? "black" : "inherit",
              }}
            >
              {" "}
              Formation Away{" "}
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("TeamScore")}
              style={{
                backgroundColor:
                  selectedMenuItem === "TeamScore" ? "#ffcccb" : "inherit",
                color: selectedMenuItem === "TeamScore" ? "black" : "inherit",
              }}
            >
              Team & Score
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Subtitution")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Subtitution" ? "#ffcccb" : "inherit",
                color: selectedMenuItem === "Subtitution" ? "black" : "inherit",
              }}
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
