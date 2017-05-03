export class User {
    _id: string;
    fName: string;
    lName: string;
    password: string;
    username: string;
    weatherSettings: {
        lat: string;
        lon: string;
        units: string;
    }
}