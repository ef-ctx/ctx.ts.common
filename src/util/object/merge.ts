
export function merge(target: {}, target1: {}): void {

    Object.keys(target1)
        .map((key: string) => {
            target[key] = target1[key];
        });
}