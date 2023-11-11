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

const signUpStudent = createAsyncThunk(
    'user/signUpStudent',
    async (info: UserCreateModel): Promise<IUser | null> => {
        return AuthService.signupStudent(info);
    }
);

const signUpTeacher = createAsyncThunk(
    'user/signUpTeacher',
    async (info: UserCreateModel): Promise<IUser | null> => {
        return AuthService.signupTeacher(info);
    }
);

const signUpRecruiter = createAsyncThunk(
    'user/signUpRecruiter',
    async (info: UserCreateModel): Promise<IUser | null> => {
        return AuthService.signupRecruiter(info);
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
        builder.addCase(signUpStudent.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(signUpStudent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUpStudent.rejected, (state) => {
            state.isLoading = false;
            setUserAction(state, null);
            ErrorHandler("Invalid sign up");
        });
        builder.addCase(signUpTeacher.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(signUpTeacher.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUpTeacher.rejected, (state) => {
            state.isLoading = false;
            setUserAction(state, null);
            ErrorHandler("Invalid sign up");
        });
        builder.addCase(signUpRecruiter.fulfilled, (state, action) => {
            setUserAction(state, action.payload);
        });
        builder.addCase(signUpRecruiter.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUpRecruiter.rejected, (state) => {
            state.isLoading = false;
            setUserAction(state, null);
            ErrorHandler("Invalid sign up");
        });
    }
});

export {updateCurrentUser, signOut, login, signUpStudent, signUpTeacher, signUpRecruiter};
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
