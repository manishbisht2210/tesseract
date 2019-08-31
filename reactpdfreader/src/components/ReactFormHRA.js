// @flow

import React, {Component} from "react";

type Props = { requestResponse: (content: React$Element<*>) => void };

type State = { formData: {} };


class ReactFormHRA extends Component<Props, State> {
    state: State = {
        formData: null
    };

    props: Props;

    render() {
        const {formData} = this.state;
        const {requestResponse} = this.props;
        return (
            <div style={{color: 'black'}}>
                <div>
                    ReactFormHRA
                </div>
                < div>
                    {formData}
                </div>
                <div>
                    {requestResponse}
                </div>
            </div>
        );
    }
}

export default ReactFormHRA;
