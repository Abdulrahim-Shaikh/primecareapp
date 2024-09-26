import { Pressable, Text, View } from "react-native";
import userService from "../../services/UserService";
import { useEffect } from "react";
import { useCountStore } from "../state/counter";

const HISHome = () => {

    // let [users, setUsers]= useState([]);

//    useCountStore.getState().count;

    let {count, users, increase, decrease, setUsers} = useCountStore();
    
    useEffect(() => {
        userService.findAll().then( (res) => {        
            setUsers(res.data);

        });
    });
    
    return(
        <View>
            {/* <Text>Docotors List {users.length}</Text> */}
            {/* { users.map(it => <Text>{it?.firstName}</Text>) } */}

            <Text>{count} </Text>


            {/* <Button onPress={() => increase(1)} title="Increse"> </Button>
            <Button onPress={() =>  decrease(1)} title="Decrese"> </Button> */}

            <Pressable onPress={() => increase(1)}>
                <Text>Increase</Text>
            </Pressable>

            <Pressable onPress={() => decrease(1)}>
                <Text>Decrease</Text>
            </Pressable>

        </View>
    )
}

export default HISHome;