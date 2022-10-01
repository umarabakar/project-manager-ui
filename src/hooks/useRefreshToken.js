import axios from "../api/axios";
import useAuth from "./useAuth"


const useRefreshToken = () => {

    const {auth,setAuth} = useAuth();
    
    const refresh = async () => {
        const response = await axios.post("/refresh");
        setAuth(prevState => {
            console.log(JSON.stringify(prevState));
            console.log(response.data.accessToken);
            return{ ...prevState, accessToken: response.data.accessToken}
        })

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;