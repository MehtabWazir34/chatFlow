import axios from 'axios'
export const API_INSTANCE =
    await axios.create({
        baseURL: import.meta.env.myAPIURL
    });
    API_INSTANCE.interceptors.request.use((config)=>{
        let token = localStorage.getItem("token");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        };
        return config;
    });
    
// };
