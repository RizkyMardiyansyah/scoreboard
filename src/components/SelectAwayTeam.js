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
          setTeamOptions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching team dropdown options:", error);
        });

  }, []);

  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);

    const selectedTeamData = teamOptions.find(
        (team) => team.name === selectedValue
    );

    if (selectedTeamData) {
      let logoBase64 = selectedTeamData.logo;

      // Check if logo is a buffer and convert to Base64 string
      if (selectedTeamData.logo) {
        const buffer = new Buffer.from(selectedTeamData.logo.data);
        logoBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
      }
      const updatedHomeData = {
        name: selectedTeamData.name,
        logo: logoBase64,
      };

      // Update the homeData state
      setHomeData([updatedHomeData]);

      try {
        // Update the home team data in the database
        await axios.put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam/65a4c43b781814cf4206a691`,
            updatedHomeData
        );
        console.log("Away team data updated successfully");
      } catch (error) {
        console.error("Error updating away team data:", error);
      }
    }
  };

  return (
      <div>
        <h1>Away Team</h1> {/* Mengubah teks dari "Home Team" menjadi "Away Team" */}
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
