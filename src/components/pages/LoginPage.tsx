import React, { useState } from "react";
import { Title } from "../Title.tsx";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { auth } from "../../database/firebase";
import { FirebaseError } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import { IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = (): React.ReactNode => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
            navigate("/profile");
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-credential") {
                    setError(
                        "Les informations que vous avez renseignées sont fausses",
                    );
                } else {
                    setError("Une erreur est survenue");
                }
            } else {
                setError("An error has occurred");
            }
        }
    };

    return (
        <div className="container">
            <Title text={"Login"} />
            <form className="form">
                <div className="form-fields">
                    <FormControl required variant={"standard"}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            {...register("email", { required: true })}
                            id="email"
                            type="email"
                            placeholder={"test@mail.com"}
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
                <div className="error">{error ?? ""}</div>
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    <span>Login</span>
                </LoadingButton>
            </form>
        </div>
    );
};
