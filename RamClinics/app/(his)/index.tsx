import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useCountStore } from "../state/counter";

const HISHome = () => {

    let {count, users, increase, decrease} = useCountStore();

    return(
        <View>
            <Text>Hello World</Text>

            <Link href="/doctors"> Navigate to Doctor Screen </Link>

            <Text> Count is {count} </Text>


              { users.map(it => <Text>{it?.firstName}</Text>) }

        </View>
    )
}

export default HISHome;