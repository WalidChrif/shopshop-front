export interface User {
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
}
