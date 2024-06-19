import { useState, useEffect } from "react";
import axios from "axios";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    // Fetch team dropdown options from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/team`)
      .then((response) => {
        console.log(response.data);
        setTeamOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team dropdown options:", error);
      });

    // Fetch home data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/team`)
      .then((response) => {
        setHomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);

    const selectedTeamData = teamOptions.find(
      (team) => team.name === selectedValue
    );

    if (selectedTeamData) {
      const updatedHomeData = {
        name: selectedTeamData.name,
        logo: selectedTeamData.logo,
      };

      // Update the homeData state
      setHomeData([updatedHomeData]);

      try {
        // Update the home team data in the database
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam/65a4c43b781814cf4206a691`,
          updatedHomeData
        );
        console.log("Home team data updated successfully");
      } catch (error) {
        console.error("Error updating home team data:", error);
      }
    }
  };

  return (
    <div>
      <h1>Home Team</h1>
      {teamOptions.length > 0 ? (
          <select
              onChange={handleSelectChange}
              className="w-full border p-3 rounded-lg"
          >
            {teamOptions.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
            ))}
          </select>
      ) : (
          <select
              onChange={handleSelectChange}
              className="w-full border p-3 rounded-lg"
          >
            <option value="">Select a team</option>
            {teamOptions.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
            ))}
          </select>
      )}
    </div>
  );
};

export default DropdownComponent;
