import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import type { FieldValues } from "react-hook-form";
import { FirebaseError } from "@firebase/util";
import { AuthForm } from "../AuthForm.tsx";
import { AuthContext } from "../../providers/AuthProvider.tsx";
import { AuthActionEnum } from "../../reducers/AuthReducer.ts";
import { signIn } from "../../database/queries/UserQueries.ts";

export const LoginPage = (): React.ReactNode => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data: FieldValues) => {
        setError(undefined);
        setLoading(true);
        signIn(data)
            .then((snap) => {
                if (!snap) {
                    return;
                }
                dispatch({
                    type: AuthActionEnum.LOGIN,
                    payload: {
                        id: snap.id,
                        ...snap.data(),
                    },
                });
                navigate("/profile");
            })
            .catch((error: unknown) => {
                if (!(error instanceof FirebaseError)) {
                    setError("An error has occurred");
                    return;
                }
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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <AuthForm
                title={"Login"}
                loading={loading}
                passwordError={undefined}
                backEndError={error}
                onSubmit={onSubmit}
                textButton={"Login"}
            />
        </div>
    );
};
