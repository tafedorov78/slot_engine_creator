import { _decorator, CCInteger, Component, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('FrameSwitcher')
@executeInEditMode
export class FrameSwitcher extends Sprite {

    @property([SpriteFrame])
    frames: SpriteFrame[] = [];

    @property({
        type: CCInteger,
        tooltip: "Index of the frame to display",
        step: 1,
    })
    currentFrameIndex: number;

    private sprite: Sprite = null;

    start() {
        this.sprite = this.getComponent(Sprite);
        this.updateImage();
    }

    protected update(dt: number): void {
        this.updateImage();
    }

    updateImage() {
        if (this.frames.length > 0 && this.sprite) {
            this.sprite.spriteFrame = this.frames[this.currentFrameIndex];
        }
    }
}
