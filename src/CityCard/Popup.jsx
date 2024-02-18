import React from "react";

const PopupOverlay = () => {
    const overlayStyle = {
        position: "absolute",
        alignItems: "center",
        top: "10%",
        left: "14%",
        width: "70%",
        height: "80%",
        backgroundColor: "white",
        opacity: "0.3",
        borderRadius: "10px",
    };

    return (
        <div style={overlayStyle}></div>
    );
};

export default PopupOverlay;