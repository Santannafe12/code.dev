import Image from 'next/image';

import { getPost } from '@/server/actions/post/post';
import { ImageResponse } from 'next/og'

export const size = {
    width: 1200,
    height: 630,
};

export default async function og({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const post = await getPost(slug);

    return new ImageResponse(
        (
            <div tw="relative flex w-full h-full flex items-center justify-center">
                <div tw="absolute flex inset-0">
                    <Image
                        tw="flex flex-1"
                        src={post?.image + "&w=1200&h=630&auto=format&q=75"}
                        alt={post?.title!!}
                    />
                    <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
                </div>
                <div tw="flex flex-col text-neutral-50">
                    <div tw="text-7xl font-bold">{post?.title}</div>
                </div>
            </div>
        ),
        size
    );
}