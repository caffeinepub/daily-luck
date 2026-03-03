import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LuckReading {
    finance: CategoryFortune;
    luckyNumber: bigint;
    overallMessage: string;
    luckyColor: string;
    love: CategoryFortune;
    luckyTimeOfDay: string;
    career: CategoryFortune;
    health: CategoryFortune;
}
export interface CategoryFortune {
    score: bigint;
    message: string;
}
export interface backendInterface {
    getTodaysLuck(): Promise<LuckReading>;
}
