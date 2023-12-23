import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FirebaseError } from "@firebase/util";
import { createUser } from "../../database/queries/UserQueries.ts";
import { FieldValues } from "react-hook-form";
import {AuthForm} from "../forms/AuthForm.tsx";

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
                .then(() => {
                    navigate("/login");
                })
                .catch((error: unknown) => {
                    if (!(error instanceof FirebaseError)) {
                        setError("An error has occurred");
                        return;
                    }
                    switch (error.code) {
                        case "auth/weak-password":
                            setError("Le mot de passe est trop faible");
                            break;
                        case "auth/invalid-email":
                            setError("Le format de l'email est invalide");
                            break;
                        case "auth/email-already-in-use":
                            setError(
                                "L'email est déjà utilisé pour un autre compte",
                            );
                            break;
                        case "auth/too-many-requests":
                            setError(
                                "Trop de requêtes envoyées au serveur. Patientez quelques instants...",
                            );
                            break;
                        default:
                            setError("Une erreur est survenue : " + error.code);
                            break;
                    }
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
