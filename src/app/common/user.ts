export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    // attributes?: {
    //     [key: string]: string;
    // };
    attributes: {
        [key: string]: string;
    };
    userType : string;
}
