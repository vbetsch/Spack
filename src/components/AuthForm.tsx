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

interface AuthFormProperties {
    passwordError: string | null;
    backEndError: string | null;
    loading: boolean;
    onSubmit: (data: FieldValues) => Promise<void>;
    textButton: string;
}

export const AuthForm = ({
    passwordError,
    backEndError,
    loading,
    onSubmit,
    textButton,
}: AuthFormProperties): React.ReactNode => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm();

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        event.preventDefault();
    };

    return (
        <form className="form">
            <div className="form-fields">
                <FormControl required variant={"standard"}>
                    <TextField
                        {...register("email", { required: true })}
                        type="email"
                        label="Email"
                        variant="standard"
                        placeholder="test@mail.com"
                        required
                    />
                </FormControl>
                <FormControl required variant={"standard"}>
                    <InputLabel
                        htmlFor="standard-adornment-password"
                        style={passwordError ? { color: "red" } : undefined}
                    >
                        Password
                    </InputLabel>
                    <Input
                        error={passwordError !== null}
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
                    {passwordError && (
                        <FormHelperText style={{ color: "red" }}>
                            {passwordError}
                        </FormHelperText>
                    )}
                </FormControl>
            </div>
            <div
                className="error"
                style={{ color: "red" }}    // TODO: Put it in style
            >
                {backEndError ?? ""}
            </div>
            <LoadingButton
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
            >
                <span>{textButton}</span>
            </LoadingButton>
        </form>
    );
};
