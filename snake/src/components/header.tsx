import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../styles/colors";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface headerProps
{
    reloadGame: () => void;
    pauseGame: () => void;
    borders: () => void ;
    children: JSX.Element[];
    isPause: boolean;
    isBorders: boolean;
}

export default function Header({children, reloadGame, pauseGame, borders, isPause, isBorders}:headerProps):JSX.Element
{
    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome name={isPause ? "play-circle" : "pause-circle"} size={35} color={Colors.primary}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={borders}>
                <FontAwesome6 name={isBorders ? "arrows-up-to-line" : "arrow-down-up-across-line"} size={25} color={Colors.primary}/>
            </TouchableOpacity>
            
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: 
    {
      flex: 0.05,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: Colors.primary,
      borderWidth: 12,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomWidth: 0,
      padding: 15,
      backgroundColor: Colors.background,
    },
});
