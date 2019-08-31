import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";
import ImagesUploader from "react-images-uploader";
import FormExampleForm from "./DigitalForm";
import * as Constants from './constants'

export const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false}
    }
};

const log = (type) => console.log.bind(console, type);

class FormReporter extends Component {
    render() {
        return (
            <Form schema={Constants.ConstantMapperUnique("employee-name")}
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")} />
        );
    }
}


export default FormReporter

