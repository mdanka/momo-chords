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
                {this.renderChord()}
            </div>
        );
    }

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
                <h3>JSON</h3>
                <p className="md-running-text md-code">{JSON.stringify(chord)}</p>
                <h3>Name</h3>
                <p className="md-running-text">{this.chords.print(chord)}</p>
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
}
