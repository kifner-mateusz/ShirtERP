import { FC, useState } from "react"
import {
  Button,
  ColorScheme,
  Container,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core"
import { Bug, Logout, MoonStars, Sun } from "tabler-icons-react"
import { loginState } from "../../atoms/loginState"
import { UserType } from "../../types/UserType"
import { useRecoilState } from "recoil"
import { useColorScheme, useLocalStorage } from "@mantine/hooks"

const SettingsPage: FC = () => {
  const [login, setLogin] = useRecoilState(loginState)
  const [testFormVisible, setTestFormVisible] = useState(false)

  const data: any = {
    name: {
      label: "Napis",
      type: "string",
      initialValue: "test",
    },

    bool: {
      label: "checkbox",
      type: "boolean",
      initialValue: false,
      checkbox: true,
    },
    switch: {
      label: "switch",
      type: "boolean",
      initialValue: false,
    },
    category: {
      label: "Enum",
      type: "enum",
      initialValue: "option 1",
      enum_data: ["option 1", "option 2", "option 3"],
    },
    color: {
      label: "Kolor",
      type: "color",
      initialValue: { colorName: "Red", colorHex: "#ff0000" },
      // disabled: true,
      showText: true,
    },
    date: {
      label: "Date",
      type: "date",
      initialValue: "2021-11-05T12:24:05.097Z",
    },
    datetime: {
      label: "Datetime",
      type: "datetime",
      initialValue: "2021-11-05T12:24:05.097Z",
    },
    product: {
      label: "product",
      type: "product",
      // initialValue: null,
    },
    productcomponent: {
      label: "productcomponent",
      type: "productcomponent",
      initialValue: [],
    },
    productcomponents: {
      label: "productcomponents",
      type: "productcomponents",
      initialValue: [],
    },

    image: {
      label: "Image",
      type: "image",
      initialValue: null,
    },
    file: {
      label: "File",
      type: "file",

      initialValue: {
        id: 40,
        name: "test7.png",
        alternativeText: null,
        caption: null,
        width: 1920,
        height: 1080,
        formats: {
          large: {
            ext: ".png",
            url: "/uploads/large_test7_d10bd369ae.png",
            hash: "large_test7_d10bd369ae",
            mime: "image/png",
            name: "large_test7.png",
            path: null,
            size: 198.86,
            width: 1000,
            height: 563,
          },
          small: {
            ext: ".png",
            url: "/uploads/small_test7_d10bd369ae.png",
            hash: "small_test7_d10bd369ae",
            mime: "image/png",
            name: "small_test7.png",
            path: null,
            size: 68.33,
            width: 500,
            height: 281,
          },
          medium: {
            ext: ".png",
            url: "/uploads/medium_test7_d10bd369ae.png",
            hash: "medium_test7_d10bd369ae",
            mime: "image/png",
            name: "medium_test7.png",
            path: null,
            size: 126.47,
            width: 750,
            height: 422,
          },
          thumbnail: {
            ext: ".png",
            url: "/uploads/thumbnail_test7_d10bd369ae.png",
            hash: "thumbnail_test7_d10bd369ae",
            mime: "image/png",
            name: "thumbnail_test7.png",
            path: null,
            size: 24.04,
            width: 245,
            height: 138,
          },
        },
        hash: "test7_d10bd369ae",
        ext: ".png",
        mime: "image/png",
        size: 355.94,
        url: "/uploads/test7_d10bd369ae.png",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2021-12-02T21:46:47.894Z",
        updatedAt: "2021-12-02T21:46:47.894Z",
        related: [{}],
      },
    },
    files: {
      label: "Files",
      type: "files",
      // initialValue: null,
    },
    workstations: {
      label: "Workstation",
      type: "workstationId",
      initialValue: 6,
    },
    employee: {
      label: "User",
      type: "user",
      // initialValue: undefined,
    },
    employees: {
      label: "Users",
      type: "users",
      // initialValue: undefined,
    },
    submit: {
      label: "Submit",
      type: "submit",
      // centered: true, // not inmplemented
    },
  }
  return (
    <Container size="xs" px="xs" my="xl">
      <Paper shadow="xs" p="xl" withBorder>
        <Group>
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              setLogin({ jwt: "", user: null, debug: false })
            }}
          >
            <Group>
              <ThemeIcon variant="light">
                <Logout />
              </ThemeIcon>
              <Text>Wyloguj</Text>
            </Group>
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              setLogin((user) => ({
                ...user,
                debug: !user.debug,
              }))
            }}
          >
            <Group>
              <ThemeIcon variant="light">
                <Bug />
              </ThemeIcon>
              <Text>Debug {login.debug ? "ON" : "OFF"}</Text>
            </Group>
          </Button>
        </Group>
      </Paper>
    </Container>
  )
}

export default SettingsPage
