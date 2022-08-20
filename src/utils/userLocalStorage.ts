export const setUserLocalStorage = (isAuth: boolean, username: string) => {
    localStorage.setItem("isAuth", isAuth ? "true" : "false");
    localStorage.setItem("username", username);
}

export const removeUserLocalStorage = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("username");
}