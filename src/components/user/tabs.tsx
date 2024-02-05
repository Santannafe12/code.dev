"use client"

import { useState } from "react";
import { Button } from "../_ui/button";
import { TypographyH3 } from "../typography";
import About from "./about";
import Posts from "./posts";

type Tabs = 'about' | 'posts';

export default function Tabs() {
    const [activeTab, setActiveTab] = useState<Tabs>('about');

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col">
            <section className="flex items-center gap-1">
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange('about')}>
                    <TypographyH3 className={`${activeTab === 'about' ? "underline" : ""}`}>Início</TypographyH3>
                </Button>
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange("posts")}>
                    <TypographyH3 className={`${activeTab === 'posts' ? "underline" : ""}`}>Posts</TypographyH3>
                </Button>
            </section>
            <section className="px-4 mt-8">
                {activeTab === 'about' ? <About /> : <Posts />}
            </section>
        </div>
    )
}
