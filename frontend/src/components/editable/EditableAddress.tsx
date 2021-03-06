import { ActionIcon, Group, Input, Stack, Text, Textarea } from "@mantine/core"
import { useClickOutside, useClipboard } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { FC, useEffect, useState } from "react"
import { SxBorder, SxRadius } from "../../styles/basic"
import { AddressType } from "../../types/AddressType"
import { BuildingCommunity, Copy, Edit, X } from "tabler-icons-react"
import DisplayCell from "../details/DisplayCell"
import EditableEnum from "./EditableEnum"
import EditableText from "./EditableText"

const provinces = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
]

interface EditableAddressProps {
  label?: AddressType & { name: string }
  value?: AddressType
  initialValue?: AddressType
  onSubmit?: (value: AddressType | null) => void
  disabled?: boolean
  required?: boolean
  maxLength?: number
}

const EditableAddress: FC<EditableAddressProps> = ({
  label,
  value,
  initialValue,

  onSubmit,
  disabled,
  required,
  maxLength,
}) => {
  const [address, setAddress] = useState<AddressType>(
    value
      ? value
      : initialValue
      ? initialValue
      : {
          streetName: "",
          streetNumber: "",
          apartmentNumber: "",
          secondLine: "",
          city: "",
          province: "",
          postCode: "",
        }
  )
  const [prevAddress, setPrevAddress] = useState(address)
  const [active, setActive] = useState<boolean>(false)
  const clipboard = useClipboard()
  const ref = useClickOutside(() => setActive(false))

  const setAddressField = (key: string, val: string) => {
    setAddress((old_value) => ({ ...old_value, [key]: val }))
  }

  useEffect(() => {
    if (active) {
      setPrevAddress(address)
    }
  }, [active])

  useEffect(() => {
    if (address !== prevAddress) {
      onSubmit && onSubmit(address)
    }
  }, [address])

  const toString = () => {
    return (
      (address?.streetName ? "ul. " + address?.streetName : "") +
      " " +
      (address.streetNumber || "") +
      (address.apartmentNumber ? " / " + address.apartmentNumber : "") +
      "\n" +
      (address.secondLine ? address.secondLine + "\n" : "") +
      (address.postCode ? address.postCode + " " : "") +
      (address.city || "") +
      (address.postCode || address.city ? "\n" : "") +
      (address.province || address.province)
    )
  }

  return (
    <Input.Wrapper
      ref={ref}
      label={
        <>
          {label?.name}
          {
            <ActionIcon
              size="xs"
              style={{
                display: "inline-block",
                transform: "translate(4px, 4px)",
                marginRight: 4,
              }}
              onClick={() => {
                const address_text = toString()
                clipboard.copy(address_text)
                showNotification({
                  title: "Skopiowano do schowka",
                  message: address_text,
                })
              }}
              tabIndex={-1}
            >
              <Copy size={16} />
            </ActionIcon>
          }
        </>
      }
      labelElement="div"
      required={required}
    >
      {active ? (
        <Stack
          style={{ position: "relative" }}
          sx={[SxBorder, SxRadius]}
          p="md"
        >
          <EditableText
            label={label?.streetName ?? undefined}
            value={value?.streetName ?? ""}
            onSubmit={(value) => value && setAddressField("streetName", value)}
          />
          <Group grow={true}>
            <EditableText
              label={label?.streetNumber ?? undefined}
              value={value?.streetNumber ?? ""}
              onSubmit={(value) =>
                value && setAddressField("streetNumber", value)
              }
              style={{ flexGrow: 1 }}
            />
            <EditableText
              label={label?.apartmentNumber ?? undefined}
              value={value?.apartmentNumber ?? ""}
              onSubmit={(value) =>
                value && setAddressField("apartmentNumber", value)
              }
              style={{ flexGrow: 1 }}
            />
          </Group>
          <EditableText
            label={label?.secondLine ?? undefined}
            value={value?.secondLine ?? ""}
            onSubmit={(value) => value && setAddressField("secondLine", value)}
          />
          <EditableText
            label={label?.postCode ?? undefined}
            value={value?.postCode ?? ""}
            onSubmit={(value) => value && setAddressField("postCode", value)}
          />
          <EditableText
            label={label?.city ?? undefined}
            value={value?.city ?? ""}
            onSubmit={(value) => value && setAddressField("city", value)}
          />
          <EditableEnum
            label={label?.province ?? undefined}
            value={value?.province ?? ""}
            onSubmit={(value) => value && setAddressField("province", value)}
            enum_data={provinces}
          />
          {/* <ActionIcon
            radius="xl"
            style={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={() => setActive(false)}
            disabled={disabled}
            tabIndex={-1}
          >
            <X size={18} />
          </ActionIcon> */}
        </Stack>
      ) : (
        <div style={{ position: "relative" }}>
          <DisplayCell icon={<BuildingCommunity />}> {toString()}</DisplayCell>
          <ActionIcon
            radius="xl"
            style={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={() => setActive(true)}
            disabled={disabled}
            tabIndex={-1}
          >
            <Edit size={18} />
          </ActionIcon>
        </div>
      )}
    </Input.Wrapper>
  )
}

export default EditableAddress
