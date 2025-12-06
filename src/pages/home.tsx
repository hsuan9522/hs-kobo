import Logo from '@/assets/logo.svg?react'
import { TextTyping } from '@/components/textTyping'
import { UploadField } from '@/components/uploadField'
import { useAppSelector } from '@/hooks/useRedux'
import { chakra, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate()
    const { isKoboDataBase } = useAppSelector((state) => state.common)

    const uploadSuccess = () => {
        if (isKoboDataBase) {
            navigate('/notes')
        } else {
            navigate('/calendar')
        }
    }

    return (
        <>
            <Flex
                w="full"
                h="full"
                align="center"
                justifyContent="center"
                gap="4"
                direction="column"
            >
                <chakra.svg fill="gray.600" width="full" height="300px">
                    <Logo />
                </chakra.svg>
                <TextTyping
                    text="Upload your .sqlite file to get started"
                    animation={true}
                ></TextTyping>
                <Flex justifyContent="center">
                    <UploadField successCallback={uploadSuccess}></UploadField>
                </Flex>
            </Flex>
        </>
    )
}

export default Home
