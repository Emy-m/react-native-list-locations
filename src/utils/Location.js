class Location {
    constructor(location: Partial<Location>) {
        if (location) {
            Object.assign(this, location)
        }
    }

    id;
    name;
    contact;
    linkInfo;
    latitude;
    longitude;
}

export default Location;