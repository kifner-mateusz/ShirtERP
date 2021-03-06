import {
  ActionIcon,
  Box,
  Button,
  Group,
  Input,
  Menu,
  Stack,
} from "@mantine/core"
import _ from "lodash"
import { ComponentType, FC, useEffect, useId, useState } from "react"
import { SxBorder, SxRadius } from "../../styles/basic"
import isArrayEqual from "../../utils/isArrayEqual"
import { Edit, Plus, TrashX, X } from "tabler-icons-react"

// fixme submit only on edit end

interface EditableArrayProps {
  label?: string
  value?: any[] | null
  initialValue?: any[] | null
  onSubmit?: (value: any[] | null) => void
  disabled?: boolean
  required?: boolean
  maxCount?: number
  Element: ComponentType
  elementProps: any
}

const EditableArray: FC<EditableArrayProps> = (props) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    maxCount,
    Element,
    elementProps,
  } = props
  const [items, setItems] = useState<any[]>(value ?? initialValue ?? [])
  const [prev, setPrev] = useState<any[]>(items)
  const [active, setActive] = useState<boolean>(false)
  const uuid = useId()

  useEffect(() => {
    if (isArrayEqual(items, prev)) return
    onSubmit && onSubmit(items)
    console.log(items, prev)
  }, [items])

  useEffect(() => {
    if (value === undefined || value === null) return
    setItems(value)
    setPrev(value)
  }, [value])
  // console.log(items)

  return (
    <Input.Wrapper label={label} required={required}>
      <Stack
        sx={[
          (theme) => ({
            padding: theme.spacing.sm,
            position: "relative",
            minHeight: 44,
            backgroundColor: active
              ? theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0]
              : undefined,
          }),
          SxBorder,
          SxRadius,
        ]}
      >
        {items.map((val, index) => {
          return (
            <Group spacing="xs" key={uuid + index}>
              <Box
                sx={(theme) => ({
                  backgroundColor: active
                    ? theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.white
                    : undefined,
                  flexGrow: 1,
                  paddingRight: active ? undefined : 32,
                  borderRadius: theme.radius.sm,
                })}
              >
                <Element
                  value={val}
                  onSubmit={(itemValue: any) => {
                    console.log("array", itemValue)
                    itemValue &&
                      setItems((stringArrayOld) =>
                        stringArrayOld.map((val, i) =>
                          i === index ? itemValue : val
                        )
                      )
                  }}
                  {...elementProps}
                />
              </Box>
              {active && (
                <Menu
                  tabIndex={-1}
                  withArrow
                  styles={(theme) => ({
                    body: {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[7]
                          : theme.white,
                    },
                    arrow: {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[7]
                          : theme.white,
                    },
                  })}
                >
                  <Menu.Item
                    icon={<TrashX size={14} />}
                    onClick={() => {
                      console.log(index)
                      setItems((val) => val.filter((_, i) => i !== index))
                    }}
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              )}
            </Group>
          )
        })}
        {active ? (
          <Group>
            <Button
              variant="light"
              onClick={() => setItems((val) => [...val, null])}
              disabled={
                disabled || (maxCount ? maxCount <= items.length : undefined)
              }
              style={{ flexGrow: 1 }}
            >
              <Plus />
            </Button>
            <ActionIcon
              radius="xl"
              onClick={() => setActive(false)}
              disabled={disabled}
              tabIndex={-1}
            >
              <X size={18} />
            </ActionIcon>
          </Group>
        ) : (
          <ActionIcon
            radius="xl"
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
            }}
            onClick={() => setActive(true)}
            disabled={disabled}
            tabIndex={-1}
          >
            <Edit size={18} />
          </ActionIcon>
        )}
      </Stack>
    </Input.Wrapper>
  )
}

export default EditableArray
