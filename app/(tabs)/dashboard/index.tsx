import { withAuth } from "@/app/shared/withAuth";
import { View, Text } from "react-native";
import theme from "../../../styles/theme";

function Dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.medium }}>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 20 }}>Bem-vindo ao Dashboard</Text>
    </View>
  );
}

export default withAuth(Dashboard);
