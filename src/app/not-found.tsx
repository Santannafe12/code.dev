import Link from 'next/link'
import { TypographyH1 } from '../components/typography'
import { Button } from '../components/_ui/button'

export default function NotFound() {
    return (
        <div className='min-h-screen flex flex-col items-center'>
            <TypographyH1 className='border-none'>Página não encontrada.</TypographyH1>
            <Link href="/"><Button className='rounded-lg'>Retornar a Home</Button></Link>
        </div>
    )
}