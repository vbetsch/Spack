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
