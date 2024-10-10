import React, { useEffect, useState } from "react";
import s from "./dice.module.scss";
import classNames from "classnames";

// 주사위 면의 타입 정의
const diceFaces = ["1", "2", "3", "4", "X", "X"];

// 각 주사위 면의 회전 각도를 설정하는 객체
const faceTransforms = [
	{ x: 0, y: 0 }, // front (1)
	{ x: 0, y: 180 }, // back (2)
	{ x: 0, y: -90 }, // left (3)
	{ x: 0, y: 90 }, // right (4)
	{ x: -90, y: 0 }, // top (X)
	{ x: 90, y: 0 }, // bottom (X)
];

interface DiceProps {
	triggerRoll: boolean; // 주사위를 구르게 하는 트리거 prop
	onRollEnd: (result: string) => void; // 주사위가 멈출 때 호출될 콜백 함수
}

const Dice: React.FC<DiceProps> = ({ triggerRoll, onRollEnd }) => {
	const [currentFace, setCurrentFace] = useState(0); // 주사위의 현재 면을 저장
	const [rolling, setRolling] = useState(false); // 주사위가 구르는 상태 관리
	const [rotation, setRotation] = useState({ x: 0, y: 0 }); // 주사위의 회전 각도

	useEffect(() => {
		let rollInterval: NodeJS.Timeout | null = null; // 굴림 타이머
		let stopTimeout: NodeJS.Timeout | null = null; // 멈춤 타이머
		let finalFace = 0; // 주사위의 최종 면을 저장하는 변수

		if (triggerRoll) {
			setRolling(true); // 주사위 굴림 시작
			let lastIndex = -1;

			// 주사위가 굴러갈 방향을 한 번 설정
			const initialRotationX = Math.floor(Math.random() * 360); // 처음 설정할 X 축 회전 각도
			const initialRotationY = Math.floor(Math.random() * 360); // 처음 설정할 Y 축 회전 각도
			setRotation({ x: initialRotationX, y: initialRotationY });

			// 주사위가 굴러가는 동안의 회전 효과
			rollInterval = setInterval(() => {
				// 주사위가 계속해서 같은 방향으로 회전하도록 각도를 누적하여 증가시킴
				setRotation((prev) => ({
					x: prev.x + 15, // 같은 방향으로 계속 회전
					y: prev.y + 15,
				}));

				// 주사위의 면을 랜덤하게 변경
				let randomIndex;
				do {
					randomIndex = Math.floor(Math.random() * diceFaces.length);
				} while (randomIndex === lastIndex); // 이전 값과 동일하지 않도록 설정
				lastIndex = randomIndex;
				finalFace = randomIndex; // 최종 면을 로컬 변수에 저장
				setCurrentFace(randomIndex); // 현재 면을 상태로 업데이트
			}, 100); // 0.1초마다 주사위를 굴림

			// 2초 후에 주사위 굴림 멈춤
			stopTimeout = setTimeout(() => {
				if (rollInterval) clearInterval(rollInterval); // 주사위 회전 멈춤
				setRolling(false);

				// 최종 결과값 설정 및 부모 컴포넌트로 전달
				setCurrentFace(finalFace); // 화면에 표시될 최종 면을 설정
				setRotation({
					x: faceTransforms[finalFace].x,
					y: faceTransforms[finalFace].y,
				});

				// 최종 결과값을 부모 컴포넌트에 전달 (한 번만 호출)
				onRollEnd(diceFaces[finalFace]);
			}, 2000);
		}

		// 클린업 함수로 타이머 제거
		return () => {
			if (rollInterval) clearInterval(rollInterval);
			if (stopTimeout) clearTimeout(stopTimeout);
		};
	}, [triggerRoll, onRollEnd]);

	return (
		<div className={s.scene}>
			<div
				className={classNames(s.dice, { [s.rolling]: rolling })}
				style={{
					transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
				}}
			>
				{diceFaces.map((face, index) => (
					<div
						key={index}
						className={s.face}
						style={{
							transform: `rotateX(${faceTransforms[index].x}deg) rotateY(${faceTransforms[index].y}deg) translateZ(50px)`,
							// 각 면에 배경 색을 지정하여 각 면이 쉽게 식별되도록 함
							backgroundColor:
								index === currentFace ? "lightblue" : "white",
							color: index === currentFace ? "black" : "gray",
						}}
					>
						{face}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dice;
