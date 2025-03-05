import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteSettings')
export class SpriteSettings extends Component {

    @property({ type: CCFloat })
    public a: number = 0;

    @property({ type: CCFloat })
    public b: number = 0;

    @property({ type: CCFloat })
    public c: number = 0;
}

