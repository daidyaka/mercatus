import React, {Component} from "react";
import UserAdvertisements from "../components/UserAdvertisements";
import CurrentUserInformation from "../components/CurrentUserInformation";

class Profile extends Component {

    render() {
        return (
            <>
                <CurrentUserInformation/>
                <UserAdvertisements/>
            </>
        );
    }
}

export default Profile;