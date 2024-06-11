import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";


const Forms = (positions, playerHome) => {
    const getPlayerPosition = (index) => {

        return positions[index] || "";
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
                `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${playerId}`
            );

            // Update state to remove the deleted player
            setPlayerAway(playerAway.filter((player) => player._id !== playerId));

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
        const newPlayerAway = [...playerAway];
        const file = e.target.files[0];

        // You may want to perform additional checks on the file, e.g., size, type, etc.

        // Update the corresponding player's photo property
        newPlayerAway[index].photo = file;

        // Update the state with the new array
        setPlayerAway(newPlayerAway);

        // Prepare FormData to send the file to the server
        const formData = new FormData();
        formData.append("file", file);

        // Make a PUT request to update the player's photo on the server
        await axios.put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${newPlayerAway[index]._id}/photo`,
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
// console.log("Player Photo:", playerHome[15].photo);

return (
    <div className="mt-4 border rounded-md">
        <table className="table-auto w-full">
            <thead>
            <tr>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Player Name</th>

                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Delete</th>
            </tr>
            </thead>
            <tbody>
            {playerAway.map((player, index) => (
                // console.log("Player Photo:", player.photo);
                <tr key={player.id}>
                    <td className="px-4 py-2 flex justify-center">
                        {getPlayerPosition(index)}
                    </td>
                    <td className="px-4 py-2">
                        <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) => handleInputChange(e, index)}
                                className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </td>

                    <td className="px-4 py-2">
                        {player.photo ? (
                            <>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${player._id}/photo`}
                                    alt={`Player ${player.name}`}
                                    width={45}
                                    height={45}
                                    className="flex justify-center"
                                />
                            </>
                        ) : (
                            <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, index)}
                                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        )}
                    </td>
                    <td className="px-4 py-2 flex justify-center">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                            onClick={() => handleDeleteClick(player._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);
};