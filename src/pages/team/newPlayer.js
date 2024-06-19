import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../components/Dropdown";
import Back from "../../assets/caret-left.png";
import Link from "next/link";
import Upload from "../../assets/UploadSimple.png";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const NewPlayer = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [playerNumber, setPlayerNumber] = useState("");
    const [playerTeam, setPlayerTeam] = useState("");
    const [newPlayers, setNewPlayers] = useState([]);
    const [playerPhoto, setPlayerPhoto] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [teams, setTeams] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const router = useRouter();

    const positions = [
        "GK", "LB", "CB", "RB", "DMF", "CMF", "LMF", "RMF", "LW", "RW", "SS", "CF"
    ];

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/team`);
                setTeams(response.data);

                // Check if a team was created and stored in local storage
                const createdTeam = JSON.parse(localStorage.getItem('createdTeam'));
                if (createdTeam) {
                    setTeams(prevTeams => [...prevTeams, createdTeam]);
                    setPlayerTeam(createdTeam.name);
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
    };

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleNoChange = (e) => {
        setPlayerNumber(e.target.value);
    };

    const handleTeamChange = (e) => {
        setPlayerTeam(e.target.value);
    };

    const handlePhotoChange = (e) => {
        const photo = e.target.files[0];
        setPlayerPhoto(photo);
        setPreviewLogo(URL.createObjectURL(photo));
    };

    const handleClearForm = () => {
        setSelectedPosition(null);
        setPlayerName("");
        setPlayerNumber("");
        setPlayerTeam(playerTeam);
        setPlayerPhoto(null);
        setPreviewLogo(null);
    };

    const handleClearAll = () => {
        handleClearForm();
        setNewPlayers([]);
        setIsFormVisible(false);
    };

    const addPlayerToTable = () => {
        const newPlayer = {
            name: playerName,
            number: playerNumber,
            team: playerTeam,
            position: selectedPosition,
            photo: playerPhoto,
            previewLogo: previewLogo,
        };
        setNewPlayers([...newPlayers, newPlayer]);
        handleClearForm();
        setIsFormVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const result = await Swal.fire({
                title: "Create New player?",
                text: "Are you sure you want to create new player?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, create new player",
                cancelButtonText: "No, cancel",
            });
            for (const player of newPlayers) {
                const formData = new FormData();
                formData.append("name", player.name);
                formData.append("no", player.number);
                formData.append("position", player.position);
                formData.append("team", player.team);
                if (player.photo) {
                    formData.append("photo", player.photo);
                }

                await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/player`, formData);
            }
            console.log("Players saved successfully!");
            setIsFormVisible(false);
            router.push("/admin");
        } catch (error) {
            console.error("Error saving players:", error);
        }
    };

    return (
        <>
            <div className="py-4">
                <div className="border-b flex">
                    <div className="mb-4 font-bold text-xl flex">
                        <Link href="/team/newTeam">
                            <div className="ml-4 border p-1 mr-4 rounded-md">
                                <Image src={Back} width={20} height={20} />
                            </div>
                        </Link>
                        Create New Player
                    </div>
                </div>

                <div className="px-3 py-6">
                    <div className="flex">
                        <div className="px-6 flex-col">
                            <h1 className="text-xl font-bold">New Player</h1>
                            <h1>Please provide complete and accurate information for all required fields.</h1>
                        </div>
                        <div className="flex justify-end flex-grow h-10 px-6">
                            <button
                                className="bg-[#5786E3] hover:bg-blue-600 text-white font-bold py-2 px-4 border border-yellow-700 rounded w-36"
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="px-6 py-6 flex-grow w-2/5">
                            <div className="border rounded-md p-5">
                                <h1 className="font-semibold text-xl">Create New Player</h1>
                                <form>
                                    <div className="mt-4">
                                        <table className="table-auto w-full">
                                            <thead>
                                            <tr>
                                                <th className="px-4 py-2">Position</th>
                                                <th className="px-4 py-2">Player Name</th>
                                                <th className="px-4 py-2">Player Number</th>
                                                <th className="px-4 py-2">Photo</th>
                                                <th className="px-4 py-2">Delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="px-4 py-2 flex items-center justify-center">
                                                    <DropdownButton
                                                        options={positions}
                                                        onChange={e => setSelectedPosition(e.target.value)}
                                                        onSelect={handlePositionSelect}
                                                        label={selectedPosition || "Select Position"}
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                                        <input
                                                            type="text"
                                                            value={playerName}
                                                            onChange={handleInputChange}
                                                            className="rounded-md border-0 py-1.5 pl-7 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4">
                                                    <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                                        <input
                                                            type="text"
                                                            value={playerNumber}
                                                            onChange={handleNoChange}
                                                            className="rounded-md border-0 py-1.5 pl-7 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    {previewLogo ? (
                                                        <Image
                                                            src={previewLogo}
                                                            alt="Player Photo"
                                                            width={45}
                                                            height={45}
                                                            className="flex items-center justify-center"
                                                        />
                                                    ) : (
                                                        <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                                            <label htmlFor="fileInput" className="relative bg-[#F3F3F3] hover:bg-neutral-300 text-black font-semibold py-2 px-4 rounded flex items-center justify-center cursor-pointer">
                                                                <Image width={20} height={20} src={Upload} className="mr-3" alt="Upload" />
                                                                Upload
                                                                <input
                                                                    id="fileInput"
                                                                    type="file"
                                                                    onChange={handlePhotoChange}
                                                                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                                                />
                                                            </label>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 flex items-center justify-center">
                                                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" onClick={handleClearForm}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="mt-5 ml-5 flex justify-center">
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                                                py-2 px-4 mx-2 border border-blue-700 rounded"
                                                onClick={addPlayerToTable}
                                            >
                                                Add Player
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleClearAll}
                                                className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {isFormVisible && (
                                <div className="mt-6">
                                    <h2 className="font-semibold text-xl">Players to be added:</h2>
                                    <table className="table-auto w-full mt-4">
                                        <thead>
                                        <tr>
                                            <th className="px-4 py-2">Position</th>
                                            <th className="px-4 py-2">Player Name</th>
                                            <th className="px-4 py-2">Player Number</th>
                                            <th className="px-4 py-2">Team</th>
                                            <th className="px-4 py-2">Photo</th>
                                            <th className="px-4 py-2">Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newPlayers.map((player, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2">{player.position}</td>
                                                <td className="px-4 py-2">{player.name}</td>
                                                <td className="px-4 py-2">{player.number}</td>
                                                <td className="px-4 py-2">{player.team}</td>
                                                <td className="px-4 py-2">
                                                    {player.previewLogo ? (
                                                        <Image
                                                            src={player.previewLogo}
                                                            alt="Player Photo"
                                                            width={45}
                                                            height={45}
                                                        />
                                                    ) : (
                                                        "No photo"
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                                                        onClick={() => {
                                                            const updatedPlayers = newPlayers.filter((_, i) => i !== index);
                                                            setNewPlayers(updatedPlayers);
                                                            if (updatedPlayers.length === 0) {
                                                                setIsFormVisible(false);
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPlayer;
