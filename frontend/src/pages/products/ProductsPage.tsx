import {
  Avatar,
  Box,
  Container,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core"
import { FC } from "react"
import { ChevronLeft, ChevronRight } from "tabler-icons-react"
import { ProductType } from "../../types/ProductType"

import ApiList from "../../components/api/ApiList"

const ProductsPage: FC = () => {
  return (
    <Group
      sx={(theme) => ({
        padding: theme.spacing.xl,
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          padding: 0,
        },
      })}
    >
      <ApiList
        ListItem={ProductListItem}
        entryName="products"
        spacing="xl"
        listSpacing="sm"
      />

      <Container>
        <Text>TEST</Text>
      </Container>
    </Group>
  )
}

const ProductListItem: FC<ProductType> = ({ name, codeName, color }) => {
  const theme = useMantineTheme()

  return (
    <UnstyledButton
      sx={{
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      }}
    >
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {codeName}
          </Text>
        </Box>

        {/* {theme.dir === "ltr" ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )} */}
      </Group>
    </UnstyledButton>
  )
}

export default ProductsPage
