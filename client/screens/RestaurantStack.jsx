import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import RestaurantScreen from "./RestaurantScreen";
import DishesScreen from "./DishesScreen";
import HomeScreen from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddDishScreen from "./AddDish";

export default function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InitalScreen" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="Dishes" component={DishesScreen} />
      <Stack.Screen name="AddDish" component={AddDishScreen} />
    </Stack.Navigator>
  );
}
