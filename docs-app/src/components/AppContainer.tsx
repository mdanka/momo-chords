import * as React from "react";
import { Chords, IChord } from "momo-chords";

interface IAppState {
    chordText: string;
    isChord: boolean;
    chord: IChord | undefined;
}

export class AppContainer extends React.PureComponent<{}, IAppState> {
    private chords = new Chords();

    public constructor(props: {}) {
        super(props);
        this.state = {
            chordText: "A#M7/G",
            isChord: true,
            chord: undefined,
        };
    }

    public componentDidMount() {
        this.handleChordChange(this.state.chordText);
    }

    public render() {
        const { chordText, isChord } = this.state;
        return (
            <div className="app">
                <h1>momo-chords</h1>
                <p className="md-running-text">Enter a chord to see its analysis.</p>
                <p className="md-running-text">
                    <input className="chord-input" value={chordText} onChange={this.handleInputChange} />
                </p>

                <h3>Is it a chord?</h3>
                <p className="md-running-text">{isChord ? "Yes" : "No"}</p>
                {this.renderReportIsChord()}
                {this.renderChord()}
            </div>
        );
    }

    private renderReportIsChord = () => {
        const { chordText, isChord } = this.state;
        const question = isChord ? "Should this not be a chord?" : "Should this be a chord?";
        const callToAction = isChord ? "Click here to report wrong chord." : "Click here to report missing chord.";
        const issueTitle = isChord ? `Wrong chord: ${chordText}` : `Missing chord: ${chordText}`;
        const issueBody = isChord
            ? `I think \`${chordText}\` should not be recognised as a chord because... <fill in why>`
            : `I think \`${chordText}\` should be recognised as a chord because... <fill in why>`;
        return this.renderReport(question, callToAction, issueTitle, issueBody);
    };

    private renderReportChordObject = () => {
        const { chordText, chord } = this.state;
        const chordJson = JSON.stringify(chord);
        const question = "Is this chord incorrectly classified?";
        const callToAction = "Click here to report incorrect classification.";
        const issueTitle = `Wrong chord properties: ${chordText}`;
        const issueBody = `\`${chordText}\` is parsed as \`${chordJson}\`, but I think it is incorrect because... <fill in why>`;
        return this.renderReport(question, callToAction, issueTitle, issueBody);
    };

    private renderReportChordName = () => {
        const { chordText, chord } = this.state;
        if (chord === undefined) {
            return null;
        }
        const chordName = this.chords.print(chord);
        const question = "Is this chord incorrectly named?";
        const callToAction = "Click here to report incorrect naming.";
        const issueTitle = `Wrong chord naming: ${chordText} named as ${chordName}`;
        const issueBody = `\`${chordText}\` is named as \`${chordName}\`, but I think it is incorrect because... <fill in why>`;
        return this.renderReport(question, callToAction, issueTitle, issueBody);
    };

    private renderReport = (question: string, callToAction: string, issueTitle: string, issueBody: string) => {
        const issueUrl = this.getCreateIssueUrl(issueTitle, issueBody);
        return (
            <p>
                {question}{" "}
                <a target="_blank" href={issueUrl}>
                    {callToAction}
                </a>
            </p>
        );
    };

    private renderChord = () => {
        const { chord } = this.state;
        if (chord === undefined) {
            return null;
        }
        const { rootNote, quality, interval, added, suspended, bassNote } = chord;
        return (
            <div>
                <h3>Chord properties</h3>
                <ul className="md-running-text">
                    <li>
                        <strong className="md-strong">Root note: </strong>
                        {rootNote}
                    </li>
                    <li>
                        <strong className="md-strong">Quality: </strong>
                        {quality}
                    </li>
                    <li>
                        <strong className="md-strong">Interval: </strong>
                        {interval === undefined ? "-" : interval}
                    </li>
                    <li>
                        <strong className="md-strong">Added: </strong>
                        {added === undefined ? "-" : added}
                    </li>
                    <li>
                        <strong className="md-strong">Suspended: </strong>
                        {suspended === undefined ? "-" : suspended}
                    </li>
                    <li>
                        <strong className="md-strong">Bass note: </strong>
                        {bassNote === undefined ? "-" : bassNote}
                    </li>
                </ul>
                {this.renderReportChordObject()}
                <h3>JSON</h3>
                <p className="md-running-text md-code">{JSON.stringify(chord)}</p>
                <h3>Name</h3>
                <p className="md-running-text">{this.chords.print(chord)}</p>
                {this.renderReportChordName()}
            </div>
        );
    };

    private handleInputChange = (event: React.ChangeEvent<any>) => {
        const chordText = event.target.value;
        this.handleChordChange(chordText);
    };

    private handleChordChange = (chordText: string) => {
        const isChord = this.chords.isChord(chordText);
        const chord = this.chords.parse(chordText);
        this.setState({
            chordText,
            isChord,
            chord,
        });
    };

    private getCreateIssueUrl = (issueTitle: string, issueBody: string) => {
        const issueTitleEncoded = encodeURIComponent(issueTitle);
        const issueBodyEncoded = encodeURIComponent(issueBody);
        return `https://github.com/mdanka/momo-chords/issues/new?labels=bug&title=${issueTitleEncoded}&body=${issueBodyEncoded}`;
    };
}
