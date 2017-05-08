export class User {
    _id: string;
    fName: string;
    lName: string;
    password: string;
    username: string;
    isAdmin: boolean;
    weatherSettings: {
        lat: string;
        lon: string;
        units: string;
    }
}