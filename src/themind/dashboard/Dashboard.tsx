import {Button} from "../button/Button";
import {useTheMindContext} from "../container/socket/TheMindProvider.tsx";
import s from "./dashboard.module.scss";
import {Label} from "../label/Label.tsx";
import {RuleModal} from "../modal/RuleModal.tsx";
import {useState} from "react";
import {useSocketContext} from "../../socket/SocketProvider.tsx";

export const Dashboard = () => {
    const {
        level,
        heartCard,
        surikenCard,
        isGameAvailable,
        onSurikenCard,
        onHeartCard,
        onRestart,
    } = useTheMindContext()!;
    const {users} = useSocketContext()!;
    const [ruleOpen, setRuleOpen] = useState(false);

    return (
        <div className={s.dashboard}>
            {isGameAvailable && (
                <>
                    <div className={s.info}>
                        <Label>레벨 : {level}, </Label>
                        <Label>생명 카드 : {heartCard}, </Label>
                        <Label>수리검 카드 : {surikenCard}</Label>
                        <Label>참여자 수 : {users.length}, </Label>
                    </div>
                    <div className={s.buttonWrap}>
                        <Button onClick={onRestart} color={'red'} block>재시작</Button>
                        <Button onClick={()=>setRuleOpen(true)} block>룰북</Button>
                        <Button onClick={onHeartCard} block>하트 카드</Button>
                        <Button onClick={onSurikenCard} block>수리검 카드</Button>
                    </div>
                </>)}
            {ruleOpen && <RuleModal onClose={() => setRuleOpen(false)}/>}
        </div>
    );
};
