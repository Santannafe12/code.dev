import Link from "next/link";

import { Code } from "lucide-react";

export default function Footer() {
    return (
        <div className="border-t text-center w-full mt-24 py-8 flex flex-col gap-12 items-center justify-center">
            <div className="flex flex-col gap-4 px-4">
                <Link className="flex items-center gap-2 max-w-fit mx-auto" href="/">
                    <Code className="h-6 w-6" />
                    <span className="text-lg font-semibold">code.dev</span>
                </Link>
                <span className="text-base text-center text-muted-foreground">Construído com graphql e shadcn. Código fonte no <Link href={'https://github.com/Santannafe12'} target="_blank" className="text-blue-400 hover:underline">Github.</Link></span>
            </div>
        </div>
    )
}