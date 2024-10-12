import s from "./ruleModal.module.scss";


export const RuleModal = ({onClose}: {onClose: () => void}) => {
    return (
        <div className={s.background}>
            <div className={s.modal}>
                <div className={s.buttonWrap}>
                    <button className={s.close} onClick={onClose}>닫기</button>
                </div>
                <h1 className={s.modal__title}>The Mind 게임 준비</h1>
                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>게임 준비</h2>
                    <ol className={s.modal__list}>
                        <li>플레이어 수: 2~4명 (플레이어 수에 따라 게임의 난이도가 다름).</li>
                        <li>카드 구성: 1부터 100까지의 카드 한 벌.</li>
                        <li>레벨 카드: 레벨 1부터 최대 레벨까지의 카드 (플레이어 수에 따라 달라짐).</li>
                        <li>생명(하트) 토큰: 플레이어가 실수로 카드를 잘못 낼 때를 대비한 생명 토큰.</li>
                        <li>슈리켄(수리검) 토큰: 플레이어들의 가장 작은 카드를 버리게 하는 토큰.</li>
                    </ol>
                </section>

                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>게임 목표</h2>
                    <p className={s.modal__text}>
                        플레이어들은 각 라운드(레벨)마다 카드를 내야 합니다. 목표는 각 레벨을 클리어하고 최종 레벨까지 성공적으로 도달하는 것입니다.
                        플레이어들은 순서 없이 카드를 내되, <strong>오름차순(낮은 숫자에서 높은 숫자)</strong>으로 카드를 내야 합니다.
                    </p>
                </section>

                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>기본 규칙</h2>
                    <ol className={s.modal__list}>
                        <li>
                            카드 분배:
                            <ul>
                                <li>첫 번째 레벨(레벨 1)에서는 각 플레이어가 1장의 카드를 받습니다.</li>
                                <li>두 번째 레벨에서는 각 플레이어가 2장의 카드를 받습니다.</li>
                                <li>세 번째 레벨에서는 각 플레이어가 3장의 카드를 받습니다.</li>
                                <li>이렇게 레벨이 올라갈수록 각 플레이어는 레벨 수와 같은 숫자의 카드를 받습니다 (예: 레벨 5에서는 각 플레이어가 5장의 카드를 받음).</li>
                            </ul>
                        </li>
                        <li>플레이 시작: 모든 플레이어는 받은 카드를 오름차순으로 내야 하지만, 서로의 카드 정보를 공유할 수 없습니다.</li>
                        <li>카드의 숫자는 절대 공개해서는 안 됩니다.</li>
                        <li>슈리켄 사용: 합의하에 슈리켄을 사용하여 모든 플레이어가 가장 작은 숫자의 카드를 공개하고 버릴 수 있습니다.</li>
                        <li>레벨 클리어: 모든 카드를 오름차순으로 성공적으로 내면 해당 레벨을 클리어합니다.</li>
                    </ol>
                </section>

                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>게임의 종료</h2>
                    <ul className={s.modal__list}>
                        <li>모든 레벨을 성공적으로 클리어하면 플레이어들이 승리합니다.</li>
                        <li>모든 하트 토큰을 잃거나 레벨 클리어에 실패하면, 팀은 패배하게 됩니다.</li>
                    </ul>
                </section>

                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>게임 난이도 및 특별 규칙</h2>
                    <ol className={s.modal__list}>
                        <li>
                            플레이어 수에 따른 레벨 수:
                            <ul>
                                <li>2명 플레이: 1 ~ 12레벨.</li>
                                <li>3명 플레이: 1 ~ 10레벨.</li>
                                <li>4명 플레이: 1 ~ 8레벨.</li>
                            </ul>
                        </li>
                        <li>
                            생명(하트) 토큰 개수:
                            <ul>
                                <li>게임 시작 시 하트 토큰 개수는 플레이어 수에 따라 다릅니다.</li>
                                <li>하트가 모두 소진되면 게임은 즉시 종료됩니다.</li>
                            </ul>
                        </li>
                        <li>
                            추가 규칙:
                            <ul>
                                <li>
                                    특정 레벨을 클리어하면 추가적인 하트 토큰이나 슈리켄 토큰을 보상으로 받을 수 있습니다.
                                </li>
                                <li>
                                    레벨 2, 5, 8을 클리어하면 슈리켄이나 하트를 추가로 획득합니다(플레이어 수에 따라 다름).
                                </li>
                            </ul>
                        </li>
                    </ol>
                </section>

                <section className={s.modal__section}>
                    <h2 className={s.modal__section__subtitle}>전략</h2>
                    <ol className={s.modal__list}>
                        <li>심리적 타이밍 맞추기: 서로 대화를 하지 않고 심리적으로 타이밍을 맞추어 카드를 내야 합니다.</li>
                        <li>슈리켄 사용 타이밍: 위급한 상황에서 슈리켄을 사용하는 것이 좋습니다.</li>
                    </ol>
                </section>

                <footer className={s.modal__footer}>
                    <p>마무리: The Mind는 플레이어 간의 신뢰와 심리적인 호흡이 중요한 게임입니다. 많은 긴장감과 재미를 제공합니다.</p>
                </footer>
            </div>
        </div>
    )
}