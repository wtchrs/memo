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


type PolymorphicPropsCase<
    Native extends object,
    OwnProps extends object,
    AsProps extends object,
    Excludes extends PropertyKey
> =
    & OwnProps
    & AsProps
    & Omit<Native, keyof OwnProps | keyof AsProps | Excludes>


export type PolymorphicProps<
    DefaultTag extends IntrinsicTag,
    OtherTags extends Exclude<IntrinsicTag, DefaultTag> = never,
    OwnProps extends object = {},
    ExcludedKeys extends KeysOfProps<DefaultTag | OtherTags> = never,
> =
    | PolymorphicPropsCase<
        PropsOf<DefaultTag>,
        OwnProps,
        { as?: DefaultTag },
        ExcludedKeys
    >
    | {
        [K in OtherTags]: PolymorphicPropsCase<
            PropsOf<K>,
            OwnProps,
            { as: K },
            ExcludedKeys
        >
    }[OtherTags]

export type PolymorphicPropsWithoutRef<
    DefaultTag extends IntrinsicTag,
    OtherTags extends Exclude<IntrinsicTag, DefaultTag> = never,
    OwnProps extends object = {},
    ExcludedKeys extends KeysOfPropsWithoutRef<DefaultTag | OtherTags> = never,
> =
    | PolymorphicPropsCase<
        PropsOfWithoutRef<DefaultTag>,
        OwnProps,
        { as?: DefaultTag },
        ExcludedKeys
    >
    | {
        [K in OtherTags]: PolymorphicPropsCase<
            PropsOfWithoutRef<K>,
            OwnProps,
            { as: K },
            ExcludedKeys
        >
    }[OtherTags]
