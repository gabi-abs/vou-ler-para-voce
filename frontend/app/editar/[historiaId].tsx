import { useLocalSearchParams } from "expo-router";

export default function EditarHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string };
  return (
    <></>
  );
}