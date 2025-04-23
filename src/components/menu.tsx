import { ActionBar, Button, Portal, For } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { routes } from '@/router/routes'

export const Menu = () => {
    const router = useRouter()
    const pathName = usePathname()

    const showMenu = routes.filter((item) => item.path !== pathName)

    return (
        <ActionBar.Root open={true} closeOnInteractOutside={false}>
            <Portal>
                <ActionBar.Positioner>
                    <ActionBar.Content>
                        <For each={showMenu}>
                            {(item, idx) => (
                                <Fragment key={item.label}>
                                    <Button
                                        key={item.label}
                                        variant="outline"
                                        left-icon
                                        size="sm"
                                        onClick={() => router.push(item.path)}
                                    >
                                        <item.icon />
                                        {item.label}
                                    </Button>
                                    {idx !== showMenu.length - 1 && <ActionBar.Separator />}
                                </Fragment>
                            )}
                        </For>
                    </ActionBar.Content>
                </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root>
    )
}
