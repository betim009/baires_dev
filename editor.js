import React, { useState } from "react";
import {
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineUnderline,
    AiOutlineAlignCenter,
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineRollback,
} from "react-icons/ai";

const Editor = () => {
    const [text, settext] = useState("");
    const [bold, setbold] = useState(false);
    const [italian, setitalian] = useState(false);
    const [underline, setunderline] = useState(false);
    const [font, setfont] = useState(16);
    const [align, setalign] = useState("left");
    const [quotes, setquotes] = useState(false);
    const [currCase, setcurrCase] = useState("capitalize");
    const [Analysis, setAnalysis] = useState({});

    const Bold = () => {
        setbold(!bold);
    };

    const Italian = () => {
        setitalian(!italian);
    };

    const Underline = () => {
        setunderline(!underline);
    };

    const changeFont = (operation) => {
        if (operation === 1) {
            setfont(font + 1);
        } else {
            setfont(font - 1);
        }
    };

    const changeAlign = (alignment) => {
        setalign(alignment);
    };

    const Quotes = () => {
        settext(`"${text}"`);
    };

    const caseChange = (c) => {
        if (c === 'u') {
            settext(text.toUpperCase());
            setcurrCase("uppercase");
        } else if (c === 'l') {
            settext(text.toLowerCase());
            setcurrCase("lowercase");
        } else {
            settext(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
            setcurrCase("capitalize");
        }
    };

    const reset = () => {
        settext("");
        setbold(false);
        setitalian(false);
        setunderline(false);
        setfont(16);
        setalign("left");
        setquotes(false);
        setcurrCase("capitalize");
        setAnalysis({});
    };

    const Analyse = () => {
        const no_of_letters = text.replace(/[^a-zA-Z]/g, "").length;
        const no_of_words = text.split(/\s+/).filter(word => word.length > 0).length;
        const no_of_integers = (text.match(/\d+/g) || []).length;
        const no_of_spaces = (text.match(/\s/g) || []).length;
        const no_of_specialsymbols = text.replace(/[a-zA-Z0-9\s]/g, "").length;

        const result = {
            no_of_letters,
            no_of_words,
            no_of_integers,
            no_of_spaces,
            no_of_specialsymbols,
            bold,
            italian,
            underline,
            quotes,
            currCase,
            align,
            font,
        };

        setAnalysis(result);
    };

    return (
        <div className="editorcomp">
            <div className="button">
                <button className="bold" placeholder="boldbtn" onClick={Bold}>
                    <AiOutlineBold />
                </button>
                <button className="italian" placeholder="italian" onClick={Italian}>
                    <AiOutlineItalic />
                </button>
                <button className="underline" placeholder="underline" onClick={Underline}>
                    <AiOutlineUnderline />
                </button>
                <button className="size" onClick={() => changeFont(1)}>
                    A+
                </button>
                <button className="size" onClick={() => changeFont(-1)}>
                    A-
                </button>
                <button className="align" onClick={() => changeAlign("left")}>
                    <AiOutlineAlignLeft />
                </button>
                <button className="align" placeholder="align" onClick={() => changeAlign("center")}>
                    <AiOutlineAlignCenter />
                </button>
                <button className="align" onClick={() => changeAlign("right")}>
                    <AiOutlineAlignRight />
                </button>
                <button className="quotes" onClick={Quotes}>
                    " "
                </button>
                <button className="caseChange" onClick={() => caseChange("u")}>
                    UC
                </button>
                <button className="caseChange" onClick={() => caseChange("l")}>
                    LC
                </button>
                <button className="caseChange" onClick={() => caseChange("c")}>
                    C
                </button>
                <button className="Empty" onClick={reset}>
                    <AiOutlineRollback />
                </button>
                <button className="analyse" onClick={Analyse}>
                    Analyse
                </button>
            </div>
            <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="type Something..."
                onChange={(e) => settext(e.target.value)}
                value={text}
                style={{
                    fontWeight: bold ? "bold" : "normal",
                    fontStyle: italian ? "italic" : "normal",
                    textDecoration: underline ? "underline" : "none",
                    textAlign: align,
                    fontSize: `${font}px`,
                }}
            ></textarea>
            <textarea
                placeholder="ANALYSIS"
                disabled
                className="analysis"
                value={JSON.stringify(Analysis, null, 2)}
            ></textarea>
        </div>
    );
};

export default Editor;