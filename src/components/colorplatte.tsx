import { useAppSelector } from '@/hooks/useRedux'
import { Flex, Box } from '@chakra-ui/react'

export const ColorPlatte = () => {
    const bgColors = useAppSelector((state) => state.common.bgColors)
    const bdrColors = useAppSelector((state) => state.common.bdrColors)

    return (
        <Flex gap="2" pt="4">
            {bgColors.map((bg, idx) => (
                <Box
                    key={bg}
                    width="5"
                    height="5"
                    background={bg}
                    borderWidth="1.5px"
                    borderColor={bdrColors[idx]}
                    borderRadius="md"
                ></Box>
            ))}
        </Flex>
    )
}
