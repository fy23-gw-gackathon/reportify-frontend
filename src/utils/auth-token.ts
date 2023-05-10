import { Auth } from "aws-amplify";

export const getAuthToken = async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
};
