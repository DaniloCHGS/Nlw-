import { Alert, View } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps as PrimitivePlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type PlaceProps = PrimitivePlaceProps & {};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState<string>("");

  const [places, setPlaces] = useState<PlaceProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  }

  async function fetchPlaces() {
    try {
      if (!category) {
        return null;
      }

      const { data } = await api.get(`/markets/category/${category}`);
      setPlaces(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#3e3e3e" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
      <Places data={places} />
    </View>
  );
}
