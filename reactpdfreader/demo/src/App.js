// @flow

import React, {Component} from "react";
import * as Util from './Util';
import URLSearchParams from "url-search-params";
import 'semantic-ui-css/semantic.min.css';
import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight
} from "../../src";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import type {T_Highlight, T_NewHighlight} from "../../src/types";

import "./style/App.css";
import ReactFormHRA from "../../src/components/ReactFormHRA";
import SimpleReactFileUpload from "./SimpleReactFileUpload";
import FileUploader from "./FileUploader";
import MyUploader from "./FileUpload";
import DigitalForm from "./DigitalForm";
import FormReporter from "./FormReporter";
import {GetKeyFromObject} from "./constants";

type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
    highlights: Array<T_ManuscriptHighlight>,
    requestResponse: null
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => location.hash.slice("#highlight-".length);

const resetHash = () => {
    location.hash = "";
};

const HighlightPopup = ({comment}) =>
    comment.text ? (
        <div className="Highlight__popup">
            {comment.emoji} {comment.text}
        </div>
    ) : null;

const DEFAULT_URL = "https://testbucketbygurpreet.s3.amazonaws.com/imagetopdf.pdf";

const searchParams = new URLSearchParams(location.search);
const url = searchParams.get("url") || DEFAULT_URL;

const imgfile = require('./c.jpg');

class App extends Component<Props, State> {
    state = {
        highlights: testHighlights[url] ? [...testHighlights[url]] : [],
        imgfile: imgfile
    };

    state: State;

    resetHighlights = () => {
        this.setState({
            highlights: []
        });
    };

    scrollViewerTo = (highlight: any) => {
    };

    scrollToHighlightFromHash = () => {
        const highlight = this.getHighlightById(parseIdFromHash());

        if (highlight) {
            this.scrollViewerTo(highlight);
        }
    };

    componentDidMount() {
        window.addEventListener(
            "hashchange",
            this.scrollToHighlightFromHash,
            false
        );
    }

    getHighlightById(id: string) {
        const {highlights} = this.state;

        return highlights.find(highlight => highlight.id === id);
    }

    addHighlight(highlight: T_NewHighlight) {
        const {highlights, imgfile} = this.state;
        console.log("highlight",highlight.comment.text);
        const dataRecieved = {
            "title": GetKeyFromObject((highlight.comment.text).split(' ').join('')),
            "key": highlight.comment.text,
            "value": null
        }
        const requestResponse=Util.pushHighlight(highlight, dataRecieved);
        this.setState({requestResponse});

        this.setState({
            highlights: [{...highlight, id: getNextId()}, ...highlights]
        });
    }

    updateHighlight(highlightId: string, position: Object, content: Object) {
        console.log("Updating highlight", highlightId, position, content);

        this.setState({
            highlights: this.state.highlights.map(h => {
                return h.id === highlightId
                    ? {
                        ...h,
                        position: {...h.position, ...position},
                        content: {...h.content, ...content}
                    }
                    : h;
            })
        });
    }

    render() {
        const {highlights, requestResponse} = this.state;

        return (
            <div className="App" style={{display: "flex", height: "100vh"}}>
                <div
                    style={{
                        height: "100vh",
                        width: "75vw",
                        overflowY: "scroll",
                        position: "relative"
                    }}
                >
                    <PdfLoader url={url} beforeLoad={<Spinner/>}>
                        {pdfDocument => (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={event => event.altKey}
                                onScrollChange={resetHash}
                                scrollRef={scrollTo => {
                                    this.scrollViewerTo = scrollTo;

                                    this.scrollToHighlightFromHash();
                                }}
                                onSelectionFinished={(
                                    position,
                                    content,
                                    hideTipAndSelection,
                                    transformSelection
                                ) => (
                                    <Tip
                                        onOpen={transformSelection}
                                        onConfirm={comment => {
                                            this.addHighlight({content, position, comment});

                                            hideTipAndSelection();
                                        }}
                                    />
                                )}
                                highlightTransform={(
                                    highlight,
                                    index,
                                    setTip,
                                    hideTip,
                                    viewportToScaled,
                                    screenshot,
                                    isScrolledTo
                                ) => {
                                    const isTextHighlight = !Boolean(
                                        highlight.content && highlight.content.image
                                    );

                                    const component = isTextHighlight ? (
                                        <Highlight
                                            isScrolledTo={isScrolledTo}
                                            position={highlight.position}
                                            comment={highlight.comment}
                                        />
                                    ) : (
                                        <AreaHighlight
                                            highlight={highlight}
                                            onChange={boundingRect => {
                                                this.updateHighlight(
                                                    highlight.id,
                                                    {boundingRect: viewportToScaled(boundingRect)},
                                                    {image: screenshot(boundingRect)}
                                                );
                                            }}
                                        />
                                    );

                                    return (
                                        <Popup
                                            popupContent={<HighlightPopup {...highlight} />}
                                            onMouseOver={popupContent =>
                                                setTip(highlight, highlight => popupContent)
                                            }
                                            onMouseOut={hideTip}
                                            key={index}
                                            children={component}
                                        />
                                    );
                                }}
                                highlights={highlights}
                            />
                        )}
                    </PdfLoader>
                </div>
                <Sidebar
                    highlights={highlights}
                    resetHighlights={this.resetHighlights}
                />
                <div
                    style={{
                        height: "100vh",
                        width: "75vw",
                        overflowY: "scroll",
                        position: "relative"
                    }}
                >
                    {/*<ReactFormHRA requestResponse = {requestResponse}/>*/}
                    {/*<SimpleReactFileUpload />*/}
                    {/*<FileUploader />*/}
                    {/*<MyUploader />*/}
                    <div>
                        <DigitalForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
