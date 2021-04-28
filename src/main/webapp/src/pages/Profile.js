import React, {Component} from "react";
import UserAdvertisements from "../components/UserAdvertisements";
import CurrentUserInformation from "../components/CurrentUserInformation";
import i18n from "../services/i18n/i18n";

class Profile extends Component {

    componentDidMount() {
        document.title = i18n.get('profile')
    }

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