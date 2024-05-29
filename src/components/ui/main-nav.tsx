"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/utils/cn"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Flame } from "lucide-react"

import { rules } from '@/app/rules/routes';

export function MainNav() {
  return (
    <div className="justify-center sm:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/rules">
                Basic Rules
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {rules.map(({ name, path, sections }) => (
                  <ListItem
                    key={path}
                    title={name}
                    href={path}
                  >
                    {sections.join(', ')}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Explore
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-2">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/spells"
                    >
                      <Flame />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Spells
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        View all spells.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-start-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full px-6 select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                      href="/classes"
                    >
                      <div className="text-lg font-medium">
                        Classes
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        View all classes.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/monsters" title="Monsters">
                  View all monsters.
                </ListItem>
                <ListItem href="/equipment" title="Equipment">
                  View weapons, armor, tools, and other gear.
                </ListItem>
                <ListItem href="/magic-items" title="Magic Items">
                  View rare and wondrous items.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              WIP
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/inventory" title="Bag of Holding">
                  Bag of Holding
                </ListItem>
                <ListItem href="/spellbook" title="Spellbook">
                  Spellbook
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"