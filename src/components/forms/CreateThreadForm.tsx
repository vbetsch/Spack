import React from "react";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FieldValues, useForm } from "react-hook-form";
import { Title } from "../Title.tsx";
import type { CreateThreadDto } from "../../types/dto/CreateThreadDto.ts";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CreateThreadFormProperties {
    title: string;
    backEndError?: string;
    loading: boolean;
    onSubmit: (data: FieldValues) => void;
    textButton: string;
}

export const CreateThreadForm = ({
    title,
    backEndError,
    loading,
    onSubmit,
    textButton,
}: CreateThreadFormProperties): React.ReactNode => {
    const { register, handleSubmit } = useForm<CreateThreadDto>();

    return (
        <div className="form">
            <form className="form-content">
                <Title text={title} />
                <div className="form-fields">
                    <FormControl required variant={"standard"}>
                        <TextField
                            {...register("title", { required: true })}
                            type={"text"}
                            label="Title"
                            variant="standard"
                            placeholder="Insert a title"
                            required
                            autoFocus
                        />
                    </FormControl>
                    <FormControl required variant={"standard"}>
                        <TextField
                            {...register("content", { required: true })}
                            type={"text"}
                            label="Content"
                            variant="standard"
                            placeholder="Write your post here"
                            multiline
                            rows={5}
                            required
                            autoFocus
                        />
                    </FormControl>
                </div>
                <div className="error">{backEndError ?? ""}</div>
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    startIcon={<FontAwesomeIcon icon={faPen}
                    />}
                    style={{ width: "fit-content" }}
                >
                    <span>{textButton}</span>
                </LoadingButton>
            </form>
        </div>
    );
};
