export interface IPasswordEncoder {
    // Dummy encoded password for timing attack prevention
    dummyEncodedPassword: string
    encode(rawPassword: string): string
    match(encodedPassword: string, rawPassword: string): boolean
}

export class PasswordEncoder implements IPasswordEncoder {
    dummyEncodedPassword: string = ""

    encode(rawPassword: string): string {
        // TODO: Implement password encoding
        return rawPassword
    }

    match(encodedPassword: string, rawPassword: string): boolean {
        // TODO: Implement password matching
        return encodedPassword === rawPassword
    }
}
