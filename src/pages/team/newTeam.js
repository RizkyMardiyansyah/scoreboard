import Image from "next/image";
import React, {useState} from "react";
import Back from "../../assets/caret-left.png";
import {useRouter} from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Upload from "../../assets/UploadSimple.png";

const AddTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [createdTeam, setCreatedTeam] = useState(null);
    const router = useRouter();
    const newTeam = {
        name: "",
        logo: null, // Assuming you want to upload a photo
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setTeamLogo(file);
        setPreviewLogo(URL.createObjectURL(file));
    };
    const handleSubmit = async () => {
        const result = await Swal.fire({
            title: "Create New Team?",
            text: "Are you sure you want to create new team?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, create new team",
            cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
            try {
                const formData = new FormData();
                formData.append('name', teamName);
                formData.append('logo', teamLogo);
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_DATABASE_URL}/team`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                Swal.fire({
                    title: "Team created successfully!",
                    icon: "success",
                });
                console.log("Team created successfully!", response.data);
                setCreatedTeam(response.data.team);
                localStorage.setItem('createdTeam', JSON.stringify(response.data.newTeam));
                router.push("/team/newPlayer");
            } catch (error) {
                Swal.fire({
                    title: `Error creating team: ${error.message}`,
                    icon: "error",
                });
                console.error("Error creating team:", error);
            }
        }
    };


    return (
        <>
            <div className="py-4">
                <div className="border-b flex ">
                    <div className="mb-4 font-bold text-xl flex">
                        <Link href="/admin">
                            <div className="ml-4 border p-1 mr-4 rounded-md">
                                <Image src={Back} width={20} height={20} />
                            </div>
                        </Link>
                        Create New Team
                    </div>
                </div>

                <div className="px-3 py-6 ">
                    <div className="flex">
                        <div className="px-6 flex-col ">
                            <h1 className="text-xl font-bold">New Team</h1>
                            <h1>
                                Please provide complete and accurate information for all
                                required fields.
                            </h1>
                        </div>
                        <div className="flex justify-end flex-grow h-10  px-6">
                            <button
                                className="bg-[#5786E3] hover:bg-blue-600 text-white font-bold py-2 px-4 border border-yellow-700 rounded w-36"
                                onClick={handleSubmit}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="px-6 py-6 flex-grow w-2/5">
                            <div className="border rounded-md p-5 ">
                                <h1 className="font-semibold text-xl">Create New Team</h1>
                                <form>
                                    <h1 className="font-semibold mt-2">Upload Logo</h1>
                                    <div className="relative mt-2 rounded-md shadow-sm flex mb-4">
                                        <label
                                            htmlFor="fileInput"
                                            className="relative bg-[#F3F3F3] hover:bg-neutral-300 text-black font-semibold py-2 px-4 rounded flex cursor-pointer"
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
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </label>
                                    </div>
                                    {previewLogo && (
                                        <div className="mt-4">
                                            <h1 className="font-semibold">Preview Logo</h1>
                                            <img
                                                src={previewLogo}
                                                alt="Team Logo Preview"
                                                className="mt-2 rounded-md border-2"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <h1 className="font-semibold">Team Name</h1>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                                className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-gray-300 placeholder:text-gray-400 w-full"
                                                placeholder="Enter Team Name"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTeam;
