import { _decorator, Component, deserializeTag, Node } from 'cc';
import { InitData, ReelsData } from 'scripts/model/Types';
const { ccclass, property } = _decorator;

@ccclass('NetworkManager')
export class NetworkManager extends Component {

    public init(callback: (data: InitData) => void): void {
        const data: InitData = {
            reels: [
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [1, 2, 3],
                },
                {
                    symbols: [2, 2, 3],
                },
                {
                    symbols: [2, 5, 1],
                },
                {
                    symbols: [0, 2, 1],
                },
                {
                    symbols: [0, 2, 1],
                },
            ]
        }
        callback(data);
    }

    public spin(callback: (data: InitData) => void): void {
        const data: InitData = {
            reels: [
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [0, 1, 3],
                },
                {
                    symbols: [0, 1, 3],
                },
            ]
        }
        callback(data);
    }
}

