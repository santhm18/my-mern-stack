export const userDetails = () => {
    const userDetails = sessionStorage.getItem("userDetails");
    const user = userDetails === null ? sessionStorage.getItem("userDetails") : JSON.parse(sessionStorage.getItem("userDetails"))
    const headers = user === null ? '' : { Authorization: `${user.token}` };
    return headers;
};