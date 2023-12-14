import React, { useState } from "react";
import { Title } from "../Title.tsx";
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
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase.ts";
import { FirebaseError } from "@firebase/util";

export const RegisterPage = (): React.ReactNode => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        event.preventDefault();
    };

    const onSubmit = async (data: FieldValues): Promise<void> => {
        setPasswordError(null);
        setError(null);
        if (data.password.length < 8) {
            setPasswordError(
                "Le mot de passe doit contenir au moins 8 caractères",
            );
        } else {
            setLoading(true);
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password,
                );
                setLoading(false);
                navigate("/login");
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof FirebaseError) {
                    const errorCode = error.code;
                    if (errorCode === "auth/weak-password") {
                        setError("Le mot de passe est trop faible");
                    } else if (errorCode === "auth/invalid-email") {
                        setError("L'email est invalide");
                    } else {
                        setError("Une erreur est survenue : " + errorCode);
                    }
                } else {
                    setError("An error has occurred");
                }
            }
        }
    };

    return (
        <div className="container">
            <Title text={"Register"} />
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
                    style={passwordError ? { color: "red" } : undefined}
                >
                    {error ?? ""}
                </div>
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    <span>Register</span>
                </LoadingButton>
            </form>
        </div>
    );
};
