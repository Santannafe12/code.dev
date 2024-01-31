export function TypographyH1({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            {children}
        </h4>
    )
}

export function TypographyLead({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xl text-muted-foreground">
            {children}
        </p>
    )
}