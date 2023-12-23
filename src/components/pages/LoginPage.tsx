import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import type { FieldValues } from "react-hook-form";
import { UserContext } from "../../providers/UserProvider.tsx";
import { UserActionEnum } from "../../reducers/UserReducer.ts";
import { signIn } from "../../database/queries/UserQueries.ts";
import { AuthForm } from "../forms/AuthForm.tsx";

export const LoginPage = (): React.ReactNode => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = (data: FieldValues) => {
        setError(undefined);
        setLoading(true);
        signIn(data)
            .then((result) => {
                if (typeof result === "string") {
                    setError(result);
                    return;
                }
                if (!result) {
                    setError("Une erreur s'est produite");
                    return;
                }
                dispatch({
                    type: UserActionEnum.LOGIN,
                    payload: {
                        id: result.id,
                        ...result.data(),
                    },
                });
                navigate("/profile");
            })
            .catch((e) => {
                console.error(e);
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
                backEndError={error}
                onSubmit={onSubmit}
                textButton={"Login"}
            />
        </div>
    );
};
