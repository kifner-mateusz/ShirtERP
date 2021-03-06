import { useId } from "@mantine/hooks"
import { Text } from "@mantine/core"
import { FC } from "react"
import { useRecoilValue } from "recoil"
import { loginState } from "../../atoms/loginState"
import NotImplemented from "../NotImplemented"
import DisplayCell from "./DisplayCell"

interface DetailsProps {
  template: { [key: string]: any }
  data: { [key: string]: any }
}

const Details: FC<DetailsProps> = ({ template, data }) => {
  const user = useRecoilValue(loginState)
  const uuid = useId()
  if (!(data && Object.keys(data).length > 0))
    return (
      <Text
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        Brak danych
      </Text>
    )

  return (
    <>
      {Object.keys(template).map((key) => {
        if (key === "id" && user.debug === true)
          return <Text key={uuid + key}>ID: {data[key]}</Text>

        if (!(key in template))
          return user?.debug === true ? (
            <NotImplemented
              message={"Key doesn't have template"}
              object_key={key}
              value={data[key]}
              key={uuid + key}
            />
          ) : null
        switch (template[key].type) {
          case "text":
            return (
              <DisplayCell {...template[key]} key={uuid + key}>
                {data[key]}
              </DisplayCell>
            )
        }
      })}
    </>
  )
}

export default Details
