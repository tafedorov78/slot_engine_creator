import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
import { mylog } from 'scripts/ult/Utils';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    @property({ type: Prefab })
    objectPrefab: Prefab = null;

    private pool: Node[] = [];

    public preload(count: number) {
        for (let i = 0; i < count; i++) {
            const obj = instantiate(this.objectPrefab);
            obj.active = false;
            this.pool.push(obj);
        }
    }

    public getObject(): Node {
        let obj: Node;
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = instantiate(this.objectPrefab);
        }
        obj.active = true;
        return obj;
    }

    public releaseObject(obj: Node) {
        obj.removeFromParent();
        obj.active = false;
        this.pool.push(obj);
    }

    public clear() {
        while (this.pool.length > 0) {
            const obj = this.pool.pop();
            obj.destroy();
        }
    }

    getSize(): number {
        return this.pool.length;
    }
}
