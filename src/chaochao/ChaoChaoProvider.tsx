import React, { createContext, useContext, useState } from "react";
import { ChaoChaoPlayer } from "./types/ChaoChaoPlayer";

const dummys: ChaoChaoPlayer[] = [
	{
		nickname: "1",
		color: "blue",
		characters: [
			{
				id: "blue-1",
				ladderLevel: 1,
				status: "playing",
				completeLevel: 0,
			},
			{
				id: "blue-2",
				ladderLevel: 3,
				status: "playing",
				completeLevel: 0,
			},
			{
				id: "blue-3",
				ladderLevel: 4,
				status: "playing",
				completeLevel: 0,
			},
			{
				id: "blue-4",
				ladderLevel: 7,
				status: "playing",
				completeLevel: 0,
			},
		],
	},
	{
		nickname: "2",
		color: "purple",
		characters: [
			{
				id: "purple-1",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "purple-2",
				ladderLevel: 2,
				status: "playing",
				completeLevel: 0,
			},
			{
				id: "purple-3",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "purple-4",
				ladderLevel: 0,
				status: "complete",
				completeLevel: 1,
			},
		],
	},
	{
		nickname: "3",
		color: "yellow",
		characters: [
			{
				id: "yellow-1",
				ladderLevel: 1,
				status: "playing",
				completeLevel: 0,
			},
			{
				id: "yellow-2",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "yellow-3",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "yellow-4",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
		],
	},
	{
		nickname: "4",
		color: "green",
		characters: [
			{
				id: "green-1",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "green-2",
				ladderLevel: 0,
				status: "wating",
				completeLevel: 0,
			},
			{
				id: "green-3",
				ladderLevel: 0,
				status: "complete",
				completeLevel: 2,
			},
			{
				id: "green-4",
				ladderLevel: 0,
				status: "complete",
				completeLevel: 3,
			},
		],
	},
];

interface Props {
	children: React.ReactNode;
}

interface States {
	players: ChaoChaoPlayer[];
}

const ChaoChaoContext = createContext<States | undefined>(undefined!);

export const useChaChaoContext = () => useContext(ChaoChaoContext);

export const ChaoChaoProvier = (props: Props) => {
	const { children } = props;
	const [players, setPlayers] = useState(dummys);

	const value = {
		players,
	};

	return (
		<ChaoChaoContext.Provider value={value}>
			{children}
		</ChaoChaoContext.Provider>
	);
};
