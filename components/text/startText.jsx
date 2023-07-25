import React from "react";

// COMPS
import { MainButton } from "../buttons";
import { H1, H2, H3 } from "../typography";
import { P } from "../typography";

//STORE
import useStore from "../../store/store"; // Import the zustand store

const StartText = () => {
    //GLOBAL UNCLAIMED STATE
    const showUnclaimed = useStore((state) => state.showUnclaimed);
    const setShowUnclaimed = useStore((state) => state.setShowUnclaimed);

    //GLOBAL OVERLAY STATE
    const showOverlay = useStore((state) => state.showOverlay);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    //GLOBAL MODAL OPEN
    const openModal = useStore((state) => state.openModal);
    const setModalPosition = useStore((state) => state.setModalPosition);

    //MODAL FUNCION
    const handleModal = (event) => {
        openModal(event.clientX, event.clientY);
        setModalPosition({ x: event.clientX, y: event.clientY });

        console.log(event.clientX, event.clientY);
    };

    return (
        <div className="absolute lg:static bottom-8 lg:bottom-auto w-full">
            <H1 klasse="hidden lg:block">Schmücken Sie den Baum</H1>
            <P klasse="text-xl font-semibold tracking-wide hidden lg:block">
                Wir sammeln Spenden für die Kinder und Jugendlichen des Familienzentrums Monikahaus.
            </P>
            <MainButton
                onClick={(e) => {
                    console.log("BUBUBU");
                    setShowUnclaimed(!showUnclaimed);
                    setShowOverlay(true);
                    handleModal(e);
                }}
                klasse={"bg-primaryColor hover:bg-primaryColor-950 mt-8"}
            >
                Jetzt Spenden
            </MainButton>
        </div>
    );
};

export default StartText;