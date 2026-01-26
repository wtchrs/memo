declare const owned: unique symbol
export type Owned<T> = T & { [owned]: true }

export function markOwned<T>(resource: T): Owned<T> {
    return resource as Owned<T>
}

export type MarkAsRequired<T, K extends keyof T> =
    & T
    & { [P in K]-?: NonNullable<T[P]> }
