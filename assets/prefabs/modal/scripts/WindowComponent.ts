import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WindowComponent')
export class WindowComponent extends Component {

    @property({ type: Label }) headerLabel: Label = null;
    @property({ type: Label }) bodyText: Label = null;


    start() {

    }

}

