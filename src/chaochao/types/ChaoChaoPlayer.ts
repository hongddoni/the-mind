export type ChaoChaoPlayerColors = "blue" | "yellow" | "purple" | "green";

export type ChaoChaoCharacterStatus =
	| "wating"
	| "playing"
	| "complete"
	| "deleted";

export interface ChaoChaoCharacter {
	id: string; // id = color + index
	ladderLevel: number; // 0 ~ 7
	status: ChaoChaoCharacterStatus;
	completeLevel: number; // 0 ~ 10
}

export interface ChaoChaoPlayer {
	nickname: string;
	color: ChaoChaoPlayerColors;
	characters: ChaoChaoCharacter[];
}
