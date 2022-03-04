import { QuestionDataModal } from "../../../modal";
import { CheckCircleOutline } from '@material-ui/icons';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: '41px'
        },
        optionCon: {
            height: '56px',
            display: 'flex',
            cursor: 'pointer',
            padding: '0 39px',
            borderRadius: '2px',
            marginBottom: '19px',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            justifyContent: 'space-between'
        },
        optionTxt: {
            fontSize: '18px',
            color: '#3f434a',
        },
        unchecked: {
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            backgroundColor: '#e8e9eb'
        },
        checked: {
            width: '20px',
            height: '20px',
            color: '#2aaebc',
        }
    }))

interface Props {
    onContinue: Function;
    questionData: QuestionDataModal;
}

const MCQQuestionView = forwardRef(({ questionData, onContinue }: Props, ref) => {
    const classes = styles();
    const { options, lastAttempt, userAnsweres } = questionData;
    const [selected, setSelected] = useState("");
    useEffect(() => {
        if (lastAttempt > 0 && userAnsweres.length > 0) {
            let find = userAnsweres.find(a => a.created === lastAttempt);
            if (find?.options && find.options.length > 0) {
                setSelected(find.options[0].option);
            }
        }
    }, [lastAttempt, userAnsweres]);

    useImperativeHandle(ref, () => ({
        submitQuestion() {
            let answer:any = options.find((value:any) => value.option.trim() === selected.trim())
            if(answer) {
                onContinue(answer.option);
            } else {
                onContinue('');
            }
        }
    }));

    const selectUnselectOption = (id: string) => {
        if (id === selected) {
            setSelected("");
        } else {
            setSelected(id);
        }
    }

    const checkBox = (currentSel: boolean) => {
        if (currentSel) {
            return (
                <CheckCircleOutline className={classes.checked} />
            );
        }
        return (
            <div className={classes.unchecked} />
        );
    }

    return (
        <div className={classes.container}>
            {
                options.map((item, index) => {
                    const { _id, option } = item;
                    const textPrefix = String.fromCharCode((index + 1) + 64);
                    const currentSel = selected.trim() === option.trim();
        
                    const customStyle = { border: currentSel ? 'solid 1px #2aaebc' : 'none' };
                    return (
                        <div key={_id} className={classes.optionCon}
                            onClick={() => selectUnselectOption(option)} style={customStyle}>
                            <Typography className={classes.optionTxt}>{`${textPrefix} - ${option}`}</Typography>
                            {checkBox(currentSel)}
                        </div>
                    );
                })
            }
        </div>
    );
});

export default MCQQuestionView;