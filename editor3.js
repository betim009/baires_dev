import React, { useState, useRef } from "react";
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
    // some useStates used to store the values of the properties. Change as you please . The values in these states are default values.

    const [text, settext] = useState("");
    const [bold, setbold] = useState(false);
    const [italian, setitalian] = useState(false);
    const [underline, setunderline] = useState(false);
    const [font, setfont] = useState(16);
    const [align, setalign] = useState("left");
    const [quotes, setquotes] = useState(false);
    const [currCase, setcurrCase] = useState("capitalize");
    const [Analysis, setAnalysis] = useState({});
    const [HTMLCODE, setHTMLCODE] = useState("");

    const Bold = () => {
        // this function is used to make the text bold in textarea
        setbold(!bold)
    };

    const Italian = () => {
        // this function is used to make the text italian 
        setitalian(!italian)
    };

    const Underline = () => {
        // this function is used to make the text underline
        setunderline(!underline)
    };

    const changeFont = (operation) => {
        //  this function is used to increase or decrease the font by 1 . operation ==1 means increase by 1 else decrease by 1.
        setfont(font + operation)

    };

    const changeAlign = (alignment) => {
        // this function is used to set the alignment of the text in text area i.e either left ,right or center  
        if (alignment === 'left') {
            setalign('left')
        }
        if (alignment === 'right') {
            setalign('right')
        }
        if (alignment === 'center') {
            setalign('center')
        }
    };

    const Quotes = () => {
        //this function should add double quotes on the text present in the text area.
        if (text.startsWith('"') && text.endsWith('"')) {
            settext(text.slice(1, -1))
        } else {
            settext(`"${text}"`)
        }
        setquotes(!quotes)
    };

    const caseChange = (c) => {
        //  this function should change the case of the text present in the text area i.e if c=='u' uppercase , if c=='l' lowercase
        // else capitalize
        if (c === 'u') {
            settext(text.toUpperCase())
            setcurrCase('uppercase')
        } else if (c === 'l') {
            settext(text.toLowerCase())
            setcurrCase('lowercase')
        } else {
            settext(text[0].toUpperCase() + text.slice(1).toLowerCase())
            setcurrCase('capitalize')
        }
    };

    const reset = () => {
        // set the values of all the properties to default.
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

        //  this function should analyze the text present in the text area and generate the following results and display thaat result in the analysis text area

        //  the result object should contain following details: 

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


    }





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



                { /* create a button with className="size" and when clicked it should call changeFont() function used to increase the font. The display value 
      of this button should be "A+" */ }
                <button className="size" placeholder="A+" onClick={() => changeFont(+1)}>
                    A+
                </button>

                { /* create a button with className="size" and when clicked it should call changeFont() function used to decrease the font. The display value 
      of this button should be "A-" */ }
                <button className="size" placeholder="A-" onClick={() => changeFont(-1)}>
                    A-
                </button>




                <button className="align" onClick={(e) => changeAlign("left")}>
                    <AiOutlineAlignLeft />
                </button>
                <button className="align" placeholder="align" onClick={(e) => changeAlign("center")}>
                    <AiOutlineAlignCenter />
                </button>
                <button className="align" onClick={(e) => changeAlign("right")}>
                    <AiOutlineAlignRight />
                </button>
                <button className="quotes" onClick={Quotes}>
                    " "
                </button>

                <button className="caseChange" onClick={(e) => caseChange("u")}>
                    UC
                </button>
                <button className="caseChange" onClick={(e) => caseChange("l")}>
                    LC
                </button>
                <button className="caseChange" onClick={(e) => caseChange("c")}>
                    C
                </button>

                <button className="Empty" onClick={reset}>
                    <AiOutlineRollback />
                </button>



                { /* create a button with className="analyse" and when clicked it should call Analyse() function used to analyse the text in text area. The display value 
      of this button should be "Analyse" */ }
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
                style={{
                    fontWeight: bold ? 'bold' : 'normal',
                    fontStyle: italian ? 'italic' : 'normal',
                    textDecoration: underline ? 'underline' : 'none',
                    fontSize: `${font}px`,
                    textAlign: align
                }}
                onChange={(e) => settext(e.target.value)}
                value={text}
            >
            </textarea>



            {/* { create a textarea with placeholder="ANALYSIS", type diabled , className="analysis" , and its should display the object result generated by the 
    the Analyse function . 
} */}
            <textarea
                placeholder="ANALYSIS"
                disabled
                className="analysis"
                value={JSON.stringify(Analysis, null, 2)}
            >

            </textarea>



        </div>
    );
};

export default Editor;
