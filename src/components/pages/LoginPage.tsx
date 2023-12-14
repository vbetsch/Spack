import React, { useState } from "react";
import { Title } from "../Title.tsx";
import { useNavigate } from "react-router";
import type { FieldValues } from "react-hook-form";
import { auth } from "../../database/firebase";
import { FirebaseError } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import {AuthForm} from "../AuthForm.tsx";

export const LoginPage = (): React.ReactNode => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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
                switch (error.code) {
                    case "auth/invalid-credential":
                        setError(
                            "Les informations que vous avez renseignées sont fausses",
                        );
                        break;
                    case "auth/invalid-email":
                        setError("Le format de l'email est invalide");
                        break;
                    case "auth/email-already-in-use":
                        setError("L'email est déjà utilisé'");
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
    };

    return (
        <div className="container">
            <Title text={"Login"} />
            <AuthForm
                loading={loading}
                passwordError={null}
                backEndError={error}
                onSubmit={onSubmit}
                textButton={"Login"}
            />
        </div>
    );
};
