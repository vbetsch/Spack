import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { FieldValues, useForm } from "react-hook-form";
import { UserCredentialsDto } from "../../types/dto/user/UserCredentialsDto.ts";
import { Title } from "../Title.tsx";

interface AuthFormProperties {
    title: string;
    passwordError?: string;
    backEndError?: string;
    loading: boolean;
    onSubmit: (data: FieldValues) => void;
    textButton: string;
}

export const AuthForm = ({
    title,
    passwordError,
    backEndError,
    loading,
    onSubmit,
    textButton,
}: AuthFormProperties): React.ReactNode => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<UserCredentialsDto>();

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        event.preventDefault();
    };

    return (
        <div className="form">
            <form className="form-content">
                <Title text={title} />
                <div className="form-fields">
                    <FormControl required variant={"standard"}>
                        <TextField
                            {...register("email", { required: true })}
                            type="email"
                            label="Email"
                            variant="standard"
                            placeholder="test@mail.com"
                            required
                            autoFocus
                        />
                    </FormControl>
                    <FormControl required variant={"standard"}>
                        <InputLabel
                            htmlFor="standard-adornment-password"
                            style={
                                passwordError != null
                                    ? { color: "red" }
                                    : undefined
                            }
                        >
                            Password
                        </InputLabel>
                        <Input
                            error={passwordError != null}
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
                            placeholder={"azertyuiop"}
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
                        <FormHelperText style={{ color: "red" }}>
                            {passwordError}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className="error">{backEndError ?? ""}</div>
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    <span>{textButton}</span>
                </LoadingButton>
            </form>
        </div>
    );
};
