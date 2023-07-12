import Case from "../components/Case";
import reactLogo from "../assets/react.svg";
import { PasswordInput, Text, Group, TextInput, Button } from "@mantine/core";
import AuthService from '../services/auth.services';
import { useNavigate } from "react-router-dom";


export default function Login (){
  const navigate = useNavigate();
  const handleSubmit = (event:any)=>{
    // Prevent page reload
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log("username", username)
    console.log("value", password)

    AuthService.login(username, password).then(
      (e) => {
        console.log("Login : ",e);
        navigate("/");
      },
      error => {
        console.log("error", error)
      }
    );
  };
  return (
    <Case>
      <section className="h-screen">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src={reactLogo}
                  alt="reactjs"
                />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Group position="apart" mb={5}>
                    <Text
                      component="label"
                      htmlFor="username"
                      size="sm"
                      weight={500}
                    >
                      Username
                    </Text>
                  </Group>
                  <TextInput
                    id="username"
                    placeholder="Username"
                    required
                    autoComplete="nope"
                  />
                </div>
                <div className="mb-3">
                  <Group position="apart" mb={5}>
                    <Text
                      component="label"
                      htmlFor="password"
                      size="sm"
                      weight={500}
                    >
                      Password
                    </Text>
                  </Group>
                  <PasswordInput placeholder="Password" id="password" required />
                </div>

                <div className="grid justify-items-end text-center lg:text-left">
                  <Button
                  type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
          </div>
        </div>
      </section>
    </Case>
  );
}
