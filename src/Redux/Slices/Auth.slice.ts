import axiosInstance from "@/Helpers/axios/axios.helper";
import { toast } from "@/components/ui/use-toast";
import { authInitailState } from "@/types/authTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


let data = {};
if (typeof localStorage !== 'undefined') {
  const userData = localStorage.getItem("userdata");
  if (typeof userData !== 'undefined' && userData !== null )  {
    try {
      data = JSON.parse(userData);
    } catch (error) {
        localStorage.setItem("isLoggedIn" , "false");
        console.log("Error parsing user data from localStorage:", error);
    }
  }else {
    localStorage.setItem("isLoggedIn" , "false");

  }
}



const initailState= {
    isLoggedIn :localStorage.getItem("isLoggedIn") || false, 
    data : data,
} as authInitailState ;


export const getUserData= createAsyncThunk("/auth/user/getData" , async () =>{
    try {
        const response = await axiosInstance.get("user/getuser");
        toast({
            title : "Success",
            description : response.data.message,
        })
        return (await response)?.data;
    } catch (error : any) {
        toast({
            title : "Error",
            description : error?.response?.data?.message,
        
        })
    }
})



const authSlice = createSlice({
    name:"auth",
    initialState:initailState,
    reducers:{}, 
    extraReducers  :(builder) => {
        builder
            .addCase(getUserData.fulfilled , (state   ,action ) => {
                localStorage.setItem("userdata" , JSON.stringify(action?.payload?.data));
                localStorage.setItem("isLoggedIn" , "true");
                state.data = action.payload?.data;
                state.isLoggedIn = true;
            })
            .addCase(getUserData.rejected , (state  : authInitailState,action ) => {
                localStorage.removeItem("userdata");
                localStorage.removeItem("isLoggedIn");
                state.data = {};
                state.isLoggedIn = false;
            })
         
        
    }
})


// export const authActions = authSlice.actions;
export default authSlice.reducer;   