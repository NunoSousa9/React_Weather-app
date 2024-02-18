const getBackgroundImage = (weatherIcon) => {
    let backgroundImage;

    if (weatherIcon === "01d") {
        backgroundImage = require("./assets/01d.jpg");
    } else if (weatherIcon === "01n") {
        backgroundImage = require("./assets/01n.jpg");
    } else if (weatherIcon === "02d") {
        backgroundImage = require("./assets/02d.jpg");
    } else if (weatherIcon === "02n") {
        backgroundImage = require("./assets/02n.jpg");
    } else if (weatherIcon === "03d") {
        backgroundImage = require("./assets/03d.jpg");
    } else if (weatherIcon === "03n") {
        backgroundImage = require("./assets/03n.jpg");
    } else if (weatherIcon === "04d") {
        backgroundImage = require("./assets/04d.jpg");
    } else if (weatherIcon === "04n") {
        backgroundImage = require("./assets/04n.jpg");
    } else if (weatherIcon === "09d" || weatherIcon === "10d") {
        backgroundImage = require("./assets/910d.jpg");
    } else if (weatherIcon === "09n" || weatherIcon === "10n") {
        backgroundImage = require("./assets/910n.jpg");
    } else if (weatherIcon === "11d" || weatherIcon === "11n") {
        backgroundImage = require("./assets/11dn.jpg");
    } else if (weatherIcon === "13d" ) {
        backgroundImage = require("./assets/13d.jpg");
    } else if (weatherIcon === "13n") {
        backgroundImage = require("./assets/13n.jpg");
    } else if (weatherIcon === "50d") {
        backgroundImage = require("./assets/50d.jpg");
    } else if (weatherIcon === "50n") {
        backgroundImage = require("./assets/50n.jpg");
    }

    return backgroundImage;
};

export default getBackgroundImage;