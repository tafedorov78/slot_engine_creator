import { _decorator, CCFloat, Component, Node } from 'cc';
import { SpriteSettings } from './SpriteSettings';
const { ccclass, property } = _decorator;

@ccclass('SpriteSettingsList')
export class SpriteSettingsList extends Component {


    @property({ type: [SpriteSettings] })
    public spriteSettings: SpriteSettings[] = [new SpriteSettings()];

}

