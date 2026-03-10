import type { ComponentPropsWithoutRef, ComponentPropsWithRef, JSX } from 'react'

export type IntrinsicTag = keyof JSX.IntrinsicElements

export type PropsOf<T extends IntrinsicTag> = ComponentPropsWithRef<T>
export type PropsOfWithoutRef<T extends IntrinsicTag> = ComponentPropsWithoutRef<T>

type KeysOfProps<T extends IntrinsicTag> = {
    [K in T]: keyof PropsOf<K>
}[T]

type KeysOfPropsWithoutRef<T extends IntrinsicTag> = {
    [K in T]: keyof PropsOfWithoutRef<K>
}[T]


export type NativeProps<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOf<T> = never
> = Omit<PropsOf<T>, keyof OwnProps | Excludes>

export type NativePropsWithoutRef<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOfWithoutRef<T> = never
> = Omit<PropsOfWithoutRef<T>, keyof OwnProps | Excludes>


type DefaultAsCase<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOf<T> = never
> =
    & OwnProps
    & { as?: T }
    & NativeProps<T, OwnProps & { as?: T }, Excludes>

type DefaultAsCaseWithoutRef<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOfWithoutRef<T> = never
> =
    & OwnProps
    & { as?: T }
    & NativePropsWithoutRef<T, OwnProps & { as?: T }, Excludes>


type RequiredAsCase<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOf<T> = never
> =
    & OwnProps
    & { as: T }
    & NativeProps<T, OwnProps & { as: T }, Excludes>

type RequiredAsCaseWithoutRef<
    T extends IntrinsicTag,
    OwnProps extends object = {},
    Excludes extends keyof PropsOfWithoutRef<T> = never
> =
    & OwnProps
    & { as: T }
    & NativePropsWithoutRef<T, OwnProps & { as: T }, Excludes>


export type PolymorphicProps<
    TDefault extends IntrinsicTag,
    TOthers extends Exclude<IntrinsicTag, TDefault>,
    OwnProps extends object = {},
    Excludes extends KeysOfProps<TDefault | TOthers> = never,
> =
    | DefaultAsCase<
        TDefault,
        OwnProps,
        Extract<Excludes, keyof PropsOf<TDefault>>
    >
    | {
        [K in TOthers]: RequiredAsCase<
            K,
            OwnProps,
            Extract<Excludes, keyof PropsOf<K>>
        >
    }[TOthers]

export type PolymorphicPropsWithoutRef<
    TDefault extends IntrinsicTag,
    TOthers extends Exclude<IntrinsicTag, TDefault>,
    OwnProps extends object = {},
    Excludes extends KeysOfPropsWithoutRef<TDefault | TOthers> = never,
> =
    | DefaultAsCaseWithoutRef<
        TDefault,
        OwnProps,
        Extract<Excludes, keyof PropsOfWithoutRef<TDefault>>
    >
    | {
        [K in TOthers]: RequiredAsCaseWithoutRef<
            K,
            OwnProps,
            Extract<Excludes, keyof PropsOfWithoutRef<K>>
        >
    }[TOthers]
