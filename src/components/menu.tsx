import { ActionBar, Button, Portal, For } from '@chakra-ui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router'
import { useRoute } from '@/hooks/useRoute'

export const Menu = () => {
    const { restRoutes } = useRoute()
    const navigate = useNavigate()

    return (
        <ActionBar.Root open={true} closeOnInteractOutside={false}>
            <Portal>
                <ActionBar.Positioner zIndex="1">
                    <ActionBar.Content>
                        <For each={restRoutes}>
                            {(item, idx) => (
                                <Fragment key={item.label}>
                                    <Button
                                        key={item.label}
                                        variant="outline"
                                        left-icon
                                        size="sm"
                                        onClick={() => navigate(item.path)}
                                    >
                                        <item.icon />
                                        {item.path ? item.label : ''}
                                    </Button>
                                    {idx !== restRoutes.length - 1 && <ActionBar.Separator />}
                                </Fragment>
                            )}
                        </For>
                    </ActionBar.Content>
                </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root>
    )
}
