import React from "react";
import { Title } from "../Title.tsx";
import FormControl from "@mui/material/FormControl";
import { IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = (): React.ReactNode => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <Title text={"Login"} />
            <FormControl required variant={"standard"}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input placeholder={"test@mail.com"} id="username" />
            </FormControl>
            <FormControl required variant={"standard"}>
                <InputLabel htmlFor="standard-adornment-password">
                    Password
                </InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={"azerty"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
};
