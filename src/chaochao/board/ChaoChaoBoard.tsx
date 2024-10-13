import s from "./chaoChaoBoard.module.scss";
import {useState} from "react";
import {DiceWrapper} from "../dice/DiceWrapper";
import {LadderArray} from "./LadderArray";
import {Character} from "./character/Character";
import {useChaoChaoContext} from "../ChaoChaoProvider";
import {Goal} from "./goal/Goal";
import {useSocketContext} from "../../socket/SocketProvider.tsx";
import classNames from "classnames";

export const ChaoChaoBoard = () => {
    const context = useChaoChaoContext()!;
    const {users, socket} = useSocketContext()!;
    const [isReady, setIsReady] = useState(false);
    const [diceOpen, setDiceOpen] = useState<boolean>(false);

    const isSubmit = context.players.find(p => p.id === socket?.id)?.status === 'submit';

    const isRollingPlayer = context.players.find(p => p.id === socket?.id)?.status === 'roll';

    const isSubmittedValue = context.rule?.publishNumber && context.rule?.publishNumber.length > 0;

    const isOpenDice = isRollingPlayer || (!isRollingPlayer && isSubmittedValue);

    const goalArray = Array.from({length: 10}).map(
        (_, i) => `goal children ${i}`
    );

    const ladderArray = Array.from({length: 7}).map(
        (_, i) => `ladder children ${i}`
    );

    const onReady = () => {
        context.onReady();
        setIsReady(true);
    }

    return (
        <div className={s.board}>
            <div className={s.participantBoard}>
                {isReady && <>
                    {context.players.map(p => {
                        return <span className={classNames(s.nickname, s[p.color])}>{p.nickname}</span>
                    })}
                </>}
                {!isReady &&
                    <>
                        {users.map(v=>v.nickname)}
                        <button onClick={onReady}>준비</button>
                    </>
                }
            </div>
            <div className={s.dice}>
                {!isSubmit && isOpenDice && <button
                    className={s.rollingButton}
                    onClick={() => setDiceOpen(true)}
                >
                    {isRollingPlayer ? '주사위' : '판단'}
                </button>}
            </div>
            <div className={s.goal}>
                {goalArray.map((_, i) => (
                    <Goal level={i + 1}/>
                ))}
            </div>
            <div className={s.ladder}>
                {ladderArray.map((v, idx) => (
                    <LadderArray key={v} ladderLevel={idx + 1}/>
                ))}
            </div>
            <div className={s.waitingLine}>
                {context.players.map((v) => {
                    const aliveCharacter  = v.characters.filter(v=>v.status !== 'deleted');

                    return (<div key={v.nickname} className={s.characterWrap}>
                        <Character color={v.color}/> X {aliveCharacter.length}
                    </div>)
                })}
            </div>
            {diceOpen && isOpenDice && !isSubmit && <DiceWrapper onClose={() => setDiceOpen(false)}/>}
        </div>
    );
};
