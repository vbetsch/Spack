import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUser } from "../../database/queries/UserQueries.ts";
import { FieldValues } from "react-hook-form";
import { AuthForm } from "../forms/AuthForm.tsx";

export const RegisterPage = (): React.ReactNode => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | undefined>(
        undefined,
    );
    const navigate = useNavigate();

    const onSubmit = (data: FieldValues) => {
        setPasswordError(undefined);
        setError(undefined);
        if (data.password.length < 8) {
            setPasswordError(
                "Le mot de passe doit contenir au moins 8 caractères",
            );
        } else {
            setLoading(true);
            createUser(data)
                .then((result) => {
                    if (result) {
                        setError(result);
                    } else {
                        navigate("/login");
                    }
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div className="container">
            <AuthForm
                title={"Register"}
                loading={loading}
                passwordError={passwordError}
                backEndError={error}
                onSubmit={onSubmit}
                textButton={"Register"}
            />
        </div>
    );
};
