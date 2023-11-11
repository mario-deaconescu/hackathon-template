import {createAsyncThunk, createSlice, Draft} from "@reduxjs/toolkit";
import {AuthService, IUser, UserCreateModel, UserLoginModel} from "../api";
import ErrorHandler from "../errors/ErrorHandler.ts";

const initialState = {
    user: null as IUser | null,
    isLoading: true
};

const login = createAsyncThunk(
    'user/login',
    async (info: UserLoginModel): Promise<IUser | null> => {
        return AuthService.login(info);
    }
);

const signUp = createAsyncThunk(
    'user/signUp',
    async (info: UserCreateModel): Promise<IUser | null> => {
        return AuthService.signup(info);
    }
);

const updateCurrentUser = createAsyncThunk(
    'user/updateCurrentUser',
    async (): Promise<IUser | null> => {
        try {
            return AuthService.currentUser();
        } catch (e) {
            return null;
        }
    }
);

const signOut = createAsyncThunk(
    'user/signOut',
    async (): Promise<void> => {
        await AuthService.logout();
    }
);

const setUserAction = (state: Draft<typeof initialState>, user: IUser | null) => {
    state.user = user;
    state.isLoading = false;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            setUserAction(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(updateCurrentUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCurrentUser.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(signOut.fulfilled, (state) => {
            setUserAction(state, null);
        });
        builder.addCase(signOut.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signOut.rejected, (state) => {
            state.isLoading = false;
            ErrorHandler("Failed to sign out");
        });
        builder.addCase(login.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
            setUserAction(state, null);
            ErrorHandler("Invalid login");
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.isLoading = false;
            setUserAction(state, null);
            ErrorHandler("Invalid sign up");
        });
    }
});

export {updateCurrentUser, signOut, login, signUp};
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
