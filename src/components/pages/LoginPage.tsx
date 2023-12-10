import React, { useState } from "react";
import { Title } from "../Title.tsx";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = (): React.ReactNode => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit } = useForm();
    const [errors] = useState<string[]>([]);

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        event.preventDefault();
    };

    const onSubmit = (data: FieldValues): void => {
        console.log(`@vbetsch ||  - onSubmit || data`);
        console.log(data);
    };

    return (
        <div className="container">
            <Title text={"Login"} />
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-fields">
                    <FormControl required variant={"standard"}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            {...register("username", { required: true })}
                            placeholder={"test@mail.com"}
                            id="username"
                        />
                    </FormControl>
                    <FormControl required variant={"standard"}>
                        <InputLabel htmlFor="standard-adornment-password">
                            Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
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
                {errors.length > 0 && (
                    <div className="errors">
                        {errors.map((error, key) => (
                            <p key={key}>{error}</p>
                        ))}
                    </div>
                )}
                <button className="button">Login</button>
            </form>
        </div>
    );
};
