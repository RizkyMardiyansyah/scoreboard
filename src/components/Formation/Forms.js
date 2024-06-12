import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import Upload from "../../assets/UploadSimple.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Forms = (positions, playerHome, setPlayerHome) => {

    const getPlayerPosition = (index) => {

        return positions[index] || "";
    };
    const handleInputChange = (e, index) => {
        const updatedPlayerHome = [...playerHome];
        updatedPlayerHome[index].name = e.target.value;
        setPlayerHome(updatedPlayerHome);
    };

    const handleNoChange = (e, index) => {
        const {value} = e.target;
        setPlayerHome((prevPlayerHome) => {
            const updatedPlayerHome = [...prevPlayerHome];
            updatedPlayerHome[index] = {...updatedPlayerHome[index], no: value};
            return updatedPlayerHome;
        });
    };

    const handleDeleteClick = async (playerId) => {
        // Show SweetAlert confirmation dialog
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        // If user confirms, proceed with deletion
        if (confirmation.isConfirmed) {
            try {
                // Delete player from the API
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}`
                );

                // Update state to remove the deleted player
                setPlayerHome(playerHome.filter((player) => player._id !== playerId));

                // Show success message
                Swal.fire({
                    title: "Deleted!",
                    text: "The player has been deleted.",
                    icon: "success",
                });
            } catch (error) {
                console.error("Error deleting player:", error);
                // Show error message
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while deleting the player.",
                    icon: "error",
                });
            }
        }
    };

    const handleFileChange = async (e, index) => {
        try {
            const newPlayerHome = [...playerHome];
            const file = e.target.files[0];

            // You may want to perform additional checks on the file, e.g., size, type, etc.

            // Update the corresponding player's photo property
            newPlayerHome[index].photo = file;

            // Update the state with the new array
            setPlayerHome(newPlayerHome);

            // Prepare FormData to send the file to the server
            const formData = new FormData();
            formData.append("file", file);
            console.log(formData.file);

            // Make a PUT request to update the player's photo on the server
            await axios.put(
                `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${newPlayerHome[index]._id}/photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            console.error("Error handling file change:", error);
        }
    };

    const handleClearFormClick = (index) => {
        setPlayerHome((prevPlayerHome) => {
            const newPlayerHome = prevPlayerHome.map((player, i) => {
                if (i === index) {
                    // Reset the player data for the clicked row, including clearing the photo
                    return {...player, photo: null, name: "", no: ""};
                }
                return player;
            });


            // Return the new array to update the state
            return newPlayerHome;
        });
        const playerId = playerHome[index]._id;
        axios
            .put(
                `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}/photoDelete`
            )
            .then(() => {
                console.log("Server photo deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting server photo:", error);
            });
    };

    // transform image to data URI from buffer
    const transformedPlayerHome = playerHome.map(player => {
        if (!player.photo) return player
        const data = new Buffer.from(player.photo.data).toString('base64')
        return {
            ...player,
            image: `data:image/png;base64,${data}`
        }
    })
    return (
        <div className="mt-4 border rounded-md">
            <table className="table-auto w-full ">
                <thead>
                <tr className="">
                    <th className="px-4 py-2">Position</th>
                    <th className="px-4 py-2">Player Name</th>
                    <th className="px-4 py-2">Player Number</th>
                    <th className="px-4 py-2">Photo</th>
                    <th className="px-4 py-2">Delete</th>
                </tr>
                </thead>
                <tbody className="">
                {transformedPlayerHome.map((player, index) => (
                    // console.log("Player Photo:", player.photo);
                    <tr key={player.id}>
                        <td className="px-4 py-2 flex items-center justify-center">
                            {getPlayerPosition(index)}
                        </td>
                        <td className="px-4 py-2">
                            <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                <input
                                    type="text"
                                    value={player.name}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="rounded-md border-0 py-1.5 pl-7 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </td>

                        <td className="px-4 ">
                            <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                <input
                                    type="text"
                                    value={player.no}
                                    onChange={(e) => handleNoChange(e, index)}
                                    className="rounded-md border-0 py-1.5 pl-7  text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </td>

                        <td className="px-4 py-2">
                            {player.photo ? (
                                <>
                                    <Image
                                        key={player.photo ? player.photo : "default"}
                                        src={player.image}
                                        alt={`Player ${player.name}`}
                                        width={45}
                                        height={45}
                                        className="flex items-center justify-center"
                                    />
                                </>
                            ) : (
                                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                                    <label
                                        htmlFor="fileInput"
                                        className="relative bg-[#F3F3F3] hover:bg-neutral-300 text-black font-semibold py-2 px-4 rounded flex items-center justify-center cursor-pointer"
                                    >
                                        <Image
                                            src={Upload}
                                            width={20}
                                            height={20}
                                            className="mr-3"
                                        />
                                        Upload
                                        <input
                                            id="fileInput"
                                            type="file"
                                            onChange={(e) => handleFileChange(e, index)}
                                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                        />
                                    </label>
                                </div>
                            )}
                        </td>
                        <td className="px-4 py-2 flex items-center justify-center">
                            {index >= 11 && (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                                    onClick={() => handleDeleteClick(player._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            )}
                        </td>
                        <td className="px-4 py-2 flex items-center justify-center">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                                onClick={() => handleClearFormClick(index)}
                            >
                                Clear Form
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Forms;