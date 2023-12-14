import React, { useState } from "react";
import { AuthForm } from "../AuthForm.tsx";
import { Title } from "../Title.tsx";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase.ts";
import { FirebaseError } from "@firebase/util";

export const RegisterPage = (): React.ReactNode => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();

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
                    switch (error.code) {
                        case "auth/weak-password":
                            setError("Le mot de passe est trop faible");
                            break;
                        case "auth/invalid-email":
                            setError("Le format de l'email est invalide");
                            break;
                        case "auth/email-already-in-use":
                            setError("L'email est déjà utilisé pour un autre compte");
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
                } else {
                    setError("An error has occurred");
                }
            }
        }
    };

    return (
        <div className="container">
            <Title text={"Register"} />
            <AuthForm
                loading={loading}
                passwordError={passwordError}
                backEndError={error}
                onSubmit={onSubmit}
                textButton={"Register"}
            />
        </div>
    );
};
