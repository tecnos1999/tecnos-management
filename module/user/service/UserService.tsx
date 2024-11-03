import ApiServer from "@/module/system/service/ApiServer";
import LoginRequest from "../dto/LoginRequest";
import LoginResponse from "../dto/LoginResponse";


class UserService extends ApiServer {
  login = async (user: LoginRequest): Promise<LoginResponse> => {
    const data = await this.api<LoginRequest, LoginResponse>(
      `/login`,
      "POST",
      user,
      ""
    );
    if (data.status === 200) {
      const user = await data.json();
      return user;
    } else {
      return Promise.reject([]);
    }
  };

//   register = async(user : RegisterRequest):Promise<RegisterResponse> => {
//     const data = await this.api<RegisterRequest, RegisterResponse>(
//       `/register`,
//       "POST",
//       user,
//       ""
//     );
//     if (data.status === 200) {
//       const user = await data.json();
//       return user;
//     } else {
//       return Promise.reject([]);
//     }
//   }

}

export default UserService;