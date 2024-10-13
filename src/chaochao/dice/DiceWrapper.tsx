import {useState} from "react";
import Dice from "./Dice";
import s from "./diceWrapper.module.scss";
import classNames from "classnames";
import {useChaoChaoContext} from "../ChaoChaoProvider.tsx";
import {useSocketContext} from "../../socket/SocketProvider.tsx";

interface Props {
    onClose: () => void;
}

export const DiceWrapper = (props: Props) => {
    const {onClose} = props;
    const context = useChaoChaoContext()!;
    const {socket} = useSocketContext()!;
    const [triggerRoll, setTriggerRoll] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [fakeValue, setFakeValue] = useState('');

    // 주사위를 굴리는 함수
    const rollDice = () => {
        setResult(null); // 결과 초기화
        setTriggerRoll(true);

        // 주사위 굴림 후 트리거 초기화
        setTimeout(() => {
            setTriggerRoll(false);
        }, 2100); // 주사위 애니메이션 시간이 2초이므로 약간의 여유를 둠
    };

    const onRollEnd = (result: string) => {
        setResult(result);
        setTriggerRoll(false);
        context.rollTheDice();
    };

    const onSubmit = (submitValue: string) => {
        if (result) {
            context.onDiceSubmit(result, submitValue);
            setFakeValue(submitValue)
            onClose();
        }
    }

    const onJudgeClick = (value: boolean) => {
        value ? context.onTrueClick() : context.onLieClick();
        onClose();
    }

    const renderer = () => {
        if (!socket) return;
        const status = context.players.find( p => p.id === socket.id)?.status;

        if (status === 'roll') {
            return (
                <>
                    <Dice triggerRoll={triggerRoll} onRollEnd={onRollEnd}/>
                    {
                        <button className={s.rollButton} onClick={rollDice}>
                            Roll
                        </button>
                    }
                    {result && fakeValue.length === 0 && <div className={s.resultWrap}>
                        <span className={s.result}>주사위 결과: {result}</span>
                        <div className={s.buttonWrap}>
                            <button className={s.button} onClick={() => onSubmit('1')}>1</button>
                            <button className={s.button} onClick={() => onSubmit('2')}>2</button>
                            <button className={s.button} onClick={() => onSubmit('3')}>3</button>
                            <button className={s.button} onClick={() => onSubmit('4')}>4</button>
                        </div>
                    </div>}
                </>
            )
        }

        return (
            <div className={s.opinion}>
                <div className={s.buttonWrap}>
                    <button className={classNames(s.button, s.true)} onClick={() => onJudgeClick(true)}>진실</button>
                    <button className={classNames(s.button, s.false)} onClick={() => onJudgeClick(false)}>거짓</button>
                </div>
                <span className={s.text}>
                    상대가 낸 값: {context.rule?.publishNumber}
                </span>
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.modal}>
                {renderer()}
            </div>
        </div>
    );
};
