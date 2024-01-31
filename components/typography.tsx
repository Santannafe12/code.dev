export function Heading({ title }: { title: string }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
            {title}
        </h2>
    )
}

export function SubHeading({ title }: { title: string }) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            People stopped telling jokes
        </h4>
    )
}