import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Text,
    IconButton,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSetRecoilState } from "recoil";

import { authenticatedUserTokenRecoilState, useAuthenticatedUserMutator } from "@store/user";

export default function SignIn() {
    const router = useRouter();
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const { setAuthenticatedUser } = useAuthenticatedUserMutator();
    const setIdToken = useSetRecoilState(authenticatedUserTokenRecoilState);

    // テキストフィールドの値がチェンジされた時
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSignInButtonClick = async () => {
        try {
            const user = await Auth.signIn(email, password);
            if (user.challengeName !== "NEW_PASSWORD_REQUIRED") {
                await setAuthenticatedUser(user);
                const cognitoInfo = await Auth.currentAuthenticatedUser();
                const idToken = await cognitoInfo.getSignInUserSession()?.getIdToken().getJwtToken();
                setIdToken({ idToken });
                router.replace("/");
                return;
            }
            setIsLoginFailed(false);
        } catch (e) {
            console.log(e);
            setIsLoginFailed(true);
        }
    };

    return (
        <Stack direction={{ base: "column", md: "row" }} minH={"100vh"}>
            <Flex align={"center"} justify={"center"} flex={1} p={8}>
                <Stack w={"full"} maxW={"md"} spacing={4}>
                    <Heading fontSize={"2xl"}>Sign in to your Reportify account</Heading>
                    {isLoginFailed && <Text color={"red"}>Failed to Login!</Text>}
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input onChange={handleEmailChange} type="email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input onChange={handlePasswordChange} type={isRevealPassword ? "text" : "password"} />
                            <InputRightElement>
                                <IconButton
                                    aria-label={""}
                                    icon={isRevealPassword === true ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    onClick={() => {
                                        setIsRevealPassword(!isRevealPassword);
                                    }}
                                    variant="ghost"
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack align={"start"} justify={"space-between"} direction={{ base: "column", sm: "row" }}>
                            <Link color={"blue.500"}>Forgot password?</Link>
                        </Stack>
                        <Button colorScheme={"blue"} onClick={onSignInButtonClick} type="submit" variant={"solid"}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    objectFit={"cover"}
                    alt={"Login Image"}
                    src={
                        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                    }
                />
            </Flex>
        </Stack>
    );
}
