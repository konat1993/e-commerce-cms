"use client"

import React from "react"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = React.HTMLAttributes<HTMLElement>

const MainNav = ({ className, ...props }: Props) => {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        }
    ]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map(({ label, href, active }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav