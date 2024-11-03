import LoginResponse from "../user/dto/LoginResponse";

type LoginContextType = {
    user : LoginResponse;
    setUserCookie : (user:LoginResponse) => void;
    logOut : () => void;
}

export default LoginContextType;