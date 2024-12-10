import { View, Text } from "react-native";
import { s } from "./styles";
import { colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { ComponentType } from "react";

type Props = {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
};

export function Step({ description, title, icon: Icon }: Readonly<Props>) {
  return (
    <View style={s.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  );
}
