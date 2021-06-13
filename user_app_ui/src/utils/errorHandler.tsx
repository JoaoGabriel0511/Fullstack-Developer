import React from "react";

export type Response = {
    errors: Array<object>
}

export default function (response: Response): Array<JSX.Element> {
    const errors: Array<JSX.Element> = []
    Object.keys(response.errors).forEach(field_errors => {
        // @ts-ignore
        response.errors[field_errors].forEach(error => {
            let fieldFormatted = field_errors.replace("_", " ")
            fieldFormatted = fieldFormatted.charAt(0).toUpperCase() + fieldFormatted.slice(1)
            errors.push(<li>{fieldFormatted} {error}</li>)
        })
    })
    return errors
}