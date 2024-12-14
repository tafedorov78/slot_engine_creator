import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('NodeSwitcher')
@executeInEditMode
export class NodeSwitcher extends Component {

    @property([Node])
    nodes: Node[] = [];

    @property({
        type: CCInteger,
        tooltip: "Index of the node to display",
        step: 1,
    })

    get currentNodeIndex() {
        return this._currentNodeIndex;
    }

    protected onLoad(): void {
        if (this.nodes.length > 0) {
            this.onEditorPropsChanged();
        }
    }

    set currentNodeIndex(value: number) {
        if (value >= 0 && value < this.nodes.length) {
            this._currentNodeIndex = value;
            this.onEditorPropsChanged();
        } else {
            console.error('Invalid node index:', value);
        }
    }

    public getCurrentNode(): Node {
        return this.nodes[this.currentNodeIndex];
    }

    private _currentNodeIndex: number = 0;


    private onEditorPropsChanged() {
        this.nodes.forEach((node) => {
            node.active = false;
        })
        this.getCurrentNode().active = true;
    }
}

