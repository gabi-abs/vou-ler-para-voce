import { useLocalSearchParams } from "expo-router";

export default function OuvirHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string };
  return (
    <></>
  );
}