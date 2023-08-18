// Step1.jsx
import React, { useState } from "react";
//TYPO
import { H2, P } from "../../typography";
import { MainButton } from "../../buttons";

import SuccessKids from "../../../assets/successKidsSmall.svg";
import Logo from "../../../assets/logo.png";
import axios from "axios";

//STORE
import useStore from "../../../store/store"; // Import the zustand store

const Success = ({ onNext }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //GLOBAL USERLIST STATE
    const userData = useStore((state) => state.userData);

    const handleSendEmail = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post("/api/quittung", {
                email: email,
                userData: userData,
            });

            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage("Error sending email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <img className="max-w-[80%] h-auto m-auto" src={SuccessKids.src} alt="" />

            <div width=" grid grid-cols-12  h-full absolute top-0 left-0 w-full h-full overflow-y-auto">
                <div className="col-span-12 p-4 lg:pt-4 xl:pt-10 sm:pt-0 lg:p-10">
                    <H2 klasse="font-success text-primaryColor text-center">Vielen Dank für Ihre Unterstützung!</H2>
                    <div className="mb-6 xl:mb-8"></div>

                    <P klasse="font-semibold text-center">Benötigen Sie eine Quittung?</P>
                    <div className="w-full flex flex-col items-center">
                        <form onSubmit={handleSendEmail}>
                            <input
                                type="email"
                                placeholder="Recipient Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-sm px-3 py-2"
                                required
                            />
                            <div className="mt-4">
                                {loading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-darkText"></div>
                                ) : (
                                    <>
                                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                                        {successMessage && <div className="text-green-500">{successMessage}</div>}
                                        {!errorMessage && !successMessage && (
                                            <button
                                                type="submit"
                                                className="bg-darkText rounded-sm font-semibold text-white text-sm px-4 py-2"
                                            >
                                                Send Email
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="mb-6 xl:mb-8"></div>

                    <P klasse="font-semibold text-center">Das Team des Familienzentrums Monikahaus</P>
                    <div className="mb-4 xl:mb-66"></div>
                    <P klasse="font-semibold text-center">
                        <a href="https://www.monikahaus.de">www.monikahaus.de</a>{" "}
                    </P>

                    {/* <img src={Logo.src} alt="" />
                    <div className="mb-4 xl:mb-66"></div> */}
                </div>
            </div>
        </>
    );
};

export default Success;