import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    @property({ type: Prefab }) // Префаб объектов для пула
    objectPrefab: Prefab = null;

    private pool: Node[] = []; // Пул для хранения неиспользуемых объектов

    // Метод для предварительной загрузки объектов в пул
    public preload(count: number) {
        for (let i = 0; i < count; i++) {
            const obj = instantiate(this.objectPrefab);
            obj.active = false; // Деактивируем объект
            this.pool.push(obj); // Добавляем объект в пул
        }
    }

    // Получить объект из пула
    public getObject(): Node {
        let obj: Node;
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = instantiate(this.objectPrefab); // Создаем новый, если пул пуст
        }
        obj.active = true; // Активируем объект перед использованием
        return obj;
    }

    // Вернуть объект в пул
    public releaseObject(obj: Node) {
        obj.removeFromParent();
        obj.active = false; // Деактивируем объект перед возвратом
        this.pool.push(obj); // Добавляем его обратно в пул
    }

    // Очистка пула, если нужно освободить память
    public clear() {
        while (this.pool.length > 0) {
            const obj = this.pool.pop();
            obj.destroy(); // Уничтожаем объект
        }
    }

    getSize(): number {
        return this.pool.length;
    }
}
